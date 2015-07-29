var Response;

var SebResponder = require('./users/seb_responses.js');

Response = (function() {

	Response.prototype.respondToMessage = function(message, userName) {
		console.log("respondToMessage() - " + message);
		var text, response;
		text = message.text.toLowerCase();

		if (userName == "@sebastien.peek") {
			sebResponder = new SebResponder();
			response = sebResponder.respondToText(text);
  		}

  		if (response != null) {
  			var formattedResponse = "<@" + message.user + ">: " + response;
  			return formattedResponse;
  		};

	};

});

module.exports = Response;