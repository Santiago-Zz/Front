import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = "http://localhost:3000/customer/login";
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password }
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      tap(response => {
        if(response.token) {
          console.log(response.token)
          this.setToken(response.token)
        }
      })
    )
  }

  // almaceno el token en localStorage
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  // recupero el token de localStorage
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  // validar el token y su expiracion
  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token) {
      return false
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp
  }

  // salir de la sesion y limpiar el token
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login'])
  }
}
