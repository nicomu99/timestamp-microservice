// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
	res.json({ greeting: 'hello API' });
});

// API endpoint serving date queries
app.get("/api/:date", function (req, res, next) {

	//produce a date out of the string
	req.date = new Date(req.params.date);

	//parse the date into unix format
	req.unix = Date.parse(req.date)/1000;

	

	next();

}, function(req, res) {

	//checks if the produced date is a valid date
	if(isNaN(req.date.getTime())) {
		//value is not a valid date
		res.json({
			error: "Invalid Date."
		})
	} else {
		res.json({
			unix: req.unix,
			utc: req.date
		});
	}
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
