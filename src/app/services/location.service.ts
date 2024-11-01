import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class locationService {
    private departamentsApiUrl = 'https://api-colombia.com/api/v1/Department';
    private citiesByDepartmentApiUrl = 'https://api-colombia.com/api/v1/Department/{id}/cities';

    constructor(private http: HttpClient) { }

    // obtener departamentos
    getDepartaments(): Observable<any> {
        return this.http.get(`${this.departamentsApiUrl}`)
    }

  // Obtener ciudades por departamento (necesita el ID del departamento)
  getCitiesByDepartmentId(departmentId: number): Observable<any> {
    const url = this.citiesByDepartmentApiUrl.replace('{id}', departmentId.toString());
    return this.http.get(url);
  }
}