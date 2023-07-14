  const Pool = require('pg').Pool;
  const id_data= require('./db_const')

  const pool = new Pool({
    user: id_data.USER,
    host: id_data.HOST,
    database: id_data.DB,
    password: id_data.PASS,
    port:id_data.PORT
  })

  module.exports = pool;
   