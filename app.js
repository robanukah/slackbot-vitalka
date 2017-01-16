'user strict';

var Botkit = require('botkit');
var VKApi = require('node-vkapi');

var LEPRO_ID = -65960786;
var LEPRO_WALL = 'lepro';
var VK_API_VERSION = 5.62;

var vk = new VKApi();

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

controller.hears([LEPRO_WALL], ['direct_mention'], function(bot, message) {
    vk.call('wall.get', {
        owner_id: LEPRO_ID,
        version: VK_API_VERSION
    }).then(res => {
        bot.reply(message, res.items[0].attachments[0].photo.photo_604);
        console.log(res);
    }).catch(error => {
        console.log(error);
        bot.reply(message, res.items[2].attachments[0].photo.photo_604);
    });
});
