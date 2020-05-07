'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const jshelper_services = require('../services/jshelper_services')

async function sendAddProjectForm(event) {
    event.preventDefault() // stop the form from submitting

    var project_data = {
      'project_name': document.getElementById("project_name").value,
      'project_value': jshelper_services.make_numeric(document.getElementById("project_value").value),
      'department': document.getElementById("department").value,
      'noa_date': document.getElementById("noa_date").value,
      'contract_signing_date': document.getElementById("contract_signing_date").value,
      'commencement_date': document.getElementById("commencement_date").value,
      'completion_date': document.getElementById("completion_date").value,
      'handover_date': document.getElementById("handover_date").value,
      'remarks': document.getElementById("remarks").value,
    }
    
    let data = await project_server.addProjectToServer(project_data);
    var message = 'Project Created Successfully'
    if(data.status != 200 && data.status != 201){
      message = 'Project Creation Failed'
    }
    ipc.send('after-project-creation', message)
}

//-------- make comma separated amount field -------//
function project_value_changed(event){
  var input = document.getElementById("project_value").value.toString();
  document.getElementById("project_value").value = jshelper_services.bdt_currency_convert(input)
}
//-------- make comma separated amount field -------//

document.getElementById("noa_date").value = jshelper_services.get_current_date();
document.getElementById("contract_signing_date").value = jshelper_services.get_current_date();
document.getElementById("commencement_date").value = jshelper_services.get_current_date();
document.getElementById("completion_date").value = jshelper_services.get_current_date();
document.getElementById("handover_date").value = jshelper_services.get_current_date();