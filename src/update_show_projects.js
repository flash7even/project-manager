'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

async function updateProject(event, msg=null) {
  alert('Called here')
  alert(msg)
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
  var idx = 0

  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    var cur_project = '<tr>'
    cur_project += `<th scope="row">${idx.toString()}</th>`
    cur_project += `<td>${project['project_name']}</td>`
    cur_project += `<td>${project['description']}</td>`
    cur_project += `<td>${project['project_value']}</td>`
    var btn1 = `<button onclick="JavaScript:updateProject(event, ${project['id']})" type="button" class="btn btn-success"><i class="fas fa-edit"></i>Update</button>`
    var btn2 = `<button onclick="JavaScript:deleteProject(event, ${project['id']})" type="button" class="btn btn-danger"><i class="fas fa-edit"></i>Delete</button>`
    cur_project += `<td>${btn1+btn2}</td>`
    cur_project += '</tr>'
    html += cur_project
  }
  var projectListTable = document.getElementById('projectListTable')
  projectListTable.innerHTML = html
}

showAllProjects()