const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./src/config/Database');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/usuarios', require('./src/routes/usuarios'));
app.use('/api/metas', require('./src/routes/metas'));
app.use('/api/ahorros', require('./src/routes/ahorros'));

app.get('/', async (req, res) => {
  try {
    await db.consultar('SELECT 1');
    res.json({ mensaje: 'Servidor y base de datos funcionando' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});