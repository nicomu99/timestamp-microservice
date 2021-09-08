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

	let requestedTimestamp = req.params.date;

	if(requestedTimestamp.match(/^\d+$/) || requestedTimestamp[0].match(/\-/)) {
		//since the timestamp only contains numbers we can assume it is in unix format
		res.json({
			unix: parseInt(requestedTimestamp),
			utc: new Date(parseInt(requestedTimestamp)).toUTCString()
		})
  } else {
		let date = new Date(requestedTimestamp);

		if(isNaN(date.getTime())) {
			res.json({
				error: "Invalid Date"
			})
		} else {
			res.json({
				unix: date.valueOf(),
				utc: date.toUTCString()
			})
		}
	}
});

// API endpoint serving date queries
app.get("/api/", function (req, res, next) {

	let date = new Date(Date.now());

	res.json({
		unix: date.valueOf(),
		utc: date
	})

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
