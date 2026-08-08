import mongoose from 'mongoose';
import app from './app.js';
import config from './src/config/index.js';
import { connectDB } from './src/config/db.js';
import { logger } from './src/utils/logger.js';
import { startScheduledJobs } from './src/jobs/index.js';

let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(config.port, () => {
      logger.info(`Church CMS API running on port ${config.port} in ${config.env} mode`);
      logger.info(`API base path: ${config.apiPrefix}`);
      if (config.isDev) logger.info(`Swagger docs: http://localhost:${config.port}/api-docs`);
    });

    startScheduledJobs();
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

const shutdown = async (signal) => {
  logger.info(`${signal} received, shutting down gracefully...`);
  if (server) {
    server.close(async () => {
      await mongoose.connection.close();
      logger.info('HTTP server closed and DB connection released');
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection: ${reason}`);
});
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception: ${error.message}`);
  logger.error(error.stack);
  process.exit(1);
});

startServer();
