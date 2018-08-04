var mysql= require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: 'root',

    password: '-------------',
    database: 'bamazon'
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id "+ connection.threadId);
    console.log("\nHere are all of our products!\n")

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(var i = 0; i <res.length; i++){
        var customerInfo = "-----------------------------\n" +
                           "Id: " + res[i].id + "\n" +
                           "Name: " + res[i].product_name + "\n" +
                           "Price: $" + res[i].price; + "\n"
        
        console.log(customerInfo);
        };
        inquirer
            .prompt([
             {
                type: "input",
                message: "Which product would you like to buy, by Id?",
                name: "ID"
            },
            {
                type: "input",
                message: "How many units of the product would you like to purchase",
                name: "Unit"
            },
            ])
            .then(function(Response){
                var ID = parseInt(Response.ID) - 1;
                var Stock = res[ID].stock_quantity;
                var RemainingStock = Stock - parseInt(Response.Unit);
                console.log(RemainingStock);
                if (parseInt(Response.Unit) > Stock) {
                    console.log("\n------------------------------------------------------\n" +
                                "Sorry we have an insufficient quantity of that item!")
                }
                else {
                    connection.query(
                        "UPDATE products SET stock_quantity = " + RemainingStock + " WHERE id = " + parseInt(Response.ID) +"" ,
                        
                        function(err, res) {
                            if(err) throw err;
                        }
                    )
                    var cost = parseInt(Response.Unit) * res[ID].price;
                    console.log("\n------------------------------------------------------\n" +
                                "Alright, let me process that order!\n"+
                                "So, that will be $" + cost + " for " + Response.Unit + " " + res[ID].product_name + "s !\n" + 
                                "How would you like to pay?" );
                }
            });

    });

    
});



    
