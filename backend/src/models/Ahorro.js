const db = require('../config/Database');
const ModeloBase = require('./ModeloBase');

class Ahorro extends ModeloBase {
  constructor() {
    super('ahorros');
  }

  async listarPorUsuario(usuarioId) {
    return await db.consultar(
      `SELECT a.id, a.meta_id, m.nombre AS meta, a.valor, a.fecha_aporte
       FROM ahorros a
       JOIN metas m ON a.meta_id = m.id
       WHERE m.usuario_id = ?
       ORDER BY a.fecha_aporte DESC, a.id DESC`,
      [usuarioId]
    );
  }
}

module.exports = new Ahorro();