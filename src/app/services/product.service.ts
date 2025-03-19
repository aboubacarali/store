import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// Interface pour les données
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  stock: boolean;
  quantity?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/ld+json',
      // 'Authorization': 'Bearer my-jwt-token' // Remplace par le vrai token
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<{ 'member': Product[] }>(this.apiUrl).pipe(
      map(response => response['member']) // TypeScript comprend maintenant la structure
    );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<Product >(`${this.apiUrl}/${id}`)
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, { headers: this.getHeaders() });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' }); // API Platform supporte mieux ce format
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product, {headers});
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
