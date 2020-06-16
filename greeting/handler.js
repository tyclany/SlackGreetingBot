'use strict';
let request = require('request');

const SLACK_OAUTH_TOKEN = process.env.OAUTH_TOKEN
const SUCCESS_RESPONSE = {
  statusCode: 200,
  body: null
}

module.exports.hello = (event,context,callback) => {
  console.log(event)
  returnButton(callback);
};

function returnButton(callback) {
    let options = {
        url: 'https://slack.com/api/chat.postMessage',
        headers: {
          'Accept': 'application/json',
        },
        method: 'POST',
        form: {
          token: SLACK_OAUTH_TOKEN,
          channel: 'general',
          text: 'Hello there!',
          blocks:JSON.stringify([
            {"type": "actions",
             "block_id": "actions1",
             "elements": [{
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Good Morning"
                },
              "value": "greeting",
              "action_id": "button_1"
            }]
            }])
        }
      }
    
      request(options, function(err, resp, body) {
        console.log('error:', err)
        console.log('statusCode:', resp && resp.statusCode)
        console.log('body', body)
      })
    callback(null, SUCCESS_RESPONSE)
}