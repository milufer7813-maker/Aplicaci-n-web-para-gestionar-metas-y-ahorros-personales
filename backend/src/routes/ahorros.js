const express = require('express');
const ahorro = require('../models/Ahorro');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { usuario_id } = req.query;
    if (!usuario_id) {
      return res.status(400).json({ error: 'Falta usuario_id' });
    }
    res.json(await ahorro.listarPorUsuario(usuario_id));
  } catch (error) {
    res.status(500).json({ error: 'Error al listar los ahorros' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { meta_id, valor, fecha_aporte } = req.body;
    if (!meta_id || !valor || !fecha_aporte) {
      return res.status(400).json({ error: 'Faltan datos: meta_id, valor y fecha_aporte' });
    }
    const id = await ahorro.crear({ meta_id, valor, fecha_aporte });
    res.status(201).json({ mensaje: 'Ahorro registrado', id });
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'La meta no existe' });
    }
    res.status(500).json({ error: 'Error al registrar el ahorro' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { valor, fecha_aporte } = req.body;
    if (!valor || !fecha_aporte) {
      return res.status(400).json({ error: 'Faltan datos: valor y fecha_aporte' });
    }
    const filas = await ahorro.actualizar(req.params.id, { valor, fecha_aporte });
    if (filas === 0) {
      return res.status(404).json({ error: 'El ahorro no existe' });
    }
    res.json({ mensaje: 'Ahorro actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el ahorro' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const filas = await ahorro.eliminar(req.params.id);
    if (filas === 0) {
      return res.status(404).json({ error: 'El ahorro no existe' });
    }
    res.json({ mensaje: 'Ahorro eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el ahorro' });
  }
});

module.exports = router;