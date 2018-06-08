var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "password",
    database: "amazon"
});

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add New Product'],
        name: 'choice'

    }
]).then(function (res) {
    switch (res.choice) {
        case 'View Products for Sale':
            viewProductForSale();
            break;
        case 'View Low Inventory':
            viewLowInventory();
            break;
        case 'Add New Product':
            addNewProduct();
    }
});