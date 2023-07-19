const pool = require('../../db');
const queries = require('./queries');

const getServices = (req,res) => {
    const table = req.params.table
    const querie = queries.getMateriels(table)
        pool.query(querie, (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        });
    
};


const getServiceMaterielsById = (req,res) => {
        const table = req.params.table;
        const id = parseInt(req.params.id);
        const querie= queries.getElementServiceById(table,id)
        pool.query(querie, (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        });

};

const AddElementService = (req, res) => {
    const table = req.params.table;
    const { name, price, img } = req.body;
  
    // Vérifier si le nom existe déjà dans la base de données
    const queryCheckNameExists = queries.checkNameExists(table, name);
    pool.query(queryCheckNameExists, (error, results) => {
      if (results.rows.length) {
        res.send("Ce nom existe déjà");
      } else {
        // Ajouter un équipement
        const queryAddMateriel = queries.addMateriel(table, name, price, img);
        pool.query(queryAddMateriel, [name, price, img], (error, results) => {
          if (error) throw error;
          res.status(201).send("Produit ajouté avec succès !");
          console.log("Produit ajouté");
        });
      }
    });
  };
  


const removeServiceMateriel = (req,res) => {

        const table = req.params.table;
        const id = parseInt(req.params.id);
        const querie= queries.removeMateriels(table,id);
        pool.query(querie, (error, results) => {
            if (results.rowCount === 0) {
                res.send("Ce produit n'existe pas et ne peut être supprimé !");
            } else {
                res.send("Produit supprimé avec succès !");
                console.log("Produit supprimé");
            }
        });
};

const updateServiceMateriel = (req, res) => {
    const table = req.params.table;
    const id = parseInt(req.params.id);
    const { name, price, img } = req.body;
  
    const querie = queries.updateMateriel(table, id);
    pool.query(querie, [name, price, img, id], (error, results) => {
      if (results.rowCount === 0) {
        res.send("Cet enregistrement n'existe pas et ne peut pas être mis à jour !");
      } else {
        res.setHeader("Content-Type", "application/json"); // Définir l'en-tête Content-Type
        res.status(200).json({ message: "Enregistrement mis à jour avec succès !" });
        console.log("Enregistrement mis à jour");
      }
    });
  };
  

module.exports = {
    getServices,
    getServiceMaterielsById,
    AddElementService,
    removeServiceMateriel,
    updateServiceMateriel
};
