
const api = new TimeTrackerApi(api_key_time_tracking, api_url);
 company_id = 23;
// INSERT YOUR CODE HERE
let tracK;
function success(response){//callback funtion of post Entry

  tracK.successHandlerOfPostEntry(response)
}
document.addEventListener("DOMContentLoaded", function(e) {//method runs when the document is loaded
 tracK= new Track(api,company_id);
  let elemStart=document.getElementById('start_button');
  elemStart.addEventListener("click", tracK.start.bind(this));
  let elemStop=document.getElementById('stop_button');
    elemStop.addEventListener("click", tracK.stop.bind(this));
});
