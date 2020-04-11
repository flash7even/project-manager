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

async function viewProjectInBoqForm() {
  let project_list = await getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    html += `<option>${project['project_name']}</option>`
  }
  var projectListInBoq = document.getElementById('projectListInBoq')
  projectListInBoq.innerHTML = html
}

async function addBoqToServer(boq_data) {
    var post_url = host_name + '/api/boq/'
    let res = await axios.post(post_url, boq_data);
    return res
}

async function sendAddBoqForm(event) {
    event.preventDefault() // stop the form from submitting

    var boq_data = {
      'boq_id': document.getElementById("boq_id").value,
      'description': document.getElementById("description").value,
      'project_name': document.getElementById("projectListInBoq").value,
      'unit': document.getElementById("unit").value,
      'unit_price': document.getElementById("unit_price").value,
      'quantity': document.getElementById("quantity").value,
      'total_price': document.getElementById("total_price").value,
      'quoted_price': document.getElementById("quoted_price").value,
      'profit': document.getElementById("profit").value,
      'issue_date': document.getElementById("issue_date").value,
      'issue_quantity': document.getElementById("issue_quantity").value,
      'issue_voucher': document.getElementById("issue_voucher").value,
      'stock_in_hand': document.getElementById("stock_in_hand").value,
    }
    
    let data = await addBoqToServer(boq_data);
    var message = 'Boq Successfull'
    if(data.status != 200 && data.status != 201){
      message = 'Boq Failed'
    }
    ipc.send('after-boq', message)

    var window = remote.getCurrentWindow();
    window.close();
}

viewProjectInBoqForm()