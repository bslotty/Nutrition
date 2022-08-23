import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { combineAll, combineLatest, combineLatestAll, filter, map, merge, Observable, Subject } from 'rxjs';
import { DataService, Food } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { MatColor } from 'src/app/UI/services/utilities.service';


@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styles: [
  ]
})
export class FoodListComponent implements OnInit {

  //  Accessor
  readonly MatColor = MatColor;

  //  Headers
  title = 'Foods';
  headerButtons = [
    new IconButton("create")
      .setIconName("plus")
      .setButtonColor(MatColor.transparent)
      .setIconColor(MatColor.accent)
  ];


  //  Table
  masterList: Food[];
  filteredList: Food[];
  dataSource: MatTableDataSource<Food> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  visibleColumns = [
    "name", 
    "protein", 
    "fat", 
    "carbs", 
    "fiber", 
    "sugar", 
    "sodium", 
    // "pie", 
    // "view", 
    "actions"
  ];

  
  //  Form
  form: UntypedFormGroup;
  controls: FormInputField;
  
  constructor(
    public _data: DataService,
    public _form: FormService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    //  Form 
    this.form     = this._form.initTextSearchForm();
    this.controls = this._form.textSearchMap( this.form );
    this.form.get("term").setValue("");

    //  Filter List
    this.form.get("term").valueChanges.subscribe(t => {
      this.filteredList = this.masterList.filter( f => JSON.stringify(f).toLowerCase().includes( t.toLowerCase() ) );
      this.populateTable( this.filteredList ); 
    });

    //  Data Init
    this._data.foods.pipe( map((l:Food[]) => l.map(f => f.setChart())) ).subscribe(f => {
      this.masterList   = f
      this.filteredList = f;
      this.populateTable(f);
      console.log("f: ", f);
    });

  }


  populateTable(list: Food[]){
      //  Datasource
      this.dataSource = new MatTableDataSource(list);

      //  Table Features
      setTimeout(()=>{
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }




  
  // listEvent(event: ListEvent){
  //   console.log("event: ", event);
  //   this._data.food = event.row;
  //   this.router.navigate(["food", event.row.id]);
  // }

  headerEvent(event: string){
    console.log("header.event: ", event);
    if(event == "create"){
      this._data.food = new Food("Create")
      this.router.navigate(["food", "Create"]);
    }
  }

  view(row: Food){ 
    this._data.food = row;
    this.router.navigate(["food", row.id]);
  }
}
