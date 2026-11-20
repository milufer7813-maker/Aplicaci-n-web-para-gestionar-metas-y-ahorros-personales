const db = require('../config/Database');

class ModeloBase {
  constructor(tabla) {
    this.tabla = tabla;
  }

  async listar() {
    return await db.consultar('SELECT * FROM ??', [this.tabla]);
  }

  async obtener(id) {
    const filas = await db.consultar('SELECT * FROM ?? WHERE id = ?', [this.tabla, id]);
    return filas[0];
  }

  async crear(datos) {
    const resultado = await db.consultar('INSERT INTO ?? SET ?', [this.tabla, datos]);
    return resultado.insertId;
  }

  async actualizar(id, datos) {
    const resultado = await db.consultar('UPDATE ?? SET ? WHERE id = ?', [this.tabla, datos, id]);
    return resultado.affectedRows;
  }

  async eliminar(id) {
    const resultado = await db.consultar('DELETE FROM ?? WHERE id = ?', [this.tabla, id]);
    return resultado.affectedRows;
  }
}

module.exports = ModeloBase;