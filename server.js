const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan')
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const foodRouter = require('./controllers/menu')
const userRouter = require('./controllers/users')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/items', foodRouter)
app.use('/', userRouter)

app.listen(3000,() => {
    console.log('we are redy to party hardy')
})