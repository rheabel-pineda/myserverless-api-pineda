const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const cloudDB = 'mongodb+srv://rheabelpineda:Pineda_17@cluster0.itfxbof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const localDB = 'mongodb://localhost:27017/serverless-api-pineda';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose
  .connect(cloudDB || localDB)
  .then(()=> console.log('Connected to MongoDB'))
  .catch((error)=>console.error('Failed to connect to MongoDB'));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);