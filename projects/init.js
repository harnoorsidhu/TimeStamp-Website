const api = new TimeTrackerApi(api_key_projects,api_url );// API call
company_id = 23;
let p =  new Projects(api, company_id);//project class call

 document.addEventListener("DOMContentLoaded", function(e) {//runs when document is loaded
   	document.getElementById('project_form').classList.add("hidForm");//hiding the form
let element = document.getElementById('new_project_button');
   element.addEventListener("click", p.showCreateForm);//click function
setTimeout(myFunction, 2500);//waiting for the projects to load first
setTimeout(deleteFunction, 2500);
document.getElementById('project_form').setAttribute('onsubmit','return false');
document.getElementById('submit_button').addEventListener('click', p.handleFormSubmit);
});
function deleteFunction(){
  let deleteButton =document.getElementsByClassName("delete_link");
for( let i =0; i <deleteButton.length;i++){
   deleteButton[i].addEventListener('click', p.handleDelete);//funvtion call to handle delete
}
}
function myFunction(){
  let elem =document.getElementsByClassName("edit_link");
for( let i =0; i <elem.length;i++){
   elem[i].addEventListener('click', p.showEditForm);//function call to showEditForm
}}
