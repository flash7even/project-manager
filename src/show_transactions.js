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
  while(page == 0){
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

async function findTransactionDataDT(){
  let transaction_list = await getTransactionList();
  console.log(JSON.stringify(transaction_list))

  var dt_list = []
  var idx = 0

  for(idx = 0;idx<transaction_list.length;idx++){
    var transaction = transaction_list[idx]
    var tran_data = [transaction['transaction_id'], transaction['amount'], transaction['project_name'], "2013-10-15 10:30:00"]
    dt_list.push(tran_data)
  }
  return dt_list
}

async function showAllTransactionsDT(){
  let dt_list = await findTransactionDataDT();
  $(function(){
    $("#transactionListTable").dataTable({
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

showAllTransactionsDT()