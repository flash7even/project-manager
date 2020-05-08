'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const payment_method_server = require('../services/payment_method_services')

async function updatePaymentMethodEvent(payment_method_id) {
  ipc.send('call-payment-method-update', payment_method_id)
}

async function deletePaymentMethodEvent(payment_method_id) {
  var response = await payment_method_server.deletePaymentMethodToServer(payment_method_id)
  var window = remote.getCurrentWindow();
  window.reload();
}

async function showAllPaymentMethods() {
  let payment_method_list = await payment_method_server.getPaymentMethodList();
  console.log(JSON.stringify(payment_method_list))

  var html = ''

  var thead = `<thead>
                <tr>
                  <th># </th>
                  <th>Payment Method Name</th>
                  <th>Description </th>
                  <th>Created On</th>
                  <th>Action</th>
                </tr>
              </thead>`
  
  html += thead

  html += `<tbody>`

  var idx = 0

  for(idx = 0;idx<payment_method_list.length;idx++){
    var payment_method = payment_method_list[idx]
    var cur_payment_method = '<tr>'
    cur_payment_method += `<th scope="row">${idx.toString()}</th>`
    cur_payment_method += `<td>${payment_method['payment_method_name']}</td>`
    cur_payment_method += `<td>${payment_method['description']}</td>`
    cur_payment_method += `<td>${payment_method['created_at']}</td>`
    var payment_method_id = payment_method['id']
    //var btn1 = '<input type="button" onClick="updatePaymentMethodEvent(\'' + payment_method_id + '\')" value="Update"/>'
    var btn2 = '<input class="btn btn-info" type="button" onClick="deletePaymentMethodEvent(\'' + payment_method_id + '\')" value="Delete"/>'
    cur_payment_method += `<td>${btn2}</td>`
    cur_payment_method += '</tr>'
    html += cur_payment_method
  }

  html += `</tbody>`

  var paymentMethodListTable = document.getElementById('paymentMethodListTable')
  paymentMethodListTable.innerHTML = html
}

showAllPaymentMethods()

ipc.on('update-payment_method', function (event, message) {
  console.log('update-payment_method: (update_payment_method.js) ' + message)
  var payment_method_id = document.getElementById('payment_method_id')
  payment_method_id.value = message
})