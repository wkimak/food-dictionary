import { Component, OnInit } from '@angular/core';
import { IngrediantsService } from '../services/ingrediants/ingrediants.service';

@Component({
  selector: 'app-ingrediants',
  templateUrl: './ingrediants.component.html',
  styleUrls: ['./ingrediants.component.css']
})
export class IngrediantsComponent implements OnInit {
  title: string = 'Ingrediants';
  instructions: string = null;
  constructor(private ingrediantsService: IngrediantsService) {
    this.ingrediantsService.ingrediants.subscribe((instructions: string) => {
      this.instructions = instructions;
    }) 
  }

  ngOnInit() {
  }

}
