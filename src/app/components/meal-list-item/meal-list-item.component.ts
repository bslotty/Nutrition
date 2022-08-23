import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { DataService, Food, Meal, MealPart } from 'src/app/services/data.service';

@Component({
  selector: 'app-meal-list-item',
  templateUrl: './meal-list-item.component.html',
  styles: [
  ]
})
export class MealListItemComponent implements OnInit {

  @Input() meal: Meal;

  constructor(
    public _data:DataService,
  ) { }

  ngOnInit(): void {}
  

  partListEvent(event){
    console.log("event: ", event);
  }
  

}
