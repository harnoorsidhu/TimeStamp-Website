
class Track
{
	/**
	 * Track Constructor
	 * @param {TimeTrackerApi} api
	 * @param {int} company_id
	 * */
	constructor(api, company_id)
	{
		this.start_button = undefined;
		this.stop_button = undefined;
		this.track_form = undefined;


		// Update the timer immediately, then trigger the callback every second to update the clock
		this.updateTimer();//function call
		setInterval(this.updateTimer,1000);

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE HERE
    this.loadProjects();//function call
	}

	/**
	 * update timer
	 * method to update the timer
	 * */
	updateTimer()
	{
		console.log('----- updateTimer -----');
		// INSERT YOUR CODE HERE
		if(	document.getElementsByClassName("hidstyle")[0]){
    let item =parseInt(localStorage.getItem('timer_timestamp'));
    let startDate = new Date(item);
		let time = new Date();
		//subtracting thecurrent time and the starting time of the counter
		time.setHours(time.getHours()-startDate.getHours(),time.getMinutes()-startDate.getMinutes(),time.getSeconds()-startDate.getSeconds(),time.getMilliseconds()-startDate.getMilliseconds());
		time=time/1000;
	  let startTime = convertSecondsToHoursMinutesSeconds(time);//function call to config.js
    let counterElem = document.getElementById('counter');
    if(	!document.getElementsByClassName("stopTime")[0]){
  	     counterElem.textContent=startTime;}
	     }
	}

	/////////////////////////////////////////////
	//
	// EVENTS
	//
	/////////////////////////////////////////////

	/**
	 * start
	 * method to the the counter when the start button is clicked
	 * @param {event} event
	 * */
	start(event)
	{
		console.log('----- start -----', event);
		document.getElementById('start_button').classList.add("hidstyle");
		let Time = new Date();
		let timestamp = Time.getTime();
    localStorage.setItem('timer_timestamp',timestamp);
	}

	/**
	 * stop
	 * method to stop the timer when the stop button is clicked
	 * @param {event} event
	 * */
	stop(event)
	{
		console.log('----- stop -----', event);
		// INSERT YOUR CODE HERE
		let Time = new Date();
		let date = Date.parse(Time);
		let stopDate= convertTimestampToDateFormat(date);
		let item =parseInt(localStorage.getItem('timer_timestamp'));
		let startDate = convertTimestampToDateFormat(item);
    let dValue = document.getElementById('description').value;
    let pId = document.getElementById('project_id').value;
    let uId=parseInt(localStorage.getItem('userId'));
    let param={
     'description': dValue,
     'project_id':pId,
     'user_id':uId,
     'start_time':startDate,
     'end_time':stopDate,
	   }
    api.makeRequest('POST','projects/entries',param,success);
}


	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////

	/**
	 * loadProject
	 * method to load the Projects
	 */
	loadProjects()
	{
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE HERE
    api.makeRequest('GET','companies/'+company_id+'/projects', {}, this.fillProjectsWithResponse);//making the API call
	}

	/**
	 * fillUsersWithResponse
	 * method to fill the project drop down menu with the response
	 * @param {Object} object
	 */
	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
    let response=xhr_response;
    let projectElem = document.getElementById('project_id');
  	for(let key in response){
    var object= response[key];
    let elem =document.createElement('option');
    elem.value=object.project_id;
    elem.textContent=object.title;
	  projectElem.appendChild(elem);
    }
}

/**
 * successHandlerOfPostEntry
 * method to handle the response of post entry
 * @param {Object} object
 */
successHandlerOfPostEntry(xhr_response){
	console.log('----- successHandlerOfPostEntry -----', xhr_response);
  document.getElementById('stop_button').classList.add("stopTime");
	let time = new Date();
	time.setHours(0,0,0,0);
	let seconds = time.getTime()/1000;
  let startTime = convertSecondsToHoursMinutesSeconds(seconds);
	let counterElem = document.getElementById('counter');
  counterElem.textContent=startTime;
 }
}
