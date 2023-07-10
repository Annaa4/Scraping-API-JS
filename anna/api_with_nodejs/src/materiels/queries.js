const getMateriels = "SELECT * FROM equipements";
const getMaterielsById = "SELECT * FROM equipements WHERE id = $1";
const checkNameExists = "SELECT e FROM equipements e WHERE e.name = $1";
const addMateriel = "INSERT INTO equipements (name, price, img) VALUES ($1, $2, $3)";
const removeMateriels = "DELETE FROM equipements WHERE id = $1";
module.exports = {
    getMateriels,
    getMaterielsById, 
    checkNameExists,
    addMateriel
};