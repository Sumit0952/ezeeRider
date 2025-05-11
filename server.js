const http  = require('http');
const app = require('./App.js')
const port = process.env.PORT || 7000;


const server = http.createServer(app);


server.listen(port, () => {
    console.log({status:"ok fine"});
});