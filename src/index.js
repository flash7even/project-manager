'use strict'

const electron = require('electron')
alert('App Start')


function chart01(){
  window.onload = function () {

  var chart = new CanvasJS.Chart("chartContainer01", {
    theme: "white",
    exportFileName: "Doughnut Chart",
    exportEnabled: true,
    animationEnabled: true,
    title:{
      text: "Monthly Expense"
    },
    legend:{
      cursor: "pointer",
      itemclick: explodePie
    },
    data: [{
      type: "doughnut",
      innerRadius: 70,
      showInLegend: true,
      toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
      indexLabel: "{name} - #percent%",
      dataPoints: [
        { y: 450, name: "Food" },
        { y: 120, name: "Insurance" },
        { y: 300, name: "Travelling" },
        { y: 800, name: "Housing" },
        { y: 150, name: "Education" },
        { y: 150, name: "Shopping"},
        { y: 250, name: "Others" }
      ]
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
}

function chart02(){

  var chart = new CanvasJS.Chart("chartContainer02", {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    title:{
      text: "Simple Column Chart with Index Labels"
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}", //Shows y value on all Data Points
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "outside",
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 92, indexLabel: "Highest" },
        { x: 60, y: 68 },
        { x: 70, y: 38 },
        { x: 80, y: 71 },
        { x: 90, y: 54 },
        { x: 100, y: 60 },
        { x: 110, y: 36 },
        { x: 120, y: 49 },
        { x: 130, y: 21, indexLabel: "Lowest" }
      ]
    }]
  });
  chart.render();
  
}

chart01();
chart02();