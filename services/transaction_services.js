'use strict'

const axios = require('axios');
var host_name = 'http://tarangopc:5000'

let divisions = 10

async function addTransactionToServer(transaction_data) {
    var post_url = host_name + '/api/transaction/'
    let res = await axios.post(post_url, transaction_data);
    return res
}

async function deleteTransactionToServer(transaction_id) {
    var put_url = host_name + '/api/transaction/' + transaction_id
    let res = await axios.delete(put_url);
    return res
}

async function updateTransactionToServer(transaction_data, transaction_id) {
    var put_url = host_name + '/api/transaction/' + transaction_id
    let res = await axios.put(put_url, transaction_data);
    return res
}

async function getTransactionList(search_params = {}) {
  var page = 0
  var transaction_list = []
  while(page == 0){
    var post_url = host_name + '/api/transaction/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, search_params);
    var cur_list = res.data
    if(cur_list.length == 0) break;
    transaction_list = transaction_list.concat(cur_list)
    page++
  }
  return transaction_list
}

async function getWeeklyTransactionStat() {
  var no_of_weeks = 15
  var transaction_list = []
  var post_url = host_name + '/api/transaction/statsperweek/' + no_of_weeks.toString()
  console.log("post_url: " + post_url)
  let res = await axios.post(post_url, {});
  var transaction_list = res.data
  return transaction_list
}

async function getDivisionalProjectWiseTransactionStat() {
  var data_resp = []
  var post_url = host_name + '/api/transaction/statsperweek/perproject/' + divisions.toString()
  console.log("post_url: " + post_url)
  let res = await axios.post(post_url, {});
  var data_resp = res.data
  return data_resp
}

module.exports.addTransactionToServer = addTransactionToServer
module.exports.getWeeklyTransactionStat = getWeeklyTransactionStat
module.exports.getDivisionalProjectWiseTransactionStat = getDivisionalProjectWiseTransactionStat
module.exports.getTransactionList = getTransactionList
module.exports.deleteTransactionToServer = deleteTransactionToServer
module.exports.updateTransactionToServer = updateTransactionToServer
module.exports.divisions = divisions
