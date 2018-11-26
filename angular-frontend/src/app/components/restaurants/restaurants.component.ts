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

  private svgMargins: any = {top: 20, right: 30, bottom: 170, left: 40};
  private width: number = 500 - this.svgMargins.left - this.svgMargins.right;
  private height: number = 400 - this.svgMargins.top - this.svgMargins.bottom;

  buildChart() {
   // select svg element and set width/height
    d3.select(this.chartElement.nativeElement)
    .attr('width', this.width + this.svgMargins.left + this.svgMargins.right)
    .attr('height', this.height + this.svgMargins.top + this.svgMargins.bottom)
  // select svg's inner data container, shift to left and up
   const dataContainer = d3.select(this.dataContainer.nativeElement)
    .attr('transform', 'translate(' + this.svgMargins.left + ',' + this.svgMargins.top + ')');
    
    // scale bars to multiiply by 29.4x 
    const yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([this.height, 0]);

    const xScale = d3.scaleBand()
    .range([this.width, 0])
    .padding(0.1);

    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale);
  // append y axis
   dataContainer.append('g')
      .attr('class', 'y_axis')
      .call(yAxis)
      .style('transform', 'translate(-10px, 0)');
 // append x axis
  dataContainer.append('g')
     .attr("transform", "translate(0," + this.height + ")")
     .call(xAxis);
  }

  handleData() {
    const dataContainer = d3.select(this.dataContainer.nativeElement);

    const yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([this.height, 0]);
   
    // loop over restaurant data object, push into d3's data array
    const data: Array<any> = [];
    for(let key in this.restaurantData) {
      data.push([key, this.restaurantData[key]]);
    } 
  
    const g = dataContainer.selectAll('g .bar')
                           .data(data);

    // data bind when first data points come in
    const initialG = g.enter()
                      .append('g')
                      .attr('class', 'bar')
                     
   // append rectangle element to g element
    initialG.append('rect')

     // append x axis labels
    initialG.append("text")
            .attr('class', 'x_label')

    d3.selectAll('g.bar')
      .attr("transform", (d, i) => { 
        console.log(this.width/data.length, this.width, data.length);
        return "translate(" + (i * (this.width/data.length)) + ", 0)"; 
      });
   
    // rect element
    d3.selectAll('rect')
    .data(data)
    .style('fill', () => {
      const colors = ['pink', 'orange', 'blue', 'green', 'black', 'purple'];
      const random = Math.floor(Math.random() * colors.length);
      return colors[random];
    })
    .attr('y', (data) => yScale(data[1]))
    .attr('width', () => this.width/data.length + 'px')
    .attr('height', (data) => this.height - yScale(data[1]) + 'px');
   
    // x axis label
    d3.selectAll('text.x_label')
      .data(data)
      .attr('transform', 'translate(20,220)rotate(90)')
      .style('font-size', '12px')
      .text((d) => d[0] );

    d3.selectAll('g .bar').data(data).exit().remove();
  }


  ngOnInit() {
    this.buildChart();
  }

  ngOnChanges() {  
    this.handleData();
  }
}
