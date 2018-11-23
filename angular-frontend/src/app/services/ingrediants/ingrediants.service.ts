import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngrediantsService {
  private subject = new Subject<string>();
  public ingrediants = this.subject.asObservable();
  constructor(private http: HttpClient) { }

  fetchIngrediants(searchTerm: string) {
    return this.http.get(`http://localhost:5000/api/food/ingrediants/${searchTerm}`, {responseType: 'text'}).subscribe((instructions: string) => {
      this.subject.next(instructions);
    })
  }
}
