'use strict'

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const axios = require('axios');

var host_name = 'http://tarangopc:5000'

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

function showAllBillsTest(){
  $(function(){
    $("#billsTable").dataTable({
      "aaData":[
        ["Sitepoint","http://sitepoint.com","Blog","2013-10-15 10:30:00"],
        ["Flippa","http://flippa.com","Marketplace","null"],
        ["99designs","http://99designs.com","Marketplace","null"],
        ["Learnable","http://learnable.com","Online courses","null"],
        ["Rubysource","http://rubysource.com","Blog","2013-01-10 12:00:00"],
        ["Sitepoint","http://sitepoint.com","Blog","2013-10-15 10:30:00"],
        ["Flippa","http://flippa.com","Marketplace","null"],
        ["99designs","http://99designs.com","Marketplace","null"],
        ["Learnable","http://learnable.com","Online courses","null"],
        ["Rubysource","http://rubysource.com","Blog","2013-01-10 12:00:00"],
        ["Sitepoint","http://sitepoint.com","Blog","2013-10-15 10:30:00"],
        ["Flippa","http://flippa.com","Marketplace","null"],
        ["99designs","http://99designs.com","Marketplace","null"],
        ["Learnable","http://learnable.com","Online courses","null"],
        ["Rubysource","http://rubysource.com","Blog","2013-01-10 12:00:00"],
        ["Sitepoint","http://sitepoint.com","Blog","2013-10-15 10:30:00"],
        ["Flippa","http://flippa.com","Marketplace","null"],
        ["99designs","http://99designs.com","Marketplace","null"],
        ["Learnable","http://learnable.com","Online courses","null"],
        ["Rubysource","http://rubysource.com","Blog","2013-01-10 12:00:00"]
      ],
      "aoColumnDefs":[{
            "sTitle":"Site name"
          , "aTargets": [ "site_name" ]
      },{
            "aTargets": [ 1 ]
          , "bSortable": false
          , "mRender": function ( url, type, full )  {
              return  '<a href="'+url+'">' + url + '</a>';
          }
      },{
            "aTargets":[ 3 ]
          , "sType": "date"
          , "mRender": function(date, type, full) {
              return (full[2] == "Blog") 
                        ? new Date(date).toDateString()
                        : "N/A" ;
          }  
      }]
    });
  })
}

showAllBillsTest()