DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
 id INTEGER(20) AUTO_INCREMENT NOT NULL,
 product_name VARCHAR(30),
 department_name VARCHAR(30),
 price DECIMAL(10,2),
 stock_quantity INTEGER(10),
 PRIMARY KEY (id)
 );
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Personal Computer", "Electronics", 1029.99, 40 );
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 589.99, 70 );
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1080 HD TV", "Electronics", 700.69, 60 );
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tub of Peanuts", "Produce", 22.99, 200 );
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tub of Wheat", "Produce", 40.67, 500 );
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung Galaxy S10", "Electronics", 800.99, 40 );
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pack of Baloons", "Party", 20.56, 800 );
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pack of Cards", "Party", 2.47, 1000 );
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Derp Machine", "Randoms", 563000.00, 2 );
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Non Boredafier", "Randoms", 1000000.00, 1 );
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monster Hunter World", "Games", 59.99, 70 );

SELECT *
FROM products;