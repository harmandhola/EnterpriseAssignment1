var SERVER_NAME = 'product-api'
var PORT = 3009;
var HOST = '127.0.0.1';

var restify = require('restify');

var save = require('save')

var productsSave = save('products')



var server = restify.createServer();

// configure request body parser
server.use(restify.plugins.bodyParser({ mapParams: false }));

// starting server
server.listen(3009, function() {
  console.log('%s listening at %s', server.name, server.url);

});

// GET request
server.get('/products', getAllProducts);

// POST request
server.post('/products', addNewProduct);

server.del('/products', deleteAllProducts);


// callback function mapped to GET request
function getAllProducts(req, res, next) {
    productsSave.find({},null, function(err, foundProducts){
        
        // send 200 HTTP response code and array of found products
        res.send(200, foundProducts);
        next();
    })
}
// callback function mapped to POST request
function addNewProduct(req, res, next) {

    // json payload of the request
    var newProduct = req.body;

    productsSave.create(newProduct, function(err, product){
        console.log("Creating new products")
        // send 201 HTTP response code and created product object
        res.send(201, product);
        next();
    })
}

// callback function mapped to DELETE request
function deleteAllProducts(req, res, next) {
        console.log("Deleting all products");
        productsSave.deleteMany({}, function(err, Products){
            console.log("error"+ err);
            // send 200 HTTP response code 
            res.send(200, Products);
            next();
        })
    }
    