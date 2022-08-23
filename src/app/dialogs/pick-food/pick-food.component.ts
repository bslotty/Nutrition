import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, filter, map, Observable, take } from 'rxjs';
import { DataService, Food } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-pick-food',
  templateUrl: './pick-food.component.html',
  styles: [
  ]
})
export class PickFoodComponent implements OnInit {

  
  shownFoods: Food[] = [];
  foods     : Food[] = [];

  excluded: number;

  form: UntypedFormGroup;
  formField: FormInputField;

  readonly MatColor = MatColor;

  constructor(    
    public _diagref: MatDialogRef<PickFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public _data: DataService,
    public _form: FormService,
  ) {
    this.form      = this._form.initTextSearchForm();
    this.formField = this._form.textSearchMap(this.form);
    this._data.foods.subscribe(fl => this.foods = fl );


    this.formField.control.valueChanges.subscribe(f => {
      let filteredFoods = this.foods.filter( a => ( JSON.stringify(a) ).toLowerCase().includes( f.toLowerCase() ) );
      this.shownFoods = filteredFoods.filter((f,i) => i < 5 )

      if (filteredFoods.length != this.shownFoods.length){
        this.excluded = filteredFoods.length - this.shownFoods.length;
      } else {
        this.excluded = undefined;
      }

    });
  }

  ngOnInit(): void {

    this.formField.control.setValue("");
  }


  close(){
    this._diagref.close();
  }

  selectFood(food: Food){
    this._data.addPartToMeal(food);
    this.close();
  }

}
