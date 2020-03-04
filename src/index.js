import v1Route from './routes'
import express from 'express';
import cors from 'cors';

const session = require('express-session');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){    
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost:27017/', { useUnifiedTopology: true, useNewUrlParser: true });
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

require('dotenv').config();



const port = 3000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true, 
}));
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret : 'Rs89I67YEA55cLMgi0t6oyr8568e6KtD',
  resave: true,
saveUninitialized: false,
cookie: {
  name: 'loginCookie',
  httpOnly: false,
//   secure: false,
//   resave: true,
//   // saveUninitialized: false,
//   // store:new FileStore()
}
}));
  
  app.use('/static/images', express.static('static/images'));
    
  app.use(v1Route);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

export default app