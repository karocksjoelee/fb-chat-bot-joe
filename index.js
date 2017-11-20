const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());

app.listen(process.env.PORT || 1337, () => {
    console.log('Webhook is listening');
});


app.get('/test', (req,res) => {
    console.log('Route Working ...');
    res.status(200).send('Hello World!');
});

