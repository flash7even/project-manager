'use strict'
/*
var script = document.createElement('script');
script.src = 'https://canvasjs.com/assets/script/jquery-1.11.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
var script2 = document.createElement('script');
script2.src = 'https://canvasjs.com/assets/script/jquery.canvasjs.min.js';
script2.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script2);
var script3 = document.createElement('script');
script3.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
script3.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script3);
*/
const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
var CanvasJS = require('canvasjs');

const axios = require('axios');
const ipc = electron.ipcRenderer

/*
const addProject = document.getElementById('addProject')
addProject.addEventListener('click', function (event) {
  ipc.send('add-project-window')
})
*/

ipc.on('after-transaction-complete', (event, message) => {
  alert(message)
})

ipc.on('after-project-creation-complete', (event, message) => {
  alert(message)
})

function showSSS(){
  window.onload = function () {

  //Better to construct options first and then pass it as a parameter
  var options = {
    animationEnabled: true,
    title: {
      text: "Project Investment",                
      fontColor: "Peru"
    },	
    axisY: {
      tickThickness: 0,
      lineThickness: 0,
      valueFormatString: " ",
      gridThickness: 0                    
    },
    axisX: {
      tickThickness: 0,
      lineThickness: 0,
      labelFontSize: 18,
      labelFontColor: "Peru"				
    },
    data: [{
      indexLabelFontSize: 26,
      toolTipContent: "<span style=\"color:#62C9C3\">{indexLabel}:</span> <span style=\"color:#CD853F\"><strong>{y}</strong></span>",
      indexLabelPlacement: "inside",
      indexLabelFontColor: "white",
      indexLabelFontWeight: 600,
      indexLabelFontFamily: "Verdana",
      color: "#62C9C3",
      type: "bar",
      dataPoints: [
        { y: 21, label: "21%", indexLabel: "Project P01" },
        { y: 25, label: "25%", indexLabel: "Project P02" },
        { y: 33, label: "33%", indexLabel: "Project P03" },
        { y: 36, label: "36%", indexLabel: "Project P04" },
        { y: 42, label: "42%", indexLabel: "Project P05" }
      ]
    }]
  };
  
  $("#chartContainer").CanvasJSChart(options);
  }
}

showSSS()
