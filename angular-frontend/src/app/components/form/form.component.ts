import { Component, OnInit } from '@angular/core';
import { AutoCompleteService } from '../../services/autoComplete/autoComplete.service';
import { RecipeService } from '../../services/recipe/recipe.service';
import { RestaurantsService } from '../../services/restaurants/restaurants.service';

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
  sourceUrl: string = '';

  constructor(private autoCompleteService: AutoCompleteService, 
              private recipeService: RecipeService, 
              private restaurantsService: RestaurantsService) {
    this.autoCompleteService.autoCompleteList.subscribe((foods: Array<any>) => {
      this.autoCompleteList = foods;
      if(!this.autoCompleteList.length) {
        this.showAutoComplete = false;
      }
    }) 

    this.recipeService.recipe.subscribe((sourceUrl: any) => {
      this.sourceUrl = sourceUrl[1];
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
    this.recipeService.fetchRecipe(this.searchTerm);
    this.restaurantsService.fetchRestaurants(this.searchTerm);
  }

}
