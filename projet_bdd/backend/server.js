// backend/server.js
import express from 'express';
import cors from 'cors';
import jeuxRoutes from './routes/api.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/', jeuxRoutes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
