const pool = require('../../db');
const queries = require('./queries');

const getServiceMateriels = (table) => {
    
    return (req, res) => {
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        pool.query(queries.getMateriels(table), (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        });
    };
};

const getServiceMaterielsById = (table) => {
    return (req, res) => {
        const id = parseInt(req.params.id);
        pool.query(queries.getMaterielsById(table), [id], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        });
    };
};

const addServiceMateriel = (table) => {
    return (req, res) => {
        const { name, price, img } = req.body;
        // Vérifier si le nom existe déjà dans la base de données
        pool.query(queries.checkNameExists(table), [name], (error, results) => {
            if (results.rows.length) {
                res.send("Ce nom existe déjà");
            } else {
                // Ajouter un équipement
                pool.query(queries.addMateriel(table), [name, price, img], (error, results) => {
                    if (error) throw error;
                    res.status(201).send("Produit ajouté avec succès !");
                    console.log("Produit ajouté");
                });
            }
        });
    };
};

const removeServiceMateriel = (table) => {
    return (req, res) => {
        const id = parseInt(req.params.id);
        pool.query(queries.removeMateriels(table), [id], (error, results) => {
            if (results.rowCount === 0) {
                res.send("Ce produit n'existe pas et ne peut être supprimé !");
            } else {
                res.send("Produit supprimé avec succès !");
                console.log("Produit supprimé");
            }
        });
    };
};

const updateServiceMateriel = (table) => {
    return (req, res) => {
        const id = parseInt(req.params.id);
        const { name, price, img } = req.body;
        pool.query(queries.updateMateriel(table), [name, price, img, id], (error, results) => {
            if (results.rowCount === 0) {
                res.send("Cet enregistrement n'existe pas et ne peut pas être mis à jour !");
            } else {
                res.send("Enregistrement mis à jour avec succès !");
                console.log("Enregistrement mis à jour");
            }
        });
    };
};


module.exports = {
    getServiceMateriels,
    getServiceMaterielsById,
    addServiceMateriel,
    removeServiceMateriel,
    updateServiceMateriel
};
