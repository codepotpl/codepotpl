var REQUIRED_ENV_VARIABLES = [
    'CDPT_HOST'
];

var MISSING_ENV_VARIABLES = [];
for (var i = 0; i < REQUIRED_ENV_VARIABLES.length; i++) {
    var variable = REQUIRED_ENV_VARIABLES[i];
    if (!process.env[variable]) {
        MISSING_ENV_VARIABLES.push(variable);
    }
}
if (MISSING_ENV_VARIABLES.length > 0) {
    var message = 'Missing environment variables: ' + MISSING_ENV_VARIABLES.join(', ');
    throw new Error(message);
}

var express = require('express');
var compression = require('compression');
var YAML = require('yamljs');
var markdown = require('markdown');
var app = express();

app.use(compression());
app.set('view engine', 'jade');
app.set('views', __dirname + '/src/templates');
app.use('/public', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public'));

var data = {
    organizers: YAML.load('src/data/organizers.yml'),
    tutors: YAML.load('src/data/tutors.yml').filter(function (tutor) {
        return tutor.publish;
    }),
    workshops: YAML.load('src/data/workshops.yml').filter(function (workshop) {
        return workshop.publish;
    }),
    sponsors: YAML.load('src/data/sponsors.yml'),
    partners: YAML.load('src/data/partners.yml'),
    media: YAML.load('src/data/media.yml'),
    workshops: YAML.load('src/data/workshops.yml').filter(function (workshop) {
        return workshop.publish;
    }),
    information: YAML.load('src/data/information.yml')
};

if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

data.workshops.forEach(function (workshop) {
    workshop.tutors = workshop.tutors.map(function (workshopTutor) {
        var firstName = workshopTutor.split(' ')[0];
        var lastName = workshopTutor.split(' ')[1];
        var tutor = data.tutors.find(function (tutorFromDb) {
            return tutorFromDb.firstName === firstName && tutorFromDb.lastName === lastName;
        });
        return tutor ? tutor : {firstName: firstName, lastName: lastName};
    });
});

var metaTagsData = {
    siteName: "Codepot",
    title: "Codepot - 100% workshop conference!",
    description: "100% workshop technology conference taking place at the end of summer, August 28-29th, 2015. There will be multiple hands-on sessions on software development, devops tools, product design, IoT and hardware renaissance, agile practices and many, many more. Instead of just talking about great new tools - Codepot will show you how to actually use them.",
    url: "http://codepot.pl/",
    locale: "pl_PL",
    type: "website",
    author: "http://codepot.pl/",
    publisher: "http://codepot.pl/",
    twitterSite: "@codepot_pl",
    host: process.env['CDPT_HOST']
};

app.get('/', function (req, res) {
    res.render('index', {
        host: process.env['CDPT_HOST'],
        organizers: data.organizers,
        tutors: data.tutors,
        workshops: data.workshops,
        sponsors: data.sponsors,
        partners: data.partners,
        media: data.media,
        workshops: data.workshops,
        metaTags: metaTagsData,
        markdown:markdown.markdown.toHTML
    });
});

app.get('/information', function (req, res) {
    res.render('information', {
        metaTags: metaTagsData,
        information: data.information
    });
});

//app.get('/call-for-papers', function (req, res) {
//    res.render('call-for-papers', {
//        metaTags: metaTagsData
//    });
//});

//app.get('/call-for-papers-thanks', function (req, res) {
//    res.render('call-for-papers-thanks', {
//        metaTags: metaTagsData
//    });
//});

app.get('/workshops-wip', function (req, res) {
    res.render('workshops-wip', {
        host: process.env['CDPT_HOST'],
        organizers: data.organizers,
        tutors: data.tutors,
        sponsors: data.sponsors,
        partners: data.partners,
        workshops: data.workshops,
        metaTags: metaTagsData,
        markdown:markdown.markdown.toHTML
    });
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Codepot.pl website listening at http://%s:%s', host, port);
});

