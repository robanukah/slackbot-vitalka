var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var WebClient = require('@slack/client').WebClient;

var bot_token = 'xoxb-127337814596-J6LGegaejRqVxCg6TOqD2huI';

var rtm = new RtmClient(bot_token);
var web = new WebClient(bot_token);

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of ` +
        `team ${rtmStartData.team.name}, but not yet connected to a channel`)
});

rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    console.log('Message: ', message);
    rtm.sendMessage('Hello', 'D3QH47GFK');
    console.log('activeUserId: ' + rtm.activeUserId);
});

web.channels.list(function(err, info) {
    if (err) {
        console.log('Error:', err);
    } else {
        for (var i in info.channels) {
            console.log(info.channels[i].name + '->' + info.channels[i].id);
        }
    }
});
