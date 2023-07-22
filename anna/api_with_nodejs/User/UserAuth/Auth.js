const pool = require('../../db');
const User = require('../UserModel/User');
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const jwtsecret ='b55cf75d3612d7de5b5d5da8a439c176329681bec944707f2c503620e324abfddc7aba'


exports.register = async (req, res, next) => {
  const { username, password, role } = req.body;

   // Vérifier si le mot de passe est vide ou nul
   if (!password) {
    return res.status(400).json({ message: "Le Password est requis " });
  }

  try {
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur dans la base de données
    const user = await User.create(username, hashedPassword, role)
    const token = jwt.sign({username: user.username , user:user.role} , jwtsecret, { expiresIn: '2h'});

    res.cookie("jwt", token, {
      httpOnly: true,
      // maxAge: 3000000 * 1000, // 3hrs in ms
    });

    res.status(200).json({
      message: 'Utilaseur crée avec succé',
      user,
      token
    });
    
    
  } catch (error) {
    res.status(400).json({
      message: 'Erreur lors de la creation de l utilisateur',
      error: error.message,
    });
  }
};



 
  

exports.login = async (req, res, next) => {
    const { username, password} = req.body;
  
    try {
      const user = await User.findByUsername(username);
  
      if (!user) {
        res.status(401).json({
          message: "Login not successful",
          error: "User not found",
        });
      } else {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            const token = jwt.sign({username: user.username , id: user.id, role:user.role},jwtsecret,{expiresIn :'2h'} )

            res.cookie('jwt', token, 
            { maxAge: 2 * 60 * 60 * 1000 
              });


            res.status(200).json({
              message: "Login successful",
              user,
              token
            });
            
          } else {
            res.status(400).json({ message: "Login not successful" });
          }
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  };


  exports.logout =async(req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("/")
  }
  

  exports.deleteUser = async (req, res, next) => {
    const { id } = req.body;
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      const values = [id];eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsX3Jhd2FuZSIsImlkIjoyMSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg5ODA1ODI3LCJleHAiOjE2ODk4MTMwMjd9.bAHMMz65cxmoZCnOjkmDsR5mEkMXXjH-GKfyK7T1w1w
      await pool.query(query, values);
      res.status(200).json({
        message: 'User successfully deleted',
      });
    } catch (error) {
      res.status(400).json({
        message: 'An error occurred',
        error: error.message,
      });
    }
  };


exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt ;
  
    if (token) {

      jwt.verify(token, jwtsecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          if (decodedToken.role !== "admin") {
            return res.status(401).json({ message: "Not authorizeddddd" });
          } else {
            next();
          }
        }
      });
    } else {
      return res.status(401).json({ message: "Not authorized, token not available" });
    }
  };


  exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (token) {
        
      jwt.verify(token, jwtsecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          if (decodedToken.role !== "basic") {
            return res.status(401).json({ message: "Not authorized" });
          } else {
            next();
          }
        }
      });
    } else {
      return res.status(401).json({ message: "Not authorized, token not available" });

    }
  };