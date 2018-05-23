#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../expressServer.js');
var debug = require('debug');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }normalizePort

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// HTTPS server 
// =====================================================================

var https = require('https');
var fs = require('fs');
var privateKey  = fs.readFileSync('ssl_cert/private.pem', 'utf8');
var certificate = fs.readFileSync('ssl_cert/my.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsApp= require('../expressServer.js');

/**
 * Get port from environment and store in Express.
 */
var sslPort = normalizePort('44443');
httpsApp.set('port',sslPort);

/**
 * Create HTTPS server.
 */

var httpsServer = https.createServer(credentials,httpsApp);

/**
 * Listen on provided sslPort, on all network interfaces.
 */

httpsServer.listen(sslPort);
httpsServer.on('error', onErrors);
httpsServer.on('listening', httpsOnListening);

/**
 * Event listener for HTTPs server "error" event.
 */

function onErrors(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTPS server "listening" event.
 */

function httpsOnListening() {
  var addr = httpsServer.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
