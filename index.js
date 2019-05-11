const express = require('express');

const postRoutes = require('./posts/postRoutes');

const server = express();

server.use(express.json());
server.use('/api/posts', postRoutes);

server.listen(4000, () => {
  console.log('Server running on port 4000');
});