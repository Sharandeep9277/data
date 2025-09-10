// server.js
const path = require('path');
const jsonServer = require('json-server');
const express = require('express');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({ static: 'public' });

// Middlewares
server.use(middlewares);

// Increase request body size for large POST/PUT (optional)
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Optional: simple logging for Render logs
server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Mount router
server.use(router);

// Use PORT from env (Render provides it)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
