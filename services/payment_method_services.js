'use strict'

const axios = require('axios');
const config = require('./config')

var host_name = config.host_name

async function addPaymentMethodToServer(pm_data) {
  var post_url = host_name + '/api/payment/method/'
  let res = await axios.post(post_url, pm_data);
  return res
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

async function deletePaymentMethodToServer(payment_method_id) {
  var put_url = host_name + '/api/payment/method/' + payment_method_id
  let res = await axios.delete(put_url);
  return res
}

module.exports.getPaymentMethodList = getPaymentMethodList
module.exports.addPaymentMethodToServer = addPaymentMethodToServer
module.exports.deletePaymentMethodToServer = deletePaymentMethodToServer

