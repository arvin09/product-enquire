var helperModule = (function(){

function getApiData(apiUrl,method){
		return $.ajax({
			method: method,
			url: apiUrl
		});
	}

return {
	getApiData: getApiData
}

}())