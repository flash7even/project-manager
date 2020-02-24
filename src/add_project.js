const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://localhost:5000'

async function addProjectToServer(project_data) {
    var post_url = host_name + '/api/project/'
    let res = await axios.post(post_url, project_data);
    return res
}

async function sendAddProjectForm(event) {
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
    if(data.status != 200){
      message = 'Project Creation Failed'
    }
    ipc.send('after-project-creation', message)

    var window = remote.getCurrentWindow();
    window.close();
}





