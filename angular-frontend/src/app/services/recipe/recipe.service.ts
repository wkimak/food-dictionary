import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { SimilarFoodsService } from '../similarFoods/similar-foods.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private subject = new Subject<Array<string>>();
  public recipe = this.subject.asObservable();

  constructor(private http: HttpClient, private similarFoodsService: SimilarFoodsService) { }

  fetchRecipe(searchTerm: string) {
    return this.http.get(`http://localhost:5000/api/food/recipe/${searchTerm}`, {responseType: 'text'}).subscribe((recipe: string) => {
    const parsed = JSON.parse(recipe);
    this.subject.next(parsed);
    this.clipIdFromUrl(parsed[1]);
    })
  }

  clipIdFromUrl(url: string) {
    const split = url.split('-');
    const id: number = parseInt(split[split.length - 1]);
    this.similarFoodsService.fetchSimilarFoods(id);
  }
}
