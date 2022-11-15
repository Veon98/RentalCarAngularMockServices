import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./generic-components/home/home.component";
import {ProfileCComponent} from "./generic-components/profile/profile-c/profile-c.component";
import {ErrorPageComponent} from "./generic-components/error-page/error-page.component";
import {UsersCComponent} from "./users/users-c/users-c.component";
import {AppComponent} from "./app.component";
import {CarsCComponent} from "./cars/cars-c/cars-c.component";
import {PrensCComponent} from "./prens/prens-c/prens-c.component";
import {UserFormComponent} from "./users/user-form/user-form.component";
import {CarFormComponent} from "./cars/car-form/car-form.component";
import {PrenFormComponent} from "./prens/pren-form/pren-form.component";
import {LoginComponent} from "./generic-components/login/login.component";
import {CarsDispComponent} from "./cars/cars-disp/cars-disp.component";
import {RiepilogoPrensComponent} from "./prens/riepilogo-prens/riepilogo-prens.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',   //path (dato da me)
    component: HomeComponent  //selettore della classe componente
  },
  {
    path: 'profilo',
    component: ProfileCComponent
  },
  {
    path: 'users',
    component: UsersCComponent
  },
  {
    path: 'cars',
    component: CarsCComponent
  },
  {
    path: 'prens',
    component: PrensCComponent
  },
  {
    path: 'userForm',
    component: UserFormComponent
  },
  {
    path: 'userForm/:id_u',
    component: UserFormComponent
  },
  {
    path: 'carForm',
    component: CarFormComponent
  },
  {
    path: 'carForm/:id_a',
    component: CarFormComponent
  },
  {
    path: 'prenForm',
    component: PrenFormComponent
  },
  {
    path: 'prenForm/:id_p',  //per l'approvazione
    component: PrenFormComponent
  },
  {
    path: 'riepilogoPren',
    component: RiepilogoPrensComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dispCars',   //per trovare le auto disponibili
    component: CarsDispComponent
  },
  {
    path: '**',    //nel caso in cui l'url non fosse valido: va inserito per ultimo
    component: ErrorPageComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],   //gestisce l'url a livello di root
  exports: [RouterModule]
})
export class AppRoutingModule { }
