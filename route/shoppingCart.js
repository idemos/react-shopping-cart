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

        let query = `SELECT 
            p.*,sc.qta as qta,sc.user_id as user_id,p.id as product_id  FROM shopping_cart sc INNER JOIN products p ON (p.id=sc.product_id) INNER JOIN users u ON (u.id=sc.user_id)
            `;

        con.query(query, function (err, result, fields) {
          if (err) throw err;
          //console.log("result:", result);
          res.send(result);
        });
      });
});

route.delete('/:id', async (req,res) => {

    con.connect(function(err) {
        //if (err) throw err;
        if(isNaN(req.params.id)){
          res.send({error: 'non è un id valido'});
        }

        let query = `DELETE FROM shopping_cart WHERE id=${req.params.id}`;

        con.query(query, function (err, result, fields) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
        });
    });
});

route.put('/:id', async (req,res) => {

  con.connect(function(err) {
      //if (err) throw err;
      if(!req.params){
        res.send({error: 'non ci sono dati da inserire'});
      }

      let query = `UPDATE shopping_cart SET `;
      const id = req.params.id;
      delete(req.params.id);

      for (const [key, value] of Object.entries(req.params)) {
        query+= `${key}= '${value}'`;
      }
      query+= ` WHERE id=${id}`;

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
      if(!req.body){
        res.send({error: 'non ci sono dati da inserire'});
      }

      //console.log("body",req.body);

      let query = `INSERT INTO shopping_cart (:KEY)VALUES(':VALUE')`;
      query+= " ON DUPLICATE KEY UPDATE qta=qta+1, price=price+" + req.body.price;

      let qvalue = [];
      let fvalue = [];
      const fields = ["user_id","product_id","qta","price"];
      for (const [key, value] of Object.entries(req.body)) {
        if(fields.includes(key)){
          fvalue = [...fvalue, key];
          qvalue = [...qvalue, value];
        }
      }

      // const obj = Object.fromEntries(req.params);
      // const params = obj.filter(field => fields.includes(field));

      query = query.replace(/:VALUE/, qvalue.join("','")).replace(/:KEY/, fvalue.join(","));
      //console.log(query);
      //res.send(query);
      

      con.query(query, function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        res.send(result);
      });
  });
});

module.exports = route;
