import { Component, OnInit } from '@angular/core';
import { cartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent implements OnInit {
  cartItems: any[] = [];
  subtotal = 0;
  total = 0;
  envio = 0;  // Consideramos que el envío es 0 ya que es gratis

  constructor(private cartService: cartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.calculeSubTotal();
      this.calculeTotal();
    });
  }

  calculeSubTotal() {
    this.subtotal = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  calculeTotal() {
    this.total = this.subtotal;  // Envío gratis y sin descuentos en este caso
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.calculeSubTotal();
    this.calculeTotal();
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.calculeSubTotal();
      this.calculeTotal();
    }
  }

  removeCart(index: number) {
    this.cartService.removeCart(index);
    this.calculeTotal();
  }

  goBack(): void {
    window.history.back();
  }
}
