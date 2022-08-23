import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Food, Meal } from 'src/app/services/data.service';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { ListEvent } from 'src/app/UI/components/list/list.component';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styles: [
  ]
})
export class MealListComponent implements OnInit {

  title = 'Meals';

  visibleColumns = ["name", "date"];
  listButtons = ["view"];

  headerButtons = [
    new IconButton("create")
      .setIconName("plus")
      .setButtonColor(MatColor.transparent)
      .setIconColor(MatColor.accent)
  ];

  readonly MatColor = MatColor;

  @Input() meals: Meal[];

  constructor(
    public _data: DataService,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }


  
  listEvent(event: ListEvent){
    console.log("event: ", event);
    this._data.meal = event.row;
    this.router.navigate(["meal", event.row.id]);
  }

  headerEvent(event: string){
    console.log("header.event: ", event);
    if(event == "create"){
      this._data.meal = new Meal("Create").setDate( new Date() )
      this.router.navigate(["meal", "Create"]);
    }
  }

  viewMeal(m: Meal) {
    this._data.meal = m;
    this.router.navigate(["meal", m.id]);
  }
}
