// JavaScript source code
// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
// Step 1

const routes = require('./routes/api');

// Step 2
//const MONGODB_URI = 'mongodb+srv://Bhupinder7551:Bhupinder7551@cluster0-zubdy.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect('mongodb://localhost/nodedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
})
//app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(morgan('tiny'));

app.use('/api', routes);




app.listen(PORT, console.log(`Server is starting at ${PORT}`));
