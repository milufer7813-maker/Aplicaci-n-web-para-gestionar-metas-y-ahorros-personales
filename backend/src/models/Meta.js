const db = require('../config/Database');
const ModeloBase = require('./ModeloBase');

class Meta extends ModeloBase {
  constructor() {
    super('metas');
  }

  async listarPorUsuario(usuarioId) {
    return await db.consultar(
      `SELECT m.id, m.nombre, m.valor_meta,
              COALESCE(SUM(a.valor), 0) AS ahorrado,
              ROUND(COALESCE(SUM(a.valor), 0) / m.valor_meta * 100) AS porcentaje
       FROM metas m
       LEFT JOIN ahorros a ON a.meta_id = m.id
       WHERE m.usuario_id = ?
       GROUP BY m.id, m.nombre, m.valor_meta`,
      [usuarioId]
    );
  }
}

module.exports = new Meta();