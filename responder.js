var Responder;

var BotResponder = require('./responders/bot_responses.js');
var CommandResponder = require('./responders/command_responses.js');

Responder = (function() {

	Responder.prototype.respondToMessage = function(message, userObject, slackName, res) {
		console.log("respondToMessage() - " + message);
		var text;
		text = message.text.toLowerCase();

		this.name = "shadow"
		this.phraseOne = this.name + " please";
		this.phraseTwo = this.name;
		this.phrases = [this.phraseOne, this.phraseTwo];

		if (message.type === 'message' && 
			(text != null) && 
			(message.channel != null) && 
			(slackName != userObject.name)) {

			// Need to determine whether command or chat?
			var isCommand = false;
			for (var i = this.phrases.length - 1; i >= 0; i--) {
				var phrase = this.phrases[i];
				if(~text.indexOf(phrase)) {
					isCommand = true;
				}
			}

			if (isCommand) {
				var commandResponder = new CommandResponder();
				commandResponder.respondToCommand(text, userObject, function(response){
					if (response != null) {
						var formattedResponse = "<@" + message.user + "> " + response;
						res(formattedResponse);	
					};
				});
			} else {
				if (userObject.is_bot) {
	  				botResponder = new BotResponder();
	  				response = botResponder.respondToText(text, function(response){
	  					if (response != null) {
  							var formattedResponse = "<@" + message.user + "> " + response;
							res(formattedResponse);
						};
	  				});
	  			}
			}

		} else {
			return null;
		}

	};

});

module.exports = Responder;