var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.token || ''
}).startRTM(function(err) {
    if (err) {
        throw new Error(err);
    }
});

controller.hears(['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'],
    function(bot, message) {
        bot.reply(message, 'Hello yourself.');
    }
);

controller.on('direct_mention', function(bot, message) {
    bot.reply(message, 'I heard you mention me!');
});
