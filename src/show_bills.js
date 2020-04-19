'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const bill_server = require('../services/bill_services')
const payment_method_server = require('../services/payment_method_services')
const dimensions = require('../services/dimensions')

async function viewPaymentMethodInBillForm() {
  let payment_method_list = await payment_method_server.getPaymentMethodList();
  console.log(JSON.stringify(payment_method_list))

  var html = ''
  var idx = 0

  html += `<option>ALL</option>`

  for(idx = 0;idx<payment_method_list.length;idx++){
    var pm = payment_method_list[idx]
    html += `<option>${pm['payment_method_name']}</option>`
  }
  var paymentMethodListInBill = document.getElementById('mode_of_payment')
  paymentMethodListInBill.innerHTML = html
}

async function viewProjectInBillForm() {
  let project_list = await project_server.getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''
  var idx = 0
  html += `<option>ALL</option>`
  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    html += `<option>${project['project_name']}</option>`
  }
  var projectListInBill = document.getElementById('projectListInBill')
  projectListInBill.innerHTML = html
}

async function findBillDataDT(search_params){
  let bill_list = await bill_server.getBillList(search_params);
  console.log(JSON.stringify(bill_list))

  var dt_list = []
  var idx = 0

  for(idx = 0;idx<bill_list.length;idx++){
    var bill = bill_list[idx]
    var tran_data = [
      bill['bill_id'],
      bill['project_name'],
      bill['submission_date'],
      bill['bill_type'],
      bill['description'],
      bill['amount_claimed'],
      bill['amount_received'],
      bill['mode_of_payment'],
      bill['bank_name'],
      bill['account_no'],
      bill['status'],
      bill['reference'],
      bill['payment_received_date'],
      bill['vat'],
      bill['ait'],
    ]
    dt_list.push(tran_data)
  }
  return dt_list
}


async function showAllBillsDT(search_params){
  let dt_list = await findBillDataDT(search_params);
  
  $("#billListTable").dataTable({
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

async function sendAdvancedBillReport(event) {
  event.preventDefault() // stop the form from submitting
  
  let project_name = document.getElementById("projectListInBill").value;
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
  
  await showAllBillsDT(search_params)
}

viewProjectInBillForm()
viewPaymentMethodInBillForm()
let search_params = {}
showAllBillsDT(search_params)
