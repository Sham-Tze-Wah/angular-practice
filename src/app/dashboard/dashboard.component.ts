import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import 'reflect-metadata';
import { ContentModel } from '../content/content.model';
import {CONTENT} from '../mock/mock-content';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @ViewChild('targetGauge') dashboard?: ElementRef;
  mergeOptions!: EChartsOption;
  contents : ContentModel[] = CONTENT;

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

  gaugeOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 10,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        progress: { /*Gauge progress doughnut */
          show: true,
          roundCap: true,
          width: 10
        },
        pointer: { /*Gauge progress pointer */
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '75%',
          width: 10,
          offsetCenter: [0, '5%']
        },
        axisLine: { /* Thickness of progress dougnut (grey color) */
          roundCap: true,
          lineStyle: {
            width: 10
          }
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          length: 12,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: { /* Number in the split */
          distance: 14,
          color: '#999',
          fontSize: 10
        },
        title: {
          show: false
        },
        detail: {
          backgroundColor: '#fff',
          borderColor: '#999',
          borderWidth: 2,
          width: '60%',
          lineHeight: 40,
          height: 30,
          borderRadius: 8,
          offsetCenter: [0, '35%'],
          valueAnimation: true,
          formatter: function (value: any) {
            return '{value|' + value.toFixed(0) + '}{unit|%}';
          },
          rich: {
            value: {
              fontSize: 20,
              fontWeight: 'bolder',
              color: '#777'
            },
            unit: {
              fontSize: 20,
              color: '#999',
              padding: [0, 0, 0, 10]
            }
          }
        },
        data: [
          {
            value: 50
          }
        ]
      }
    ]
  };

  options: EChartsOption = {
    legend: {},
    tooltip: {},
    dataset: {
      // Provide a set of data.
      source: [
        ['product', '2015', '2016', '2017'],
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1],
      ],
    },
    // Declare an x-axis (category axis).
    // The category map the first column in the dataset by default.
    xAxis: { type: 'category' },
    // Declare a y-axis (value axis).
    yAxis: {},
    // Declare several 'bar' series,
    // every series will auto-map to each column by default.
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
  };

  

  RandomDataset() {
    this.mergeOptions = {
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', ...this.getRandomValues()],
          ['Milk Tea', ...this.getRandomValues()],
          ['Cheese Cocoa', ...this.getRandomValues()],
          ['Walnut Brownie', ...this.getRandomValues()],
        ],
      },
    };
  }

  private getRandomValues() {
    const res: number[] = [];
    for (let i = 0; i < 3; i++) {
      res.push(Math.random() * 100);
    }
    return res;
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.initGaugeForTarget();
  }

  initGaugeForTarget(): void {
    const chartElement = this.elementRef.nativeElement.querySelector('#targetGauge');
    const myChart = echarts.init(chartElement);
    // Specify options and data here
    const options = this.gaugeOption;
    myChart.setOption(options);
  }



  
}
