const multer = require('multer');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/t', multer().fields([{ name: 'logo', maxCount: 1 }]), (req, res) => {
  res.json({ body: req.body, keys: Object.keys(req.body) });
});
const server = app.listen(0, async () => {
  const port = server.address().port;
  const form = new FormData();
  form.append('churchName', 'Test Church');
  form.append('address[street]', 'Bole Road');
  form.append('phone', '251911111111');
  await fetch(`http://localhost:${port}/t`, { method: 'POST', body: form });
  server.close();
});
