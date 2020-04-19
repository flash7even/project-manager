'use strict'

const axios = require('axios');
const config = require('./config')

var host_name = config.host_name

async function addBoqToServer(boq_data) {
    var post_url = host_name + '/api/boq/'
    let res = await axios.post(post_url, boq_data);
    return res
}
async function getBoqList(search_params) {
  var page = 0
  var boq_list = []
  while(1){
    var post_url = host_name + '/api/boq/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, search_params);
    var cur_list = res.data
    if(cur_list.length == 0) break;
    boq_list = boq_list.concat(cur_list)
    page++
  }
  return boq_list
}
async function getBoqReport(search_params) {
  var page = 0
  var boq_list = []
  while(1){
    var post_url = host_name + '/api/boq/report/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, search_params);
    var cur_list = res.data
    if(cur_list.length == 0) break;
    boq_list = boq_list.concat(cur_list)
    page++
  }
  return boq_list
}

module.exports.addBoqToServer = addBoqToServer
module.exports.getBoqList = getBoqList
module.exports.getBoqReport = getBoqReport
