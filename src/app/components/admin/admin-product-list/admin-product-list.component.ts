import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from '../../../services/product.service';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';
import { Router } from '@angular/router';  // <-- Ajoute cette importation

@Component({
  selector: 'app-admin-product-list',
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.css'
})
export class AdminProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined; // Observable (flux de données)


  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts()
  }

  deleteProduct(id: number) {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.productService.getProducts(); // Rafraîchir la liste après suppression
      });
    }
  }

  editProduct(id: number) {
    this.router.navigate(['/admin/products/edit', id]);
  }

  createProduct() {
    this.router.navigate(['/admin/products/create']);
  }

}
