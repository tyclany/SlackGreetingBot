'use strict';
let request = require('request');

const SLACK_OAUTH_TOKEN = process.env.OAUTH_TOKEN 
//OAUTH token to grant bot access to general channel
const SUCCESS_RESPONSE = {
  statusCode: 200,
  body: null
}
//success response used in callback

module.exports.hello = (event,context,callback) => {
  showButton(callback);//show button in general channel
};

function showButton(callback) {
  //url get from https://api.slack.com/methods/chat.postMessage
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
                    "text": "Greeting Button"
                },
              "value": "greeting",
              "action_id": "button_1"
            }]
            }])
        }
      }
    //send the http request
      request(options, function(err, resp, body) {
        console.log('error:', err)
        console.log('statusCode:', resp && resp.statusCode)
        console.log('body', body)
      })
    callback(null, SUCCESS_RESPONSE)
}