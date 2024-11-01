import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../model/product'


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = "http://localhost:3000/product/";

  constructor(private http: HttpClient) { }

  // obtener todos los productos (publico)
  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
      'Content-Type': `application/json`
    });

    return this.http.get<Product[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener los productos:', error);
        return throwError(() => new Error('Error al obtener los productos'));
      })
    );
  }

  // obtener un producto por ID (publico)
  getProductById(productId: number): Observable<Product> {
    console.log('ID recibido en el servicio:', productId);
    const url = `${this.apiUrl}${productId}`;
    return this.http.get<Product>(url).pipe(
      catchError((error) => {
        console.error(`Error al obtener el producto ${productId}:`, error);
        return throwError(() => new Error(`Error al obtener el producto con ID ${productId}`));
      })
    )
  }

  // crear un nuevo producto (privado solo para admin)
  createProduct(productData: FormData): Observable<Product> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
    });

    return this.http.post<Product>(this.apiUrl, productData, { headers }).pipe(
      catchError((error) => {
        console.error('Error al crear un producto', error)
        return throwError(() => new Error('Error al crear el producto'))
      })
    )
  }

  // actualizar un producto existente (admin)
  updateProduct(products_Id: number, productData: FormData): Observable<Product> {
    const url = `${this.apiUrl}${products_Id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
    });

    return this.http.put<Product>(url, productData, { headers }).pipe(
      catchError((error) => {
        console.error(`Error al actualizar el producto con ${products_Id}:`, error)
        return throwError(() => new Error(`Error al actualizar el producto con ID ${products_Id}`))
      })
    )
  }

  // eliminar un producto (admin)
  deleteProduct(products_Id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete<void>(`${this.apiUrl}${products_Id}`, { headers }).pipe (
      catchError((error) => {
        console.error(`Error al eliminar el producto con ${products_Id}:`, error)
        return throwError(() => new Error(`Error al eliminar el producto con ID ${products_Id}`))
      })
    )
  }

  // obtener productos por categoria
  getProductsByCategory(category_Id: number): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
      'Content-Type': `application/json`
    });

    const url = `${this.apiUrl}category/${category_Id}`;
    console.log('URL solicitada:', url); // Mostrar la URL solicitada
    return this.http.get<Product[]>(url, { headers }).pipe(
      catchError((error) => {
        console.error(`Error al obtener productos de la categoría ${category_Id}:`, error);
        return throwError(() => new Error('Error al obtener productos por categoría'));
      })
    );
  }

}


