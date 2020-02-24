const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://localhost:5000'

async function getProjectList() {
  var page = 0
  project_list = []
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

async function viewProjectInTransactionForm() {
  let project_list = await getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    html += `<option>${project['project_name']}</option>`
  }
  var projectListInTransaction = document.getElementById('projectListInTransaction')
  projectListInTransaction.innerHTML = html
}

async function addTransactionToServer(transaction_data) {
    var post_url = host_name + '/api/transaction/'
    let res = await axios.post(post_url, transaction_data);
    return res
}

async function sendAddTransactionForm(event) {
    event.preventDefault() // stop the form from submitting
    let transaction_id = document.getElementById("transaction_id").value;
    let amount = document.getElementById("amount").value;
    let project_name = document.getElementById("projectListInTransaction").value;

    var transaction_data = {
      'transaction_id': transaction_id,
      'amount': amount,
      'project_name': project_name
    }
    
    let data = await addTransactionToServer(transaction_data);
    var message = 'Transaction Successfull'
    if(data.status != 200){
      message = 'Transaction Failed'
    }
    ipc.send('after-transaction', message)

    var window = remote.getCurrentWindow();
    window.close();
}

viewProjectInTransactionForm()