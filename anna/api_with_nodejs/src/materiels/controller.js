const pool = require('../../db');
const queries = require('./queries');

const getMateriels = (req, res) => {
    pool.query("SELECT * FROM equipements", (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getMaterielsById = (req, res) => {
   const id = parseInt(req.params.id);
   pool.query(queries.getMaterielsById, [id], (error, results) => {
    if (error) throw error;
        res.status(200).json(results.rows);
   })
};

const addMateriel = (req, res) => {
    const {name, price, img} = req.body;
    // verifier si le nom existe déjà dans la base de données
    pool.query(queries.checkNameExists, [name], (error, results) => {
        if (results.rows.length) {
            res.send("Ce nom existe déjà");
        }

    // Ajouter un équipement 
    pool.query(queries.addMateriel, [name, price, img], (error, results) => {
        if (error) throw error;
        res.status(201).send("Produit ajouté avec succès !")
        console.log("Produit ajouté");
    })
    })
}

const removeMateriels = (res, req) => {
    const id = parseInt(req.params.id);
    pool.query(queries.removeMateriels, [id], (error, results) => {
        const noproduct = !results.rows.length;
        if (noproduct) {
            res.send("  Ce produit n'existe pas et ne me être supprimé !")
        }
        
    }) 
}

module.exports = {
    getMateriels,
    getMaterielsById,
    addMateriel,
    removeMateriels
};