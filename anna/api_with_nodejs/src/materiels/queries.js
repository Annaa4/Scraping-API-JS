const getMateriels = (table) => `SELECT * FROM ${table}`;
const getMaterielsById = (table) => `SELECT * FROM ${table} WHERE id = $1`;
const checkNameExists = (table) => `SELECT * FROM ${table} WHERE name = $1`;
const addMateriel = (table) => `INSERT INTO ${table} (name, price, img) VALUES ($1, $2, $3)`;
const removeMateriels = (table) => `DELETE FROM ${table} WHERE id = $1`;
const updateMateriel = (table) => `UPDATE ${table} SET name = $1, price = $2, img = $3 WHERE id = $4`;


module.exports = {
  getMateriels,
  getMaterielsById,
  checkNameExists,
  addMateriel,
  removeMateriels,
  updateMateriel
};
