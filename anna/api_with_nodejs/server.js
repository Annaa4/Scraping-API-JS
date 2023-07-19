const express = require('express');
const materielRoutes = require('./src/materiels/routes');
const{adminAuth,userAuth}=require('./User/UserAuth/Auth')
const cookieParser = require("cookie-parser");



const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.static('front'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use(cookieParser());

app.use('/api/produits', materielRoutes);

app.use("/api/auth", require("./User/UserAuth/UserRoute"))

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

app.listen(port, () => console.log(`App écoute sur le port ${port}`));
