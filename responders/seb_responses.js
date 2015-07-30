var SebResponder;

SebResponder = (function() {

	SebResponder.prototype.respondToText = function(text, response) {
		console.log("respondToText() - " + text);
		response(null);
	};

});

module.exports = SebResponder;