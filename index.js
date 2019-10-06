var SERVER_NAME = 'product-api'
var PORT = 3009;
var HOST = '127.0.0.1';

var restify = require('restify');

var save = require('save')

var productsSave = save('products')

var requestCounterGet = 0;
var requestCounterPost = 0;

var server = restify.createServer();

// configure request body parser
server.use(restify.plugins.bodyParser({ mapParams: false }));

// starting server
server.listen(3009, function() {
  console.log('%s listening at %s', server.name, server.url);
console.log('Endpoints:',server.get,server.post);
});


// GET request
server.get('/products', getAllProducts);

// POST request
server.post('/products', addNewProduct);

server.del('/products', deleteAllProducts);


// callback function mapped to GET request
function getAllProducts(req, res, next) {
      requestCounterGet++;
    console.log("   Request counter: " +  requestCounterGet);
    console.log("sending request")
    productsSave.find({},null, function(err, foundProducts){
        var requestCounterString = "======> Request Count: " + requestCounterGet + "\n======================================";
        // send 200 HTTP response code and array of found products
        res.send(200, foundProducts);
        console.log("received request");
        next();
    })
}
// callback function mapped to POST request
function addNewProduct(req, res, next) {
        requestCounterPost++;
        console.log("   Request counter: " +  requestCounterPost);
    console.log("sending request")
    // json payload of the request
    var newProduct = req.body;

    productsSave.create(newProduct, function(err, product){
        var requestCounterString = "======> Request Count: " + requestCounterPost + "\n======================================";
        console.log("Created new products")
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
    console.log("Deleted products")
            // send 200 HTTP response code 
            res.send(200, Products);
            next();
        })
    }
    