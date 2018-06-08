var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('tty-table')('automattic-cli-table');

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
        choices: ['View Product Sales by Department', 'Create New Department'],
        name: 'choice'

    }
]).then(function (res) {
    switch (res.choice) {
        case 'View Product Sales by Department':
            viewProductSalesByDepartment();
            break;
        case 'Create New Department':
            createNewDepartment();
            break;
    }
});
