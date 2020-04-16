/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import Routes from './routes';
import { createLogStream } from './helpers';

const { log } = console;

const app = express();

app
  .use(cors({ origin: true }))
  .use(helmet())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(logger((tokens, req, res) => [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    `${tokens['response-time'](req, res)}ms`
  ].join(' '), { stream: createLogStream }));

Routes(app);

const PORT = process.env.PORT || 3400;

app.use((_req, _res, next) => {
  const err = new Error('Not Found!.');
  err.status = 404;
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
});

app.listen(PORT, () => log(`App running on port ${PORT}.`));
