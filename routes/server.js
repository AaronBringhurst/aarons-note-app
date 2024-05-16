const express = require('express');
const path = require('path');
const api = require('./routes/index.js')
const PORT = process.env.PORT || 3001;

const app = express();

// middleware needs to built here:
app.use (express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);


app.use(express.static('public'));


app.listen(PORT, () =>
    console.log(`App listening at httpL//localhost:${PORT}`)
);