/**
 * @var api_url
 * @type {string}
 * The URL that points to the main API path. All commands use this primary URL
 */
let api_url = 'https://acs2909.lusciousorange.com/t-api/';


/**
 * API KEYS
 * @type {string}
 * The three API keys for the three segments of the project. You must replace these YOUR KEYS for your respective roles.
 */
let api_key_time_tracking = 'txph284-k7m63g8vdhfnqsc1-r09dk66';
let api_key_reports = 'cp4hr67-hqrwsn5j90467y24-bk25x67';
let api_key_projects = 'hk68dc3-p59h631y02nvmdg9-6qb0tz3';

/**
 *
 * @var {string} my_api_key
 * YOUR api key which is used for basic connections. When submitting for the final project, any of the three API keys
 * can be included here, but for any development work, you must use your own API key.
 */
let my_api_key = 'txph284-k7m63g8vdhfnqsc1-r09dk66';

/**
 * @var {int} company_id
 * Your company ID, you must replace this is your value once you know your company ID
 */
let company_id = 23;


/**
 * PROFILE CALL
 * This profile call must remain here as the first thing that happens in the config. It uses your API key to get the
 * profile of who is currently working.
 */
let my_api = new TimeTrackerApi(my_api_key, api_url);
my_api.makeRequest('GET','acs/profile', {}, saveUserID);
my_api = null;


/**
 * @ profile_object{ object}
 * function to save the userID in local storage
 */


function saveUserID(profile_object)
{
	console.log('----- saveUserID -----', profile_object);
	// INSERT YOUR CODE HERE

  localStorage.setItem('userId',profile_object.user_id);
}

/**
 * @ seconds{time}
 * function to convert the time to different format
 */
function convertSecondsToHoursMinutesSeconds(seconds)
{
	console.log('----- convertSecondsToHoursMinutesSeconds -----', seconds);
	// INSERT YOUR CODE HERE
	seconds= seconds*1000;
  let date = new Date(seconds);
	let hours = date.getHours();
	let minutes = date.getMinutes();
  let second = date.getSeconds();
  if(minutes<=9){
	   minutes="0"+minutes;
  }
  if(second<=9){
	   second ="0"+second;
  }
  let time=+hours+":"+minutes+":"+second;
  return time;
}

/**
 * @ timestamp{time}
 * function to time to date format
 */
function convertTimestampToDateFormat(timestamp)
{
	console.log('----- convertTimestampToDateFormat -----', timestamp);
	// INSERT YOUR CODE HERE
	let date = new Date(timestamp);
	console.log(date);
	let year = date.getFullYear();
	let hours = date.getHours();
	let month = date.getMonth()+1;
	let minutes = date.getMinutes();
	let second = date.getSeconds();
	let day = date.getDate();
  if(minutes<=9){
	  minutes="0"+minutes;
  }
  if(second<=9){
	  second ="0"+second;
  }
  if(day<=9){
	  day = "0"+day;
  }
  if(hours<=9){
	  hours="0"+hours;
  }
  let newDate=year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+second;
  return newDate;
}

/**
 * @ error_details{string}
 * function to show the error in the page when the user does not make the preper selection
 */
function showError(error_details)
{
	console.error('----- showError -----', error_details);
	// INSERT YOUR CODE HERE
  let el = document.createElement('div');
  el.setAttribute('class','error_box');
  el.textContent="ERROR:"+error_details.error_code+":"+error_details.error_message;
  console.log(el);
  document.body.appendChild(el);


}
