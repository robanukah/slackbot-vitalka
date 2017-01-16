'user strict';

var Botkit = require('botkit');
var VKApi = require('node-vkapi');

var controller = Botkit.slackbot({
    debug: false
});

var vk = new VKApi({
    app: {
        id: '<app_id>',
        secret: 'app_secret'
    },
    auth: {
        login: 'login',
        pass: 'pass'
    }
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

controller.hears(['durov'], ['direct_message'], function(bot, message) {
    vk.call('users.get', {
        user_ids: ['1', '2']
    }).then(res => {
        bot.say({
            text: 'id: ' + res[0].id + '\n' +
                'first_name: ' + res[0].first_name + '\n' +
                'last_name: ' + res[0].last_name + '\n',
            channel: '#random'
        });
        console.log(res);
    })
});

controller.hears(['pic'], ['direct_message'], function(bot, message) {
    vk.auth.user({
        scope: ['wall']
    }).then(token => {
        return vk.call('groups.get', {
            user_id: token.user_id
        }).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
    });
});
