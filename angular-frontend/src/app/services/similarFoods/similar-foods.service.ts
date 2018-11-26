import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimilarFoodsService {
  
  private subject = new Subject<any>();
  similarFoods = this.subject.asObservable();
  constructor(private http: HttpClient) { }

  fetchSimilarFoods(id: number) {
    console.log(id);
    return this.http.get(`http://localhost:5000/api/food/similarRecipes/${id}`).subscribe((similarRecipes: any) => {
      this.subject.next(similarRecipes);
    }) 
  }
}
