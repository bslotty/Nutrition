import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Food, Meal } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { ListEvent } from 'src/app/UI/components/list/list.component';
import { DialogService } from 'src/app/UI/services/dialog.service';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styles: [
  ]
})
export class MealDetailsComponent implements OnInit {

  public form: UntypedFormGroup;
  public controls: FormInputField[];

  public partButtons = [
    new IconButton("create").setIconName("plus").setButtonColor(MatColor.transparent).setIconColor(MatColor.accent)
  ];

  readonly MatColor = MatColor;

  constructor(
    public _data: DataService,
    public _form: FormService,  
    public _dialog: DialogService,
    public router: Router
  ) { }


  ngOnInit(): void {
    let m: Meal = this._data.meal;
    
    console.log("Meal.detail: ", m);


    if (m == undefined) this.router.navigate(["meals"]);

    
    this.form = this._form.initMealForm();

    this.form.get("id").setValue(m.id);
    this.form.get("name").setValue(m.name);
    this.form.get("date").setValue(m.date);

    this.controls = this._form.mealFormMap( this.form );


  }

  save() {
    let m = this.form.value;
    m.parts = this._data.meal.parts;
    this._data.saveMeal(m);
  }

  openDeleteDialog(){
    this._dialog.initSettings("Confirm Delete", "Are you sure you want to delete this item?");
    this._dialog.open("confirm").subscribe(res => {
      console.log("dialog.res: ", res);

      if (res) this.delete();
    });
  }

  delete(){
    let m = this.form.value;
    this._data.deleteMeal(m);
  }



  partHeaderEvent(event: string){
    if (event == "create"){
      this._dialog.open("pickFood").subscribe(res => {
        console.log("dialog.res: ", res);
  
        if (res) this.delete();
      });
    }
  }

  partListEvent(event: ListEvent){
    if (event.action = "remove") {
      this._data.meal.removePart(event.row);
    }
  
  }


}
