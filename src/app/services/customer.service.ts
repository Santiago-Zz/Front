import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class customerService {
    private apiUrl = 'http://localhost:3000/customer/register';

    constructor(private http: HttpClient) {}

    register(userData: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const dataRole = { ...userData, role: 'user'}
      return this.http.post<any>(this.apiUrl, dataRole, { headers }).pipe(
        catchError((error) => {
          console.error('Error en el registro:', error);
          return throwError(() => new Error('Hubo un problema con el registro.'));
        })
      );
    }
}
