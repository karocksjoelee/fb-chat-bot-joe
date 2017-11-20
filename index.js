const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());
const VERIFY_TOKEN = 'joeschatbot2017'

app.listen(process.env.PORT || 1337, () => {
    console.log('Webhook is listening');
});


// Check this is an Event from a page subscription (Webhook End-Point)
app.post('/webhook', (req, res) => {
    
    if (req.body.object === 'page') {
        
        req.body.entry.forEach((entry) => {
            // this contains message
            let webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.status(404).send('ERR_404');
    }

});


// Webhook Verification
app.get('/webhook', (req, res) => {

    // Parsing Query Params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {

        // Check the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            // Respond with the challenge token form the request
            res.status(200).send(challenge);
        } else {
            // 403 Forbidden
            res.sendStatus(403);
        }
    }

});