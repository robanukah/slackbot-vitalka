var Bot = require('slackbots');

var settings = {
    token: 'xoxb-127337814596-J6LGegaejRqVxCg6TOqD2huI',
    name: 'vitalka'
};

var bot = new Bot(settings);

bot.on('start', function() {
    bot.postMessageToChannel('general', 'Hello channel!');
    bot.postMessageToUser('solairerove', 'hello bro!');
});
