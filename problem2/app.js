const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve the EJS file when the root route is requested
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/data/:year', (req, res) => {
  const year = req.params.year;
  const results = [];

  fs.createReadStream('sampledata.csv')
    .pipe(csvParser())
    .on('data', (row) => {
      if (row.Year === year) {
        results.push(row);
      }
    })
    .on('end', () => {
      res.json(results);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
