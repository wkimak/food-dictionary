import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class RestaurantsComponent implements OnInit {
  @Input() restaurantData: Array<any>;
  @ViewChild('restaurantsChart') chartElement: ElementRef;
  @ViewChild('dataContainer') dataContainer: ElementRef;

  title: string = 'Restaurants';
  constructor() { }

  buildChart() {
    var margin = {top: 20, right: 30, bottom: 170, left: 40},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
   
    d3.select(this.chartElement.nativeElement)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

   const svg = d3.select(this.dataContainer.nativeElement)
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    // scale bars to multiiply by 29.4x 
    let y = d3.scaleLinear()
    .domain([0, 10])
    .range([height, 0]);

    let x = d3.scaleBand()
    .range([width, 0])
    .padding(0.1);

    const yAxis = d3.axisLeft(y);
    const xAxis = d3.axisBottom(x);

   svg.append('g')
      .attr('class', 'y_axis')
      .call(yAxis)
      .style('transform', 'translate(-10px, 0)');

  svg.append('g')
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis);

  }

  handleData() {
    
    const margin = {top: 20, right: 30, bottom: 170, left: 40},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  
    const svg = d3.select(this.dataContainer.nativeElement);

    let y = d3.scaleLinear()
    .domain([0, 10])
    .range([height, 0]);
   
    const data: Array<any> = [];

    for(let key in this.restaurantData) {
      data.push([key, this.restaurantData[key]]);
    } 

    const g = svg.selectAll('g .bar')
                   .data(data);

    // data bind when first data points come in
    const initialG = g.enter()
    .append('g')
    .attr('class', 'bar')
    .attr("transform", function(d, i) { 
      return "translate(" + (i * (width/data.length)) + ", 0)"; 
    });

    initialG.append("text")
    .attr('class', 'x_label')
    .attr('transform', 'translate(20,220)rotate(90)')
    .style('font-size', '12px')
    .text(function(d) { return d[0]; });

   // append rectangles to g element
    const rect = initialG.append('rect')
    .style('fill', () => {
      const colors = ['pink', 'orange', 'blue', 'green', 'black', 'purple'];
      const random = Math.floor(Math.random() * colors.length);
      return colors[random];
    })
    .attr('y', (data) => y(data[1]))
    .attr('width', () => width/data.length + 'px')
    .attr('height', (data) => height - y(data[1]) + 'px');

    d3.selectAll('rect')
      .data(data)
      .attr('y', (data) => y(data[1]))
      .attr('height', (data) => height - y(data[1]) + 'px');
    
    d3.selectAll('text .x_label')
      .data(data)
      .attr('transform', 'translate(20,220)rotate(90)')
      .style('font-size', '12px')
      .text(function(d) { console.log(d[0]); return d[0];  });



   d3.selectAll('g .bar').data(data).exit().remove();
  }


  ngOnInit() {
    this.buildChart();
  }

  ngOnChanges() {  
    //if(this.restaurantData) {
      this.handleData();
   // }
  }
}
