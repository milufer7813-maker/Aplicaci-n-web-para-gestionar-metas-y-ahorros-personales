const express = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/Usuario');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json(await usuario.listar());
  } catch (error) {
    res.status(500).json({ error: 'Error al listar usuarios' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, correo, clave } = req.body;
    if (!nombre || !correo || !clave) {
      return res.status(400).json({ error: 'Faltan datos: nombre, correo y clave' });
    }
    const id = await usuario.registrar(nombre, correo, clave);
    res.status(201).json({ mensaje: 'Usuario creado', id });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Ese correo ya está registrado' });
    }
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { correo, clave } = req.body;
    if (!correo || !clave) {
      return res.status(400).json({ error: 'Faltan datos: correo y clave' });
    }

    const encontrado = await usuario.buscarPorCorreo(correo);
    if (!encontrado) {
      return res.status(401).json({ error: 'Correo o clave incorrectos' });
    }

    const claveCorrecta = await usuario.validarClave(clave, encontrado.clave);
    if (!claveCorrecta) {
      return res.status(401).json({ error: 'Correo o clave incorrectos' });
    }

    const token = jwt.sign(
      { id: encontrado.id, correo: encontrado.correo },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      mensaje: 'Inicio de sesión correcto',
      token,
      usuario: { id: encontrado.id, nombre: encontrado.nombre, correo: encontrado.correo }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;