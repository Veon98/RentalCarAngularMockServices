import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;


  constructor(public fb: FormBuilder, private route: ActivatedRoute, private router: Router) { //istanzia il servizio formbuilder


    this.formLogin = fb.group({  //creo il json
      'username': ["", Validators.required],
      'password': ["", Validators.required]   //il primo indica il valore di default (utile per il form di modifica->con getUser si recupera l'user attraverso l'id che arriva come parametro e si inseriscono i campi specifici nel form). Nel caso in cui dovesse dare problemi con l'add, dato che il value sarebbe mull, provare con un if che checka l'esistenza dell'id_utente ed eventualmente fare un secondo oggetto json senza value. Oppure usare ngModule
    });
  }


  ngOnInit(): void {
  }


  sendData(): void{
    if (!this.formLogin.valid){
      alert("Errore nella compilazione del form")
      return;
    }
    else{
      console.log(
        this.formLogin.controls['username'].value,
        this.formLogin.controls['password'].value
      )
      this.router.navigate(['/home']);
    }
  }


  checkCodFis(){
    let codF = this.formLogin.controls['username'].value
    if (codF.length!=10){
      this.formLogin.controls['username'].setErrors({incorect: true})  //il campo diviene invalido
    }
    else{
      this.formLogin.controls['username'].setErrors(null)  //eventualmente passa il controllo
    }
  }

}
