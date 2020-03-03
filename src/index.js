// import v1Route from './routes';
import v1Route from './routes'
import express from 'express';
import cors from 'cors';
import { promisify } from 'util';
var path = require('path');

const postStore = require('./postingStore');
// const commentStore = require('./commentStore');
const userStore = require('./userStore');
// const countStore = require('./countStore');
// const statusStore = require('./statusStore');
// const edit = require('./edit');
// const redis = require('redis')
const session = require('express-session');
// const remove = require('./remove');
// const register = require('./register');
// const Like = require('./Like');
const statusStore = require('./statusStore')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);
// const proxy = require('express-http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();



const port = 3000;

const router = express.Router();


const options = {
  target: 'http://www.example.org', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/api/old-path': '/api/new-path', // rewrite path
    '^/api/remove/path': '/path' // remove base path
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    'dev.localhost:3000': 'http://localhost:8000'
  }
};

// create the proxy (without context)
// const exampleProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server




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
  resave: false,
saveUninitialized: true,
cookie: {
  name: 'loginCookie',
  httpOnly: false,
  secure: false,
  // resave: true,
  // saveUninitialized: false,
  // store:new FileStore()
}}));
// app.use('/api', exampleProxy);

// app.post('/login', async (req, res) => {
  //   // console.log('asd', req.session)
  // console.log('lasifghnqwaoinfgnaegpwnego;awneg')
  //   const { Id, Password } = req.body;
  
  //   req.session.user = {
    //     "name" : Id,
    //     "pwd" : Password
    //   }
    //   console.log('sesszzx', session)
    
    //   console.log('tlqk', req.session)
    //   const loginMessageAndStatus = await userStore.performLogin(Id, Password)
    //   res.send( loginMessageAndStatus );
    // })
    
    app.use('/static/images', express.static('static/images'));
    
      





  // app.get('/count', function(req, res){

  //   if(req.session.count){//값이 있을때
    
  //   req.session.count++;
    
  //   }else{//처음 접속했을때 즉 값이 없을 때
    
  //   req.session.count = 1;//세션을 만듬
    
  //   }
    
  //   res.send('count : ' + req.session.count);
    
  //   });
    

  app.use(v1Route);

app.post('/:user', (req, res) => {
  const { currentUser, userOfActivePage } = req.body;

  const response = statusStore.getStatus();
  const activeUser = statusStore.getCurrentPageUser();

  console.log('activeUser', activeUser)
  res.send({ response, activeUser });
});



if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}





// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '/'), function (err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })
// app.listen(3000, () => {
//   console.log(`Listening on port ${port}...`);
// });


export default app