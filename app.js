const express = require('express');
const cors = require('cors');
const app = express();


// middle wares
app.use(express.json());
app.use(cors());


// initial route
app.get("/", (req, res) => {
    res.send("Route is working Yay!!")
});


module.exports = app;