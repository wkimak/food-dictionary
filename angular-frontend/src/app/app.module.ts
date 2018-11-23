import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComponent } from './components/form/form.component';
import { FoodFeedComponent } from './components/food-feed/food-feed.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { SimilarfoodsComponent } from './components/similarfoods/similarfoods.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComponent,
    FoodFeedComponent,
    RecipeComponent,
    SimilarfoodsComponent,
    RestaurantsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
