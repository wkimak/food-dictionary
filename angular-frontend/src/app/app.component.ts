import { Component } from '@angular/core';
import { RestaurantsService } from './services/restaurants/restaurants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  restaurantData: Array<any>;

  constructor(private restaurantsService: RestaurantsService) {
    this.restaurantsService.restaurants.subscribe((restaurants) => {
      this.restaurantData = restaurants;
    })
  }
}
