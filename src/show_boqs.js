'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'
let data_table_height = '200px'

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

async function findBoqDataDT(){
  let boq_list = await getBoqList();
  console.log(JSON.stringify(boq_list))

  var dt_list = []
  var idx = 0

  for(idx = 0;idx<boq_list.length;idx++){
    var boq = boq_list[idx]
    var tran_data = [
      boq['boq_id'],
      boq['description'],
      boq['project_name'],
      boq['unit'],
      boq['unit_price'],
      boq['quantity'],
      boq['total_price'],
      boq['quoted_price'],
      boq['profit'],
      boq['issue_date'],
      boq['issue_quantity'],
      boq['issue_voucher'],
      boq['stock_in_hand'],
    ]
    dt_list.push(tran_data)
  }
  return dt_list
}

  async function showAllBoqsDT(){
    let dt_list = await findBoqDataDT();
    $("#boqListTable").dataTable({
      "aaData": dt_list,
      paging: true,
      destroy: true,
      scrollY: data_table_height,
      scrollCollapse: true,
      dom: 'Bfrtip',
      buttons: [
        // Options: 'copy', 'csv', 'excel', 'pdf', 'print',
        {
            extend: 'excel',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'csv',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'copy',
            exportOptions: {
                columns: ':visible'
            }
        },
        'colvis'
        ],
        columnDefs: [ {
            targets: -1,
            visible: false
        } ]
    });
}

showAllBoqsDT()
