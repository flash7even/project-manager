'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

async function addPaymentMethodToServer(pm_data) {
    var post_url = host_name + '/api/payment/method/'
    let res = await axios.post(post_url, pm_data);
    return res
}

async function sendAddPaymentMethodForm(event) {
    event.preventDefault() // stop the form from submitting
    let payment_method_name = document.getElementById("payment_method_name").value;
    let description = document.getElementById("description").value;

    var pm_data = {
      'payment_method_name': payment_method_name,
      'description': description
    }
    
    let data = await addPaymentMethodToServer(pm_data);
    var message = 'Payment Method Created Successfully'
    if(data.status != 200 && data.status != 201){
      message = 'Payment Method Creation Failed'
    }
    ipc.send('after-payment-method-creation', message)

    var window = remote.getCurrentWindow();
    window.close();
}
