import {Injectable} from "@angular/core";
import {User} from "../users/User";
import {Observable, of} from "rxjs";
import {Pren} from "./Pren";


@Injectable({
  providedIn: 'root'
})
export class PrenService{

  arrPrens: Pren[] =[
    {
      id_p: 1,
      utente: "Mario Rossi",
      auto: "BMW M3",
      dataI: "14-11-2022",
      dataF: "19-11-2022"
    },
    {
      id_p: 2,
      utente: "Luigi Verdi",
      auto: "Fiat Panda",
      dataI: "08-11-2022",
      dataF: "10-11-2022"
    }
  ];



  getPrens(): Observable<Pren[]>{
    return of (this.arrPrens);
  }

  addPren(pren: Pren){
    this.arrPrens.push(pren);
  }
}
