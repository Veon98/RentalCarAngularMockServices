import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Car} from "./Car";


@Injectable({
  providedIn: 'root'
})
export class CarService{

  arrCars: Car[] =[
    {
      id_a: 1,
      marca: "Fiat",
      modello: "Panda"
    },
    {
      id_a: 2,
      marca: "Opel",
      modello: "Corsa"
    },
    {
      id_a: 3,
      marca: "BMW",
      modello: "M3"
    },
    {
      id_a: 4,
      marca: "Ferrari",
      modello: "Testarossa"
    },
    {
      id_a: 5,
      marca: "Wv",
      modello: "Polo"
    }
  ];



  getCars(): Observable<Car[]>{
    return of (this.arrCars);
  }

  addCar(auto: Car){
    this.arrCars.push(auto);
  }

}
