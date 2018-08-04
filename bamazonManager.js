var mysql= require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: 'root',

    password: '---------',
    database: 'bamazon'
});
connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id "+ connection.threadId);

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
    
        inquirer
            .prompt([
            {
                type: "list",
                message: "List of Menu Options",
                choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"],
                name: "menu"
            },
            ])
            .then(function(Response){
                switch (Response.menu) {
                    case "View Products for Sale":
                        for(var i = 0; i <res.length; i++){
                            var managerInfo = "-----------------------------\n" +
                                            "Id: " + res[i].id + "\n" +
                                            "Name: " + res[i].product_name + "\n" +
                                            "Price: $" + res[i].price + "\n" + 
                                            "Quantity: " + res[i].stock_quantity + "\n"
                            
                            console.log(managerInfo);
                        }
                    break;
                    case "View Low Inventory":
                        for(var i = 0; i <res.length; i++){
                            if(res[i].stock_quantity < 5) {
                                console.log("-----------------------------\n" +
                                            "Id: " + res[i].id + "\n" +
                                            "Name: " + res[i].product_name + "\n" +
                                            "Price: $" + res[i].price + "\n" + 
                                            "Quantity: " + res[i].stock_quantity + "\n")
                            }
                        }
                    break;
                    case "Add to Inventory":
                        inquirer
                            .prompt([
                                {
                                    type: "input",
                                    message: "Which item would you like to stock, by ID?",
                                    name: "Unit"
                                },
                                {
                                    type: "input",
                                    message: "How many units of the product would you like to add to stock?",
                                    name: "Amount"
                                },
                            ])
                            .then(function(Add) {
                                var ID = parseInt(Add.Unit) - 1;
                                var Stock = res[ID].stock_quantity;
                                var AdditionalStock = Stock + parseInt(Add.Amount);
                                var query = connection.query(
                                    "UPDATE products SET stock_quantity = " + AdditionalStock + " WHERE id = " + parseInt(Add.Unit) + "",)
                            });

                    break;
                    case "Add New Product":
                        console.log("Alright, let me ask you a few things")
                        inquirer
                            .prompt([
                                {
                                    type: "input",
                                    message: "What is the product name",
                                    name: "Name"
                                },
                                {
                                    type: "input",
                                    message: "What is the deparment name",
                                    name: "Department"
                                },
                                {
                                    type: "input",
                                    message: "How much does this item cost per unit?",
                                    name: "Price"
                                },
                                {
                                    type: "input",
                                    message: "How many of these new items are you adding?",
                                    name: "Stock"
                                },
                            ])
                            .then(function(New) {
                                var query = connection.query(
                                    "INSERT INTO products SET ?",
                                    {
                                      product_name: New.Name,
                                      department_name: New.Department,
                                      price: parseInt(New.Price),
                                      stock_quantity: parseInt(New.Stock)
                                    },
                                    function(err, res) {
                                      console.log(res.affectedRows + " product inserted!\n");
                                    }
                                );
                            });

                    break;
                }
            }); 
    
    });

});

function updateProduct() {
    console.log("Updating all Rocky Road quantities...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          quantity: 100
        },
        {
          flavor: "Rocky Road"
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        deleteProduct();
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
}
  
  