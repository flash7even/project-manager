'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

async function updateTransactionToServer(transaction_data, transaction_id) {
    var put_url = host_name + '/api/transaction/' + transaction_id
    let res = await axios.put(put_url, transaction_data);
    return res
}

async function sendUpdateTransactionForm(event) {
  event.preventDefault() // stop the form from submitting
  let amount = document.getElementById("amount").value;
  let mode_of_payment = document.getElementById("mode_of_payment").value;
  let payment_by = document.getElementById("payment_by").value;
  let cheque_no = document.getElementById("cheque_no").value;
  let description = document.getElementById("description").value;
  let status = document.getElementById("status").value;
  let transaction_id = document.getElementById("transaction_id").value;
  let payment_date = document.getElementById("payment_date").value;

  var transaction_data = {
    'amount': amount,
    'mode_of_payment': mode_of_payment,
    'payment_by': payment_by,
    'cheque_no': cheque_no,
    'description': description,
    'status': status,
    'payment_date': payment_date,
  }
  
  let data = await updateTransactionToServer(transaction_data, transaction_id);
  var message = 'Transaction Updated Successfully'
  if(data.status != 200 && data.status != 201){
    message = 'Transaction Update Failed'
  }
  ipc.send('after-transaction-update', message)

  var window = remote.getCurrentWindow();
  window.close();
}

ipc.on('update-transaction', function (event, message) {
  console.log('update-transaction: (update_transaction.js) ' + message)
  var transaction_id = document.getElementById('transaction_id')
  transaction_id.value = message
})
