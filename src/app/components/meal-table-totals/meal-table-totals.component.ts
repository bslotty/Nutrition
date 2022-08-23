import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MealPart, Food } from 'src/app/services/data.service';

@Component({
  selector: 'app-meal-table-totals',
  templateUrl: './meal-table-totals.component.html',
  styles: [
  ]
})
export class MealTableTotalsComponent implements OnInit {

  @Input() parts: MealPart[];
  totals: Food;

  //  Table
  dataSource: MatTableDataSource<Food> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  visibleColumns = ["name", "protein", "fat", "carbs", "fiber", "sugar", "sodium", "calories"];

    
  constructor() { }

  ngOnInit(): void {

    this.totals = new Food("Totals");

    this.parts.forEach( p => {
      let multi = (p.amount / p.food.servingSize );
      this.totals.setProtein( +((p.food.protein * multi) + this.totals.protein).toFixed(1) );
      this.totals.setFat( +((p.food.fat * multi) + this.totals.fat).toFixed(1) );
      this.totals.setCarbs( +((p.food.carbs * multi) + this.totals.carbs).toFixed(1) );
      this.totals.setSodium( +((p.food.sodium * multi) + this.totals.sodium).toFixed(1) );
      this.totals.setSugar( +((p.food.sugar * multi) + this.totals.sugar).toFixed(1) );
      this.totals.setFiber( +((p.food.fiber * multi) + this.totals.fiber).toFixed(1));

      this.totals.setCalories();
    });

    // console.log(this.totals);

    //  Datasource
    this.dataSource = new MatTableDataSource([this.totals]);

    //  Table Features
    setTimeout(() => {
      this.dataSource.sort      = this.sort;
      this.dataSource.paginator = this.paginator;
    }); 
  }
}
