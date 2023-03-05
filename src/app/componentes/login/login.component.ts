import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Skill } from 'src/app/models/skill';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  form: any = FormGroup;
  isAnimation: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private route: Router, private dialogService: DialogService) { 

    //*Creamos el grupo de controles para el formulario de login
      this.form = this.formBuilder.group(
        {
          email:['', [Validators.required, Validators.email]],
          password:['',[Validators.required, Validators.minLength(8)]]
          // deviceId: [""],
          // deviceType: [""],
          // notificationToken: [""]
      })
  }

  ngOnInit(): void {

  }

  get Password(){
    return this.form.get("password");
  }
 
  get Email(){
   return this.form.get("email");
  }

  get PasswordInvalid(){
    return this.Password?.touched && !this.Password?.valid;
  }

  get PasswordValid(){
    return this.Password?.touched && this.Password.valid;
  }

  get EmailInvalid() {
    return this.Email?.touched && !this.Email?.valid;
  }

  get EmailValid(){
    return this.Email?.touched && this.Email.valid;
  }

  onEnviar(event: Event){
    //* Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
    
    if (this.form.valid){
      
      //* Llamamos a nuestro servicio para enviar los datos al servidor
      //* También podríamos ejecutar alguna lógica extra
      this.authService.iniciarSesion(this.form.value).subscribe(data => {
        console.log("Data: " + JSON.stringify(data.token));
        this.dialogService.closeDialog();
        this.route.navigate([''])
        window.location.reload();
      })
      // alert("Todo salio bien ¡Enviar formuario!")
    }else{
      //* Corremos todas las validaciones para que se ejecuten los mensajes de error en el template
      this.form.markAllAsTouched(); 
    }
  }

  changeAnimation(): boolean{
    return this.isAnimation = true;
  }
}
