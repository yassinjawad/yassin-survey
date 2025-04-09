const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  // Validate URL encoding
  try {
    decodeURIComponent(req.path);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid URL encoding' });
  }
});

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running safely');
});