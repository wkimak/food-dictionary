import { Component } from '@angular/core';
import { RestaurantsService } from './services/restaurants/restaurants.service';
import { SimilarFoodsService } from './services/similarFoods/similar-foods.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  restaurantData: Array<any>;
  similarFoodsData: any;

  constructor(private restaurantsService: RestaurantsService, private similarFoodsService: SimilarFoodsService) {
    this.restaurantsService.restaurants.subscribe((restaurants) => {
      this.restaurantData = restaurants;
    })

    this.similarFoodsService.similarFoods.subscribe((similarFoods) => {
      this.similarFoodsData = similarFoods;
    })
  }
}
