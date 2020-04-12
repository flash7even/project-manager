'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

async function deletePaymentMethodToServer(payment_method_id) {
    var put_url = host_name + '/api/payment/method/' + payment_method_id
    let res = await axios.delete(put_url);
    return res
}

async function updatePaymentMethodEvent(payment_method_id) {
  ipc.send('call-payment-method-update', payment_method_id)
}

async function deletePaymentMethodEvent(payment_method_id) {
  var response = await deletePaymentMethodToServer(payment_method_id)
  alert(JSON.stringify(response.data))
  var window = remote.getCurrentWindow();
  window.reload();
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

async function showAllPaymentMethods() {
  let payment_method_list = await getPaymentMethodList();
  console.log(JSON.stringify(payment_method_list))

  var html = ''

  var thead = `<thead>
                <tr>
                  <th># </th>
                  <th>Payment Method Name</th>
                  <th>Description </th>
                  <th>Created On</th>
                  <th>Delete</th>
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
    var btn2 = '<input type="button" onClick="deletePaymentMethodEvent(\'' + payment_method_id + '\')" value="Delete"/>'
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