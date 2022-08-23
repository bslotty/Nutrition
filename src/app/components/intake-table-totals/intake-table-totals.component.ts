import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Intake, Food, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-intake-table-totals',
  templateUrl: './intake-table-totals.component.html',
  styles: [
  ]
})
export class IntakeTableTotalsComponent implements OnInit {

  @Input() intake: Intake;

  //  Table
  dataSource: MatTableDataSource<Food> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  visibleColumns = ["name", "protein", "fat", "carbs", "fiber", "sugar", "sodium", "calories"];

  constructor(
    public _data: DataService,
  ) { }

  ngOnInit(): void {

    this.intake.setTotals();

    //  Datasource
    this.dataSource = new MatTableDataSource([this.intake.totals]);

    //  Table Features
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }
}
