/**
 * Created by Jordan3D on 4/13/2018.
 */
// if(process.env.PRODUCTION.toLowerCase() === "false"){
//     require('dotenv').config();
// }

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3013;

const server = http.createServer(app);

server.listen(port);

