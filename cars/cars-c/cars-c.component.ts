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
import {CarService} from "../Cars-Service";
import {Car} from "../Car";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cars-c',
  templateUrl: './cars-c.component.html',
  styleUrls: ['./cars-c.component.css']
})
export class CarsCComponent implements OnInit {

  constructor(private carService: CarService, private router: Router) { }


  tabConfSpec !:tableConfig;


  //HEADERS CONF
  headerConf : myHeaders[] = [
    {key: "id_a", label: "Id"},
    {key: "marca", label: "Marca"},
    {key: "modello", label: "Modello"}
  ];


  //SORTING CONF
  orderConf : myOrder = {orderCol: "id_a", orderType: "asc"};   //configurazione di default



  //FILTER CONF
  filterConf : myFilter = {filterString: "", filterCol: "marca"};


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
        //alert("Aggiunta " + tmpObj.dataSpec);
        this.router.navigate(['/carForm']);
        break;

      case "Modifica":
        //alert("Modificata " + tmpObj.dataSpec.id_a);  //tmpObj.dataSpec contiene i dati dell'oggetto in quella specifica riga
        this.router.navigate(['/carForm', tmpObj.dataSpec.id_a]);
        break;

      case "Elimina":
        alert("Eliminata " + tmpObj.dataSpec.id_a);
    }
  }


  auto!: Car[];


  ngOnInit(): void {
    this.carService.getCars().subscribe((cars) => this.auto = cars);
    this.tabConfSpec = {header: this.headerConf, order: this.orderConf, filter: this.filterConf, pagination: this.paginationConf, actions: this.actionsConf}
  }

}
