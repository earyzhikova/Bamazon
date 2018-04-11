DROP DATABASE IF EXISTS bamazondb;

CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products(
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50),
department_name VARCHAR(50) NULL,
price decimal(8,2) NULL,
stock_quantity INTEGER NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1,'pants', "Men's Wear", 150, 3);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2,'suite', "Men's Wear", 650, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3,'tie', "Men's Wear", 65, 8);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4,'sport coat', "Men's Wear", 350, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5,'boots', "Men's Wear", 200, 3);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6,'dress', "Women's Wear", 200, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7,'pants', "Women's Wear", 100, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8,'blouse',"Women's Wear", 70, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9,'sweater', "Women's Wear", 70, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10,'jacket', "Women's Wear", 150, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (11,'jeans', "Women's Wear", 120, 6);
