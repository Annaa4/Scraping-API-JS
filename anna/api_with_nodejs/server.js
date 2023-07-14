const express = require('express');
const materielRoutes = require('./src/materiels/routes');

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
app.use('/api/produits', materielRoutes);

app.listen(port, () => console.log(`App écoute sur le port ${port}`));
