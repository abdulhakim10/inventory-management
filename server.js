const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');


const app = require('./app');

// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log('Database connection is successful'.green.bold);
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
});