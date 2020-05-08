'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const dimensions = require('../services/dimensions')

async function findProjectDataDT(){
  let project_list = await project_server.getProjectList();

  var dt_list = []
  var idx = 0

  for(idx = 0;idx<project_list.length;idx++){
    var project = project_list[idx]
    var tran_data = [
      project['project_name'],
      project['project_id'],
      project['project_value'],
      project['department'],
      project['noa_date'],
      project['contract_signing_date'],
      project['commencement_date'],
      project['completion_date'],
      project['adjusted_completion_date'],
      project['handover_date'],
      project['remarks'],
    ]
    dt_list.push(tran_data)
  }
  return dt_list
}

  async function showAllProjectsDT(){
    let dt_list = await findProjectDataDT();
    $("#projectListTable").dataTable({
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

showAllProjectsDT()


