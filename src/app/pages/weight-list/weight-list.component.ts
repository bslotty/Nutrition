import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { combineLatest, filter, map, Observable, switchMap } from 'rxjs';
import { DataService, Food, Weight } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { DialogService } from 'src/app/UI/services/dialog.service';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-weight-list',
  templateUrl: './weight-list.component.html',
  styles: [
  ]
})
export class WeightListComponent implements OnInit {

  masterList: Weight[];
  filteredList: Weight[];

  filteredList$: Observable<Weight[]> = this._data._http.getWeights();

  weights: Weight[];


  rangeForm: UntypedFormGroup;
  controls: FormInputField[];

  headerButtons: IconButton[] = [
    new IconButton("create").setIconName("plus").setIconColor(MatColor.accent).setButtonColor(MatColor.transparent),
  ];

  dataSource: MatTableDataSource<Weight> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  visibleColumns = ["date", "weight", "delete", "view"];

  readonly MatColor = MatColor;

  chart: any[] = [];

  constructor(
    public _data: DataService,
    public _form: FormService,
    public router: Router,
    public _dialog: DialogService,
  ) { }

  ngOnInit(): void {

    this.rangeForm = this._form.initIntakeRangeForm();
    this.controls = this._form.intakeRangeFormMap(this.rangeForm);

    // this.filteredList$ = combineLatest([
    //   this._data.weights,
    //   this.rangeForm.get("end").valueChanges,
    // ]).pipe(
    //   switchMap(output => {
    //     console.log("output: ", output);
    //     return this._data.weights.pipe(
    //       map(list => list.filter(weight => {
    //         let entryTime = new Date(weight.date).getTime();
    //         let start = new Date(this.rangeForm.get("start").value).getTime();
    //         let end = new Date(this.rangeForm.get("end").value).getTime();

    //         //  console.table(ob);
    //         return entryTime > start && entryTime < end;
    //       })
    //       ));
    //   }));

    // this.filteredList$.subscribe(r => {
    //   console.log("filtered List: ", r);


    //   this.chart = [];

    //   if (r.length > 0) {
    //     setTimeout(() => {
    //       this.chart = [["Date", "Pounds"]];

    //       let data = r.sort((a, b) => a.date.getTime() - b.date.getTime()).map(w => [
    //         new Date(w.date.getFullYear(), w.date.getMonth(), w.date.getDate()),
    //         +w.pounds])
    //       data.forEach(d => this.chart.push(d));

    //       console.log("chart: ", this.chart);
    //     })

    //     this.populateTable(r);
    //   }

    // })

    combineLatest([
      this._data.weights,
      this.rangeForm.valueChanges
    ]).subscribe(([wl, res]) => {
      console.log("res: ", res);
      //  Set Data
      this.weights = wl.filter(w => {
        let entryTime = new Date(w.date.getFullYear(), w.date.getMonth(), w.date.getDate()).getTime();
        let start     = new Date(res.start).getTime();
        let end       = new Date(res.end).getTime();

        console.log(start, entryTime, end);

        return entryTime > start && entryTime < end;
      });
      console.log("weight.data: ", this.weights);


      if (this.weights.length > 0){
        
        //  Init Chart
        this.chart = [["Date", "Pounds"]];
        
        let data = this.weights.sort((a, b) => a.date.getTime() - b.date.getTime()).map(w => [
          new Date(w.date.getFullYear(), w.date.getMonth(), w.date.getDate()),
          +w.pounds])
        if (data.length > 0){
          data.forEach( d => this.chart.push(d));  
        }
      }

      this.populateTable(this.weights);



    });


    this.setRangeDates();


  }


  populateTable(list: Weight[]) {
    //  Datasource
    this.dataSource = new MatTableDataSource(list);

    //  Table Features
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  headerEvent(event: string) {
    console.log("header.event: ", event);
    if (event == "create") {
      this._dialog.settings.data.weight = new Weight("Create", new Date(), 0);
      this._dialog.open("weightDetails").subscribe(d => {
        if (d) {
          // this.setRangeDates();
        }
      });
    }
  }

  view(row: Weight) {
    this._dialog.settings.data.weight = row;
    this._dialog.open("weightDetails").subscribe(d => {
      console.log("d.close: ", d);
      if (d) {
        // this.setRangeDates();
        // let today   = new Date();
        // let history = new Date();
        // history.setDate(today.getDate() - 7);

        // this.rangeForm.setValue({
        //   start: history,
        //   end: today,
        // });
      }
    })
  }

  delete(row: Weight) {
    this._dialog.initSettings("Confirm", "Are you sure you want to delete this item?");
    this._dialog.open("confirm").subscribe(d => {
      console.log("d.close: ", d);
      if (d) {
        this._data.deleteWeight(row);
        // this.setRangeDates();

      }
    })
  }


  setRangeDates() {
    let today = new Date();
    let history = new Date();
    history.setDate(today.getDate() - 7);

    this.rangeForm.reset()

    this.rangeForm.setValue({
      start: history,
      end: today,
    });
  }

}
