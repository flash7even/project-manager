'use strict'

const axios = require('axios');
const config = require('./config')

var host_name = config.host_name

async function addBillToServer(bill_data) {
    var post_url = host_name + '/api/bill/'
    let res = await axios.post(post_url, bill_data);
    return res
}

async function getBillList(search_params = {}) {
    var page = 0
    var bill_list = []
    while(page == 0){
      var post_url = host_name + '/api/bill/search/' + page.toString()
      console.log("post_url: " + post_url)
      let res = await axios.post(post_url, search_params);
      var cur_list = res.data
      if(cur_list.length == 0) break;
      bill_list = bill_list.concat(cur_list)
      page++
    }
    return bill_list
  }

module.exports.addBillToServer = addBillToServer
module.exports.getBillList = getBillList
