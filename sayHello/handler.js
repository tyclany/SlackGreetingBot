'use strict';
const request = require('request');
const querystring = require('querystring');

// token for bot to have access
const SLACK_OAUTH_TOKEN = process.env.OAUTH_TOKEN

const SUCCESS_RESPONSE = {
  statusCode: 200,
  body: null
}
// JSON for modal
const modal = {
	"title": {
		"type": "plain_text",
		"text": "Greeting bot",
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
			"block_id": "inputname",
			"element": {
				"type": "plain_text_input",
				"action_id": "name",
				"placeholder": {
					"type": "plain_text",
					"text": "What is your name"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "Name"
			}
		},
	]
}
module.exports.hello = (payload,context,callback) => {
  // the payload is encoded in base64, convert it to string
  let buff = new Buffer(payload.body, 'base64');
  let text = buff.toString('ascii');
  //use querystring to parse the string and use json to read specific field
  const decoded = querystring.parse(text)
  var obj = JSON.parse(decoded.payload)
  // distinguish different type of responses. 
  // Since have two types of operation, use if else. 
  if(obj.type=='block_actions'){
	openModal(obj.trigger_id,callback);
  }
  else{
	var name = obj.view.state.values.inputname.name.value;
	greetingWithName(name,callback);
  }
 
};

function openModal(trigger_id,callback) {
	//open modal, which takes in token, trigger_id and view.
    let options = {
        url: 'https://slack.com/api/views.open',
        headers: {
          'Accept': 'application/json',
        },
        method: 'POST',
        form: {
          token: SLACK_OAUTH_TOKEN,
          trigger_id: trigger_id,
          view: JSON.stringify(modal)
        }
    }
	request(options, function(err, resp, body) {
		console.log('error:', err)
	    console.log('statusCode:', resp && resp.statusCode)
	    console.log('body', body)
	})
    callback(null, SUCCESS_RESPONSE)
}

function greetingWithName(name,callback){
	    //After receive the name, post message in general channel
	    let options = {
        url: 'https://slack.com/api/chat.postMessage',
        headers: {
          'Accept': 'application/json',
        },
        method: 'POST',
        form: {
          token: SLACK_OAUTH_TOKEN,
          channel: 'general',
          text: 'Hello, '+name,
        }
    }
	request(options, function(err, resp, body) {
		console.log('error:', err)
	    console.log('statusCode:', resp && resp.statusCode)
	    console.log('body', body)
	})
    callback(null, SUCCESS_RESPONSE)
}