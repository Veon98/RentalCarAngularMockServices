import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  formUser!: FormGroup;
  nome_tmp: any = "";
  idu_tmp!: any;


  constructor(public fb: FormBuilder, private route: ActivatedRoute) { //istanzia il servizio formbuilder

    //recupero utente attraverso id
    const routeParams = this.route.snapshot.paramMap;
    this.idu_tmp = routeParams.get('id_u');  //nel get va il nome dell'attributo coerente a quello del path nel routing
    //console.log(this.idu_tmp)

    this.formUser = fb.group({  //creo il json
      'codFiscale': ["", Validators.required],
      'nome': [this.nome_tmp, Validators.required],   //il primo indica il valore di default (utile per il form di modifica->con getUser si recupera l'user attraverso l'id che arriva come parametro e si inseriscono i campi specifici nel form). Nel caso in cui dovesse dare problemi con l'add, dato che il value sarebbe mull, provare con un if che checka l'esistenza dell'id_utente ed eventualmente fare un secondo oggetto json senza value. Oppure usare ngModule
      'cognome': ["", Validators.required],
      'pwd': ["", Validators.required],
      'isAdmin': [false, Validators.required]
    });
  }


  ngOnInit(): void {
  }


  sendData(): void{
    if (!this.formUser.valid){
      alert("Errore nella compilazione del form")
      return;
    }
    //else if in cui si controlla se effettuare aggiunta o modifica
    else{
      console.log(
        this.formUser.controls['codFiscale'].value,
        this.formUser.controls['nome'].value,
        this.formUser.controls['cognome'].value,
        this.formUser.controls['pwd'].value,
        this.formUser.controls['isAdmin'].value
      )
    }
  }

  checkCodFis(){
    let codF = this.formUser.controls['codFiscale'].value
    if (codF.length!=10){
      this.formUser.controls['codFiscale'].setErrors({incorect: true})  //il campo diviene invalido
    }
    else{
      this.formUser.controls['codFiscale'].setErrors(null)  //eventualmente passa il controllo
    }
  }

}
