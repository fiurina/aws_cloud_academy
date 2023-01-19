/**
 * Main driver for the webservice
 */
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

if (config.env !== 'production') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

const app = express();
let server;

app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));
app.use(bodyParser.json({extended: true, limit: '100mb'}));

/**
 * LOGGING
 */
morgan.token('reqCORSHeader', (req, res) => {
  return 'ACAO: ' + req.get('Access-Control-Allow-Origin') + 'ACAC: ' + req.get('Access-Control-Allow-Credentials') + 'ACEH: ' + req.get('Access-Control-Expose-Headers');
});
morgan.token('resCORSHeader', (req, res) => {
  return 'ACAO: ' + res.get('Access-Control-Allow-Origin') + 'ACAC: ' + res.get('Access-Control-Allow-Credentials') + 'ACEH: ' + res.get('Access-Control-Expose-Headers');
});

// log requests
app.use(morgan(':remote-addr :url :method HTTP/:http-version :user-agent', {
  immediate: true,
}));

// logs responses
app.use(morgan(':remote-addr :url :method :status :res[content-length] :response-time ms', {

}));

/**
 * CORS
 */
const corsOptionsDelegate = function (req, cb) {
  let corsOptions = {
    credentials: true
  };
  corsOptions.origin = true;
  cb(null, corsOptions);
};

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors(corsOptionsDelegate));

app.use(function (req, res, next) {
  req.body.lastChangedDate = Date.now();
  delete req.body.createdDate;
  delete req.body.authorizationDate;
  next();
});


let v1 = express.Router();
require('./api/v1/routes')(v1);

app.use('/v1', v1);
app.use('/', v1);

// if no route has been defined for the request return 404
app.use(function (req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

server = app.listen(config.port);
server.timeout = 10000;
console.log('RESTful API for Cloud started on port ' + config.port + ' in ' + config.env);

module.exports = app;
