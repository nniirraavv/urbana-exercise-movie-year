import { Client } from "pg";

const config = {
  host: "localhost",
  port:5433,
  user: "postgres",
  password: " ",
  database: "urbana_example"
};

export const client =  new Client(config);

client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack))
