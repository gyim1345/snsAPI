import v1Route from './routes'
import express from 'express';
import cors from 'cors';

const session = require('express-session');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config({ path: `/workspace/Project/snsAPI/src/.env.${process.env.NODE_ENV}` })
require('./startup/db')();

export const db = mongoose.connection;

app.use(express.json());
app.use(fileUpload());
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true, 
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret : 'Rs89I67YEA55cLMgi0t6oyr8568e6KtD',
  resave: true,
saveUninitialized: false,
cookie: {
  name: 'loginCookie',
  httpOnly: false,

}
}));
  
  app.use('/static/images', express.static('static/images'));
  app.use(v1Route);


export default app