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
Responder = require('./response.js');
Slack = require('slack-client');
token = 'xoxb-8337261811-Gw2JlzA6VXhj4UNPLLwjdS6e';
autoReconnect = true;
autoMark = true;
slack = new Slack(token, autoReconnect, autoMark);
listening = true;

slack.on('open', function() {
  var channel, channels, group, groups, id, messages, unreads;
  channels = [];
  groups = [];
  unreads = slack.getUnreadCount();
  channels = (function() {
    var _ref, _results;
    _ref = slack.channels;
    _results = [];
    for (id in _ref) {
      channel = _ref[id];
      if (channel.is_member) {
        _results.push("#" + channel.name);
      }
    }
    return _results;
  })();
  groups = (function() {
    var _ref, _results;
    _ref = slack.groups;
    _results = [];
    for (id in _ref) {
      group = _ref[id];
      if (group.is_open && !group.is_archived) {
        _results.push(group.name);
      }
    }
    return _results;
  })();
  console.log("Welcome to Slack. You are @" + slack.self.name + " of " + slack.team.name);
  console.log('You are in: ' + channels.join(', '));
  console.log('As well as: ' + groups.join(', '));
  messages = unreads === 1 ? 'message' : 'messages';
  return console.log("You have " + unreads + " unread " + messages);
});

slack.on('message', function(message) {

	var channel, channelError, channelName, errors, responder, text, textError, ts, type, typeError, user, userName;

	console.log('slackMessage() - ' + message);

	channel = slack.getChannelGroupOrDMByID(message.channel);
	user = slack.getUserByID(message.user);
	type = message.type;
	text = message.text.toString().toLowerCase();
	ts = message.ts;
  	channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';
  	channelName = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');
  	userName = (user != null ? user.name : void 0) != null ? "@" + user.name : "UNKNOWN_USER";

  	console.log("Received: " + type + " " + channelName + " " + userName + " " + ts + " \"" + text + "\"");

	if (listening) {
  		
	  	if (type === 'message' && (text != null) && (channel != null) && (slack.self.name != userName)) {

	  		responder = new Responder();
	  		var response = responder.respondToMessage(message, userName);

	  		if (response != null) {
	  			channel.send(response);
	  			if (~response.indexOf("back to the shadows")) {
	  				listening = false;
	  			};
	  			return console.log("@" + slack.self.name + " responded with \"" + response + "\"");
	  		} 

		} else {
	    	typeError = type !== 'message' ? "unexpected type " + type + "." : null;
	    	textError = text == null ? 'text was undefined.' : null;
	    	channelError = channel == null ? 'channel was undefined.' : null;
	    	errors = [typeError, textError, channelError].filter(function(element) {
	      		return element !== null;
	    }).join(' ');
			return console.log("@" + slack.self.name + " could not respond. " + errors);
	  	}

	} else {
		if (type === 'message' && (text != null) && (channel != null) && (slack.self.name != userName)) {
			responder = new Responder();
			var response = responder.respondToMessage(message, userName);

			if (response != null) {
	  			if (~response.indexOf("back from the shadows")) {
	  				channel.send(response);
	  				listening = true;
	  			};
	  			return console.log("@" + slack.self.name + " responded with \"" + response + "\"");
	  		}
		} else {
	    	typeError = type !== 'message' ? "unexpected type " + type + "." : null;
	    	textError = text == null ? 'text was undefined.' : null;
	    	channelError = channel == null ? 'channel was undefined.' : null;
	    	errors = [typeError, textError, channelError].filter(function(element) {
	      		return element !== null;
	    }).join(' ');
			return console.log("@" + slack.self.name + " could not respond. " + errors);
	  	}
	}

});

slack.on('error', function(error) {
  return console.error("Error: " + error);
});

slack.login();