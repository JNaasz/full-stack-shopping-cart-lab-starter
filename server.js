const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
// Serve files from public folder. That's where all of our HTML, CSS and Angular JS are.

//Set up access to the database via a connection pool. You will then use
// the pool for the tasks below.
var pool = new pg.Pool({
   user: "postgres",
   password: "ladybug1",
   host: "localhost",
   port: 5432,
   database: "postgres",
   ssl: false
});

app.use(express.static('public'));
// This allows us to accept JSON bodies in POSTs and PUTs.
app.use(bodyParser.json());

// GET /api/items - responds with an array of all items in the database.
// Handle this URL with appropanriate Database interaction.
app.get('/api/items', function(req, res) {
    // res.send('WORKING!!');
    pool.query("SELECT product, price, quantity, price*quantity as total FROM ShoppingCart").then(function(result){
      res.send(result.rows);
    });
})

app.get('/api/items/totals', function(req, res) {
    // res.send('WORKING!!');
    pool.query("SELECT sum(price) as totalPrice, sum(quantity) as itemTotal FROM ShoppingCart").then(function(result){
      res.send(result.rows);
    });
})

// POST /api/items - adds and item to the database. The items name and price
// are available as JSON from the request body.
// Handle this URL with appropriate Database interaction.
app.post('/api/items', function(req, res) {
  var item = req.body;
  var sql = "INSERT INTO ShoppingCart(product, price, quantity)" +
  "VALUES ($1::text, $2::decimal(5,2), $3::int)";
  var values = [item.product, item.price, item.quantity];
  pool.query(sql, values).then(function() {
    res.status(201); //201 Created
    res.send("INSERTED");
  });
})


// DELETE /api/items/{ID} - delete an item from the database. The item is
// selected via the {ID} part of the URL.
// TODO Handle this URL with appropriate Database interaction.
app.delete('/api/items/:id', function(req, res) {
    var id = req.params.id; // <-- This gets the :id Part of the URL -->
    pool.query("DELETE FROM ShoppingCart WHERE id = $1::int", [id]).then(function() {
        res.send("DELETED");
    }).catch(errorCallback(res));
})

function errorCallback(res) {
    return function(err) {
        console.log(err);
        res.status(500); // 500 Server Error
        res.send("ERROR!");
    };
}


var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('JSON Server is running on ' + port);
});
