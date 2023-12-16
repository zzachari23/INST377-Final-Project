const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 4000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile('public/Zach Content/players_page.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('public/About.html', { root: __dirname });
});

app.get('/home', (req, res) => {
    res.sendFile('public/homePage.html', { root: __dirname });
});

app.get('/help', (req, res) => {
    res.sendFile('public/Help.html', { root: __dirname });
});

app.get('/team', (req, res) => {
    res.sendFile('public/team.html', { root: __dirname });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${4000}`);
});
