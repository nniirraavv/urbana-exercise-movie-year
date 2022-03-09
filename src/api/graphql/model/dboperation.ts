import { client } from "../../../loaders/pgAdapter";
import * as moviesData from '../../../data/data';
import { redisclient } from "../../../loaders/redisCon";

export const createMatch_old = (input) => {
    let result = client.query("select * from players where email!='"+input.email+"'");
    console.log(result);
}

const checkDuplicate=async (input) => {
    let result =  await client.query("select * from players where LOWER(email)=LOWER('"+input.email+"')");
    return result;
}

const createGame=async (playerId) => {
    const text = 'INSERT INTO games(player_id) VALUES($1) RETURNING *';
    const values = [playerId];  

    try {
        const res = await client.query(text, values)
        
        return res.rows[0];

      } catch (err) {
        console.log(err.stack)
      }
}

export const createMatch =async (input) => {
    let dupResult= await checkDuplicate(input);
    if(dupResult.rowCount==0)
    {
        const text = 'INSERT INTO players(name, email) VALUES($1, $2) RETURNING *';
        const values = [input.name,input.email];

       try {
            const res = await client.query(text, values)
            redisclient.set('users',res.rows[0])
          
            
           // redisclient.setex('users',res.rows[0]); // store in cache
            createGame(res.rows[0].id);

            return res.rows;

          } catch (err) {
            console.log(err.stack)
          }
    }
    else
    {   
        try{
            createGame(dupResult.rows[0].id);
            return dupResult.rows;
        }
        catch (err) {
            console.log(err.stack)
          }

    }
    //let result =  await client.query("select * from players where LOWER(email)!=LOWER('"+input.email+"')");
    console.log(dupResult);
}

export const submitPlay =async (data) => {
  var userId;
 await redisclient.get('users', function (err, user) {
    if (err) throw err;
    if(user){
      userId=user.id;
    }
});

  for (let item of data) {
    console.log(item);
    var findData=moviesData.moviesData.find(movie => movie.title === item.title);
    let text, values;
    if(findData.releaseYear==item.answer)
    {
       text = 'INSERT INTO leaderboard(player_id, movie,answer,selected_answer,result,score) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
       values = [1,findData.title,findData.releaseYear,item.answer,true,10];

    }
    else
    {
      text = 'INSERT INTO leaderboard(player_id, movie,answer,selected_answer,result,score) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      values = [1,findData.title,findData.releaseYear,item.answer,false,0];
    }
    try {
      const res = await client.query(text, values)
      
      //return res.rows;

    } catch (err) {
      console.log(err.stack)
    }
  }

  
}