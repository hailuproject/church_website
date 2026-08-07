import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

import config from './src/config/index.js';
import routes from './src/routes/index.js';
import { notFound, globalErrorHandler } from './src/middlewares/errorHandler.js';
import { apiLimiter } from './src/middlewares/rateLimiter.js';
import { requestLogger } from './src/utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || !config.clientUrl || config.isDev) return callback(null, true);
      const allowed = config.clientUrl.split(',').map((url) => url.trim());
      if (allowed.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Stripe-Signature'],
  })
);
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

if (config.isDev) {
  app.use(morgan('dev'));
} else {
  app.use(requestLogger);
}

let swaggerDocument = null;
try {
  swaggerDocument = YAML.load(path.join(__dirname, 'src', 'docs', 'swagger.yaml'));
} catch {
  swaggerDocument = null;
}

if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(config.apiPrefix, apiLimiter, routes);

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Church CMS API. See /api-docs for documentation.' });
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
