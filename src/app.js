import v1Route from './routes'
import express from 'express';
import cors from 'cors';
import compression from 'compression';

const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');


require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
require('./startup/db')();

export const db = mongoose.connection;

app.use(express.json());
app.use(compression());
app.use(cors({
  origin: process.env.ORIGIN,
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