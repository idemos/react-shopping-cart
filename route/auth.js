const Joi = require('joi');
var mysql = require('mysql');
const express = require('express');
const route = express.Router();

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Malta4ever?",
    database: "shopping_cart"
});

/**
const validateCart = (cart) => {
  const schema = Joi.object().keys({ 
    name: Joi.string().alphanum().min(3).max(30).required(),
    birthyear: Joi.number().integer().min(1970).max(2013), 
  }); 
}
*/

route.post('/', async (req,res) => {

    con.connect(function(err) {
        //if (err) throw err;
        if(!req.body){
          res.send({error: 'non ci sono dati da inserire'});
        }

        // const {error} = validateCart(req.body);

        let query = `SELECT * FROM user WHERE email=':EMAIL' AND password=':PASS'`;
        query = query.replace(/:EMAIL/, req.body.email).replace(/:PASS/, req.body.password);
        
  
        con.query(query, function (err, result, fields) {
          console.log("result", result.length);
          
          if (err) throw err;
          //if (result.length === 0) throw new Error("Utente non presente");
          //if (result.length === 0) throw "Utente non presente";
          
          res.send(result);
        });
    });
  });


module.exports = route;
