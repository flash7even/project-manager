'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const transaction_server = require('../services/transaction_services')
const payment_method_server = require('../services/payment_method_services')
const jshelper_services = require('../services/jshelper_services')


async function viewProjectInTransactionForm() {
  let project_list = await project_server.getProjectList();
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
  let payment_method_list = await payment_method_server.getPaymentMethodList();
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
    
    let data = await transaction_server.addTransactionToServer(transaction_data);
    var message = 'Transaction Successfull'
    if(data.status != 200 && data.status != 201){
      message = 'Transaction Failed'
    }
    ipc.send('after-transaction', message)
}

document.getElementById("payment_date").value = jshelper_services.get_current_date();

viewProjectInTransactionForm()
viewPaymentMethodInTransactionForm()