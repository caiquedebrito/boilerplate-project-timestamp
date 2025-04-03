const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', function (req, res) {
  const dateString = req.params.date || req.query.date || Date.now();
  let date;

  if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
