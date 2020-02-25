'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

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
  var idx = 0

  for(idx = 0;idx<transaction_list.length;idx++){
    var transaction = transaction_list[idx]
    var cur_transaction = '<tr>'
    cur_transaction += `<th scope="row">${idx.toString()}</th>`
    cur_transaction += `<td>${transaction['transaction_id']}</td>`
    cur_transaction += `<td>${transaction['amount']}</td>`
    cur_transaction += `<td>${transaction['project_name']}</td>`
    cur_transaction += '</tr>'
    html += cur_transaction
  }
  // set list html to the todo items
  var transactionListTable = document.getElementById('transactionListTable')
  transactionListTable.innerHTML = html
}

showAllTransactions()
