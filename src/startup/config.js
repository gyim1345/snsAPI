import cors from 'cors';
import express from 'express';
import v1Route from '../routes'


const session = require('express-session');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

module.exports = function(app) {
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
}