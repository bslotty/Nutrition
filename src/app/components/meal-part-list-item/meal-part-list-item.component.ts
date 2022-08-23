import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { DataService, Food, MealPart } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { ListEvent } from 'src/app/UI/components/list/list.component';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-meal-part-list-item',
  templateUrl: './meal-part-list-item.component.html',
  styles: [
  ]
})
export class MealPartListItemComponent implements OnInit {

  @Input() part: MealPart;
  @Output() event: EventEmitter<ListEvent> = new EventEmitter();

  food: Observable<Food>;
  readonly MatColor = MatColor;

  form: UntypedFormGroup;
  controls: FormInputField[];


  constructor(
    public _data: DataService,
    public _form: FormService,
  ) { }

  ngOnInit(): void {
    this.food = this._data.foods.pipe( map(fl => fl.find(f => f.id == this.part.foodId)) );

    this.form = this._form.initMealPartForm();

    this.form.get("amount").setValue(this.part.amount);
    // this.form.get("amountMeasurementType").setValue(this.part.amountMeasurementType);

    this.controls = this._form.mealPartFormMap(this.form);



    this.form.valueChanges.subscribe(form => {
      console.log("formUpdate: ", form);
      this.part.amount = form.amount;
      // this.part.amountMeasurementType = form.amountMeasurementType;
    });


    
  }


  listEvent(event: string){
    this.event.emit({row: this.part, action: event});
  }


}
