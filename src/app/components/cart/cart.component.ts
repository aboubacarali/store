import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cart: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.calculateTotal();
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.cart = this.cartService.getCart();
    this.calculateTotal();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cart = [];
    this.total = 0;
  }

  calculateTotal() {
    this.total = this.cart.reduce((sum, product) => sum + product.price, 0);
  }

}
