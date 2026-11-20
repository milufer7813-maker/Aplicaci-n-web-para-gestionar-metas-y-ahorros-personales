const bcrypt = require('bcryptjs');
const db = require('../config/Database');
const ModeloBase = require('./ModeloBase');

class Usuario extends ModeloBase {
  constructor() {
    super('usuarios');
  }

  async listar() {
    return await db.consultar(
      'SELECT id, nombre, correo, fecha_registro FROM usuarios'
    );
  }

  async registrar(nombre, correo, clave) {
    const claveEncriptada = await bcrypt.hash(clave, 10);
    return await this.crear({ nombre, correo, clave: claveEncriptada });
  }

  async buscarPorCorreo(correo) {
    const filas = await db.consultar('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return filas[0];
  }

  async validarClave(claveEscrita, claveGuardada) {
    return await bcrypt.compare(claveEscrita, claveGuardada);
  }
}

module.exports = new Usuario();