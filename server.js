const express = require('express');
const app = express();
const path = require('path');
const httpProxy = require('http-proxy');
var apiForwardingURL = 'http://www.palletteapart.com';

app.set('port', (process.env.PORT || 5000));

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

var apiProxy = httpProxy.createProxyServer();

app.all("/boot/*", function (req, res) {
  console.log(req);
  apiProxy.web(req, res, {
    target: apiForwardingURL,
    secure : false,
    changeOrigin: true
  });
});

//app.use('/boot', proxy('www.palletteapart.com', {
//   https: false,
//   preserveHostHdr: true
// }));
// Start the app by listening on the default
// Heroku port

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});