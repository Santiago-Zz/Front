import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class cartService {
    private cart = new BehaviorSubject<any[]>([]);
    private subtotal = new BehaviorSubject<number>(0);
    private envio = new BehaviorSubject<number>(0);
    private cartOpen = new BehaviorSubject<boolean>(false);

    cart$ = this.cart.asObservable();
    subtotal$ = this.subtotal.asObservable();
    envio$ = this.envio.asObservable();
    cartOpen$ = this.cartOpen.asObservable();

    constructor() {
        const storedCart = localStorage.getItem('cart');
        const storedCartOpen = localStorage.getItem('cartOpen')

        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            this.cart.next(parsedCart);
            this.calculateSubtotal(parsedCart);
        }

        this.cartOpen.next(storedCartOpen === 'true');
    }

    toggleCart(isOpen: boolean) {
        console.log('Cambio de estado del carrito a:', isOpen);
        this.cartOpen.next(isOpen);
        localStorage.setItem('cartOpen', String(isOpen));
    }

    private saveCart(cart: any) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    getCartItems() {
        return this.cart.getValue();
    }

    addToCart(product: any) {
        const currentCart = this.getCartItems();

        // Verificar si el producto ya existe en el carrito
        const existingProduct = currentCart.find(item => item.products_Id === product.products_Id);

        if (existingProduct) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            existingProduct.quantity += 1;
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad inicial de 1
            const newProduct = { ...product, quantity: 1 };
            currentCart.push(newProduct);
        }

        // Actualizar el carrito y guardar en localStorage
        this.cart.next(currentCart);
        this.saveCart(currentCart);
        this.calculateSubtotal(currentCart);
    }

    removeCart(index: number) {
        const currentCart = this.getCartItems();
        currentCart.splice(index, 1);
        this.cart.next(currentCart);
        this.saveCart(currentCart);
        this.calculateSubtotal(currentCart);
    }

    clearCart() {
        this.cart.next([]);
        this.saveCart([]);
        this.subtotal.next(0);
        this.envio.next(0);
    }

    setShippingCost(cost: number) {
        this.envio.next(cost);
    }

    getSubtotal() {
        return this.subtotal.getValue();
    }

    getShippingCost() {
        return this.envio.getValue();
    }

    private calculateSubtotal(cart: any[]) {
        const newSubtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
        this.subtotal.next(newSubtotal);
    }

    getTotal() {
        return this.getSubtotal() + this.getShippingCost();
    }

    updateQuantity(productId: number, quantity: number) {
        const currentCart = this.getCartItems();
        const product = currentCart.find((item) => item.id === productId);

        if (product) {
            product.quantity = quantity;
            this.cart.next(currentCart);
            this.saveCart(currentCart);
            this.calculateSubtotal(currentCart);
        }
    }
}