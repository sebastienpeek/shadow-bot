// Setting up litlte HTML sesh, just to show it is alive...
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// Slack Bot about to start.
var Slack, autoMark, autoReconnect, slack, token, Responder, listening;
Responder = require('./responder.js');
Slack = require('slack-client');
token = 'xoxb-8337261811-Gw2JlzA6VXhj4UNPLLwjdS6e';
autoReconnect = true;
autoMark = true;
slack = new Slack(token, autoReconnect, autoMark);
listening = true;

slack.on('open', function() {
  console.log("Welcome to Slack. You are @" + slack.self.name + " of " + slack.team.name);
});

slack.on('message', function(message) {

	var channel, channelError, channelName, errors, responder, text, textError, ts, type, typeError, user, userName;

  	channel = slack.getChannelGroupOrDMByID(message.channel);
  	user = slack.getUserByID(message.user);
  	type = message.type;
  	text = message.text.toString().toLowerCase();
  	ts = message.ts;
  	channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';
  	channelName = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');
  	userName = (user != null ? user.name : void 0) != null ? "@" + user.name : "UNKNOWN_USER";

  	console.log("slackMessage() " + type + " " + channelName + " " + userName + " " + ts + " \"" + text + "\"");

  	if (listening) {

  		responder = new Responder();
  		responder.respondToMessage(message, user, slack.self.name, function(res) {

        var response = res;

        if (response != null) {
          channel.send(response);
          // We want to turn the bot "off" when being banished to the shadows.
          if (~response.indexOf("shadows")) {
            listening = false;
          }
          return console.log("@" + slack.self.name + " responded with \"" + response + "\"");
        }

      });

  	} else {
  		
  		responder = new Responder();
  		responder.respondToMessage(message, user, slack.self.name, function(res) {

        var response = res;
    		
    		if (response != null) {
    			// We only want to respond if listening has been turned back on.
    			if (~response.indexOf("darkness")) {
    				listening = true;
    				channel.send(response);
    				
    				return console.log("@" + slack.self.name + " responded with \"" + response + "\"");
    			}
    		}
      });
  	}

});

slack.on('error', function(error) {
  return console.error("Error: " + error);
});

slack.login();