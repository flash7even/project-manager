'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

let project_id

async function updateProjectToServer(project_data) {
    var put_url = host_name + '/api/project/'
    let res = await axios.put(put_url, project_data);
    return res
}

async function sendUpdateProjectForm(event) {
  alert('sendUpdateProjectForm called')
  alert('project id: ' + project_id)
  /*
    event.preventDefault() // stop the form from submitting
    let project_name = document.getElementById("project_name").value;
    let description = document.getElementById("description").value;
    let project_value = document.getElementById("project_value").value;

    var project_data = {
      'project_name': project_name,
      'description': description,
      'project_value': project_value
    }
    
    let data = await addProjectToServer(project_data);
    var message = 'Project Created Successfully'
    if(data.status != 200 && data.status != 201){
      message = 'Project Creation Failed'
    }
    ipc.send('after-project-creation', message)

    var window = remote.getCurrentWindow();
    window.close();
    */
}

ipc.on('update-project', function (event, message) {
  alert('update-project: ' + message);
  var x = document.getElementById("project_update_submit_form");
  var onSubmit = '"JavaScript:sendUpdateProjectForm(event, \'' + message + '\')"'
  x.setAttribute("onSubmit", onSubmit);
  //x.setAttribute("onSubmit", "JavaScript:sendUpdateProjectForm(event)");
  return

  var x = document.getElementById("update_project_form");
  var createform = document.createElement('form'); // Create New Element Form
  createform.setAttribute("onSubmit", "JavaScript:sendUpdateProjectForm(event)"); // Setting Action Attribute on Form
  createform.setAttribute("name", "ipcForm"); // Setting Method Attribute on Form
  x.appendChild(createform);

  var heading = document.createElement('h2'); // Heading of Form
  heading.innerHTML = "Update Project";
  createform.appendChild(heading);

  var linebreak = document.createElement('br');
  createform.appendChild(linebreak);

  var namelabel = document.createElement('label'); // Create Label for Name Field
  namelabel.innerHTML = "Your Name : "; // Set Field Labels
  createform.appendChild(namelabel);

  var inputelement = document.createElement('input'); // Create Input Field for Name
  inputelement.setAttribute("type", "text");
  inputelement.setAttribute("name", "dname");
  createform.appendChild(inputelement);

  var linebreak = document.createElement('br');
  createform.appendChild(linebreak);

  var submitelement = document.createElement('input'); // Append Submit Button
  submitelement.setAttribute("type", "submit");
  submitelement.setAttribute("name", "dsubmit");
  submitelement.setAttribute("value", "Submit");
  createform.appendChild(submitelement);
})
