'use strict'

const axios = require('axios');
var host_name = 'http://tarangopc:5000'

async function addBoqToServer(boq_data) {
    var post_url = host_name + '/api/boq/'
    let res = await axios.post(post_url, boq_data);
    return res
}
async function getBoqList() {
  var page = 0
  var boq_list = []
  while(1){
    var post_url = host_name + '/api/boq/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, {});
    var cur_list = res.data
    if(cur_list.length == 0) break;
    boq_list = boq_list.concat(cur_list)
    page++
  }
  return boq_list
}

module.exports.addBoqToServer = addBoqToServer
module.exports.getBoqList = getBoqList
