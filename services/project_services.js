'use strict'

const axios = require('axios');
const config = require('./config')

var host_name = config.host_name

async function addProjectToServer(project_data) {
  var post_url = host_name + '/api/project/'
  let res = await axios.post(post_url, project_data);
  return res
}

async function updateProjectToServer(project_data, project_id) {
  var put_url = host_name + '/api/project/' + project_id
  let res = await axios.put(put_url, project_data);
  return res
}

async function deleteProjectToServer(project_id) {
    var put_url = host_name + '/api/project/' + project_id
    let res = await axios.delete(put_url);
    return res
}

async function getProjectList() {
  var page = 0
  var project_list = []
  while(1){
    var post_url = host_name + '/api/project/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, {});
    var cur_list = res.data
    if(cur_list.length == 0) break;
    project_list = project_list.concat(cur_list)
    page++
  }
  return project_list
}

async function getProjectStat() {
  var page = 0
  var project_list = []
  while(1){
    var post_url = host_name + '/api/project/stats/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, {});
    var cur_list = res.data
    if(cur_list.length == 0) break;
    project_list = project_list.concat(cur_list)
    page++
  }
  return project_list
}

async function getBalanceSheet(search_param) {
  var post_url = host_name + '/api/project/balance/sheet'
  console.log("post_url: " + post_url)
  let res = await axios.post(post_url, search_param);
  var balance_sheet = res.data
  return balance_sheet
}

module.exports.getProjectList = getProjectList
module.exports.getProjectStat = getProjectStat
module.exports.addProjectToServer = addProjectToServer
module.exports.updateProjectToServer = updateProjectToServer
module.exports.deleteProjectToServer = deleteProjectToServer
module.exports.getBalanceSheet = getBalanceSheet
