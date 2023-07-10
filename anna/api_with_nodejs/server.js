const express = require('express')
const materielRoutes = require('./src/materiels/routes');

const app = express();
const port = 8000

app.get("/", (req, res) =>{
    res.send("Hello World")
});

app.use(express.json());
app.use('/api/v1/materiels', materielRoutes);
app.listen(port, () => console.log(`App ecoute sur le port ${port}`));    