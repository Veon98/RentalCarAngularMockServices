import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formDisp!: FormGroup;
  dataI!: any;
  dataF!: any;
  arrDate!: any;


  constructor(public fb: FormBuilder, private route: ActivatedRoute, private router: Router) { //istanzia il servizio formbuilder

    this.formDisp = fb.group({  //creo il json
      'dataI': ["", Validators.required],
      'dataF': ["", Validators.required]   //il primo indica il valore di default (utile per il form di modifica->con getUser si recupera l'user attraverso l'id che arriva come parametro e si inseriscono i campi specifici nel form). Nel caso in cui dovesse dare problemi con l'add, dato che il value sarebbe mull, provare con un if che checka l'esistenza dell'id_utente ed eventualmente fare un secondo oggetto json senza value. Oppure usare ngModule
    });

  }



  sendData(): void{
    if (!this.formDisp.valid){
      alert("Data di inizio successiva a quella di inizio")
      return;
    }
    else{
      this.dataI = this.formDisp.controls['dataI'].value;
      this.dataF = this.formDisp.controls['dataF'].value;
      //this.router.navigate(['/dispCars', this.dataI, this.dataF]);
      this.arrDate = [this.dataI, this.dataF]

    }
  }


  checkDate(){
    let dataIcheck = new Date(this.formDisp.controls['dataI'].value);
    let dataFcheck = new Date(this.formDisp.controls['dataF'].value);
    if (dataIcheck>dataFcheck){
      this.formDisp.controls['dataI'].setErrors({incorect: true})  //il campo diviene invalido
      this.formDisp.controls['dataF'].setErrors({incorect: true})
    }
    else{
      this.formDisp.controls['dataI'].setErrors(null)  //eventualmente passa il controllo
      this.formDisp.controls['dataF'].setErrors(null)
    }
  }


  ngOnInit(): void {
  }

}
