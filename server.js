const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const players = require('./routes/api/items');
const cors = require('cors');
const app = express();
app.use(cors());
//const axios = require('axios');

// Bodyparser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
.connect(db)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Use Routes
app.use('/api/items', players);



app.use((req, res, next) => {
    const err = new Error("Route not found")
    err.status = 404;
    next(err);
})

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

// Will either listen to port on Heroku or other host, otherwise use 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));