import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UIModule } from './UI/ui.module';
import { FoodDetailsComponent } from './pages/food-details/food-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FoodListComponent } from './pages/food-list/food-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { MealDetailsComponent } from './pages/meal-details/meal-details.component';
import { PickFoodComponent } from './dialogs/pick-food/pick-food.component';
import { PieGraphComponent } from './components/pie-graph/pie-graph.component';
import { LineGraphComponent } from './components/line-graph/line-graph.component';
import { MealListItemStatsComponent } from './components/meal-list-item-stats/meal-list-item-stats.component';
import { MealListItemComponent } from './components/meal-list-item/meal-list-item.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { IntakeListComponent } from './pages/intake-list/intake-list.component';
import { MealPartListItemComponent } from './components/meal-part-list-item/meal-part-list-item.component';
import { MealPartTableComponent } from './components/meal-part-table/meal-part-table.component';
import { WeightListComponent } from './pages/weight-list/weight-list.component';
import { WeightDetailComponent } from './dialogs/weight-detail/weight-detail.component';
import { IntakeRangeAveragesComponent } from './components/intake-range-averages/intake-range-averages.component';
import { MealTableTotalsComponent } from './components/meal-table-totals/meal-table-totals.component';
import { IntakeTableTotalsComponent } from './components/intake-table-totals/intake-table-totals.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodDetailsComponent,
    NotFoundComponent,
    FoodListComponent,
    NavBarComponent,
    MealListComponent,
    MealDetailsComponent,
    PickFoodComponent,
    MealListItemComponent,
    MealListItemStatsComponent,
    MealPartListItemComponent,

    PieGraphComponent,
    LineGraphComponent,
    IntakeListComponent,
    MealPartTableComponent,
    WeightListComponent,
    WeightDetailComponent,
    IntakeRangeAveragesComponent,
    MealTableTotalsComponent,
    IntakeTableTotalsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GoogleChartsModule,
    
    UIModule.forRoot(),

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
