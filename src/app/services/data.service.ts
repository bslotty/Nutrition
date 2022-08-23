import { getLocaleId } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { PingService } from '../UI/services/ping.service';
import { MatColor } from '../UI/services/utilities.service';
import { HttpService } from './http.service';


function genID(): string {
  return Math.round(Math.random() * 1000) + ""
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public foods: BehaviorSubject<Food[]>     = new BehaviorSubject<Food[]>([]);
  public meals: BehaviorSubject<Meal[]>     = new BehaviorSubject<Meal[]>([]);
  public intake: BehaviorSubject<Intake[]>  = new BehaviorSubject<Intake[]>([]);
  public weights: BehaviorSubject<Weight[]> = new BehaviorSubject<Weight[]>([]);

  public food: Food;
  public meal: Meal;

  readonly MatColor = MatColor;

  constructor(
    public _http: HttpService,
    public router: Router,
    public _ping: PingService,
  ) {

    combineLatest([
      this._http.getFoods(),
      this._http.getMeals(),
      this._http.getWeights()
    ]).subscribe(([fl, ml, wl]) => {

      //  Food Init
      this.foods.next(fl.map(f => {
        f.setCalories;
        return f;
      }));

      //  Meal Init
      this.initMeals(ml);
      

      //  Weight Init
      this.weights.next(wl);
    });
  }


  saveFood(f: Food) {
      let food: Food = new Food(f.id)
        .setName(f.name)
        .setBrand(f.brand)
        .setServingSize(+f.servingSize)
        .setServingSizeMeasurementType(f.servingSizeMeasurementType)
        .setProtein(+f.protein)
        .setFat(+f.fat)
        .setCarbs(+f.carbs)
        .setSodium(+f.sodium)
        .setSugar(+f.sugar)
        .setFiber(+f.fiber)

    // console.log("data.save.food: ", food);

      let res;
      if(food.id == "Create") {
      delete food.id;
      res = this._http.createFood(food);
    } else {
      res = this._http.updateFood(food);
    }

    res.subscribe(res => {
      // console.log("save.res: ", res);

      this._ping.send(MatColor.accent, "Food Saved");
      this.router.navigate(["foods"]);
    });

  }

  deleteFood(f: Food) {
    this._http.deleteFood(f).subscribe(res => {
      // console.log("delete.food: ", res);
      this.router.navigate(["foods"]);
    })
  }



  saveMeal(m: Meal) {
    console.log("meal", m);

    let meal: Meal = new Meal(m.id)
      .setName(m.name)
      .setDate(m.date);

    if (m.parts.length > 0) {
      meal.setParts(m?.parts.map(p => {
        return new MealPart(p.id)
          .setFood(p.foodId)
          .setMeal(p.mealId)
          .setAmmount(p.amount)
          .setAmountMeasurementType(p.amountMeasurementType)
      }));
    }


    // console.log("data.save.meal: ", meal);

    let res;
    meal.setParts(meal.parts.map(p => {
      if ((p.id).includes("create")) {
        delete p.id;
        delete p.mealId;
      }
      return p
    }));

    //  Adjust Dates

    if (meal.id == "Create") {
      delete meal.id
      res = this._http.createMeal(meal);
    } else {
      res = this._http.updateMeal(meal);
    }

    res.subscribe(res => {

      this.initMeals(res);
      this._ping.send(MatColor.accent, "Meal Saved");
      this.router.navigate(["meals"]);
      // console.log("save.res: ", res)

      
    });
  }

  deleteMeal(m: Meal) {
    this._http.deleteMeal(m).subscribe(res => {
      // console.log("delete.food: ", res);
      this._ping.send(MatColor.accent, "Meal Deleted");
      this.router.navigate(["meals"]);
    })
  }

  initMeals(ml: Meal[]){
    this.meals.next( ml.map(m => {
      m.parts = m.parts.map(p => {
        p.food = this.foods.value.find(f => p.foodId == f.id);
        p.food.setCalories();
        return p;
      });

      return m;
    }));
  }





  addPartToMeal(f: Food) {
    this.meal.addPart(new MealPart("create" + genID())
      .setAmmount(0)
      .setAmountMeasurementType("g")
      .setFood(f.id)
      .setMeal(this.meal.id));
  }




  saveWeight(w: Weight) {
    let res;
    if (w.id == "Create") {
      delete w.id
      res = this._http.createWeight(w);
    } else {
      res = this._http.updateWeight(w);
    }


    res.subscribe(res => {
      // console.log("save.res: ", res);
      this.weights.next(res);
      this._ping.send(MatColor.accent, "Weight Saved");
    });

  }


  deleteWeight(w: Weight) {
    this._http.deleteWeight(w).subscribe(res => {
      // console.log("delete.weight: ", res);
      this.weights.next(res);
      this._ping.send(MatColor.accent, "Weight Deleted");
      this.router.navigate(["weight"]);
    })
  }


}



















export class Food {
  id: string;
  name: string = "";
  brand: string = "";

  servingSize: number = 0;
  servingSizeMeasurementType: string = "";

  protein: number = 0;
  fat: number = 0;
  carbs: number = 0;
  sugar: number = 0;
  fiber: number = 0;
  sodium: number = 0;

