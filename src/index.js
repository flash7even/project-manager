'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'
let divisions = 5

async function getWeeklyTransactionStat() {
  var no_of_weeks = 15
  var transaction_list = []
  var post_url = host_name + '/api/transaction/statsperweek/' + no_of_weeks.toString()
  console.log("post_url: " + post_url)
  let res = await axios.post(post_url, {});
  var transaction_list = res.data
  return transaction_list
}

async function getDivisionalProjectWiseTransactionStat() {
  var data_resp = []
  var post_url = host_name + '/api/transaction/statsperweek/perproject/' + divisions.toString()
  console.log("post_url: " + post_url)
  let res = await axios.post(post_url, {});
  var data_resp = res.data
  return data_resp
}

async function findDivisionalProjectWiseTransactionStat() {
  let data = await getDivisionalProjectWiseTransactionStat();
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
    for(div = 0;div<divisions;div++){
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
  let week_list = await getWeeklyTransactionStat();

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
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text: "Weekly Transaction Stats"
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

async function divisionWiseProjectTransactionStat(){
  var data_ret = await findDivisionalProjectWiseTransactionStat()
  var dt_list = data_ret['dt_list']
  var chart_title = "1 interval = " + data_ret['interval_duration'].toString() + ' days'

  var chart = new CanvasJS.Chart("divisionWiseProjectTransactionStatChart", {
    animationEnabled: true,
    title:{
      text: "Project Transactions Per Interval"
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