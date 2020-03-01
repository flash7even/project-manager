'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

async function updateProjectToServer(project_data, project_id) {
    var put_url = host_name + '/api/project/' + project_id
    let res = await axios.put(put_url, project_data);
    return res
}

async function sendUpdateProjectForm(event) {
  event.preventDefault() // stop the form from submitting
  let project_name = document.getElementById("project_name").value;
  let project_id = document.getElementById("project_id").value;
  let description = document.getElementById("description").value;
  let project_value = document.getElementById("project_value").value;

  var project_data = {
    'project_name': project_name,
    'description': description,
    'project_value': project_value
  }
  
  let data = await updateProjectToServer(project_data, project_id);
  var message = 'Project Updated Successfully'
  if(data.status != 200 && data.status != 201){
    message = 'Project Update Failed'
  }
  ipc.send('after-project-update', message)

  var window = remote.getCurrentWindow();
  window.close();
}

ipc.on('update-project', function (event, message) {
  console.log('update-project: (update_project.js) ' + message)
  var project_id = document.getElementById('project_id')
  project_id.value = message
})
