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
    organizers: YAML.load('src/data/organizers.yml'),
    tutors: YAML.load('src/data/tutors.yml').filter(function(tutor){
        return tutor.publish;
    }),
    sponsors: YAML.load('src/data/sponsors.yml')
};

var metaTagsData = {
    siteName: "Codepot",
    title: "Codepot - 100% workshop conference!",
    description: "100% workshop technology conference taking place at the end of summer, August 28-29th, 2015. There will be multiple hands-on sessions on software development, devops tools, product design, IoT and hardware renaissance, agile practices and many, many more. Instead of just talking about great new tools - Codepot will show you how to actually use them.",
    url: "http://codepot.pl/",
    locale: "pl_PL",
    image: "http://codepot.pl/public/img/social-icon.jpg",
    type: "website",
    author: "http://codepot.pl/",
    publisher: "http://codepot.pl/",
    twitterSite: "@codepot_pl"
};

app.get('/', function (req, res) {
    res.render('index', {
        organizers: data.organizers,
        tutors: data.tutors,
        sponsors: data.sponsors,
        metaTags: metaTagsData
    });
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Codepot.pl website listening at http://%s:%s', host, port);
});

