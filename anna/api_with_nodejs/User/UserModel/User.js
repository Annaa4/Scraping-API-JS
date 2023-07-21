const pool = require('../../db'); // Importez votre connexion à la base de données PostgreSQL

const User = {};

User.create = async (username, password,role) => {
  const query = 'INSERT INTO users (username, password,role) VALUES ($1, $2,$3) RETURNING *';
  const values = [username, password,role];
  const result = await pool.query(query, values);
  return result.rows[0];
  };

User.findByUsernameAndPassword = async (username, password, role) => {
    const client = await pool.connect();
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2 AND role = $3';
    const values = [username, password, role];
    const result = await client.query(query, values);
    client.release();
  
    return result.rows[0];
  };
User.findByUsername= async (username) => {
    const client = await pool.connect();
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const result = await client.query(query, values);
    client.release();
  
    return result.rows[0];
  };
User.findElementById = async (id)  =>{
    const client= await pool.connect();
    const query ='DELETE from users WHERE id = $1 '
    const values=[id];
    const result= await client.query(query,values)

    client.release();
    return result.rows[0]
}

// Autres fonctions pour les opérations CRUD sur les utilisateurs

module.exports = User;
