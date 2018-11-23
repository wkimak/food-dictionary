import { Component, OnInit } from '@angular/core';
import { AutoCompleteService } from '../services/autoComplete/autoComplete.service';
import { IngrediantsService } from '../services/ingrediants/ingrediants.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  searchTerm: string = '';
  autoComplete: string = '';
  autoCompleteList: Array<any> = null;
  showAutoComplete: boolean = false;

  constructor(private autoCompleteService: AutoCompleteService, private ingrediantsService: IngrediantsService) {
    this.autoCompleteService.autoCompleteList.subscribe((foods: Array<any>) => {
      this.autoCompleteList = foods;
      if(!this.autoCompleteList.length) {
        this.showAutoComplete = false;
      }
    }) 
  }

  handleKey(e) {
  //   if(e.key !== 'Backspace') {
  //     this.autoComplete += e.key;
  //   } else {
  //     let slice = this.autoComplete.slice(0, this.autoComplete.length - 1);
  //     this.autoComplete = slice;
  //   }
  //  if(this.autoComplete.length) {
  //    this.autoCompleteService.fetchFoods(this.autoComplete);
  //    this.showAutoComplete = true;
  //  } else {
  //    this.showAutoComplete = false;
  //  }
  }

  fetchFood() {
    this.autoComplete = '';
    this.ingrediantsService.fetchIngrediants(this.searchTerm);
  }

}
