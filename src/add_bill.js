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

async function viewProjectInBillForm() {
  let project_list = await getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    html += `<option>${project['project_name']}</option>`
  }
  var projectListInBill = document.getElementById('projectListInBill')
  projectListInBill.innerHTML = html
}

async function addBillToServer(bill_data) {
    var post_url = host_name + '/api/bill/'
    let res = await axios.post(post_url, bill_data);
    return res
}

async function sendAddBillForm(event) {
    event.preventDefault() // stop the form from submitting
    let bill_id = document.getElementById("bill_id").value;
    let amount = document.getElementById("amount").value;
    let project_name = document.getElementById("projectListInBill").value;

    var bill_data = {
      'bill_id': bill_id,
      'amount': amount,
      'project_name': project_name
    }
    
    let data = await addBillToServer(bill_data);
    var message = 'Bill Successfull'
    if(data.status != 200 && data.status != 201){
      message = 'Bill Failed'
    }
    ipc.send('after-bill', message)

    var window = remote.getCurrentWindow();
    window.close();
}

viewProjectInBillForm()
