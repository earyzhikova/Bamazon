// Load the NPM Package inquirer & mySQL
var inquirer = require("inquirer");
var mysql = require("mysql");
var consoleTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "4488Pikes!",
  database: "bamazondb"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});
  // display id, name, prices of product for sale
     connection.query("SELECT item_id, product_name, price FROM products", function (err, result) {
      if (err) throw err;
      console.table(result);
      submitItemQuantity();
    });
// prompt with two messages: ID of the product they would like to buy & how many units they would like to buy
    var submitItemQuantity = function () {
      inquirer.prompt([{
        name: 'item_id',
        type: 'input',
        message: 'What is the ID of the product you would like to buy?' 
             
      }, {
        name: 'quantity',
        type: 'input',
        message: 'How many units would you like to buy?'
      }]).then(function (answer) {
        connection.query('INSERT INTO products SET ?', {
          itemname: answer.item_id,
          quantity: answer.quantity,
          
        }, function (err, res) {
          console.log('Your order was created successfully!');
        
        })
      })
    }

    // check if your store has enough of the product to meet the customer's request

    // log a phrase like Insufficient quantity!, and then prevent the order from going through

    // if the store has a product,
    // updating the SQL database to reflect the remaining quantity

    // Once the update goes through, show the customer the total cost of their purchase.

   
  