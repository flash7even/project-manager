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

async function getPaymentMethodList() {
  var page = 0
  var payment_method_list = []
  while(1){
    var post_url = host_name + '/api/payment/method/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, {});
    var cur_list = res.data
    if(cur_list.length == 0) break;
    payment_method_list = payment_method_list.concat(cur_list)
    page++
  }
  return payment_method_list
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

async function viewPaymentMethodInTransactionForm() {
  let payment_method_list = await getPaymentMethodList();
  console.log(JSON.stringify(payment_method_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<payment_method_list.length;idx++){
    var pm = payment_method_list[idx]
    html += `<option>${pm['payment_method_name']}</option>`
  }
  var paymentMethodListInTransaction = document.getElementById('mode_of_payment')
  paymentMethodListInTransaction.innerHTML = html
}

async function addTransactionToServer(transaction_data) {
    var post_url = host_name + '/api/transaction/'
    let res = await axios.post(post_url, transaction_data);
    return res
}

async function sendAddTransactionForm(event) {
    event.preventDefault() // stop the form from submitting
    
    var transaction_data = {
      'project_name': document.getElementById("projectListInTransaction").value,
      'payment_date': document.getElementById("payment_date").value,
      'transaction_type': document.getElementById("transaction_type").value,
      'description': document.getElementById("description").value,
      'amount': document.getElementById("amount").value,
      'mode_of_payment': document.getElementById("mode_of_payment").value,
      'bank_name': document.getElementById("bank_name").value,
      'account_no': document.getElementById("account_no").value,
      'payment_by': document.getElementById("payment_by").value,
      'payment_to': document.getElementById("payment_to").value,
      'voucher_no': document.getElementById("voucher_no").value,
      'status': document.getElementById("status").value,
      'reference': document.getElementById("reference").value,
      'vat': document.getElementById("vat").value,
      'ait': document.getElementById("ait").value,
    }
    
    let data = await addTransactionToServer(transaction_data);
    var message = 'Transaction Successfull'
    if(data.status != 200 && data.status != 201){
      message = 'Transaction Failed'
    }
    ipc.send('after-transaction', message)
}

viewProjectInTransactionForm()
viewPaymentMethodInTransactionForm()