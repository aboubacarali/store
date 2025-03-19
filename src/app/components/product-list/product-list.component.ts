import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from '../../services/product.service';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-product-list',
  imports: [
    RouterLink,
    NgForOf,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined; // Observable (flux de données)
  private router: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts(); // On affecte directement l'Observable
    console.log(this.products$);
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
