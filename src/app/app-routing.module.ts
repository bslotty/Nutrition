import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodDetailsComponent } from './pages/food-details/food-details.component';
import { FoodListComponent } from './pages/food-list/food-list.component';
import { IntakeListComponent } from './pages/intake-list/intake-list.component';
import { MealDetailsComponent } from './pages/meal-details/meal-details.component';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WeightListComponent } from './pages/weight-list/weight-list.component';

const routes: Routes = [

  {
    path: "foods",
    component: FoodListComponent
  },
  {
    path: "food/:id",
    component: FoodDetailsComponent
  },

  {
    path: "meals",
    component: IntakeListComponent
  },
  {
    path: "meal/:id",
    component: MealDetailsComponent
  },
  {
    path: "weight",
    component: WeightListComponent
  },

  {
    path: "",
    redirectTo: "foods",
    pathMatch: "full"
  },

  {
    path: "**",
    component: NotFoundComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
