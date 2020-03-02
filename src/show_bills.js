'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'
let data_table_height = '200px'

async function getBillList() {
  var page = 0
  var bill_list = []
  while(1){
    var post_url = host_name + '/api/bill/search/' + page.toString()
    console.log("post_url: " + post_url)
    let res = await axios.post(post_url, {});
    var cur_list = res.data
    if(cur_list.length == 0) break;
    bill_list = bill_list.concat(cur_list)
    page++
  }
  return bill_list
}

async function getWeeklyBillStat() {
  var no_of_weeks = 7
  var bill_list = []
  var post_url = host_name + '/api/bill/statsperweek/' + no_of_weeks.toString()
  console.log("post_url: " + post_url)
  let res = await axios.post(post_url, {});
  var bill_list = res.data
  return bill_list
}

async function showAllBills() {
  let bill_list = await getBillList();
  console.log(JSON.stringify(bill_list))

  var html = ''
  var idx = 0

  for(idx = 0;idx<bill_list.length;idx++){
    var bill = bill_list[idx]
    var cur_bill = '<tr>'
    cur_bill += `<th scope="row">${idx.toString()}</th>`
    cur_bill += `<td>${bill['bill_id']}</td>`
    cur_bill += `<td>${bill['amount']}</td>`
    cur_bill += `<td>${bill['project_name']}</td>`
    cur_bill += '</tr>'
    html += cur_bill
  }
  // set list html to the todo items
  var billListTable = document.getElementById('billListTable')
  billListTable.innerHTML = html
}

async function findBillDataDT(){
  let bill_list = await getBillList();
  console.log(JSON.stringify(bill_list))

  var dt_list = []
  var idx = 0

  for(idx = 0;idx<bill_list.length;idx++){
    var bill = bill_list[idx]
    var tran_data = [bill['bill_id'], bill['amount'], bill['project_name'], "2013-10-15 10:30:00"]
    dt_list.push(tran_data)
  }
  return dt_list
}

async function findWeeklyBillStatsCanvas(){
  let week_list = await getWeeklyBillStat();

  console.log(JSON.stringify(week_list))

  var dt_list = []
  var idx1 = 0
  for(idx1 = 0;idx1<week_list.length;idx1++){
    var week_data = week_list[idx1]
    var week_name = 'week_' + (idx1+1).toString()
    var tran_data1 = { label: week_name, y: parseFloat(week_data['total_amount_of_bills']) }
    dt_list.push(tran_data1)
  }
  return dt_list
}

async function showAllBillsDT(){
  let dt_list = await findBillDataDT();
  $("#billsTable").dataTable({
    "aaData": dt_list,
    paging: true,
    scrollY: data_table_height,
    scrollCollapse: true,
    dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ]
  });
}

async function weeklyBillStat(){
  let dt_list = await findWeeklyBillStatsCanvas();

  var chart = new CanvasJS.Chart("weeklyBillStatChart", {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text: "Weekly Bill Stats"
    },
    axisY: {
      title: "Amount in BDT"
    },
    data: [{        
      type: "column",  
      showInLegend: true, 
      legendMarkerColor: "grey",
      legendText: "1 USD = 85 BDT",
      dataPoints: dt_list
    }]
  });
  chart.render();
}

showAllBillsDT()
weeklyBillStat()