import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Food } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { DialogService } from 'src/app/UI/services/dialog.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styles: [
  ]
})
export class FoodDetailsComponent implements OnInit {

  public form: UntypedFormGroup;
  public controls: FormInputField[];

  public f: Food;

  constructor(
    public _data: DataService,
    public _form: FormService,  
    public _dialog: DialogService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.f = this._data.food;
    
    console.log("Food.detail: ", this.f);

    if (this.f == undefined) this.router.navigate(["foods"]);


    this.form = this._form.initFoodForm();

    this.form.get("id").setValue(this.f.id);
    this.form.get("name").setValue(this.f.name);
    this.form.get("brand").setValue(this.f.brand);
    this.form.get("servingSize").setValue(this.f.servingSize);
    this.form.get("servingSizeMeasurementType").setValue(this.f.servingSizeMeasurementType);
    this.form.get("protein").setValue(this.f.protein);
    this.form.get("fat").setValue(this.f.fat);
    this.form.get("carbs").setValue(this.f.carbs);
    this.form.get("sodium").setValue(this.f.sodium);
    this.form.get("sugar").setValue(this.f.sugar);
    this.form.get("fiber").setValue(this.f.fiber);

    this.controls = this._form.foodFormMap( this.form );

    this.form.valueChanges.subscribe(f => {
      this.f.setProtein(f.protein);
      this.f.setFat(f.fat);
      this.f.setCarbs(f.carbs);
      this.f.setChart();
      // console.log("f", this.f);
    });

  }


  save() {
    let f = this.form.value;
    this._data.saveFood(f);
  }

  openDeleteDialog(){
    this._dialog.initSettings("Confirm Delete", "Are you sure you want to delete this item?");
    this._dialog.open("confirm").subscribe(res => {
      console.log("dialog.res: ", res);

      if (res) this.delete();
    });
  }

  delete(){
    let f = this.form.value;
    this._data.deleteFood(f);
  }

}
