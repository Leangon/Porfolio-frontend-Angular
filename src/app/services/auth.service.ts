import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable} from "rxjs"; //*tiene la caracteristica de nocion de estado, al momento de suscribir va a poder acceder al ultimo valor disponible.
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http//localhost:8080/porfolio'; //*La url que corresponda en casa caso
  currentUserSubject: BehaviorSubject<any>;
  token: any;

  constructor(private http: HttpClient, private router: Router) {
    console.log("El servicio esta corriendo");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'))
   }

  iniciarSesion(credenciales: any ):Observable<any> {
    return this.http
      .post(this.url + '/authenticate', credenciales)
      .pipe(map(data => {
        localStorage.setItem('currrentUser', JSON.stringify(data));
        this.currentUserSubject.next(data)
        return data
      }))  
  }

  get UsuarioAuntenticado() {
    return this.currentUserSubject.value
  }


  //*Para cerrar sesión eliminamos el token del localStorage
  logout() {
    localStorage.removeItem('token');
  }

  //*Un servicio para verificar si existe la sesión

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null)
  }

}
