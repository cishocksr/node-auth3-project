const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('../auth/auth-router');
const userRouter = require('../users/users-router');

const server = express();

server.use(helmet());
server.use(morgan());
server.use(express.json());
server.use(cors());

server.use('/auth', authRouter);
server.use('/users', userRouter);

server.use((err, req, res, next) => {
  return res.status(500).json({
    message: 'Something went wrong'
  });
});

server.get('/', (req, res) => {
  res.status(200).json({
    message: 'I am running...'
  });
});

module.exports = server;
