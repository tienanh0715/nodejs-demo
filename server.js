const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Run request ...');
    res.setHeader('Content-Type', 'text/html');
    res.write('<h2>Hello World</h2>');
    res.end();
})

server.listen(3000, 'localhost', () => {
    console.log('Server is running in port 3000');
})