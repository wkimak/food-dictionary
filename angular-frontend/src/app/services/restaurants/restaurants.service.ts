import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  
  private subject = new Subject <any> ();
  public restaurants = this.subject.asObservable();

  constructor(private http: HttpClient) { }

  fetchRestaurants(searchTerm) {
    return this.http.get(`http://localhost:5000/api/food/restaurants/${searchTerm}`).subscribe((restaurants) => {
      this.subject.next(restaurants);
    })
  }

  
}
