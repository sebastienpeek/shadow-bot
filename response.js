var Response;

var SebResponder = require('./users/seb_responses.js');
var NasrResponder = require('./users/nasr_responses.js');

Response = (function() {

	Response.prototype.respondToMessage = function(message, userName) {

		console.log("respondToMessage() - " + message);

		var text, response;
		text = message.text.toLowerCase();

		if (userName == "@sebastien.peek") {
			sebResponder = new SebResponder();
			response = sebResponder.respondToText(text);
  		}

  		if (~text.indexOf("ahaha")) {
  			response = "what the fuck is so funny?";
  		}
  		if (~text.indexOf("coffee")) {
  			response = "do you do any work, or do you just drink coffee?";
  		}
  		if (~text.indexOf("ded")) {
  			response = "shutup, you're not dead.";
  		}
  		if (~text.indexOf("gay")) {
  			response = "are you trying to tell us something?";
  		}
  		if (~text.indexOf("fuck")) {
  			response = "that language is offensive, try and find another word to use instead of fuck.";
  		}

  		if (response != null) {
  			var formattedResponse = "<@" + message.user + ">: " + response;
  			return formattedResponse;
  		};

	};

});

module.exports = Response;