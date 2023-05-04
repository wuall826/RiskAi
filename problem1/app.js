const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parser');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const assets = [];
    fs.createReadStream('./data/sampledata.csv')
        .pipe(csvParser())
        .on('data', (data) => assets.push(data))
        .on('end', () => {
            res.render('index', { assets: JSON.stringify(assets) });
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
