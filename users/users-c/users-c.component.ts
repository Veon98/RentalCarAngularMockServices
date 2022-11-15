import { Component, OnInit } from '@angular/core';
import {User} from "../User";
import {UserService} from "../User-Service";
import {tableConfig} from "../../reusable-components/tabella-r/Config/tableConfig";
import {myOrder} from "../../reusable-components/tabella-r/Config/myOrder";
import {myFilter} from "../../reusable-components/tabella-r/Config/myFilter";
import {myPagination} from "../../reusable-components/tabella-r/Config/myPagination";
import {myActions} from "../../reusable-components/tabella-r/Config/myActions";
import {myActionEnum} from "../../reusable-components/tabella-r/Config/myActionEnum";
import {myHeaders} from "../../reusable-components/tabella-r/Config/myHeaders";
import {Router, RouterModule} from "@angular/router";


@Component({
  selector: 'app-users-c',
  templateUrl: './users-c.component.html',
  styleUrls: ['./users-c.component.css']
})
export class UsersCComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }


  tabConfSpec !:tableConfig;


  //HEADERS CONF
  headerConf : myHeaders[] = [
    {key: "id_u", label: "Id"},
    {key: "nome", label: "Nome"},
    {key: "cognome", label: "Cognome"}
  ];


  //SORTING CONF
  orderConf : myOrder = {orderCol: "id_u", orderType: "asc"};   //configurazione di default



  //FILTER CONF
  filterConf : myFilter = {filterString: "", filterCol: "nome"};


  //PAGINATION CONF
  paginationConf : myPagination = {pageNum: 1, itemPerPage: 3, arrayPages: [3, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]};  //valori di default


  //ACTION CONFIG
  actionsConf: myActions[] = [    //l'oggetto myActions[] racchiude l'enum myActionEnum e il boolean che
    {
      action: myActionEnum.NEW_ROW,
      showInRow: false   //nella tabella non compare il tasto di inserimento
    },

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
        //alert("Aggiunto " + tmpObj.dataSpec);
        this.router.navigate(['/userForm']);
        break;


      case "Modifica":
        //alert("Modificato " + tmpObj.dataSpec.id_u);  //tmpObj.dataSpec contiene i dati dell'oggetto in quella specifica riga
        this.router.navigate(['/userForm', tmpObj.dataSpec.id_u]);
        break;

      case "Elimina":
        alert("Eliminato " + tmpObj.dataSpec.id_u);
    }
  }


  utenti!: User[];


  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => this.utenti = users);   //presi dal service e inviati alla tabella (renderizzati attraverso la configurazione di userComponent). La subscribe assegna i valori dell'array users che arriva all'array utenti di tale componente in modo asincrono. Difatti, se ragionassimo in modo sequenziale, provando a crearee metodi sequenziali che sfruttano l'array utenti dopo tale assegnazione, potremmo avere una "sovrapposizione" di istruzioni. Per questo è possibile inserire le funzioni dierettamente nella subscribe
    this.tabConfSpec = {header: this.headerConf, order: this.orderConf, filter: this.filterConf, pagination: this.paginationConf, actions: this.actionsConf}
  }

}
