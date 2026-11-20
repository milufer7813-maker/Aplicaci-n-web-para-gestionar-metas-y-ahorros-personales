const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async consultar(sql, parametros = []) {
    const [resultado] = await this.pool.query(sql, parametros);
    return resultado;
  }
}

module.exports = new Database();