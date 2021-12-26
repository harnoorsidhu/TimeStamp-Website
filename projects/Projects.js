
class Projects {

	/**
	 * Projects Constructor
	 * @param {TimeTrackerApi} api
	 * @param {int} company_id
	 */
	constructor(api, company_id)
	{
		this.project_form = undefined;

		this.api = api;
		this.company_id = company_id;
		// INSERT YOUR CODE HERE
		this.loadProjects();// to load projects in the table

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
		api.makeRequest('GET','companies/'+company_id+'/projects', {}, this.fillProjectsWithResponse);//making the api request and calling the function fillProjectsWithResponse
	}
	/**
	 * fillUsersWithResponse
	 * method to fill projects with response from the API
	 * @param {Object} xhr_response
	 */
	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		let response = xhr_response;
		let tbody = document.getElementsByTagName('tbody')[0];//getting the elements
		for(let key in xhr_response){
			var object = xhr_response[key];
			for(let k in object){
		let trr =document.createElement('tr');//trr makes the <tr>
		trr.id="project_" +object.project_id;
    tbody.appendChild(trr);
	  }
     p.createProjectRow(object);//method call
      }
}
/**
 *createProjectRow
 * method to fill the project row with the data
 * @param {object} project
 */
createProjectRow(project){
		console.log('----- createProjectRow -----', project);
		// INSERT YOUR CODE HERE
		let Row= document.getElementById("project_"+project.project_id);
		let Idrow = document.createElement('td');// making new <td>
		Idrow.textContent = project.project_id;
		Row.appendChild(Idrow);
		let titleRow = document.createElement('td');//making new <td>
		let titleLink = document.createElement('a');//making the <a>
		titleLink.href="#";
    titleLink.setAttribute("class","edit_link");//creating a new class edit_link
		titleLink.textContent=project.title;
		titleRow.appendChild(titleLink);
		Row.appendChild(titleRow);
		Row.appendChild(titleRow);
		let enitryRow = document.createElement('td');//making new <td>
		enitryRow.textContent=project.num_entries;
		Row.appendChild(enitryRow);
	  let deleteRow = document.createElement('td');//making new <td>
		let deleteLink = document.createElement('a');
		deleteLink.href="#";
		deleteLink.setAttribute("class","delete_link");//creating a new class delete_link
		deleteLink.textContent='delete';
		deleteRow.appendChild(deleteLink);
		Row.appendChild(deleteRow);
}
	/////////////////////////////////////////////
	//
	// FORMS
	//
	/////////////////////////////////////////////

	/**
	 *showCreateForm
	 * method to display the form when the new peoject button is called
	 * @param {event} event
	 */
	showCreateForm(event)
	{
		console.log('----- showCreateForm -----', event);
		// INSERT YOUR CODE HERE
		document.getElementById('project_form').classList.remove("hidForm");//removing the hidFormclass
	  document.getElementById('project_form').classList.add("creatForm");//adding the creatForm class
    let formid = document.getElementById('form_project_id');
		formid.name='0';
		document.getElementById('submit_button').value='Create Project';
		document.getElementById('title').value='';
	}

	/**
	 *showEditForm
	 * method to display the form when any prjoct has to be edited
	 * @param {event} event
	 */
	showEditForm(event)
	{
		console.log('----- showEditForm -----', event);
		// INSERT YOUR CODE HERE
		document.getElementById('project_form').classList.remove("hidForm");//removing the hidFormclass
		document.getElementById('project_form').classList.add("creatForm");//adding the creatForm class
		let key = event.path[2];
		let element = key.getElementsByTagName('a');
		let elemId= key.getElementsByTagName('td')[0];
		let k = element[0];
		let change=document.getElementById('title');
		change.value=k.textContent;
    let IdChanger = document.getElementById('form_project_id');
    IdChanger.name=elemId.textContent;
		document.getElementById('submit_button').value='Edit Project';
	}

	/**
	* hideForm
	 * method to hide the form after the work is done
	 *
	 */
	hideForm()
	{
		console.log('----- hideForm -----');
		// INSERT YOUR CODE HERE
		document.getElementById('project_form').classList.remove("creatForm");//removing the creatForm class
  	document.getElementById('project_form').classList.add("hidForm");//adding the hidForm class
}

/**
 *handleFormSubmit
 * method to submit the form by making API request
 * @param {event} event
 */
	handleFormSubmit(event)
	{
		console.log('----- handleFormSubmit -----', event);
		// INSERT YOUR CODE HERE
		let projectId = document.getElementById('form_project_id').name;
		let projectTitle= document.getElementById('title').value;
		let parameter = {
			title: projectTitle
		}
		if(projectId=='0'){
			api.makeRequest('POST','projects/',parameter,p.createNewProject);//making the request to the API to submit
		}
		else{
			let path ='projects/'.concat(projectId);
			api.makeRequest('PATCH',path,parameter,p.updateProject);//making the request to which is used to submit
		}
	}

	//////////////////////////////////////////// *
	// CREATE / EDIT
	//
	/////////////////////////////////////////////

	/**
	 * createNewProject
	 * method to create new project using a form
	 * @param {Object} xhr_response
	 */
	createNewProject(xhr_response)
	{
		console.log('----- createNewProject -----', xhr_response);
		// INSERT YOUR CODE HERE
		p.hideForm();
		let element = document.getElementsByTagName('tbody')[0];
		let elem =document.createElement('tr');
		elem.id="project_" +xhr_response.project_id;
		element.appendChild(elem);
		p.createProjectRow(xhr_response);//fuction call
		myFunction();// function call
		deleteFunction();//function call
	}

	/**
	 *updateProject
	 * method to update the project information
	 * @param {Object} xhr_response
	 */
	 updateProject(xhr_response)
	{
		console.log('----- updateProject -----', xhr_response);
		// INSERT YOUR CODE HERE
		p.hideForm();
		let element = document.getElementById("project_" +xhr_response.project_id);
		let rows = element.getElementsByClassName('edit_link');
		rows[0].textContent=xhr_response.title;
	}

	/////////////////////////////////////////////
	//
	// DELETE
	//
	/////////////////////////////////////////////

	/**
	 * handleDelete
	 * method that deletes the project the delete button is called
	 * @param {event} event
	 */
	handleDelete(event)
	{
		console.log('----- handleDelete -----', event);
		// INSERT YOUR CODE HERE
		let key = event.path[2];
		let projectId= key.getElementsByTagName('td')[0].textContent;
		api.makeRequest('DELETE','projects/'+projectId,{},p.updateFromDelete);
	}

	/**
	 * updateFromDelete
	 * method to removes the item
	 * @param {Object} xhr_response
	 */
	updateFromDelete(xhr_response)
	{
		console.log('----- updateFromDelete -----', xhr_response);
		// INSERT YOUR CODE HERE
		let deleteS = document.getElementById("project_" +xhr_response.project_id);
		deleteS.remove();//function call
	}}
