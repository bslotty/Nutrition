import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartType, GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html'
})
export class PieGraphComponent implements OnInit, OnChanges {


  chart: GoogleChartComponent;

  resolve: boolean = false;

  @Input() data;
  @Input() size;

  fontColor = "#EFEFEF";


  //  Data
  columnNames = ["Nutrient", "Value"];
  chartData = [];

  initialHeaders = [];
  initialData = [];
  colList = [];


  //  Chart Options
  title = "";
  // type = "PieChart"; 
  type = ChartType.PieChart;
  width = 200;
  height = 200;
  orientation = "horizontal";


  options = {

    /*  Axis jumps to another bar; looks inconsistant */
    animation: {
      duration: 300,
      easing: "linear",
      startup: true,
    },

    /*  Structure  */
    enableInteractivity: true,
    dynamicResize: true,
    chartArea: {
      left: "0%", top: "%0", width: '100%', height: '90%',
    },
    theme: "maximized",

    /*  Design  */
    backgroundColor: "transparent",
    colors: [
      "#4CAF50",
      "#2196F3",
      "#FFA000",

      "#9C27B0",
      "#F44336",
      "#FFEB3B",
    ],

    pieHole: 0.6,
    pieSliceText: "none",
    tooltip: {
      trigger: "selection" ,
    },

    /*  Section Specific  */
    legend: {
      position: "top" ,
    },
  };


  constructor() { }

  ngOnInit() {
    if (this.size == "small") {
      this.width = 40;
      this.height = 40;

      this.options.enableInteractivity = false;
      this.options.tooltip.trigger = "none";
      this.options.legend.position = "none";
    }

    this.setColors();
  }

  setColors() {
    if (this.chartData.length == 1){
      this.options.colors = ["#AAAAAF"];
    } else {
      this.options.colors = [
        "#4CAF50",
        "#2196F3",
        "#FFA000",
  
        "#9C27B0",
        "#F44336",
        "#FFEB3B",
      ]
    }

    console.log("options.colors", this.options.colors);
  }

  draw() {
    this.chart.chartWrapper.draw(document.getElementById("chart"));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chartData = this.data;
    this.setColors();
    // console.log("chartData: ", this.chartData);
  }

}
