var Response;

var SebResponder = require('./users/seb_responses.js');

Response = (function() {

	Response.prototype.respondToMessage = function(message, userName, slackName) {
		console.log("respondToMessage() - " + message);
		var text, response;
		text = message.text.toLowerCase();

		if (message.type === 'message' && 
			(text != null) && 
			(message.channel != null) && 
			(slackName != userName)) {

	  		if (userName == "@sebastien.peek") {
				sebResponder = new SebResponder();
				response = sebResponder.respondToText(text);
  			}

  			if (response != null) {
  				var formattedResponse = "<@" + message.user + ">: " + response;
  				return formattedResponse;
  			}
  			
		} 

		// else {
	 //    	typeError = type !== 'message' ? "unexpected type " + type + "." : null;
	 //    	textError = text == null ? 'text was undefined.' : null;
	 //    	channelError = channel == null ? 'channel was undefined.' : null;
	 //    	errors = [typeError, textError, channelError].filter(function(element) {
	 //      		return element !== null;
	 //    }).join(' ');
		// 	return console.log("@" + slack.self.name + " could not respond. " + errors);
	 //  	}


		// if (userName == "@sebastien.peek") {
		// 	sebResponder = new SebResponder();
		// 	response = sebResponder.respondToText(text);
  // 		}

  // 		if (response != null) {
  // 			var formattedResponse = "<@" + message.user + ">: " + response;
  // 			return formattedResponse;
  // 		};

	};

});

module.exports = Response;