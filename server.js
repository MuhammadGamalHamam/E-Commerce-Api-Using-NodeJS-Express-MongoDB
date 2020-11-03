const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const app = express();

mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, err => {
    if (err) {
        console.log(err);
    }
    else {
console.log('Successfully connected to the database')
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());



const userRoutes = require('./routes/account');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');

app.use('/api', categoriesRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api', productsRoutes);


app.listen(config.port, err => {
  console.log('Server is listening on port ' + config.port);
});
