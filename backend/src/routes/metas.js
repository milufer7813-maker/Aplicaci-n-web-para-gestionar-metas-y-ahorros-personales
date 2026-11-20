const express = require('express');
const meta = require('../models/Meta');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { usuario_id } = req.query;
    if (!usuario_id) {
      return res.status(400).json({ error: 'Falta usuario_id' });
    }
    res.json(await meta.listarPorUsuario(usuario_id));
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las metas' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { usuario_id, nombre, valor_meta } = req.body;
    if (!usuario_id || !nombre || !valor_meta) {
      return res.status(400).json({ error: 'Faltan datos: usuario_id, nombre y valor_meta' });
    }
    const id = await meta.crear({ usuario_id, nombre, valor_meta });
    res.status(201).json({ mensaje: 'Meta creada', id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la meta' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { nombre, valor_meta } = req.body;
    if (!nombre || !valor_meta) {
      return res.status(400).json({ error: 'Faltan datos: nombre y valor_meta' });
    }
    const filas = await meta.actualizar(req.params.id, { nombre, valor_meta });
    if (filas === 0) {
      return res.status(404).json({ error: 'La meta no existe' });
    }
    res.json({ mensaje: 'Meta actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la meta' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const filas = await meta.eliminar(req.params.id);
    if (filas === 0) {
      return res.status(404).json({ error: 'La meta no existe' });
    }
    res.json({ mensaje: 'Meta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la meta' });
  }
});

module.exports = router;