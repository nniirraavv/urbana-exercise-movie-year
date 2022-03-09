import { realpathSync } from 'fs';
import { result } from 'lodash';
import * as moviesData from '../../../data/data';
import * as gameData from '../../../data/game';
import { createMatch, submitPlay} from '../model/dboperation';

//const client = require('../../../loaders/pgAdapter');

const { Client } = require('pg')


const client =  new Client({
  host: "localhost",
  port:5433,
  user: "postgres",
  password: " ",
  database: "urbana_example"
});

client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack))



export const graphQlResolvers = {
  users: async () => {
   const users = [];
  
    let result = await client.query('select * from players');
      return result.rows;
  },
  movies: async({limit}) =>{
     let movies= shuffle(moviesData.moviesData);
     limit=7;
      return limit ? movies.slice(0, limit) : movies;
   
  },
  movie: async ({title}, context) => {
    return moviesData.moviesData.find(movie => movie.title === title);
  },
  play: async() => {
    let movies = shuffle(gameData.gameData);
    var limit = 7;
    console.log(limit ? movies.slice(0, limit) : movies);
    return limit ? movies.slice(0, limit) : movies;
  },
  createMatch: ({input}) => {
    console.log({input});
    createMatch(input);
  },
  submitPlay:({input})=>{
    submitPlay(input);
  }

};


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}