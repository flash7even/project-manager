'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')


async function sendUpdateProjectForm(event) {
  event.preventDefault() // stop the form from submitting
  let project_id = document.getElementById("project_id").value;

  var project_data = {
    'project_name': document.getElementById("project_name").value,
    'project_value': document.getElementById("project_value").value,
    'department': document.getElementById("department").value,
    'noa_date': document.getElementById("noa_date").value,
    'contract_signing_date': document.getElementById("contract_signing_date").value,
    'commencement_date': document.getElementById("commencement_date").value,
    'handover_date': document.getElementById("handover_date").value,
    'time_extension': document.getElementById("time_extension").value,
    'remarks': document.getElementById("remarks").value,
  }
  
  let data = await project_server.updateProjectToServer(project_data, project_id);
  var message = 'Project Updated Successfully'
  if(data.status != 200 && data.status != 201){
    message = 'Project Update Failed'
  }
  ipc.send('after-project-update', message)
}

ipc.on('update-project', function (event, message) {
  console.log('update-project: (update_project.js) ' + message)
  var project_id = document.getElementById('project_id')
  project_id.value = message
})
