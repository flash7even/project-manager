'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

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
    cur_project += '</tr>'
    html += cur_project
  }
  // set list html to the todo items
  var projectListTable = document.getElementById('projectListTable')
  projectListTable.innerHTML = html
}

async function findProjectDataDT(){
  let project_list = await getProjectList();
  console.log(JSON.stringify(project_list))

  var dt_list = []
  var idx = 0

  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    var tran_data = [project['project_name'], project['description'], project['project_value'], "2013-10-15 10:30:00"]
    dt_list.push(tran_data)
  }
  return dt_list
}

async function showAllProjectsDT(){
  let dt_list = await findProjectDataDT();
  $(function(){
    $("#projectListTable").dataTable({
      "aaData": dt_list,
      "aoColumnDefs":[{
            "sTitle":"Site name"
          , "aTargets": [ "site_name" ]
      },{
            "aTargets": [ 0 ]
          , "bSortable": false
          , "mRender": function ( url, type, full )  {
              return  '<a href="'+url+'">' + url + '</a>';
          }
      },{
            "aTargets": [ 1 ]
          , "bSortable": true
      },{
            "aTargets":[ 3 ]
          , "sType": "date"
          , "mRender": function(date, type, full) {
              return new Date(date).toDateString()
          }  
      }]
    });
  })
}

showAllProjectsDT()


