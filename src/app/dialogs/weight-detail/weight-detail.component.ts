import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService, Food, Weight } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-weight-detail',
  templateUrl: './weight-detail.component.html',
  styles: [
  ]
})
export class WeightDetailComponent implements OnInit {

  form: UntypedFormGroup;
  formField: FormInputField[];

  readonly MatColor = MatColor;

  constructor(
    public _diagref: MatDialogRef<WeightDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public _data: DataService,
    public _form: FormService,
  ) {
    this.form = this._form.initWeightForm();
    this.formField = this._form.weightFormMap(this.form);
  }


  ngOnInit(): void {
    // this.formField.control.setValue("");

    console.log("data: ", this.data.weight);

    this.form.setValue({
      id: this.data.weight.id,
      pounds: this.data.weight.pounds,
      date: this.data.weight.date,
    })
  }


  close() {
    this._diagref.close();
  }

  selectFood(food: Food) {
    this._data.addPartToMeal(food);
    this.close();
  }

  save() {
    let weight = new Weight(
      this.form.get("id").value,
      this.form.get("date").value,
      this.form.get("pounds").value,
    );
    this._data.saveWeight(weight);
    this._diagref.close(true);
  }
}
