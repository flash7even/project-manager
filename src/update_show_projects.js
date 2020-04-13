'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')

async function updateProjectEvent(project_id) {
  ipc.send('call-project-update', project_id)
}

async function deleteProjectEvent(project_id) {
  var response = await project_server.deleteProjectToServer(project_id)
  var window = remote.getCurrentWindow();
  window.reload();
}

async function showAllProjects() {
  let project_list = await project_server.getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''

  var thead = `<thead>
                <tr>
                <th>#</th>
                  <th>Project Name</th>
                  <th>Project Value </th>
                  <th>Department </th>
                  <th>Contract Signing Date </th>
                  <th>Completion Date </th>
                  <th>Remarks </th>
                  <th>Update </th>
                  <th>Delete </th>
                </tr>
              </thead>`
  
  html += thead

  html += `<tbody>`

  var idx = 0

  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    var cur_project = '<tr>'
    cur_project += `<th scope="row">${idx.toString()}</th>`
    cur_project += `<td>${project['project_name']}</td>`
    cur_project += `<td>${project['project_value']}</td>`
    cur_project += `<td>${project['department']}</td>`
    cur_project += `<td>${project['contract_signing_date']}</td>`
    cur_project += `<td>${project['adjusted_completion_date']}</td>`
    cur_project += `<td>${project['remarks']}</td>`
    var project_id = project['id']
    var btn1 = '<input type="button" onClick="updateProjectEvent(\'' + project_id + '\')" value="Update"/>'
    var btn2 = '<input type="button" onClick="deleteProjectEvent(\'' + project_id + '\')" value="Delete"/>'
    cur_project += `<td>${btn1}</td>`
    cur_project += `<td>${btn2}</td>`
    cur_project += '</tr>'
    html += cur_project
  }

  html += `</tbody>`

  var projectListTable = document.getElementById('projectListTable')
  projectListTable.innerHTML = html
}

showAllProjects()

ipc.on('update-project', function (event, message) {
  console.log('update-project: (update_project.js) ' + message)
  var project_id = document.getElementById('project_id')
  project_id.value = message
})