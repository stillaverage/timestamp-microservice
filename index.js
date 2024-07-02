// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const e = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// GET /api/:date? and serve parsed dateString
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date
  if (dateString === undefined) {
    res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    })
  } else if (/^[-+]?\d+$/.test(dateString)) {
    res.json({
      unix: parseInt(dateString),
      utc: new Date(parseInt(dateString)).toUTCString()
    })
  } else if (new Date(dateString).toString() !== "Invalid Date") {
    if (dateString.includes('-') && !dateString.endsWith('Z')) {
      dateString += "Z"
    }
    res.json({
      unix: new Date(dateString).getTime(),
      utc: new Date(dateString).toUTCString()
    })
  } else {
    res.json({
      error: "Invalid Date"
    })
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
