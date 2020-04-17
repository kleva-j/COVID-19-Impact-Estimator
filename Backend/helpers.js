import fs from 'fs';
import { join } from 'path';
import Estimator from '../dist/estimator';

export const createLogStream = fs.createWriteStream(join(__dirname, 'logs.txt'), { flags: 'a' });

export const sendJsonResponse = (_req, res) => {
  const data = res.body;
  const estimation = Estimator(data);
  return res.status(200).json(estimation);
};
