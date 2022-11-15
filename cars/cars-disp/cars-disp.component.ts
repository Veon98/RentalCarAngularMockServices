import {Component, Input, OnInit} from '@angular/core';
import {CarService} from "../Cars-Service";
import {ActivatedRoute, Router} from "@angular/router";
import {tableConfig} from "../../reusable-components/tabella-r/Config/tableConfig";
import {myHeaders} from "../../reusable-components/tabella-r/Config/myHeaders";
import {myOrder} from "../../reusable-components/tabella-r/Config/myOrder";
import {myFilter} from "../../reusable-components/tabella-r/Config/myFilter";
import {myPagination} from "../../reusable-components/tabella-r/Config/myPagination";
import {myActions} from "../../reusable-components/tabella-r/Config/myActions";
import {myActionEnum} from "../../reusable-components/tabella-r/Config/myActionEnum";
import {Car} from "../Car";
import {DateService} from "../../prens/Date-Service";


@Component({
  selector: 'app-cars-disp',
  templateUrl: './cars-disp.component.html',
  styleUrls: ['./cars-disp.component.css']
})
export class CarsDispComponent implements OnInit {

  constructor(private carService: CarService, private router: Router, private route: ActivatedRoute, private dateService: DateService) { }


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
    /*{
      action: myActionEnum.NEW_ROW,
      showInRow: false   //nella tabella non compare il tasto di inserimento
    },*/

    {
      action: myActionEnum.NOLEGGIA,
      showInRow: true
    },

    /*{
      action: myActionEnum.DELETE_ROW,
      showInRow: false
    }*/
  ];


  actionShower(tmpObj: any) {   //recupera i dati passati dal child, sfruttando $event nel parent.html, che li intercetta (è così che funziona @Output)
    switch (tmpObj.action) {   //tmpObj.action contiene i valori delle tre operazioni

      case "Noleggia":
        //alert("Modificata " + tmpObj.dataSpec.id_a);  //tmpObj.dataSpec contiene i dati dell'oggetto in quella specifica riga
        //this.router.navigate(['/prenForm', tmpObj.dataSpec.id_a, this.dataI, this.dataF]);

        //per non perdere i dati dopo che la pagina viene ricaricata
        sessionStorage.setItem('id_a', tmpObj.dataSpec.id_a)
        sessionStorage.setItem('dataI', this.dataI)
        sessionStorage.setItem('dataF', this.dataF)
        //se la pagina viene ricaricata i dati vengono persi
        /*this.dateService.id_auto = tmpObj.dataSpec.id_a;
        this.dateService.dataInizio = this.dataI;
        this.dateService.dataFine = this.dataF;*/
        this.router.navigate(['/riepilogoPren']);
        break;
    }
  }


  auto!: Car[];
  dataI!: any;
  dataF!: any;

  @Input() arrDateIn!: any[];


  ngOnInit(): void {

    this.dataI=this.arrDateIn[0];  //nel primo elemento dell'array è contenuta la data di inizio e nel secondo quella di fine
    this.dataF=this.arrDateIn[1];


    //this.carService.getCarsDisp(this.dataI, this.dataF).subscribe((cars) => this.auto = cars);
    this.carService.getCars().subscribe((cars) => this.auto = cars);
    this.tabConfSpec = {header: this.headerConf, order: this.orderConf, filter: this.filterConf, pagination: this.paginationConf, actions: this.actionsConf}
  }

}
