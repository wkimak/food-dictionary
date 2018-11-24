import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class RestaurantsComponent {
  @Input() restaurantData: Array<any>;
  @ViewChild('restaurantsChart') chartElement: ElementRef;

  title: string = 'Restaurants';
  constructor() { }

  buildChart() {
    const width: number = 560, height: number = 300;
    var svg = d3.select(this.chartElement.nativeElement)
    .attr('width', width)
    .attr('height', height)
    
    const data: Array<any> = [];

    for(let key in this.restaurantData) {
      data.push([key, this.restaurantData[key]]);
    }
    
    const g = svg.selectAll("g")
                   .data(data);
    
    // data bind when first data points come in
    const initialG = g.enter()
    .append('g')
    .attr("transform", function(d, i) { 
      return "translate(" + (i * (width/data.length)) + ", 0)"; 
    });

    // scale bars to multiiply by 29.4x 
    let y = d3.scaleLinear()
           .domain([0, 10])
           .range([height, 0]);

   // append rectangles to g element
    const rect = initialG.append('rect')
    .style('fill', 'pink')
    .attr('y', (data) => y(data[1]))
    .attr('width', () => width/data.length + 'px')
    .attr('height', (data) => height - y(data[1]) + 'px');
 
    // d3.selectAll('rect').data(data).attr('height', (data) => data[1] * 60)
    // d3.selectAll('g').data(data).exit().remove();
  }

  ngOnChanges() {
    this.buildChart();
    console.log('COMPONENT', this.restaurantData)
    console.log('Chart', this.chartElement);
  }

}
