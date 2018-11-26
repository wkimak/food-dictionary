import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-food-feed',
  templateUrl: './food-feed.component.html',
  styleUrls: ['./food-feed.component.css']
})
export class FoodFeedComponent implements OnInit {

    @Input() restaurantData: Array<any>;
    @Input() similarFoodsData: any;

  constructor() { }

  ngOnInit() {
  }

}
