import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { MatColor } from '../../services/utilities.service';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styles: [
  ]
})
export class FormFieldComponent implements OnInit {

  @Input() field: FormInputField;
  @Output() emit: EventEmitter<FormInputEvent> = new EventEmitter(true);

  password_type: string = "password";
  password_icon: string = "eye";

  readonly types = FormInputTypes;

  public datepicker = document.getElementById("datepicker");

  //  HTML Accessor
  public get MatColor(): typeof MatColor {
    return MatColor;
  }

    
  constructor(

  ) { }

  ngOnInit(): void { 
    // console.log("types: ", this.types);
    
    //  Phone Input Type
    if (this.field.type == FormInputTypes.phone){
      this.phoneFormatter();
    }
  }

  togglePasswordVisibility(){
    if (this.password_type == "password"){
      this.password_type = "text";
      this.password_icon = "eye-off";

    } else if (this.password_type == "text"){
      this.password_type = "password";
      this.password_icon = "eye";

    }
  }

  phoneFormatter(){
    this.field.control.valueChanges.subscribe(v => {

    });
  }

  event(type: string){
    this.emit.emit( new FormInputEvent()
      .setType(type)
      .setField(this.field))
  }

}




export class FormInputField {
  label        : string;
  type         : FormInputTypes;
  control      : UntypedFormControl;
  options      : any[];
  hint         : string   = "";
  error        : boolean  = false;
  error_message: string   = "";

  required      :boolean;

  constructor() {
    this.required = true;
  }

  setLabel(text: string){
    this.label = text;
    return this;
  }

  setType(type:FormInputTypes){
    this.type = type;
    return this;
  }

  setControl(control: UntypedFormControl | AbstractControl){
    this.control = control as UntypedFormControl;
    return this;
  }

  setRequired(bool: boolean){
    this.required = bool;
    return this;
  }

  setOptions(list: any[]){
    this.options = list
    return this;
  }

  disable(){
    this.control.disable();
    return this;
  }
}

export enum FormInputTypes {
  text, email, phone, password, date, blob, select, autocomplete
}


export class FormInputEvent {
  type: string;
  field: FormInputField;

  constructor(){}

  setType(type: string){
    this.type = type;
    return this;
  } 

  setField(field: FormInputField){
    this.field = field;
    return this;
  }
}
