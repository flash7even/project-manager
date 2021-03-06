'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const bill_server = require('../services/bill_services')
const payment_method_server = require('../services/payment_method_services')
const jshelper_services = require('../services/jshelper_services')

async function viewProjectInBillForm() {
  let project_list = await project_server.getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    html += `<option>${project['project_name']}</option>`
  }
  var projectListInBill = document.getElementById('projectListInBill')
  projectListInBill.innerHTML = html
}

async function viewPaymentMethodInBillForm() {
  let payment_method_list = await payment_method_server.getPaymentMethodList();
  console.log(JSON.stringify(payment_method_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<payment_method_list.length;idx++){
    var pm = payment_method_list[idx]
    html += `<option>${pm['payment_method_name']}</option>`
  }
  var paymentMethodListInBill = document.getElementById('mode_of_payment')
  paymentMethodListInBill.innerHTML = html
}

async function sendAddBillForm(event) {
    event.preventDefault() // stop the form from submitting

    var bill_data = {
      'project_name': document.getElementById("projectListInBill").value,
      'submission_date': document.getElementById("submission_date").value,
      'bill_type': document.getElementById("bill_type").value,
      'description': document.getElementById("description").value,
      'amount_claimed': jshelper_services.make_numeric(document.getElementById("amount_claimed").value),
      'amount_received': jshelper_services.make_numeric(document.getElementById("amount_received").value),
      'mode_of_payment': document.getElementById("mode_of_payment").value,
      'bank_name': document.getElementById("bank_name").value,
      'account_no': document.getElementById("account_no").value,
      'reference': document.getElementById("reference").value,
      'payment_received_date': document.getElementById("payment_received_date").value,
      'status': document.getElementById("status").value,
      'vat': jshelper_services.make_numeric(document.getElementById("vat").value),
      'ait': document.getElementById("ait").value,
    }
    
    let data = await bill_server.addBillToServer(bill_data);
    var message = 'Bill Successfull'
    if(data.status != 200 && data.status != 201){
      message = 'Bill Failed'
    }
    ipc.send('after-bill', message)
    
    var window = remote.getCurrentWindow();
    window.close();
}


//-------- make comma separated amount field -------//
function amount_claimed_changed(event){
  var input = document.getElementById("amount_claimed").value.toString();
  document.getElementById("amount_claimed").value = jshelper_services.bdt_currency_convert(input)
}
function amount_received_changed(event){
  var input = document.getElementById("amount_received").value.toString();
  document.getElementById("amount_received").value = jshelper_services.bdt_currency_convert(input)
}
function vat_changed(event){
  var input = document.getElementById("vat").value.toString();
  document.getElementById("vat").value = jshelper_services.bdt_currency_convert(input)
}
//-------- make comma separated amount field -------//

document.getElementById("submission_date").value = jshelper_services.get_current_date();
document.getElementById("payment_received_date").value = jshelper_services.get_current_date();

viewProjectInBillForm()
viewPaymentMethodInBillForm()
