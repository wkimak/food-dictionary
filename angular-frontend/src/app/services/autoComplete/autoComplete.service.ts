import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {
  private subject = new Subject();
  public autoCompleteList = this.subject.asObservable();
  constructor(private http: HttpClient) { }
  
  fetchFoods(autoComplete) {
    return this.http.get(`http://localhost:5000/api/autoComplete/${autoComplete}`).subscribe((foods) => {
      this.subject.next(foods);
    })
  }
}
