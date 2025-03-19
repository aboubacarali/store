import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService} from '../../services/product.service';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {CartService} from '../../services/cart.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product> | undefined = undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    this.product$ = this.productService.getProductById(id);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert('Produit ajouté au panier !');
  }

}
