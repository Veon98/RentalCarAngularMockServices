import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {User} from "./User";


@Injectable({
  providedIn: 'root'   //modulo root e tutti i componenti ad esso appartenenti. E' possibile cosi scegliere i moduli in cui il servizio è iniettabile (nei componenti di tale modulo, all'interno del costruttore, viene fatta la dependency injection del service)
})
export class UserService{

  arrUsers: User[] =[
    {
      id_u: 1,
      nome: "Mario",
      cognome: "Rossi"
    },
    {
      id_u: 2,
      nome: "Luigi",
      cognome: "Verdi"
    },
    {
      id_u: 3,
      nome: "Luca",
      cognome: "Neri"
    },
    {
      id_u: 4,
      nome: "Paolo",
      cognome: "Bianchi"
    },
    {
      id_u: 5,
      nome: "Luca",
      cognome: "Mori"
    }
  ];



  getUsers(): Observable<User[]>{
    return of (this.arrUsers);
  }

  addUser(utente: User){
    this.arrUsers.push(utente);
  }

}
