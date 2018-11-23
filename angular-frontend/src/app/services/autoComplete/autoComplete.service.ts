import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {
  private subject = new Subject<Array<any>>();
  public autoCompleteList: Observable<Array<any>> = this.subject.asObservable();
  constructor(private http: HttpClient) { }
  
  fetchFoods(autoComplete: string) {
    return this.http.get(`http://localhost:5000/api/autoComplete/${autoComplete}`).subscribe((foods: Array<any>) => {
      this.subject.next(foods);
    })
  }
}
