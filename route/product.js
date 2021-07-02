var mysql = require('mysql');
const express = require('express');
const route = express.Router();

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Malta4ever?",
    database: "shopping_cart"
});

// => lo '/' vuol dire /api/courses
route.get('/', async (req,res) => {

    con.connect(function(err) {
        //if (err) throw err;

        let query = `SELECT * FROM products  `;

        con.query(query, function (err, result, fields) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
        });
      });
});

route.post('/', async (req,res) => {

    con.connect(function(err) {
        //if (err) throw err;
        if(!req.params){
          res.send({error: 'non ci sono dati da inserire'});
        }
  
        let query = `INSERT INTO shopping_cart (`;
  
        query+= Object.keys(req.params).join(',');
        query+= " ) VALUES ('";
        query+= Object.values(req.params).join("','");
        query+= "')";
        
  
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
        });
    });
  });


module.exports = route;
