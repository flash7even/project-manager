'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')

let data_table_height = '200px'

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

async function findProjectDataCanvas(){
  let project_list = await project_server.getProjectStat();
  console.log(JSON.stringify(project_list))

  var dt_list = [[], [], []]
  var idx1 = 0
  for(idx1 = 0;idx1<project_list.length;idx1++){
    var project = project_list[idx1]
    var tran_data1 = { label: project['project_name'], y: parseFloat(project['project_value']) }
    dt_list[0].push(tran_data1)
    var tran_data2 = { label: project['project_name'], y: project['transaction_stat']['transaction_amount'] }
    dt_list[1].push(tran_data2)
    var tran_data3 = { label: project['project_name'], y: project['bill_stat']['bill_amount'] }
    dt_list[2].push(tran_data3)
  }
  return dt_list
}

async function showProjectOverallChart(){
  let dt_list = await findProjectDataCanvas();
  
  var chart = new CanvasJS.Chart("projectOverallChart", {
    animationEnabled: true,
    title:{
      text: ""
    },
    axisY: {
      title: ""
    },
    legend: {
      cursor:"pointer",
      itemclick : toggleDataSeries
    },
    toolTip: {
      shared: true,
      content: toolTipFormatter
    },
    data: [{
      type: "bar",
      showInLegend: true,
      name: "Project Value",
      color: "#37305B",
      dataPoints: dt_list[0]
    },
    {
      type: "bar",
      showInLegend: true,
      name: "Total Amount of Transaction",
      color: "silver",
      dataPoints: dt_list[1]
    },
    {
      type: "bar",
      showInLegend: true,
      name: "Total Amount of Bill",
      color: "#898077",
      dataPoints: dt_list[2]
    }]
  });
  chart.render();

  function toolTipFormatter(e) {
    var str = "";
    var total = 0 ;
    var str3;
    var str2 ;
    for (var i = 0; i < e.entries.length; i++){
      var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ;
      total = e.entries[i].dataPoint.y + total;
      str = str.concat(str1);
    }
    str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
    // str3 = "<span style = \"color:Tomato\">Total: </span><strong>" + total + "</strong><br/>";
    str3 = "";
    return (str2.concat(str)).concat(str3);
  }

  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}

showAllProjectsDT()
showProjectOverallChart()


