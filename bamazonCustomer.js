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
    message:  'What is the ID of the product you would like to buy?',
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
    for( var i = 0; i<itemsData.length; i++){
      if(itemsData[i].item_id == answer.item){
        // console.log(itemsData[i]);
        itemRow = itemsData[i];
        }
    }
    if(answer.quantity > itemRow.stock_quantity){
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
      console.log("Your total is $ " + itemsTotal + "." );
      process.exit();
    });

   




    
    // compare quantity
    // if it's less than 0, print a message
    // if it's > than 0, multiply price and quantity and print out total


      // connection.query('INSERT INTO auctions SET ?', {
      //   itemname: answer.item,
      //   quantity: answer.quantity,
        
    //   }, function (err, res) {
    //     console.log('Your auction was created successfully!');
    //     startAuction();
    //   })
    })


  // , {
  //   name: 'startingBid',
  //   type: 'input',
  //   message: 'What would you like the starting bid to be?',
  //   validate: function (value) {
  //     console.log(value, "String");
  //     if (isNaN(value) == false) {
        
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // }]).then(function (answer) {
  //   connection.query('INSERT INTO auctions SET ?', {
  //     itemname: answer.item,
  //     category: answer.category,
  //     startingbid: answer.startingBid,
  //     highestbid: answer.startingBid
  //   }, function (err, res) {
  //     console.log('Your auction was created successfully!');
  //     startAuction();
  //   })
  // })
}





//   inquirer.prompt([{
//     name: 'id',
//     type: 'input',    
//     message: 'What is the ID of the product you would like to buy?',
//     validate: function (value) {
//       if (isNaN(value) === false) 
//         return true;
//       }
//       return false;
//     }
  
  
//     choices: function(){
//         var chosenArray = [];
//       for (var i = 0; i < itemData.length; i++) {
//         chosenArray.push(itemData[i].item_name);
//       }
//       console.log(chosenArray);
//       return chosenArray;
//       }, 
//     name: 'quantity',
//     type: 'input',
//     message: 'Enter the quantity you would like to purchase',
//     validate: function (value) {
//       if (isNaN(value) === false) {
//         return true;
//       }
//       return false;
//     }
//    }]).then(function (answer) {
//     // get info of the chosen item
//     var chosenItem;
//     for (var i = 0; i < itemData.length; i++) {
//       if (itemData[i].item_id === answer.id) { 
//         chosenItem = itemData[i];
//       }
//     }
//     // connection.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?', {
//     //   item_id: answer.id
//     // }, function (err, results) {
//     //   console.log('You would like to buy ' + answer.quantity + ' ' + chosenItem.product_name + ' ' + chosenItem.department_name + '$' + chosenItem.price + ' each');
//     // });

//     // // determine if there is enough quantity
//     // if (chosenItem.stock_quantity >= answer.quantity) {
//     //   //if there is enough items, update db, let the user know, and start over
//     //   connection.query(
//     //     "UPDATE products SET ? WHERE ?", [{
//     //         stock_quantity: stock_quantity - answer.stock_quantity
//     //       },
//     //       {
//     //         item_id: answer.id
//     //       }
//     //     ],
//     //     function (error) {
//     //       if (error) throw err;
//   // });
//   // var cost = res[0].Price * answer.quantity;
  
//     //       console.log("Order placed successfully!  Your cost is $" + price.toFixed(2) + '\n');
//     //       // start();
//     //     });
//     // } else {
//     //   //not enough items, so apologize and start over
//     //   console.log("Sorry, insufficient quantity!");
//     //   // start();
//     // 
// // }
  
