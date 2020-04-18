'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')

async function viewProjectInBSForm() {
  let project_list = await project_server.getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''
  var idx = 0
  html += `<option>ALL</option>`
  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    html += `<option>${project['project_name']}</option>`
  }
  var projectListInBSheet = document.getElementById('projectListInBSheet')
  projectListInBSheet.innerHTML = html
}

async function showBalanceSheet(search_params) {
  let bs_data = await project_server.getBalanceSheet(search_params);
  console.log(JSON.stringify(bs_data))

  var html = ''

  var thead = `<thead>
                <tr>
                  <th># </th>
                  <th>Title</th>
                  <th>Amount</th>
                </tr>
              </thead>`
  
  html += thead

  html += `<tbody>`

  var balance_sheet_rows = '<tr>'
  balance_sheet_rows += `<th scope="row">1</th>`
  balance_sheet_rows += `<td>Total Credited Amound (Transaction)</td>`
  balance_sheet_rows += `<td>${bs_data['transaction_sheet']['credit_amount']}</td>`
  balance_sheet_rows += '</tr>'

  balance_sheet_rows += '<tr>'
  balance_sheet_rows += `<th scope="row">2</th>`
  balance_sheet_rows += `<td>Total Debited Amound (Transaction)</td>`
  balance_sheet_rows += `<td>${bs_data['transaction_sheet']['debit_amount']}</td>`
  balance_sheet_rows += '</tr>'

  balance_sheet_rows += '<tr>'
  balance_sheet_rows += `<th scope="row">3</th>`
  balance_sheet_rows += `<td>Transaction Balance</td>`
  balance_sheet_rows += `<td>${bs_data['transaction_sheet']['transaction_balance']}</td>`
  balance_sheet_rows += '</tr>'

  balance_sheet_rows += '<tr>'
  balance_sheet_rows += `<th scope="row">4</th>`
  balance_sheet_rows += `<td>Advanced Bill Amount</td>`
  balance_sheet_rows += `<td>${bs_data['bill_sheet']['advanced_bill']}</td>`
  balance_sheet_rows += '</tr>'

  balance_sheet_rows += '<tr>'
  balance_sheet_rows += `<th scope="row">5</th>`
  balance_sheet_rows += `<td>Running Bill Amount</td>`
  balance_sheet_rows += `<td>${bs_data['bill_sheet']['running_bill']}</td>`
  balance_sheet_rows += '</tr>'

  balance_sheet_rows += '<tr>'
  balance_sheet_rows += `<th scope="row">6</th>`
  balance_sheet_rows += `<td>Adjustment Bill Amount</td>`
  balance_sheet_rows += `<td>${bs_data['bill_sheet']['adjustment_bill']}</td>`
  balance_sheet_rows += '</tr>'

  balance_sheet_rows += '<tr>'
  balance_sheet_rows += `<th scope="row">7</th>`
  balance_sheet_rows += `<td>Final Bill Amount</td>`
  balance_sheet_rows += `<td>${bs_data['bill_sheet']['final_bill']}</td>`
  balance_sheet_rows += '</tr>'

  balance_sheet_rows += '<tr>'
  balance_sheet_rows += `<th scope="row">8</th>`
  balance_sheet_rows += `<td>Total Bill Amount</td>`
  balance_sheet_rows += `<td>${bs_data['bill_sheet']['total_bill']}</td>`
  balance_sheet_rows += '</tr>'

  html += balance_sheet_rows
  html += `</tbody>`

  var balanceSheetTable = document.getElementById('balanceSheetTable')
  balanceSheetTable.innerHTML = html
}

async function sendAdvancedBalanceSheetReport(event) {
  event.preventDefault() // stop the form from submitting
  
  let project_name = document.getElementById("projectListInBSheet").value;
  let payment_date_start = document.getElementById("payment_date_start").value;
  let payment_date_end = document.getElementById("payment_date_end").value;

  var search_params = {
    'payment_date_start': payment_date_start,
    'payment_date_end': payment_date_end
  }

  if (project_name != 'ALL'){
    search_params['project_name'] = project_name
  }
  
  await showBalanceSheet(search_params)
}

viewProjectInBSForm()
let search_params = {}
showBalanceSheet(search_params)