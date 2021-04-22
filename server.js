const path = require('path');
const fs = require('fs');
const http = require('http');

const getContentType = (filePath) => {
  let extName = path.extname(filePath);
  if (extName === '.js') return 'text/javascript';
  if (extName === '.css') return 'text/css';
  if (extName === '.png') return 'img/png';
  if (extName === '.jpg') return 'img/jpg';
}

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  let contentType = getContentType(filePath) || 'text/html';
  let emptyPagePath = path.join(__dirname, 'public', '404.html');


  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(emptyPagePath, 'utf8', (err, content) => {
          res.writeHead(200, {'Content-Type': contentType});
          res.end(content);
        })
      } else {
        res.writeHead(500);
        res.end('A Server Error has occured');
      }
    }
    
    if (!err) {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content);
    }
  })

})

const port = 5000;

server.listen(port, () => console.log(`Server is running on port ${port}!`));