var BotResponder;

BotResponder = (function() {

	BotResponder.prototype.respondToText = function(text, response) {
		console.log("respondToBotText() - " + text);
		response(null);		
	};

});

module.exports = BotResponder;