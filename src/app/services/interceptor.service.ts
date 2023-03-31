import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let currentUser = this.authService.UsuarioAuntenticado;
    this.spinnerService.show();
    if (currentUser && currentUser.token) {
      req = req.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    } 
    // console.log(`Interceptor esta corriendo ` +  JSON.stringify(currentUser));
    return next.handle(req).pipe(
      finalize(() =>{
        this.spinnerService.hide();
      })
    );
  }
}
