'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

async function deleteProjectToServer(project_id) {
    var put_url = host_name + '/api/project/' + project_id
    let res = await axios.delete(put_url);
    return res
}

async function updateProjectEvent(project_id) {
  ipc.send('call-project-update', project_id)
  var window = remote.getCurrentWindow();
  window.close();
}

async function deleteProjectEvent(project_id) {
  var response = await deleteProjectToServer(project_id)
  alert(JSON.stringify(response.data))
  var window = remote.getCurrentWindow();
  window.close();
}

async function getProjectList() {
  var page = 0
  var project_list = []
  while(1){
    var post_url = host_name + '/api/project/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, {});
    var cur_list = res.data
    if(cur_list.length == 0) break;
    project_list = project_list.concat(cur_list)
    page++
  }
  return project_list
}

async function showAllProjects() {
  let project_list = await getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''

  var thead = `<thead>
                <tr>
                  <th># </th>
                  <th class="site_name">Project Name</th>
                  <th>Description </th>
                  <th>Project Value</th>
                  <th>Options</th>
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
    cur_project += `<td>${project['description']}</td>`
    cur_project += `<td>${project['project_value']}</td>`
    var project_id = project['id']
    var btn1 = '<input type="button" onClick="updateProjectEvent(\'' + project_id + '\')" value="Update"/>'
    var btn2 = '<input type="button" onClick="deleteProjectEvent(\'' + project_id + '\')" value="Delete"/>'
    cur_project += `<td>${btn1+' '+btn2}</td>`
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