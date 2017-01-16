'user strict';

var Botkit = require('botkit');
var VKApi = require('node-vkapi');

var controller = Botkit.slackbot({
    debug: false
});

var vk = new VKApi();

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

controller.hears(['random'], ['direct_mention'], function(bot, message) {
    bot.say({
        text: 'Message to random channel',
        channel: '#random'
    });
});

controller.hears(['durov'], ['direct_message'], function(bot, message) {
    var response = new String();

    vk.call('users.get', {
        user_ids: ['1', '2']
    }).then(res => {
        bot.say({
            text: 'id: ' + res[0].id + '\n'
            'first_name: ' + res[0].first_name + '\n' +
            'last_name: ' + res[0].last_name + '\n' + ,
            channel: '#random'
        });
        console.log(res);
    })
});
