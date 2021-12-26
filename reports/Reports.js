class Reports {

	/**
	 * Reports Constructor
	 * @param {TimeTrackerApi} api
	 * @param {int} company_id
	 */
	constructor(api, company_id)
	{

		this.projects = undefined;
		this.users = undefined;

		this.api = api;
		this.company_id = company_id;


this.loadProjects();  //for load projects
this.loadUsers();//for load users
setTimeout(myFunction, 2500); // for timeout
function myFunction(){
R.loadTimeEntries();} // for load entries
	}

	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////
/**
*loadProjects
*for load projects
**/

	loadProjects()  // for load prjects
	{
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE HERE
api.makeRequest('GET','companies/23/projects', {}, this.fillProjectsWithResponse.bind(this));
	}
	/**
	*fillProjectsWithResponse
	*this method is used to fill projects with response from an api_url
	*@param (obj) xhr_response
	*/

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		/


  let pElem = document.getElementById('project_id'); // for get element


	for(let key in xhr_response){ // for loop
var obj= xhr_response[key];



let option =document.createElement('option'); // for get element
option.value=obj.project_id;
option.textContent=obj.title;
	pElem.appendChild(option); // for append Child

this.projects=xhr_response;  // for filling projects

}}
/**
*handleProjectChange
*method to handle the changes in the projects
*@param event
*/

	handleProjectChange(event)
	{
		console.log('----- handleProjectChange -----', event);
		// INSERT YOUR CODE HERE
		localStorage.removeItem('pId'); // for remove item
		let pId = document.getElementById('project_id'); // for get element
		if(pId.value==''){
	localStorage.setItem('pId','0');} // for set item
	else{
		localStorage.setItem('pId',pId.value);}  //for set item
    R.handleUserChange('');
	}


	/////////////////////////////////////////////
	//
	// USERS
	//
	/////////////////////////////////////////////
	/**
	*loadUsers
	*for load users
	**/

	loadUsers()
	{
		console.log('----- loadUsers -----');

api.makeRequest('GET','companies/23/users', {}, this.fillUsersWithResponse.bind(this));
	}
	/**
	*fillUsersWithResponse
	*this method is used to fill users with response from an api_url
	*@param (obj) xhr_response
	*/
	fillUsersWithResponse(xhr_response)
	{
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		let pElem = document.getElementById('user_id'); // for get element


		for(let key in xhr_response){
	var obj= xhr_response[key];



	let option =document.createElement('option');
	option.value=obj.user_id;
	option.textContent=obj.first_name+" "+obj.last_name;
		pElem.appendChild(option);

	this.users=xhr_response;
;
}}
/**
*handleProjectChange
*method to handle the changes in the projects
*@param event
*/
	handleUserChange(event)
	{
		console.log('----- handleUserChange -----', event);
		// INSERT YOUR CODE HERE
let p_Id = document.getElementById('project_id'); // for getting an element
	 let u_Id = document.getElementById('user_id');// for getting an element
	 let txt =p_Id.options[p_Id.selectedIndex].text; // for getting a text value from option or in dropdown list
	 var text = u_Id.options[u_Id.selectedIndex].text; // for getting a text value from option or in dropdown list

	if(text =='All Users'&&txt=='All Projects'){
		let deleteS = document.getElementsByTagName('tbody')[0];// for getting an element
		deleteS.textContent="";
		let entry = JSON.parse(localStorage.getItem('entries'));
		R.fillTimeEntriesWithResponse(entry); // for fill an entry
	}
	if(text!='All Users'&&txt!='All Projects'){

  let pId=localStorage.getItem('pId');
		localStorage.setItem('pId',p_Id.value);

	 let user ={
		 userId:u_Id.value
	 }
	 R.changeTimeEntries(user);}
 }

	/////////////////////////////////////////////
	//
	// TIME ENTRIES
	//
	/////////////////////////////////////////////
	/**
	*loadEntries
	*for load Entries
	**/
	loadTimeEntries()
	{
		console.log('----- loadTimeEntries -----');
	

api.makeRequest('GET','companies/23/entries', {}, this.fillTimeEntriesWithResponse.bind(this));
}
/**
*fillTimeEntriesWithResponse
*this method is used to fill TimeEntries with response from an api_url
*@param (obj) xhr_response
*/
	fillTimeEntriesWithResponse(xhr_response)
	{
		console.log('----- fillTimeEntriesWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
localStorage.setItem('entries',JSON.stringify(xhr_response));


	let	 Row= document.getElementsByTagName('tbody')[0]; // for getting an elemenet
	let userName = document.getElementById('user_id').value; // for getting an elemenet
	let title = document.getElementById('project_id').value; // for getting an elemenet

	let userss = this.users;


	let projectss= this.projects;
		for(let key in xhr_response){
			let object= xhr_response[key];
				let elem =document.createElement('tr'); // for creating an elemenet
				elem.setAttribute('class','entry_id'); // for setting an attribute

				let description = document.createElement('td');
				description.textContent=object.description;
				let project = document.createElement('td');
          for(let yo in projectss){
							let pp = projectss[yo];
							if(object.project_id==pp.project_id){
								project.textContent=pp.title;}
							}
							let userId =document.createElement('td');
							userId.textContent= object.user_id;
							let start =document.createElement('td');
							let stime = new Date(object.start_time);
							let etime = new Date(object.end_time);
							stime.setHours(etime.getHours()-stime.getHours(),etime.getMinutes()-stime.getMinutes(),etime.getSeconds()-stime.getSeconds()) // for setting a time
							let time = stime.getTime()/1000;
							let startTime = convertSecondsToHoursMinutesSeconds(time);
							start.textContent=startTime;
							let date =document.createElement('td');
							let datte = new Date(object.date_added);

							let dateString = datte.toString().substring(4, 21);
							date.textContent=dateString;
							elem.appendChild(description);
							elem.appendChild(project);
							elem.appendChild(userId);
							elem.appendChild(start);
							elem.appendChild(date);
							Row.prepend(elem);
				}

			}
			/**
			*changeTimeEntries
			*method used to change the time ENTRIES
			*@param (elem) Ids
			*/
changeTimeEntries(Ids){
console.log('----- changeTimeEntries -----', Ids);
let testing=parseInt(localStorage.getItem('pId'));
let b = 8;
if(testing==0) {   }
else if(testing!==0){

if(Ids.userId==''){

}
else{

let t =  parseInt(localStorage.getItem('pId'));





let deleteS = document.getElementsByTagName('tbody')[0];
deleteS.textContent="";
let proId = parseInt(localStorage.getItem('pId'));

let entry = JSON.parse(localStorage.getItem('entries'));



let projectss= this.projects;
	for(let key in entry){

		let object= entry[key];

		if(object.user_id==Ids.userId && object.project_id==proId){

			let elem =document.createElement('tr');


			let description = document.createElement('td');
			description.textContent=object.description;
			let project = document.createElement('td');
				for(let yo in projectss){
						let pp = projectss[yo];
						if(object.project_id==pp.project_id){
							project.textContent=pp.title;}
						}
						let userId =document.createElement('td');
						userId.textContent= object.user_id;
						let start =document.createElement('td');
						let stime = new Date(object.start_time);
						let etime = new Date(object.end_time);
						stime.setHours(etime.getHours()-stime.getHours(),etime.getMinutes()-stime.getMinutes(),etime.getSeconds()-stime.getSeconds())
						let time = stime.getTime()/1000;
						let startTime = convertSecondsToHoursMinutesSeconds(time);
						start.textContent= startTime;
						let date =document.createElement('td');
						let datte = new Date(object.date_added);

						let dateString = datte.toString().substring(4, 21);
						date.textContent=dateString;

						elem.appendChild(description);
						elem.appendChild(project);
						elem.appendChild(userId);
						elem.appendChild(start);
						elem.appendChild(date);
						deleteS.prepend(elem);
}}}
localStorage.removeItem('pId');
}}}
