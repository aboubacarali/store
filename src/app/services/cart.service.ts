import { Injectable } from '@angular/core';
import {Product} from './product.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);



  constructor() {
    // Charger le panier depuis localStorage au démarrage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product) {

    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Incrémente la quantité si déjà ajouté
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.updateCart();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const product = this.cartItems.find(item => item.id === productId);
    if (product) {
      product.quantity = quantity;
    }
    this.updateCart();
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }
}
