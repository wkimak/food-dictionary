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

  private svgMargins: any = {left: 100};
  private height: number = 450;
  private width: number = 500;

  buildChart() {
    // select svg element, set width/height
    d3.select(this.chartElement.nativeElement)
    .attr('width', this.width + this.svgMargins.left)
    .attr('height', this.height)
  }

  handleData() {
    const data: Array<any> = [];

    // array to hold minutesToReady data
    // loop over similarFoods obect, push into d3's data array
    const minutes: Array<number> = [];
    for(let key in this.similarFoodsData) {
      data.push([key, this.similarFoodsData[key]]);
      minutes.push(this.similarFoodsData[key]);
    }
    
    let yScale = d3.scaleLinear()
                   .domain([0, d3.max(minutes)])
                   .range([0, this.height/data.length]);

    const g = d3.select(this.chartElement.nativeElement)
                .selectAll('g')
                .attr('class', 'circle_group')
                .data(data)

    const initialG = g.enter()
                      .append('g')
                      .attr("transform", function(d, i) { 
                        let scaled = yScale(d[1])
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

    initialG.append('circle')
    initialG.append('text')
            
    d3.selectAll('text')
      .data(data)
      .attr('dx', -10)
      .text((data) => data[0])
      .style('visibility', 'hidden')
     

    d3.selectAll('circle')
      .data(data)
      .style('fill', () => {
          const colors = ['pink', 'orange', 'blue', 'green', 'black', 'purple'];
          const random = Math.floor(Math.random() * colors.length);
          return colors[random];
      })
      .attr('r', (data) => {
        return yScale(data[1]);
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
