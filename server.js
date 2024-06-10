import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import router from './routes/routes.js';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
