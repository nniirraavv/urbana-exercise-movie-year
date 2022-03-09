import expressLoader from './express';
import Logger from './logger';

//const { Client } = require('pg')
//client.connect()



export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
  
};

