'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

let data_table_height = '200px'

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

async function viewPaymentMethodInTransactionForm() {
  let payment_method_list = await getPaymentMethodList();
  console.log(JSON.stringify(payment_method_list))

  var html = ''
  var idx = 0

  html += `<option>ALL</option>`

  for(idx = 0;idx<payment_method_list.length;idx++){
    var pm = payment_method_list[idx]
    html += `<option>${pm['payment_method_name']}</option>`
  }
  var paymentMethodListInTransaction = document.getElementById('mode_of_payment')
  paymentMethodListInTransaction.innerHTML = html
}

async function viewProjectInTransactionForm() {
  let project_list = await getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''
  var idx = 0
  html += `<option>ALL</option>`
  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    html += `<option>${project['project_name']}</option>`
  }
  var projectListInTransaction = document.getElementById('projectListInTransaction')
  projectListInTransaction.innerHTML = html
}

async function getTransactionList(search_params = {}) {
  var page = 0
  var transaction_list = []
  while(page == 0){
    var post_url = host_name + '/api/transaction/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, search_params);
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

async function findTransactionDataDT(search_params){
  let transaction_list = await getTransactionList(search_params);
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

async function showAllTransactionsDT(search_params){
  let dt_list = await findTransactionDataDT(search_params);
  
  $("#transactionListTable").dataTable({
    "aaData": dt_list,
    paging: true,
    destroy: true,
    scrollY: data_table_height,
    scrollCollapse: true,
    dom: 'Bfrtip',
    buttons: [
      // Options: 'copy', 'csv', 'excel', 'pdf', 'print',
      {
          extend: 'excel',
          exportOptions: {
              columns: ':visible'
          }
      },
      {
          extend: 'csv',
          exportOptions: {
              columns: ':visible'
          }
      },
      {
          extend: 'copy',
          exportOptions: {
              columns: ':visible'
          }
      },
      'colvis'
      ],
      columnDefs: [ {
          targets: -1,
          visible: false
      } ]
  });
}

async function weeklyTransactionStat(dt_list){
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

async function sendAdvancedTransactionReport(event) {
  event.preventDefault() // stop the form from submitting
  
  let project_name = document.getElementById("projectListInTransaction").value;
  let status = document.getElementById("status").value;
  let amount_min = document.getElementById("amount_min").value;
  let amount_max = document.getElementById("amount_max").value;
  let payment_date_start = document.getElementById("payment_date_start").value;
  let payment_date_end = document.getElementById("payment_date_end").value;
  let mode_of_payment = document.getElementById("mode_of_payment").value;

  var search_params = {
    'project_name': project_name,
    'status': status,
    'amount_min': amount_min,
    'amount_max': amount_max,
    'payment_date_start': payment_date_start,
    'payment_date_end': payment_date_end,
    'mode_of_payment': mode_of_payment
  }
  
  await showAllTransactionsDT(search_params)
}

viewProjectInTransactionForm()
viewPaymentMethodInTransactionForm()
let search_params = {}
showAllTransactionsDT(search_params)
weeklyTransactionStat()