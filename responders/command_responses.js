var CommandResponder;
var restify = require('restify');

CommandResponder = (function() {

	var weatherClient = restify.createJsonClient({
		url: 'http://api.openweathermap.org'
	});

	CommandResponder.prototype.respondToCommand = function(text, user, response) {
		console.log("respondToCommand() - " + text);

		if (~text.indexOf("lurk") || ~text.indexOf("disappear") || 
			~text.indexOf("hide") || ~text.indexOf("fuck off") || 
			~text.indexOf("kill yourself") || ~text.indexOf("piss off")) {
			response("Okay, I'll go back to the shadows...");
		} else if (~text.indexOf("show yourself") || ~text.indexOf("return") || 
			~text.indexOf("activate") || ~text.indexOf("come back")) {
			response("I am back from the darkness in which you sent me.");
		} else if (~text.indexOf("breathing") || ~text.indexOf("heartbeat"))  {
			response("I'm still around, no one is asking me anything lately so I'm just kicking it.");
		} else if (~text.indexOf("is") || ~text.indexOf("know") || ~text.indexOf("what's")) {
			if (~text.indexOf("weather")) {
				this.fulfillCommand("getWeather", text, function(data) {
					response(data);
				});
			} else if (~text.indexOf("time")) {
				this.fulfillCommand("getTime", text, function(data) {
					response(data);
				})
			} else {
				this.fulfillCommand("unknown", text, function(data){
					response(data);
				});
			}
		} else {
			response("I'll learn how to respond to that soon.");
		}

	};

	CommandResponder.prototype.fulfillCommand = function(command, text, data) {
		console.log("fulfillCommand() - " + command);
		if (command == "getWeather") {

			var path;
			var cityName;
			
			// Maybe I build up a JSON file with a list of cities and the changed path so this becomes unneccessary?
			if (~text.indexOf("melbourne")) {
				path = '/data/2.5/find?q=Melbourne,AU&units=metric'
				cityName = "Melbourne"
			} else if (~text.indexOf("adelaide")) {
				path = '/data/2.5/find?q=Adelaide,AU&units=metric'
				cityName = "Adelaide"
			} else if (~text.indexOf("sydney")) {
				path = '/data/2.5/find?q=Sydney,AU&units=metric'
				cityName = "Sydney"
			} else if (~text.indexOf("brisbane")) {
				path = '/data/2.5/find?q=Brisbane,AU&units=metric'
				cityName = "Brisbane"
			} else if (~text.indexOf("perth")) {
				path = '/data/2.5/find?q=Perth,AU&units=metric'
				cityName = "Perth"
			} else if (~text.indexOf("new york")) {
				path = '/data/2.5/find?q=NewYork,US&units=metric'
				cityName = "New York"
			} else if (~text.indexOf("san francisco")) {
				path = '/data/2.5/find?q=SanFrancisco,US&units=metric'
				cityName = "San Francisco"
			} else {
				path = '/data/2.5/find?q=Melbourne,AU&units=metric'
				cityName = "Current Location"
			}

			weatherClient.get(path, function(err, req, res, obj) {
  				var list = obj.list;
  				var today = list[0];
  				var currentTemp = today.main.temp;
  				data("The current temperature is " + currentTemp + "°C in " + cityName);
			});

		} else if (command == "getTime") {

			// Same as above, can simply add in JSON file with list of cities supported and their GMT etc
			data("I'm working on getting the time, stop rushing me.");

		} else {
			data("Unknown command, uwotm9?");
		}
	};

});

module.exports = CommandResponder;