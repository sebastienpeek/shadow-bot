var SebResponder;

SebResponder = (function() {

	SebResponder.prototype.respondToText = function(text) {

		console.log("respondToText() - " + text);
		var response;
		if (text == "are you alive?") {
			response = "Why yes, yes I am!";
		} else if (text == "still breathing?") {
			response = "Sorry I've been a little quiet, I'm still here though!";
		} else {
			response = null;
		}

  		return response;

	};

});

module.exports = SebResponder;