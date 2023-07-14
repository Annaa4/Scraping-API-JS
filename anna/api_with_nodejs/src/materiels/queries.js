const getMateriels = (table) => `SELECT * FROM ${table}`;
const getElementServiceById = (table,id) => `SELECT * FROM ${table} WHERE id = ${id}`;
const checkNameExists = (table,name) => `SELECT * FROM ${table} WHERE name = '${name}'`;
const addMateriel = (table,name,price,img) => `INSERT INTO ${table} (name, price, img) VALUES ($1, $2, $3)`;
const removeMateriels = (table,id) => `DELETE FROM ${table} WHERE id = ${id}`;
const updateMateriel = (table) => `UPDATE ${table} SET name = $1, price = $2, img = $3 WHERE id = $4`;


module.exports = {
  getMateriels,
  getElementServiceById,
  checkNameExists,
  addMateriel,
  removeMateriels,
  updateMateriel
};
