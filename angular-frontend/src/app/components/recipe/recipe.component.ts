import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  title: string = 'Ingrediants';
  recipe: string = null;
  constructor(private recipeService: RecipeService) {
    this.recipeService.recipe.subscribe((recipe: any) => {
      this.recipe = recipe[0];
    }) 
  }

  ngOnInit() {
  }

}
