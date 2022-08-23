import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ChartType, GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html'
})
export class LineGraphComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() parentName;
  @Input() preset;

  @ViewChild('chart') chart;

  fontColor = "#EFEFEF";


  //  Data
  columnNames = [];
  chartData = [];

  initialHeaders = [];
  initialData = [];
  colList = [];


  //  Chart Options
  title = "";
  type = ChartType.LineChart;
  width = 0;
  height = 400;
  orientation = "horizontal";


  options = {

    /*  Axis jumps to another bar; looks inconsistant */
    animation: {
      duration: 300,
      easing: "linear",
      startup: true,
    },

    /*  Structure  */
    enableInteractivity: false,
    explorer: {
      maxZoomIn: 1,
      maxZoomOut: 1,
      keepInBounds: true,
    },

    dynamicResize: true,
    chartArea: {
      left: "50", top: "50", width: '90%', height: '75%',
    },
    fontName: "Roboto",
    theme: "maximized",
    pointSize: 10,

    /*  Design  */
    backgroundColor: "transparent",
    colors: [
      //  "#00BCD4",
      "#4CAF50",
      "#2196F3",
      "#F44336",

      "#9C27B0",
      "#FF9800",
      "#795548",
    ],

    tooltip: {
      trigger: "selection",
    },

    /*  Section Specific  */
    legend: {
      position: "top",
    },
    hAxis: {
      format: "E \n MM-dd ",
      textPosition: "out",
      slantedText: false,

      
      // showTextEvery: 1,
      gridlines: {
        // minSpacing: 40,
        interval: 1,
      },
      // minorGridlines: {
      //   count: 0,
      // },
    },
    vAxis: {
      textPosition: "out",

      // showTextEvery: 1,

      // minorGridlines: {
      //   count: 0,
      // },
    },
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  
    let w = this.chart.element.nativeElement.parentElement.clientWidth;
    this.width = w * 0.97;
  }

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    // this.columnNames = this.data[0];
    // this.chartData = this.data.filter((d, i) => i > 0 );

    // console.log("ChartData: ", this.data);

    // let w = this.elRef.nativeElement.parentElement.clientWidth;
    // this.width = w * 0.97;
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.columnNames = this.data[0];
    this.chartData = this.data.filter((d, i) => i > 0 );

    console.log("changes.ChartData: ", this.data);

    let w = this.elRef.nativeElement.parentElement.clientWidth;
    this.width = w * 0.99;

  }
}
