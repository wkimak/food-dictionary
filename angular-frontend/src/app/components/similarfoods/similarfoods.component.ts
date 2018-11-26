import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, ElementRef  } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-similarfoods',
  templateUrl: './similarfoods.component.html',
  styleUrls: ['./similarfoods.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimilarfoodsComponent implements OnInit {
  @Input() similarFoodsData: any;
  @ViewChild('similarFoodsChart') chartElement: ElementRef;
  
  title='Similar Foods';
  
  constructor() { }

  buildChart() {
    const margins = {left: 100}
    const height = 450, width = 500;
    d3.select(this.chartElement.nativeElement)
    .attr('width', width + margins.left)
    .attr('height', height)
    .append('g')
    .attr('class', 'circles_container')
    .attr('transform', 'translate(' + margins.left + ', 0)');
  }

  handleData() {
    const margins = {left: 100}
    const height = 450, width = 600;
    const data: Array<any> = [];
    
    const minutes: Array<number> = [];
    for(let key in this.similarFoodsData) {
      data.push([key, this.similarFoodsData[key]]);
      minutes.push(this.similarFoodsData[key]);
    }
    
    let y = d3.scaleLinear()
    .domain([0, d3.max(minutes)])
    .range([0, height/data.length]);

    const g = d3.select(this.chartElement.nativeElement).select('.circles_container')
    .selectAll('g')
    .attr('class', 'circle_group')
    .data(data)

    const initialG = g.enter().append('g')
    .attr("transform", function(d, i) { 
      let scaled = y(d[1])
      let random = Math.random() * ((400 - scaled) - scaled) + scaled;
      return "translate(" + (i * (500/data.length)) + "," + random + ")"; 
    })
    .on('mouseover', function() {
      d3.select(this).select('circle').style('fill', 'gold')
      d3.select(this).select('text').style('visibility', 'visible');
    })
    .on('mouseout', function() {
      d3.select(this).select('circle').style('fill', () => {
        const colors = ['pink', 'orange', 'blue', 'green', 'black', 'purple'];
        const random = Math.floor(Math.random() * colors.length);
        return colors[random];
      })
      d3.select(this).select('text').style('visibility', 'hidden');
    })

    const circle = initialG.append('circle')
    .style('fill', () => {
      const colors = ['pink', 'orange', 'blue', 'green', 'black', 'purple'];
      const random = Math.floor(Math.random() * colors.length);
      return colors[random];
    })
    .attr('r', (data) => {
      return y(data[1]);
    })
    

   const label = initialG.append('text')
            .attr('dx', -10)
            .text((data) => data[0])
            .style('visibility', 'hidden')
            

           
    
     d3.selectAll('text').data(data).text((data) => data[0]);
     

        d3.selectAll('circle').data(data).style('fill', () => {
          const colors = ['pink', 'orange', 'blue', 'green', 'black', 'purple'];
          const random = Math.floor(Math.random() * colors.length);
          return colors[random];
        })
        .attr('r', (data) => {
          return y(data[1]);
        });

       


  }

  
  ngOnChanges() {
    if(this.similarFoodsData) {
      this.handleData();
    }
  }

  ngOnInit() {
    this.buildChart();
  }

}
