import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  restaurants: Array<any> = [];
  constructor(private http: HttpClient) { }

  fetchRestaurants(searchTerm) {
    return this.http.get(`http://localhost:5000/api/food/restaurants/${searchTerm}`).subscribe((restaurants) => {
      console.log(restaurants);
    })
  }

  
}
