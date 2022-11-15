import {Injectable} from "@angular/core";

//per passare i valori delle date senza metterli nell'url
@Injectable({
  providedIn: 'root'
})
export class DateService {

  private _id_auto!: any;
  private _dataInizio!: any;
  private _dataFine!: any;


  get id_auto(): any {
    return this._id_auto;
  }

  set id_auto(value: any) {
    this._id_auto = value;
  }

  get dataInizio(): any {
    return this._dataInizio;
  }

  set dataInizio(value: any) {
    this._dataInizio = value;
  }

  get dataFine(): any {
    return this._dataFine;
  }

  set dataFine(value: any) {
    this._dataFine = value;
  }
}
