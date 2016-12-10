var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({defaultLayout: 'main'});
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 6047);

app.get('/', function(req, res) {
    var params = [];
    for (var p in req.query) {
        params.push({'name':p, 'value':req.query[p]});
    }
    var context = {};
    context.urlList = params;
    context.typeRec = "GET";
    res.render('home', context);
});

app.post('/', function(req, res) {
    var params = [];
    var urlParams = [];
    var context = {};
   
    for (var p in req.query) {
        urlParams.push({'name':p, 'value':req.query[p]});
    }
    context.urlList = urlParams;
    for (var p in req.body) {
        params.push({'name':p, 'value':req.body[p]});
    }
    context.postList = params;
    context.typeRec = "POST";
    res.render('home', context);
});

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});