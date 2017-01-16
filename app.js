'user strict';

var Botkit = require('botkit');
var VKApi = require('node-vkapi');

var LEPRO_ID = -65960786;

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

controller.hears(['lepro'], ['direct_mention'], function(bot, message) {
    vk.auth.user().then(token => {
        return vk.call('wall.get', {
            owner_id: LEPRO_ID,
            version: 5.62
        }).then(res => {
            bot.reply(message, res.items[0].attachments[0].photo.photo_604);
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
    });
});
