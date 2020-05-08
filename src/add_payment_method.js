'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const payment_method_server = require('../services/payment_method_services')
const jshelper_services = require('../services/jshelper_services')

async function sendAddPaymentMethodForm(event) {
    event.preventDefault() // stop the form from submitting
    let payment_method_name = document.getElementById("payment_method_name").value;
    let description = document.getElementById("description").value;

    var pm_data = {
      'payment_method_name': payment_method_name,
      'description': description
    }
    
    let data = await payment_method_server.addPaymentMethodToServer(pm_data);
    var message = 'Payment Method Created Successfully'
    if(data.status != 200 && data.status != 201){
      message = 'Payment Method Creation Failed'
    }
    ipc.send('after-payment-method-creation', message)
    
    var window = remote.getCurrentWindow();
    window.close();
}
