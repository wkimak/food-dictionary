import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngrediantsService {

  constructor(private http: HttpClient) { }

  fetchIngrediants(searchTerm) {
    console.log(searchTerm);
  }
}
