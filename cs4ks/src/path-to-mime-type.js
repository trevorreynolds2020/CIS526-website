const path = require('path');

function pathToMimeType(filePath) {
  var extension = path.extname(filePath);
   switch(extension) {
      case ".html": 
        return "text/html";
      case ".css":
        return "text/css";
      case ".js":
        return "text/javascript";
      default:
        return "application/octet-stream";
    }
}

module.exports = pathToMimeType;
