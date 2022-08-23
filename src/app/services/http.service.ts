import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Food, Meal, MealPart, Weight } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseAPIURL = "https://localhost:7051/api";

  constructor(public http: HttpClient) { }

  convertFoodResponse(response: any): Food[] {
    let arr:Food[] = [];
    response.forEach((f: Food) => {
      arr.push( new Food(f.id)
      .setName(f.name)
      .setBrand(f.brand)
      .setServingSize(f.servingSize)
      .setServingSizeMeasurementType(f.servingSizeMeasurementType)
      .setProtein(f.protein)
      .setFat(f.fat)
      .setCarbs(f.carbs)
      .setSodium(f.sodium)
      .setSugar(f.sugar)
      .setFiber(f.fiber)
      );
    });
    return arr;
  }

  convertMealResponse(response: any): Meal[] {
    let arr:Meal[] = [];
    response.forEach((m: Meal) => {
      let meal: Meal = new Meal(m.id)
      .setName(m.name)
      .setDate(m.date)
     
      .setParts( m.parts.map(p => {
        return new MealPart(p.id)
          .setFood(p.foodId)
          .setMeal(p.mealId)
          .setAmmount(p.amount)
          .setAmountMeasurementType(p.amountMeasurementType)
      }));
      
      arr.push(meal);
    });
    return arr;
  }

  
  convertWeightResponse(response: any): Weight[] {
    let arr:Weight[] = [];
    response.forEach((w: Weight) => {
      let weight: Weight = new Weight(w.id, w.date, w.pounds);
      arr.push(weight);
    });
    return arr;
  }




  getFoods(): Observable<Food[]> {
    return this.http.get(`${this.baseAPIURL}/foods`).pipe( map( (res: any) => this.convertFoodResponse(res) ));
  }

  createFood(f: Food){
    return this.http.post(`${this.baseAPIURL}/foods`, f ).pipe( map( (res: any) => this.convertFoodResponse(res) ));
  }

  updateFood(f: Food){
    return this.http.put(`${this.baseAPIURL}/foods`, f).pipe( map( (res: any) => this.convertFoodResponse(res) ));
  }

  deleteFood(f: Food){
    return this.http.delete(`${this.baseAPIURL}/foods/${f.id}`).pipe( map( (res: any) => this.convertFoodResponse(res) ));
  }



  
  getMeals(): Observable<Meal[]> {
    return this.http.get(`${this.baseAPIURL}/meals`).pipe( map( (res: any) => this.convertMealResponse(res) ));
  }

  createMeal(m: Meal){
    return this.http.post(`${this.baseAPIURL}/meals`, m).pipe( map( (res: any) => this.convertMealResponse(res) ));
  }

  updateMeal(m: Meal){
    return this.http.put(`${this.baseAPIURL}/meals`, m).pipe( map( (res: any) => this.convertMealResponse(res) ));
  }

  deleteMeal(m: Meal){
    return this.http.delete(`${this.baseAPIURL}/meals/${m.id}`).pipe( map( (res: any) => this.convertMealResponse(res) ));
  }

  
  getWeights(): Observable<Weight[]> {
    return this.http.get(`${this.baseAPIURL}/weight`).pipe( map( (res: any) => this.convertWeightResponse(res) ));
  }

  createWeight(w: Weight){
    return this.http.post(`${this.baseAPIURL}/weight`, w).pipe( map( (res: any) => this.convertWeightResponse(res) ));
  }

  updateWeight(w: Weight){
    return this.http.put(`${this.baseAPIURL}/weight`, w).pipe( map( (res: any) => this.convertWeightResponse(res) ));
  }

  deleteWeight(w: Weight){
    return this.http.delete(`${this.baseAPIURL}/weight/${w.id}`).pipe( map( (res: any) => this.convertWeightResponse(res) ));
  }


}
