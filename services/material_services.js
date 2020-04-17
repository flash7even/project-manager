'use strict'

const axios = require('axios');
var host_name = 'http://tarangopc:5000'


async function addMaterialToServer(material_data) {
    var post_url = host_name + '/api/material/'
    let res = await axios.post(post_url, material_data);
    return res
}

async function updateMaterialToServer(material_data, material_id) {
    var put_url = host_name + '/api/material/' + material_id
    let res = await axios.put(put_url, material_data);
    return res
}

async function deleteMaterialToServer(material_id) {
    var put_url = host_name + '/api/material/' + material_id
    let res = await axios.delete(put_url);
    return res
}

async function getMaterialList(search_param) {
  var page = 0
  var material_list = []
  while(1){
    var post_url = host_name + '/api/material/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, search_param);
    var cur_list = res.data
    if(cur_list.length == 0) break;
    material_list = material_list.concat(cur_list)
    page++
  }
  return material_list
}

module.exports.addMaterialToServer = addMaterialToServer
module.exports.getMaterialList = getMaterialList
module.exports.updateMaterialToServer = updateMaterialToServer
module.exports.deleteMaterialToServer = deleteMaterialToServer
