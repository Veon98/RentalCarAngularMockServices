import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {Pren} from "../Pren";
import {Router} from "@angular/router";
import {DateService} from "../Date-Service";

@Component({
  selector: 'app-riepilogo-prens',
  templateUrl: './riepilogo-prens.component.html',
  styleUrls: ['./riepilogo-prens.component.css']
})
export class RiepilogoPrensComponent implements OnInit {

  id_a!: any;
  id_u: any = "userTmp"
  dataI_tmp!: any;
  dataF_tmp!: any;
  //dataP: any = new Date().toJSON().slice(0, 10);
  dataOggi_tmp: any = moment();
  dataP: any = moment(this.dataOggi_tmp).toJSON().slice(0, 10);

  savePrenBtn = {textP:'Prenota', cssClass:'btn btn-primary btn-lg'}
  errorBtn = {textP:'Torna alla home', cssClass:'btn btn-primary btn-lg'}

  constructor(private router: Router, private dataService: DateService) {
    //salvati anche se la pagina viene ricaricata
    this.id_a = sessionStorage.getItem('id_a');
    this.dataI_tmp = sessionStorage.getItem('dataI');
    this.dataF_tmp = sessionStorage.getItem('dataF');
    //se la pagina viene ricaricata i dati vengono persi
    /*this.id_a = this.dataService.id_auto;
    this.dataI_tmp = this.dataService.dataInizio;
    this.dataF_tmp = this.dataService.dataFine*/
  }

  addPren(){
    //creare un oggetto user e inserire tutti i valori recuperati dal dataService + la data odierna + l'id dell'utente recuperata dalla sessione nel costruttore per poi usare l'add dal service
    //per visualizzare dati dell'utente e dell'auto si possono usare i rispettivi service.get attraverso le id
    let prenTmp = new Pren(this.id_u, this.id_a, this.dataI_tmp, this.dataF_tmp);
    alert("Prenotazione effettuata con successo!")
    this.router.navigate(['/profilo']);
  }

  returnHome(){
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
  }

}
