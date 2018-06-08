var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "password",
    database: "amazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadID + '\n');
    displayProducts();
})
function displayProducts() {
    connection.query("SELECT id, product_name, price, quantity FROM bamazon.products WHERE quantity>0", function (err, res) {
        if (err) throw err;



        for (var i = 0; i < res.length; i++) {

            IDList.push(res[i].id.toString());
            var product = "\nProduct Name: " + res[i].product_name;
            var id = "\nID #" + res[i].id;
            var price = "\nPrice: $" + res[i].price;
            var quant = "\nQuantity: " + res[i].quantity + '\n';
            console.log(product, id, price, quant);
        }
        selectID();
    })
}

function selectID() {

    inquirer.prompt([
        {
            type: 'list',
            message: "Select the ID # of the product you'd like to purchase:",
            choices: IDList,
            name: 'choice'
        }, {
            type: 'input',
            message: "How many do you want?",
            name: 'quantity',
            validate: function validateQuantity(res){
                return !isNaN(parseInt(res));
            }
        }
    ]).then(function(res) {

        var id = res.choice;
        var quantity = parseInt(res.quantity);

        connection.query('SELECT product_name, price, quantity, product_sales FROM bamazon.products WHERE ?', {
            id: id
        }, function(err, res) {
            if (err) throw err;

            var name = res[0].product_name;
            var price = res[0].price * quantity;
            var sales = res[0].product_sales;

            if (res[0].quantity >= quantity) {

                connection.query('UPDATE products SET ? WHERE ?',[
                 {
                    quantity: res[0].quantity - quantity,
                    product_sales: sales + price
                }, {
                    id: id
                }], function(err) {

                    if (err) throw err.message;

                    console.log("You have purchased " + quantity + ' ' + name +'\nYour total cost is: $' + price);

                })
            } else {
                console.log('Insufficient quantity!')
            }
            connection.end();

        })
    })
}
