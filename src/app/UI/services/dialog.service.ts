import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { PickFoodComponent } from 'src/app/dialogs/pick-food/pick-food.component';
import { WeightDetailComponent } from 'src/app/dialogs/weight-detail/weight-detail.component';
import { FormInputField } from '../components/form-field/form-field.component';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { FormComponent } from '../dialogs/form/form.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  settings: MatDialogConfig = {
    minWidth: "300px",
    width: "400px",
    data: {},
    disableClose: true,
    maxHeight: "40%"
  };

  constructor(
    public dialog: MatDialog,
  ) { }


  open(type: string): Observable<any> {

    let diag: Observable<any> = of([]);

    switch (type) {
      case "confirm":
        diag = this.dialog.open(ConfirmComponent, this.settings).afterClosed();
        break;

      case "form":
        diag = this.dialog.open(FormComponent, this.settings).afterClosed();
        break;

      case "pickFood":
        diag = this.dialog.open(PickFoodComponent, this.settings).afterClosed();
        break;

      case "weightDetails":
        diag = this.dialog.open(WeightDetailComponent, this.settings).afterClosed();
        break;



      // case "SelectAccount":
      //   diag = this.dialog.open(SelectAccountComponent, this.settings).afterClosed();
      //   break;

      // case "createFacility":
      //   diag = this.dialog.open(FacilityCreateComponent, this.settings).afterClosed();
      //   break;

      // case "createRoute":
      //   diag = this.dialog.open(RouteCreateComponent, this.settings).afterClosed();
      //   break;

      // case "createAsset":
      //   diag = this.dialog.open(AssetCreateComponent, this.settings).afterClosed();
      //   break;

      // case "viewPhoto":
      //   diag = this.dialog.open(PhotoViewComponent, this.settings).afterClosed();
      //   break;



    }
    return diag;
  }

  initSettings(title: string, message: string) {
    this.settings.data.title = title
    this.settings.data.message = message;
  }

  initFormSettings(form: UntypedFormGroup, maps: FormInputField[]) {
    this.settings.data.form = form;
    this.settings.data.control_map = maps;
  }

}
