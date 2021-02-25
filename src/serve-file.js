const fs = require('fs');
const path = require('path');
const pathToMimeType = require('./path-to-mime-type');

function serveFile(req, res) {
  var pathname = new URL(req.url, 'http://localhost').pathname+'/index.html';
  var filePath = path.join('public', pathname);
    fs.readFile(filePath, function(err, body){
      if(err) {
        console.error(err);
        res.statusCode = 404;
        res.statusMessage = "Not Found";
        res.end();
        return;
       }
      res.setHeader("Content-Length", body.length);
      res.setHeader("Content-Type", pathToMimeType(filePath));
      res.end(body);
    });
}

module.exports = serveFile;