  chart: Array<any[]> = [];
  calories: number = 0;

  constructor(id: string) {
    this.id = id;
    return this;
  }

  setName(s: string) {
    this.name = s;
    return this;
  }

  setBrand(s: string) {
    this.brand = s;
    return this;
  }

  setServingSize(n: number) {
    this.servingSize = n;
    return this;
  }

  setServingSizeMeasurementType(s: string) {
    this.servingSizeMeasurementType = s;
    return this;
  }

  setProtein(n: number) {
    this.protein = n;
    return this;
  }

  setFat(n: number) {
    this.fat = n;
    return this;
  }

  setCarbs(n: number) {
    this.carbs = n;
    return this;
  }

  setSodium(n: number) {
    this.sodium = n;
    return this;
  }

  setSugar(n: number) {
    this.sugar = n;
    return this;
  }

  setFiber(n: number) {
    this.fiber = n;
    return this;
  }

  setChart() {
    if ((this.protein + this.fat + this.carbs) == 0) {
      this.chart = [["empty", 1]];
    } else {
      this.chart = [
        ["protein", +this.protein],
        ["fat", +this.fat],
        ["carbs", +this.carbs]
      ];
    }

    return this;
  }

  setCalories() {
    this.calories = (this.protein * 4) + (this.carbs * 4) + (this.fat * 4)
    return this;
  };


}



export class Meal {
  public id: string;
  public name: string;
  public date: Date;
  public timestamp: string;
  public parts: MealPart[] = [];

  public calories: number = 0;
  public totals: Food;

  constructor(id: string) {
    this.id = id;
    return this;
  }

  setName(s: string) {
    this.name = s;
    return this;
  }

  setDate(d: string | Date) {
    if (typeof d == "string") {
      this.date = new Date(d);
    } else {
      this.date = d;
    }

    this.timestamp = this.date.toISOString();
    return this;
  }


  setParts(p: MealPart[]) {
    this.parts = p;
    return this;
  }

  addPart(p: MealPart) {
    this.parts.push(p);
    return this;
  }

  removePart(p: MealPart) {
    this.setParts(this.parts.filter(part => p.id != part.id))
  }


  setCalories() {
    this.parts.map(p => p.calories).reduce((a, b) => +a + +b);
    return this;
  };

  setTotals(){
    this.totals = new Food("Totals");

    this.parts.forEach( p => {
      if (p.food != undefined){

        let multi = (p.amount / p.food.servingSize );

        this.totals.setProtein( +((p.food.protein * multi) + this.totals.protein).toFixed(1) );
        this.totals.setFat( +((p.food.fat * multi) + this.totals.fat).toFixed(1) );
        this.totals.setCarbs( +((p.food.carbs * multi) + this.totals.carbs).toFixed(1) );
        this.totals.setSodium( +((p.food.sodium * multi) + this.totals.sodium).toFixed(1) );
        this.totals.setSugar( +((p.food.sugar * multi) + this.totals.sugar).toFixed(1) );
        this.totals.setFiber( +((p.food.fiber * multi) + this.totals.fiber).toFixed(1));
      }

      this.totals.setCalories();
    });
  }
}


export class MealPart {
  public id: string;
  public mealId: string;
  public foodId: string;
  public food: Food;

  public amount: number;
  public amountMeasurementType: string;

  public calories: number = 0;


  constructor(id: string) {
    this.id = id;
    return this;
  }

  setMeal(id: string) {
    this.mealId = id;
    return this;
  }

  setFood(f: string) {
    this.foodId = f;
    return this;
  }

  setAmmount(n: number) {
    this.amount = n;
    return this;
  }

  setAmountMeasurementType(s: string) {
    this.amountMeasurementType = s;
    return this;
  }

  setCalories() {
    if (this.food != undefined) {
      this.food.setCalories()
      this.calories = this.food.calories * (this.food.servingSize / this.amount);
    }
  }
}



export enum PartMeasurementTypes {
  "grams", "unit"
}






export class Intake {
  date: Date = new Date;
  meals: Meal[] = [];

  totals: Food;

  constructor(date: Date) {
    this.date = date;
  }

  addMeal(meal: Meal) {
    this.meals.push(meal);
    return history;
  }

  setMeals(meals: Meal[]) {
    this.meals = meals;
    return this;
  }

  setTotals(){
    this.totals = new Food("Totals");
    this.meals.forEach( m => {
      m.setTotals();

      this.totals.setProtein( m.totals.protein + this.totals.protein );
      this.totals.setFat( m.totals.fat + this.totals.fat );
      this.totals.setCarbs( m.totals.carbs + this.totals.carbs );
      this.totals.setFiber( m.totals.fiber + this.totals.fiber );
      this.totals.setSodium( m.totals.sodium + this.totals.sodium );
      this.totals.setSugar( m.totals.sugar + this.totals.sugar );
    });

    this.totals.setCalories();
  }

}





export class Weight {
  id: string;
  date: Date;
  pounds: number;

  constructor(id: string, date: Date, pounds: number) {
    this.id = id;
    this.date = new Date(date);
    this.pounds = pounds;
  }
}