import { Injectable } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormInputField, FormInputTypes } from '../UI/components/form-field/form-field.component';
import { FormGeneralService } from '../UI/services/form-general.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    public _general: FormGeneralService,
    public builder : UntypedFormBuilder,
  ) {   }

  initFoodForm(): UntypedFormGroup {
    return this.builder.group({
      id   : ["create", []],
      name : ["", [Validators.required, Validators.maxLength(1024)]],
      brand: ["", [Validators.required, Validators.maxLength(1024)]],
      
      servingSize               : ["", [Validators.required, Validators.maxLength(1024)]],
      servingSizeMeasurementType: ["", [Validators.required, Validators.maxLength(1024)]],
      
      protein: ["", [Validators.required, Validators.maxLength(1024)]],
      fat    : ["", [Validators.required, Validators.maxLength(1024)]],
      carbs  : ["", [Validators.required, Validators.maxLength(1024)]],
      sodium : ["", [Validators.required, Validators.maxLength(1024)]],
      sugar  : ["", [Validators.required, Validators.maxLength(1024)]],
      fiber  : ["", [Validators.required, Validators.maxLength(1024)]],
    });
  }

  foodFormMap(form: UntypedFormGroup): FormInputField[] {
    return [
      new FormInputField()
        .setLabel("Name")
        .setType(FormInputTypes.text)
        .setControl(form.get("name")),

      new FormInputField()
        .setLabel("Brand")
        .setType(FormInputTypes.text)
        .setControl(form.get("brand")),


      new FormInputField()
        .setLabel("Serving Size")
        .setType(FormInputTypes.text)
        .setControl(form.get("servingSize")),

      new FormInputField()
        .setLabel("Serving Size Measurement Type")
        .setType(FormInputTypes.select)
        .setOptions([{id: "g", name: "g"}, { id: "u", name: "u" }])
        .setControl(form.get("servingSizeMeasurementType")),


      new FormInputField()
        .setLabel("Protein")
        .setType(FormInputTypes.text)
        .setControl(form.get("protein")),

      new FormInputField()
        .setLabel("Fat")
        .setType(FormInputTypes.text)
        .setControl(form.get("fat")),

      new FormInputField()
        .setLabel("Carbs")
        .setType(FormInputTypes.text)
        .setControl(form.get("carbs")),

      new FormInputField()
        .setLabel("Sodium")
        .setType(FormInputTypes.text)
        .setControl(form.get("sodium")),

      new FormInputField()
        .setLabel("Sugar")
        .setType(FormInputTypes.text)
        .setControl(form.get("sugar")),

      new FormInputField()
        .setLabel("Fiber")
        .setType(FormInputTypes.text)
        .setControl(form.get("fiber")),
    ]
  }




  initMealForm(): UntypedFormGroup{
    return this.builder.group({
      id   : ["create", []],
      name : ["", [Validators.required, Validators.maxLength(1024)]],
      date: [new Date(), [Validators.required, Validators.maxLength(1024)]],
    });
  }

  mealFormMap(form: UntypedFormGroup): FormInputField[] {
    return [
      new FormInputField()
        .setLabel("Name")
        .setType(FormInputTypes.text)
        .setControl(form.get("name")),

      new FormInputField()
        .setLabel("Date")
        .setType(FormInputTypes.date)
        .setControl(form.get("date")),
    ]
  }





  initTextSearchForm(): UntypedFormGroup {
    return this.builder.group({
      term   : ["", [Validators.minLength(2)]],
    })
  }

  textSearchMap(form: UntypedFormGroup): FormInputField {
    return new FormInputField()
        .setLabel("Search")
        .setType(FormInputTypes.text)
        .setControl(form.get("term"));
  }






  initMealPartForm(): UntypedFormGroup{
    return this.builder.group({
      id   : ["create", []],
      amount : ["", [Validators.required, Validators.maxLength(1024)]],
      // amountMeasurementType: ["g", [Validators.required]],
    });
  }

  mealPartFormMap(form: UntypedFormGroup): FormInputField[] {
    return [
      new FormInputField()
        .setLabel("Amount")
        .setType(FormInputTypes.text)
        .setControl(form.get("amount")),

      // new FormInputField()
      //   .setLabel("Type")
      //   .setType(FormInputTypes.select)
      //   .setOptions([{id: "g", name: "g"}, { id: "u", name: "u" }])
      //   .setControl(form.get("amountMeasurementType")),
    ]
  }




  initIntakeRangeForm(): FormGroup {
    return this.builder.group({
      start: ["", []],
      end: ["", []],
    });

  }


  intakeRangeFormMap(form: UntypedFormGroup): FormInputField[] {
    return [
      new FormInputField()
        .setLabel("Start")
        .setType(FormInputTypes.date)
        .setControl(form.get("start")),

      new FormInputField()
        .setLabel("End")
        .setType(FormInputTypes.date)
        .setControl(form.get("end")),
    ]
  }







  initWeightForm(): FormGroup {
    return this.builder.group({
      id   : ["create", []],
      pounds : ["", [Validators.required, Validators.maxLength(1024)]],
      date: [new Date(), [Validators.required]],
    });
  }

  weightFormMap(form: UntypedFormGroup): FormInputField[] {
    return [
      new FormInputField()
        .setLabel("Pounds")
        .setType(FormInputTypes.text)
        .setControl(form.get("pounds")),

      new FormInputField()
        .setLabel("Date")
        .setType(FormInputTypes.date)
        .setControl(form.get("date")),
    ]
  }

}
