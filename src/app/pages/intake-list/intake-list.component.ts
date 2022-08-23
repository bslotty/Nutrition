import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import { DataService, Intake, Meal } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-intake-list',
  templateUrl: './intake-list.component.html',
  styles: [
  ]
})
export class IntakeListComponent implements OnInit {

  rangeForm: UntypedFormGroup;
  controls: FormInputField[];

  headerButtons: IconButton[] = [
    new IconButton("create").setIconName("plus").setIconColor(MatColor.accent).setButtonColor(MatColor.transparent),
  ];

  intakes: Intake[] = [];
  meals  : Meal[]   = [];

  calorieChart:any[] = [];
  macrosChart:any[] = [];

  ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  readonly MatColor = MatColor;

  constructor(
    public _data: DataService,
    public _form: FormService,
    public router: Router,
  ) { }

  ngOnInit(): void {

    this._data.meals.subscribe(ml => this.meals = ml);

    this.rangeForm = this._form.initIntakeRangeForm();
    this.controls  = this._form.intakeRangeFormMap(this.rangeForm);

    // this.ready.subscribe(r => console.log("r: ", r));


    //  Get date - 14 days
    let today   = new Date();
    let history = new Date();
    history.setDate(today.getDate() - 9);

    combineLatest([
      this._data.meals,
      this.rangeForm.valueChanges
    ]).subscribe(([_, res]) => {
      this.intakes = [];
      this.ready.next(false);

      if ( res.end instanceof Date && res.start instanceof Date ) {

        //  Get Days Between
        let msDays = 1000 * 60 * 60 * 24;
        let start  = res.start.getTime() / msDays;
        let end    = res.end.getTime() / msDays;
        let between = Math.floor(end - start);

        //  Setup Daily Intakes
        for (let i = 0; between > i; i++) {
          let d = new Date( res.end.getTime()) ;
          d.setDate(res.end.getDate() - i)
          let intake = new Intake(d);

          intake.setMeals( this.meals.filter(m => {
            let mDate = `${m.date.getFullYear()}-${m.date.getMonth()}${m.date.getDate()}`;
            if (`${d.getFullYear()}-${d.getMonth()}${d.getDate()}` == mDate) {
              return true;
            }
          }));

          //  Calc Totals & Push
          intake.setTotals();
          this.intakes.push(intake);
        }
      
        //  Init Charts
        let data = [];
        this.calorieChart = [["Date", "Calories"]];
        data = this.intakes.filter(i => i.totals.calories > 0).map( i => [
          new Date(i.date.getFullYear(), i.date.getMonth(), i.date.getDate()),
          i.totals.calories
        ]);
        if (data.length > 0){
          data.forEach( d => this.calorieChart.push(d));  
        }

        this.macrosChart = [["Date", "Protein", "Fat", "Carbs"]];
        data = this.intakes.filter(i => i.totals.calories > 0).map(i => [
          new Date(i.date.getFullYear(), i.date.getMonth(), i.date.getDate()),
          Math.round(i.totals.protein),
          Math.round(i.totals.fat),
          Math.round(i.totals.carbs),
        ])
        if (data.length > 0){
          data.forEach( d => this.macrosChart.push(d));
        }

        this.ready.next(true);
      }

    });


    this.rangeForm.setValue({
      start: history,
      end: today,
    });


  }

  headerEvent(event) {
    console.log("event: ", event);
    if (event == "create") {
      this._data.meal = new Meal("Create").setDate(new Date())
      this.router.navigate(["meal", "Create"]);
    }
  }

  viewMeal(meal: Meal){
    this._data.meal = meal;
    this.router.navigate(["meal", meal.id]);
  }

}
