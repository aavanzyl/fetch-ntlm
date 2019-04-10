let ntlm = require('./ntlm');
let Util = require('./util');

var fetchNtlm = async function(url, options){

	var httpreqOptions = Util.omit(options, ['url', 'username', 'password', 'workstation', 'domain']);

	async function sendType1Message(callback) {
		var type1msg = ntlm.createType1Message(options);
		var type1options = {
			headers: {
				'Connection': 'keep-alive',
				'Authorization': type1msg,
				'Access-Control-Request-Headers': 'www-authenticate'
			},
			timeout: options.timeout || 0,
			allowRedirects: false // don't redirect in httpreq, because http could change to https which means we need to change the keepaliveAgent
		};
	
		// pass along other options:
		type1options = Object.assign({}, Util.omit(httpreqOptions, ['headers', 'body']), type1options);
		
		// send type1 message to server:
		let _result = await fetch(url, type1options);

		return _result;
	}

	async function sendType3Message(res, callback) {
		// catch redirect here:
		if (res.headers.location) {
			options.url = res.headers.location;
			return fetchNtlm(options.url, options);
		}

		var _tokenHeader = res.headers.get('www-authenticate');
		if (!_tokenHeader){
			throw new Error('www-authenticate not found on response of second request');
		}

		// parse type2 message from server:
		var type2msg = ntlm.parseType2Message(_tokenHeader);

		// create type3 message:
		var type3msg = ntlm.createType3Message(type2msg, options);

		// build type3 request:
		var type3options = {
			headers: {
				'Connection': 'Close',
				'Authorization': type3msg
			},
			allowRedirects: false,
			// agent: keepaliveAgent
		};

		// pass along other options:
		type3options.headers = Object.assign(type3options.headers, httpreqOptions.headers);
		type3options = Object.assign(type3options, Util.omit(httpreqOptions, ['headers']));

		// send type3 message to server:
		return await fetch(url, type3options);
	}


	let _sendType1MessageResponse = await sendType1Message();
	return sendType3Message(_sendType1MessageResponse);
}


module.exports = fetchNtlm;