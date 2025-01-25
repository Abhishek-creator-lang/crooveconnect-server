require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { database } from './database';
import { allRoutes } from './router'
import { errorHandler } from './lib/errorHandler';

const PORT = process.env.PORT || 9999;
const app = express();

database.migrate
  .latest()
  .then(function () {
    return database.seed.run();
  })
  .then(function () {
    console.log('finished');
  });

app.use(bodyParser.json());
app.use(cors());
allRoutes.map(route => app.use('/api', route) )

app.use(errorHandler)
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
