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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

// display id, name, prices of product for sale
connection.query("SELECT item_id, product_name, price FROM products", function (err, results) {
  if (err) throw err;
  console.table(results);
  itemToPurchase();
});
// // prompt with two messages: ID of the product they would like to buy & how many units they would like to buy
var itemToPurchase = function () {
  var itemsData = "";

  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results) {
    if (err) throw err;
    itemsData = results;
  });


  inquirer.prompt([{
    name: 'item',
    type: 'input',
    message: 'What is the ID of the product you would like to buy?',
    validate: function (value) {
      if (isNaN(value) == false) {

        return true;
      } else {
        return false;
      }
    }

  }, {
    name: 'quantity',
    type: 'input',
    message: 'Enter the quantity you would like to purchase',
    validate: function (value) {
      if (isNaN(value) == false) {

        return true;
      } else {
        return false;
      }
    }
  }]).then(function (answer) {
    // console.log(answer)
    // console.table(itemsData)
    //Get item
    //Get quantity
    //if enough continue
    //if not enough print message
    var itemRow = null;
    for (var i = 0; i < itemsData.length; i++) {
      if (itemsData[i].item_id == answer.item) {
        // console.log(itemsData[i]);
        itemRow = itemsData[i];
      }
    }
    if (answer.quantity > itemRow.stock_quantity) {
      console.log("Sorry, insufficiant quantity.");
      process.exit();
    }

    var newQuantity = itemRow.stock_quantity - answer.quantity;
    connection.query('UPDATE products SET ? WHERE ?', [{
        stock_quantity: newQuantity
      }, {
        item_id: answer.item

      }],

      function (err, res) {
        var itemsTotal = itemRow.price * answer.quantity;
        console.log("Your total is $ " + itemsTotal + ".");
        process.exit();
      });