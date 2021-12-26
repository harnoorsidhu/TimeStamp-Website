
const api = new TimeTrackerApi(api_key_reports, api_url); // for calling an API

let R  =  new Reports(api,company_id);// for calling a class
// INSERT YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(e) { // it perform function when document is loaded
let element = document.getElementById('project_id');
   element.addEventListener("change", R.handleProjectChange); // change function
   let elem = document.getElementById('user_id');
      elem.addEventListener("change", R.handleUserChange);// change function

})
