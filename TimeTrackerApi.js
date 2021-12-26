
class TimeTrackerApi {

	/**
	 * Constructor for TimeTrackerApi
	 * @param {string} api_key The API key to be used for this connection
	 * @param {string} base_url The base URL for the API calls
	 */

	constructor(api_key, base_url)
	{
		this.api_key = api_key;
		this.base_url = base_url;

		// INSERT YOUR CODE HERE
	}

	/**
	 * makeRequest
	 * method to request to the API
	 * @param {string} method
	 * @param {string} path
	 * @param {object} parameters
	 * @param {method} success_handler
	 */
	makeRequest(method, path, parameters = {}, success_handler = false)
	{
		console.log('----- makeRequest -----',
			{
				'method' : method,
				'path' : path,
				'handler': success_handler});
		// INSERT YOUR CODE
		let xhR = new XMLHttpRequest();
		let urL = new URL(path,this.base_url);
    let Handler = success_handler;
    let  r = this.api_key;
		xhR.open(method,urL);
    xhR.setRequestHeader('api-key',r);
    xhR.responseType = 'json';
    if(method=='POST'|| method=='PATCH'){
	  let formData = new FormData();
	  for(let key in parameters){
		formData.append(key,parameters[key])
	}
	  xhR.send(formData); //sending form data
		this.xhrRequestHander(xhR, Handler)//method call
}
    else{
		xhR.send();//
	  this.xhrRequestHander(xhR, Handler)}//method call
	}
	  xhrRequestHander(xhr, success_handler = false)//handling the response from the API
	{
		console.log('----- xhrRequestHander -----', xhr.responseURL);
    xhr.onload=function(){
    if (xhr.status != 200) {
		  showError(xhr.response);
	}
	  else{
		   success_handler(xhr.response);
	}
  }
	}
}
