'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const transaction_server = require('../services/transaction_services')
const payment_method_server = require('../services/payment_method_services')
const dimensions = require('../services/dimensions')

async function viewPaymentMethodInTransactionForm() {
  let payment_method_list = await payment_method_server.getPaymentMethodList();
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
  let project_list = await project_server.getProjectList();
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

async function findTransactionDataDT(search_params){
  let transaction_list = await transaction_server.getTransactionList(search_params);
  console.log(JSON.stringify(transaction_list))

  var dt_list = []
  var idx = 0

  for(idx = 0;idx<transaction_list.length;idx++){
    var transaction = transaction_list[idx]
    var tran_data = [
      transaction['transaction_id'],
      transaction['project_name'],
      transaction['payment_date'],
      transaction['transaction_type'],
      transaction['description'],
      transaction['amount'],
      transaction['mode_of_payment'],
      transaction['bank_name'],
      transaction['account_no'],
      transaction['payment_by'],
      transaction['payment_to'],
      transaction['voucher_no'],
      transaction['status'],
      transaction['reference'],
      transaction['vat'],
      transaction['ait'],
    ]
    dt_list.push(tran_data)
  }
  return dt_list
}

async function findWeeklyTransactionStatsCanvas(){
  let week_list = await transaction_server.getWeeklyTransactionStat();

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
    scrollY: dimensions.data_table_height,
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

async function sendAdvancedTransactionReport(event) {
  event.preventDefault() // stop the form from submitting
  
  let project_name = document.getElementById("projectListInTransaction").value;
  let status = document.getElementById("status").value;
  let amount_min = document.getElementById("amount_min").value;
  let amount_max = document.getElementById("amount_max").value;
  let payment_date_start = document.getElementById("payment_date_start").value;
  let payment_date_end = document.getElementById("payment_date_end").value;
  let mode_of_payment = document.getElementById("mode_of_payment").value;
  let transaction_type = document.getElementById("transaction_type").value;

  var search_params = {
    'project_name': project_name,
    'status': status,
    'amount_min': amount_min,
    'amount_max': amount_max,
    'payment_date_start': payment_date_start,
    'payment_date_end': payment_date_end,
    'mode_of_payment': mode_of_payment,
    'transaction_type': transaction_type
  }
  
  await showAllTransactionsDT(search_params)
}

viewProjectInTransactionForm()
viewPaymentMethodInTransactionForm()
let search_params = {}
showAllTransactionsDT(search_params)