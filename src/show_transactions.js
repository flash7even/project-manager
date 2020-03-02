'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

let data_table_height = '200px'

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

async function getWeeklyTransactionStat() {
  var no_of_weeks = 7
  var transaction_list = []
  var post_url = host_name + '/api/transaction/statsperweek/' + no_of_weeks.toString()
  console.log("post_url: " + post_url)
  let res = await axios.post(post_url, {});
  var transaction_list = res.data
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
    var tran_data = [
      transaction['transaction_id'],
      transaction['amount'],
      transaction['project_name'],
      transaction['updated_at'],
      transaction['mode_of_payment'],
      transaction['payment_by'],
      transaction['payment_date'],
      transaction['cheque_no'],
      transaction['description'],
      transaction['status'],
    ]
    dt_list.push(tran_data)
  }
  return dt_list
}

async function findWeeklyTransactionStatsCanvas(){
  let week_list = await getWeeklyTransactionStat();

  console.log(JSON.stringify(week_list))

  var dt_list = []
  var idx1 = 0
  for(idx1 = 0;idx1<week_list.length;idx1++){
    var week_data = week_list[idx1]
    var week_name = 'week_' + (idx1+1).toString()
    var tran_data1 = { label: week_name, y: parseFloat(week_data['total_amount_of_transactions']) }
    dt_list.push(tran_data1)
  }
  return dt_list
}

async function showAllTransactionsDT(){
  let dt_list = await findTransactionDataDT();
  
  $("#transactionListTable").dataTable({
    "aaData": dt_list,
    paging: true,
    scrollY: data_table_height,
    scrollCollapse: true,
    dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ]
  });
}

async function weeklyTransactionStat(){
  let dt_list = await findWeeklyTransactionStatsCanvas();

  var chart = new CanvasJS.Chart("weeklyTransactionStatChart", {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text: ""
    },
    axisY: {
      title: "Amount in BDT"
    },
    data: [{        
      type: "column",  
      showInLegend: true, 
      legendMarkerColor: "grey",
      legendText: "1 USD = 85 BDT",
      dataPoints: dt_list
    }]
  });
  chart.render();
}

showAllTransactionsDT()
weeklyTransactionStat()