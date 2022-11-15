import { Component, OnInit } from '@angular/core';
import {UserService} from "../../users/User-Service";
import {tableConfig} from "../../reusable-components/tabella-r/Config/tableConfig";
import {myHeaders} from "../../reusable-components/tabella-r/Config/myHeaders";
import {myOrder} from "../../reusable-components/tabella-r/Config/myOrder";
import {myFilter} from "../../reusable-components/tabella-r/Config/myFilter";
import {myPagination} from "../../reusable-components/tabella-r/Config/myPagination";
import {myActions} from "../../reusable-components/tabella-r/Config/myActions";
import {myActionEnum} from "../../reusable-components/tabella-r/Config/myActionEnum";
import {User} from "../../users/User";
import {PrenService} from "../Pren-Service";
import {Pren} from "../Pren";
import {Router} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-prens-c',
  templateUrl: './prens-c.component.html',
  styleUrls: ['./prens-c.component.css']
})
export class PrensCComponent implements OnInit {


  constructor(private prenService: PrenService, private router: Router) { }


  tabConfSpec !:tableConfig;


  //HEADERS CONF
  headerConf : myHeaders[] = [
    {key: "id_p", label: "Id"},
    {key: "utente", label: "Utente"},
    {key: "auto", label: "Auto"},
    {key: "dataI", label: "Data inizio"},
    {key: "dataF", label: "Data fine"}
  ];


  //SORTING CONF
  orderConf : myOrder = {orderCol: "id_p", orderType: "asc"};   //configurazione di default



  //FILTER CONF
  filterConf : myFilter = {filterString: "", filterCol: "utente"};


  //PAGINATION CONF
  paginationConf : myPagination = {pageNum: 1, itemPerPage: 3, arrayPages: [3, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]};  //valori di default


  //ACTION CONFIG
  actionsConf: myActions[] = [    //l'oggetto myActions[] racchiude l'enum myActionEnum e il boolean che

    {
      action: myActionEnum.EDIT_ROW,
      showInRow: true
    },

    {
      action: myActionEnum.DELETE_ROW,
      showInRow: true
    }];


  actionShower(tmpObj: any) {   //recupera i dati passati dal child, sfruttando $event nel parent.html, che li intercetta (è così che funziona @Output)
    switch (tmpObj.action) {   //tmpObj.action contiene i valori delle tre operazioni
      case "Aggiungi":
        //alert("Aggiunta " + tmpObj.dataSpec);
        this.router.navigate(['/prenForm']);
        break;

      case "Modifica":
        //alert("Modificata " + tmpObj.dataSpec.id_p);  //tmpObj.dataSpec contiene i dati dell'oggetto in quella specifica riga
        this.router.navigate(['/prenForm', tmpObj.dataSpec.id_p]);
        break;

      case "Elimina":
        let dataInizio = moment(tmpObj.dataSpec.dataI, "DD MM YYYY").date();

        //modo 1 per prelevare la data odierna
        //let dataOggi_tmp = new Date().toJSON().slice(0, 10);
        //let dataOggi = new Date(dataOggi_tmp).getDate();

        //modo 2 per prelevare la data odierna
        let dataOggi_tmp = moment();
        let dataOggi = moment(dataOggi_tmp).date();

        let check = dataInizio-dataOggi;

        if (check>=2){
          alert("Eliminata " + tmpObj.dataSpec.id_p);
        }
        else {
          alert("Eliminazione rifiutata")
        }
    }
  }


  prenotazioni!: Pren[];


  ngOnInit(): void {
    this.prenService.getPrens().subscribe((prens) => this.prenotazioni = prens);
    this.tabConfSpec = {header: this.headerConf, order: this.orderConf, filter: this.filterConf, pagination: this.paginationConf, actions: this.actionsConf}
  }

}
