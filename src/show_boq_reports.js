'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const boq_server = require('../services/boq_services')
const jshelper_services = require('../services/jshelper_services')
const dimensions = require('../services/dimensions')

async function viewProjectInBoqForm() {
  let project_list = await project_server.getProjectList();
  console.log(JSON.stringify(project_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    html += `<option>${project['project_name']}</option>`
  }
  var projectListInBoq = document.getElementById('projectListInBoq')
  projectListInBoq.innerHTML = html
}

async function findBoqDataDT(search_params){
  let boq_list = await boq_server.getBoqReport(search_params);
  console.log(JSON.stringify(boq_list))

  var dt_list = []
  var idx = 0

  for(idx = 0;idx<boq_list.length;idx++){
    var boq = boq_list[idx]
    var tran_data = [
      boq['boq_id'],
      boq['project_name'],
      boq['material_name'],
      boq['unit'],
      boq['unit_price'],
      boq['issue_date'],
      boq['total_price'],
      boq['boq_set_total_price'],
      boq['total_quantity'],
      boq['boq_set_total_quantity'],
      boq['stock_in_hand'],
    ]
    dt_list.push(tran_data)
  }
  return dt_list
}

  async function showAllBoqsDT(search_params){
    let dt_list = await findBoqDataDT(search_params);
    $("#boqListTable").dataTable({
      "aaData": dt_list,
      paging: true,
      destroy: true,
      sScrollX: dimensions.data_table_height,
      responsive: true,
      pageLength: 20,
      dom: 'Bfrtip',
      buttons: [
        // Options: 'copy', 'csv', 'excel', 'pdf', 'print',
        {
            extend: 'excelHtml5',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'csvHtml5',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'copyHtml5',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
          extend: 'pdfHtml5',
          exportOptions: {
              columns: ':visible'
          }
        },
        {
            collectionTitle: 'Select Columns',
            extend: 'colvis',
            collectionLayout: 'four-column'
        }
        ],
        columnDefs: [ {
            targets: -1,
            visible: false
        } ]
    });
}


async function sendAdvancedBOQReport(event) {
  event.preventDefault() // stop the form from submitting
  
  var search_params = {
    'project_name': document.getElementById("projectListInBoq").value,
    'issue_date_start': document.getElementById("issue_date_start").value,
    'issue_date_end': document.getElementById("issue_date_end").value
  }
  
  await showAllBoqsDT(search_params)
}


showAllBoqsDT({})
viewProjectInBoqForm()