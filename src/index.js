'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'


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

async function findTransactionAmountStatCanvas(){
  let project_list = await getProjectStat();
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

async function findTransactionCountStatCanvas(){
  let project_list = await getProjectStat();
  console.log(JSON.stringify(project_list))

  var dt_list = []
  var idx = 0
  for(idx = 0;idx<project_list.length;idx++){
    var trans_stat = project_list[idx]
    var tran_data = { y: trans_stat['transaction_stat']['transaction_count'], label: trans_stat['project_name'] }
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
    exportEnabled: true,
    animationEnabled: true,
    title:{
      text: "Transaction Amount Stats"
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

async function showTransactionCountStat(){
  var dt_list = await findTransactionCountStatCanvas()

  var chart = new CanvasJS.Chart("chartTransactionCountStat", {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text: "Transaction Count Stats"
    },
    axisY: {
      title: "Transaction Count"
    },
    data: [{        
      type: "column",  
      showInLegend: true, 
      legendMarkerColor: "grey",
      legendText: "",
      dataPoints: dt_list
    }]
  });
  chart.render();
  
}

showTransactionAmountStat();
showTransactionCountStat();

function updatePageAfterAnyEvent(message){
  showTransactionAmountStat();
  showTransactionCountStat();
  alert(message)
}

ipc.on('after-project-creation-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})

ipc.on('after-transaction-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})

ipc.on('after-bill-complete', function (event, message) {
  updatePageAfterAnyEvent(message);
})

ipc.on('update-project-index', function (event, message) {
  //alert('update-project-index: (index.js) ')
  console.log('update-project-index: (index.js) ' + message)
  ipc.send('update-project-from-index', message)
})