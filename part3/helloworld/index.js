const http = require("http");

const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port} !`);
