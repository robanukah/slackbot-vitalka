'user strict';

var Botkit = require('botkit');
var VKApi = require('node-vkapi');

const LEPRO_ID = -65960786;
const LEPRO_WALL = 'lepro';
const VK_API_VERSION = 5.62;

const NUMBER_OF_PHOTOS = 10;
const LENGTH_OF_TEXT = 64;

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

controller.hears([LEPRO_WALL], ['direct_message'], function(bot, message) {
    vk.call('wall.get', {
        owner_id: LEPRO_ID,
        fields: ['marked_as_ads'],
        version: VK_API_VERSION
    }).then(res => {
        sendMessage(bot, message, res);
    }).catch(error => {
        console.log(error);
    });
});

function sendMessage(bot, message, res) {
    for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
        if (isNormalPost(i, res)) {
            bot.reply(message, sendPhotoAndText(i, res));
            console.log(res.items[i]);
        }
    }
}

function sendPhotoAndText(index, res) {
    return getPhotoText(index, res) + '\n' + getPhoto(index, res);
}

function getPhotoText(index, res) {
    return res.items[index].text;
}

function getPhoto(index, res) {
    return res.items[index].attachments[0].photo.photo_604;
}

function isNormalPost(index, res) {
    return isPhoto(index, res) && !isAdds(index, res);
}

function isPhoto(index, res) {
    return 'photo' === res.items[index].attachments[0].type;
}

function isAdds(index, res) {
    return getPhotoText(index, res).length > LENGTH_OF_TEXT;
}
