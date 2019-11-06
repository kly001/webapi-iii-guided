const express = require('express'); // importing a CommonJS module
const helmet = require("helmet")

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function dateLogger (req, res, next) {
  console.log(new Date().toISOString())
next()
}

function logger(req, res, next) {
  console.log(`[DATE: ${new Date().toISOString()}] METHOD & URL: ${req.method} to ${req.url}`)
  next()
}

//global middleware: runs on every request
server.use(helmet()) //third-party middleware
server.use(express.json()); //built-in middleware
server.use(logger)



server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
