import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email = '';
  password = '';
  form: any = FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private ruta: Router, private dialogService: DialogService) { 

    //*Creamos el grupo de controles para el formulario de login
      this.form = this.formBuilder.group(
        {
          email:['', [Validators.required, Validators.email]],
          password:['',[Validators.required, Validators.minLength(8)]],
          deviceId: [""],
          deviceType: [""],
          notificationToken: [""]
      })
  }

  ngOnInit(): void {

  }

  get Password(){
    return this.form.get("password");
  }
 
  get Mail(){
   return this.form.get("email");
  }

  get PasswordInvalid(){
    return this.Password?.touched && !this.Password?.valid;
  }

  get PasswordValid(){
    return this.Password?.touched && this.Password.valid;
  }

  get MailInvalid() {
    return this.Mail?.touched && !this.Mail?.valid;
  }

  get MailValid(){
    return this.Mail?.touched && this.Mail.valid;
  }

  Login() {
    //*El servicio de AuthService.login ya redirecciona
    //*En caso de inicio de sesiòn positivo.
  }

  onEnviar(event: Event){
    //* Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
    
    if (this.form.valid){
      
      //* Llamamos a nuestro servicio para enviar los datos al servidor
      //* También podríamos ejecutar alguna lógica extra
      this.authService.iniciarSesion(this.form.value).subscribe(data => {
        console.log("Data: " + JSON.stringify(data));
        this.ruta.navigate(['/porfolio'])
      })
      this.dialogService.closeDialog();
      // alert("Todo salio bien ¡Enviar formuario!")
    }else{
      //* Corremos todas las validaciones para que se ejecuten los mensajes de error en el template
      this.form.markAllAsTouched(); 
    }
  }
}
