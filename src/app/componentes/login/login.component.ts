import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import {FormControl} from '@angular/forms'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email = '';
  password = '';
  form: any = FormGroup;
  
  constructor(private authService: AuthService, private formBuilder: FormBuilder) { 
    //*Creamos el grupo de controles para el formulario de login

      this.form = this.formBuilder.group({
      password:['',[Validators.required, Validators.minLength(8)]],
      email:['', [Validators.required, Validators.email]],
   })
  }

  Login(){
    //*El servicio de AuthService.login ya redirecciona
    //*En caso de inicio de sesiòn positivo.
    this.authService.login(this.email, this.password)
  }

  ngOnInit(): void {}

  get Password(){
    return this.form.get("password");
  }
 
  get Mail(){
   return this.form.get("email");
  }

  get PasswordValid(){
    return this.Password?.touched && !this.Password?.valid;
  }

  get MailValid() {
    return false
  }


  onEnviar(event: Event){
    //* Detenemos la propagación o ejecución del compotamiento submit de un form

    event.preventDefault; 
 
    if (this.form.valid){
      //* Llamamos a nuestro servicio para enviar los datos al servidor
      //* También podríamos ejecutar alguna lógica extra

      alert("Todo salio bien ¡Enviar formuario!")
    }else{
      //* Corremos todas las validaciones para que se ejecuten los mensajes de error en el template  

      this.form.markAllAsTouched(); 
    }
 
  }

}
