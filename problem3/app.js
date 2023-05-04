const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/linegraph', (req, res) => {
  res.render('linegraph');
});

app.get('/data', (req, res) => {
  const results = [];

  fs.createReadStream('sampledata.csv')
    .pipe(csvParser())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      res.json(results);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
