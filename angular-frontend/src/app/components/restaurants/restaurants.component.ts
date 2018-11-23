import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  title: string = 'Restaurants';
  constructor(private restaurantsService: RestaurantsService) { }

}
