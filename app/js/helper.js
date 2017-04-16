'use strict'

var helperModule = (function(){

	function getApiData(apiUrl,method){
		return $.ajax({
			method: method,
			url: apiUrl
		});
	}

	function sendMail(data){
		var sendmail = require('sendmail')();

		sendmail({
			from: 'no-reply@sbgl.co.in',
			to: 'arvin09@gmail.com',
			subject: 'test sendmail',
			html: 'Mail of test sendmail '
		}, function(err, reply) {
			console.log(err && err.stack);
			console.dir(reply);
		});
	}

	return {
		getApiData: getApiData,
		sendMail: sendMail
	};

}());