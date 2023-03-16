import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable} from "rxjs"; //*tiene la caracteristica de nocion de estado, al momento de suscribir va a poder acceder al ultimo valor disponible.
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { JwtDto } from '../models/jwtDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.apiUrl;

  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    console.log("El servicio esta corriendo");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'))
    console.log(this.currentUserSubject.value);
   }

  iniciarSesion(credenciales: any ):Observable<JwtDto>{
    return this.http.post<JwtDto>(this.url + 'auth/login', credenciales).pipe(map(data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        // if (this.UsuarioAuntenticado){
        //   window.location.reload();
        // }
        return data
      }))
  }

  get UsuarioAuntenticado() {
    return this.currentUserSubject.value
  }

  //*Para cerrar sesión eliminamos el token del localStorage
  public logout():void {
    localStorage.removeItem('currentUser');
  }

  //*Un servicio para verificar si existe la sesión

  public get logIn(): boolean {
    return (localStorage.getItem('currentUser') !== null)
  }

}
