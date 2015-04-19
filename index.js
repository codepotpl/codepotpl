var express = require('express');
var compression = require('compression');
var YAML = require('yamljs');
var markdown = require('markdown');
var app = express();

app.use(compression());
app.set('view engine', 'jade');
app.set('views', __dirname + '/src/templates');
app.use('/public', express.static(__dirname + '/public'));

var data = {
    organizers : YAML.load('src/data/organizers.yml'),
    tutors : YAML.load('src/data/tutors.yml')
};

console.log(data);

app.get('/', function (req, res) {
    res.render('index');
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Codepot.pl website listening at http://%s:%s', host, port);
});

