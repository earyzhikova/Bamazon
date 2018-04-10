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
     connection.query("SELECT item_id, product_name, price FROM products", function (err, results) {
      if (err) throw err;
      console.table(results);
      itemToPurchase();
    });

// prompt with two messages: ID of the product they would like to buy & how many units they would like to buy
    var itemToPurchase = function () {
      console.log("string");
        inquirer.prompt([{
        name: 'id',
        type: 'input',
        message: 'What is the ID of the product you would like to buy?', 
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }            
      }, {
        name: 'quantity',
        type: 'input',
        message: 'Enter the quantity you would like to purchase',
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }]).then(function (answer) {
        // Ask the database for info about the item
        

        var chosenItem = [];
        // for (var i = 0; i < results.length; i++) {
        //   choiceArray.push(results[i].item_name);
        // }
          if (results[i].item_id === answer.id) {
            chosenItem = results[i];
          // return choice.Array;
          };
        connection.query('SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?', {item_id:answer.id}, function(err,results){
console.log('You would like to buy ' + answer.quantity + ' ' + chosenItem.product_name + ' ' + chosenItem.department_name + '$' + chosenItem.price + ' each');
        });
        
        // determine if there is enough quantity
        if (chosenItem.stock_quantity >= answer.quantity) {
          //if there is enough items, update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: stock_quantity - answer.stock_quantity
              },
              {
                item_id: answer.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Order placed successfully!  Your cost is $" + price.toFixed(2) + '\n');
              // start();
            });
        }
        else {
          //not enough items, so apologize and start over
          console.log("Sorry, insufficient quantity!");
          // start();
      };
    });
  }
