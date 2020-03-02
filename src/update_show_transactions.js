'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

async function deleteTransactionToServer(transaction_id) {
    var put_url = host_name + '/api/transaction/' + transaction_id
    let res = await axios.delete(put_url);
    return res
}

async function updateTransactionEvent(transaction_id) {
  ipc.send('call-transaction-update', transaction_id)
  var window = remote.getCurrentWindow();
  window.close();
}

async function deleteTransactionEvent(transaction_id) {
  var response = await deleteTransactionToServer(transaction_id)
  alert(JSON.stringify(response.data))
  var window = remote.getCurrentWindow();
  window.close();
}

async function getTransactionList() {
  var page = 0
  var transaction_list = []
  while(1){
    var post_url = host_name + '/api/transaction/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, {});
    var cur_list = res.data
    if(cur_list.length == 0) break;
    transaction_list = transaction_list.concat(cur_list)
    page++
  }
  return transaction_list
}

async function showAllTransactions() {
  let transaction_list = await getTransactionList();
  console.log(JSON.stringify(transaction_list))

  var html = ''

  var thead = `<thead>
                <tr>
                  <th># </th>
                  <th class="site_name">Transaction ID</th>
                  <th>Amount </th>
                  <th>Project Name</th>
                  <th>Mode of Payment</th>
                  <th>Payment By</th>
                  <th>Payment Date</th>
                  <th>Cheque No</th>
                  <th>Description</th>
                  <th>Payment Status</th>
                  <th>Options</th>
                </tr>
              </thead>`
  
  html += thead

  html += `<tbody>`

  var idx = 0

  for(idx = 0;idx<transaction_list.length;idx++){
    var transaction = transaction_list[idx]
    var cur_transaction = '<tr>'
    cur_transaction += `<th scope="row">${idx.toString()}</th>`
    cur_transaction += `<td>${transaction['transaction_id']}</td>`
    cur_transaction += `<td>${transaction['amount']}</td>`
    cur_transaction += `<td>${transaction['project_name']}</td>`
    cur_transaction += `<td>${transaction['mode_of_payment']}</td>`
    cur_transaction += `<td>${transaction['payment_by']}</td>`
    cur_transaction += `<td>${transaction['payment_date']}</td>`
    cur_transaction += `<td>${transaction['cheque_no']}</td>`
    cur_transaction += `<td>${transaction['description']}</td>`
    cur_transaction += `<td>${transaction['status']}</td>`
    var transaction_id = transaction['id']
    var btn1 = '<input type="button" onClick="updateTransactionEvent(\'' + transaction_id + '\')" value="Update"/>'
    var btn2 = '<input type="button" onClick="deleteTransactionEvent(\'' + transaction_id + '\')" value="Delete"/>'
    cur_transaction += `<td>${btn1+' '+btn2}</td>`
    cur_transaction += '</tr>'
    html += cur_transaction
  }
  html += `</tbody>`
  var transactionListTable = document.getElementById('transactionListTable')
  transactionListTable.innerHTML = html
}

showAllTransactions()

ipc.on('update-transaction', function (event, message) {
  console.log('update-transaction: (update_transaction.js) ' + message)
  var transaction_id = document.getElementById('transaction_id')
  transaction_id.value = message
})