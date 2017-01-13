var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.status(200).send('Hello World!');
});

app.listen(port, function() {
    console.log('Listening on port ' + port);
});

app.post('/hello', function(req, res, next) {
    var userName = req.body.user_name;
    var botPayLoad = {
        text: userName + ', welcome bitch !!!'
    };

    if (userName !== 'slackbot') {
        return res.status(200).json(botPayLoad);
    } else {
        return res.status(200).end();
    }
});
