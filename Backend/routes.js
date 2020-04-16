import { toXML } from 'jstoxml';
import { join } from 'path';
import { readFileSync } from 'fs';
import Estimator from '../dist/estimator';
import { sendJsonResponse } from './helpers';

const routes = (app) => {
  app.get('/', (_req, res) => res.status(200).json({
    message: 'Welcome to COVID-19 estimator API.'
  }));

  app.post('/api/v1/on-covid-19', sendJsonResponse);

  app.post('/api/v1/on-covid-19/json', sendJsonResponse);

  app.post('/api/v1/on-cov-19/xml', (req, res) => {
    const data = req.body;
    const estimation = Estimator(data);
    const xml = toXML(estimation);
    res.header('Content-Type', 'application/xml; charset=UTF-8');
    res.status(200).send(xml);
  });

  app.get('/api/v1/on-covid-19/logs', (_req, res) => {
    try {
      const filePath = join(__dirname, 'logs.txt');
      const data = readFileSync(filePath, 'utf8');
      res.header('Content-Type', 'text/plain; charset=UTF-8');
      res.status(200).send(data);
    } catch (error) {
      throw new Error('Sorry, there was an issue reading the logs try');
    }
  });
};

export {
  routes as default
};
