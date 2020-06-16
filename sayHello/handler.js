'use strict';
const request = require('request');
const querystring = require('querystring');

const SLACK_OAUTH_TOKEN = process.env.OAUTH_TOKEN
const SUCCESS_RESPONSE = {
  statusCode: 200,
  body: null
}
const modal = {
	"title": {
		"type": "plain_text",
		"text": "My App",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"type": "modal",
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "option_2",
				"placeholder": {
					"type": "plain_text",
					"text": "How many options do they need, really?"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "Option 2"
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"action_id": "add_option",
					"text": {
						"type": "plain_text",
						"text": "Add another option  "
					}
				}
			]
		}
	]
}
module.exports.modal = (event,context,callback) => {
  const data = querystring.parse(event.body)
  getRon(data,callback);
};

function getRon(payload,callback) {
    let options = {
        url: 'https://slack.com/api/views.open',
        headers: {
          'Accept': 'application/json',
        },
        method: 'POST',
        form: {
          token: SLACK_OAUTH_TOKEN,
          trigger_id: payload.trigger_id,
          view: modal
        }
      }
    
      request(options, function(err, resp, body) {
        console.log('error:', err)
        console.log('statusCode:', resp && resp.statusCode)
        console.log('body', body)
      })
    callback(null, SUCCESS_RESPONSE)
}
