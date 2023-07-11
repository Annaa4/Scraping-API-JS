  const Pool = require('pg').Pool;

  const pool = new Pool({
    user: "anna",
    host: "postgresql-134127-0.cloudclusters.net",
    database: "data-api",
    password: "12345678",
    port:"19529"
  })

  module.exports = pool;
   