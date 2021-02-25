const serveFile = require('./serve-file');
const serveStandards = require('./serve-standards');
const ejs = require('ejs');
 
function handleRequest(req, res) {
  if(req.method !== 'GET') return res.writeHead(501).end();
  if(req.url.toString().includes("/standards") || req.url.toString().includes("/standards.html")){
    serveStandards(req,res);
    return;
  }
  serveFile(req, res);
}

module.exports = handleRequest;

