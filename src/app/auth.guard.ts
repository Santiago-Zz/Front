import { CanActivate, Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private router!: Router;

  constructor(
    private http: HttpClient,
    private injector: Injector
  ) {}

  private getRouter(): Router {
    if (!this.router) {
      this.router = this.injector.get(Router); // Obtenemos Router solo cuando lo necesitamos
    }
    return this.router;
  }

  canActivate(): boolean {
    const token = localStorage.getItem('token')

    if(token) {
      return true; // Si existe el token, permite el acceso
    } else {
      this.getRouter().navigate(['/login']); // Aquí usamos Router solo si lo necesitamos
      return false; // Si no hay token, redirige al login
    }
  }
}
