'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const project_server = require('../services/project_services')
const transaction_server = require('../services/transaction_services')


async function findDivisionalProjectWiseTransactionStat() {
  let data = await transaction_server.getDivisionalProjectWiseTransactionStat();
  var dt_list = []

  var project_len = data['project_list'].length
  var idx = 0
  for(idx = 0;idx<project_len;idx++){
    var dataPointsList = [
      {
        'x': 0,
        'y': 0
      }
    ];
    var div = 0;
    for(div = 0;div<transaction_server.divisions;div++){
      var xval = div+1
      var yval = data['data_list_per_division'][div]['project_data_list'][idx]['amount_sum']
      var point = {
        'x': xval,
        'y': yval
      }
      dataPointsList.push(point);
    }
    var pdata = {        
      type: "stackedArea",
      showInLegend: true,
      toolTipContent: "<span><strong>{name}: </strong></span> {y}",
      name: data['project_list'][idx]['project_name'],
      dataPoints: dataPointsList
    }
    dt_list.push(pdata)
  }
  var dt_ret = {
    'dt_list': dt_list,
    'interval_duration': data['interval_duration']
  }
  return dt_ret
}

async function findWeeklyTransactionStatsCanvas(){
  let week_list = await transaction_server.getWeeklyTransactionStat();

  console.log(JSON.stringify(week_list))

  var dt_list = []
  var idx1 = 0
  for(idx1 = 0;idx1<week_list.length;idx1++){
    var week_data = week_list[idx1]
    var week_name = (idx1+1).toString()
    var tran_data1 = { label: week_name, y: parseFloat(week_data['total_amount_of_transactions']) }
    dt_list.push(tran_data1)
  }
  return dt_list
}

async function weeklyTransactionStat(){
  var dt_list = await findWeeklyTransactionStatsCanvas()
  var chart = new CanvasJS.Chart("weeklyTransactionStatChart", {
    animationEnabled: true,
    exportEnabled: true,
    zoomEnabled: true,
    interactivityEnabled: true,
    backgroundColor: "#FAFAFC",
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text: ""
    },
    axisY: {
      title: "BDT"
    },
    data: [{        
      type: "column",  
      showInLegend: true, 
      legendMarkerColor: "grey",
      legendText: "Weeks",
      dataPoints: dt_list
    }]
  });
  chart.render();
}

async function findTransactionAmountStatCanvas(){
  let project_list = await project_server.getProjectStat();
  console.log(JSON.stringify(project_list))

  var dt_list = []
  var idx = 0
  for(idx = 0;idx<project_list.length;idx++){
    var trans_stat = project_list[idx]
    var tran_data = { y: trans_stat['transaction_stat']['transaction_amount'], name: trans_stat['project_name'] }
    dt_list.push(tran_data)
  }
  console.log(JSON.stringify(dt_list))
  return dt_list
}

async function showTransactionAmountStat(){
  var dt_list = await findTransactionAmountStatCanvas()

  var chart = new CanvasJS.Chart("chartTransactionAmountStat", {
    theme: "white",
    exportFileName: "Doughnut Chart",
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    backgroundColor: "#FAFAFC",
    exportEnabled: true,
    zoomEnabled: true,
    animationEnabled: true,
    interactivityEnabled: true,
    title:{
      text: ""
    },
    legend:{
      cursor: "pointer",
      itemclick: explodePie
    },
    data: [{
      type: "doughnut",
      innerRadius: 70,
      showInLegend: true,
      toolTipContent: "<b>{name}</b>: {y} BDT (#percent%)",
      indexLabel: "{name} - #percent%",
      dataPoints: dt_list
    }]
  });
  chart.render();
  
  function explodePie (e) {
    if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();
  }
}

async function divisionWiseProjectTransactionStat(){
  var data_ret = await findDivisionalProjectWiseTransactionStat()
  var dt_list = data_ret['dt_list']
  var chart_title = "1 interval = " + data_ret['interval_duration'].toString() + ' days'

  var chart = new CanvasJS.Chart("divisionWiseProjectTransactionStatChart", {
    animationEnabled: true,
    exportEnabled: true,
    zoomEnabled: true,
    interactivityEnabled: true,
    backgroundColor: "#FAFAFC",
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text: ""
    },
    axisY :{
      valueFormatString: "#0,.",
      suffix: "k"
    },
    axisX: {
      title: chart_title
    },
    toolTip: {
      shared: true
    },
    data: dt_list
  });
  chart.render();
  
}

showTransactionAmountStat();
weeklyTransactionStat();
divisionWiseProjectTransactionStat();

function updatePageAfterAnyEvent(message){
  showTransactionAmountStat();
  weeklyTransactionStat();
  divisionWiseProjectTransactionStat();
  alert(message)
}

ipc.on('after-payment-method-creation-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})

ipc.on('after-project-creation-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})

ipc.on('after-project-update-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})

ipc.on('after-transaction-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})

ipc.on('after-bill-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})

ipc.on('after-material-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})

ipc.on('after-material-update-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})

ipc.on('after-boq-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})

ipc.on('after-boq-update-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})