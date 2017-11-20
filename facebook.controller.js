const https = require('https');
const ACCESS_TOKEN = 'EAAHxK6ZBeyckBANmhkDXlyPFsQNWskj87L4hRxpBFQ8geUAKS2YsWoAyvNzcNMZAXxSDvNmZBevQssYYZCC08oxa8tPAft7ZCkieyvROlLTykWgGBJpJmUX5ZCfZBcUNteKrvhrSz8VlTTUsceIhEFRzOtQLG4bdXq684uTIEZAGbAZDZD';

exports.sendTextMessage = function(senderId, message) {

    const postData = JSON.stringify({
        'messaging_type': 'RESPONSE',
        'recipient': {
            'id': senderId
        },
        'message': {
            'text': message
        }
    });

    const options = {
        host: 'graph.facebook.com',
        path:　`/v2.6/me/messages?access_token=${ACCESS_TOKEN}`,
        body: postData,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let req = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {

            if (response.statusCode < 200 || response.statusCode > 399) {
                console.log(`[FB-ERR] ${response.statusCode}`);
                console.log(data);
                return;
            }
            console.log('------------FB-RESPONSE-----------');
            console.log('[FB-OK] Msg Sent');
            console.log(data);
            
        });

    });

    req.write(postData);
    req.end();

}