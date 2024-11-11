const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan')
const cors = require('cors');
const express = require('express');
const path = require('path'); 
const app = express();
const mongoose = require('mongoose');
const menuRouter = require('./controllers/menu')
const userRouter = require('./controllers/users')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(morgan('tiny'));
app.use('/uploads', express.static('uploads'));
app.use('/menus', menuRouter)
app.use('/user', userRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

app.listen(3000,() => {
    console.log('we are redy to party hardy')
})