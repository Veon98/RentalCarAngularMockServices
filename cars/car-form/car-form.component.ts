import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  formCar!: FormGroup;
  marca_tmp: any = "";
  ida_tmp!: any;


  constructor(public fb: FormBuilder, private route: ActivatedRoute) { //istanzia il servizio formbuilder

    //recupero utente attraverso id
    const routeParams = this.route.snapshot.paramMap;
    this.ida_tmp = routeParams.get('id_a');  //nel get va il nome dell'attributo coerente a quello del path nel routing
    //console.log(this.ida_tmp)

    this.formCar = fb.group({  //creo il json
      'targa': ["", Validators.required],
      'marca': [this.marca_tmp, Validators.required],   //il primo indica il valore di default (utile per il form di modifica->con getUser si recupera l'user attraverso l'id che arriva come parametro e si inseriscono i campi specifici nel form). Nel caso in cui dovesse dare problemi con l'add, dato che il value sarebbe mull, provare con un if che checka l'esistenza dell'id_utente ed eventualmente fare un secondo oggetto json senza value. Oppure usare ngModule
      'modello': ["", Validators.required],
      'isDisponibile': [true, Validators.required]
    });
  }


  ngOnInit(): void {
  }


  sendData(): void{
    if (!this.formCar.valid){
      alert("Errore nella compilazione del form")
      return;
    }
    //else if in cui si controlla se effettuare aggiunta o modifica
    else{
      console.log(
        this.formCar.controls['targa'].value,
        this.formCar.controls['marca'].value,
        this.formCar.controls['modello'].value,
        this.formCar.controls['isDisponibile'].value
      )
    }
  }

  checkTarga(){
    let targa = this.formCar.controls['targa'].value
    if (targa.length!=7){
      this.formCar.controls['targa'].setErrors({incorect: true})  //il campo diviene invalido
    }
    else{
      this.formCar.controls['targa'].setErrors(null)  //eventualmente passa il controllo
    }
  }

}
