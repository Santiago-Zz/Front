import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { cartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  isHome = false;
  cartOpen = false;
  private routerSubscription: Subscription | undefined;
  private cartSubscription: Subscription | undefined;

  constructor(private router: Router, private cartService: cartService) {}

  ngOnInit(): void {
    // Detecta cambios en la ruta y verifica si estamos en '/home'
    this.checkIfHome(this.router.url);

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkIfHome(event.urlAfterRedirects); // Verifica cada cambio de navegación
      }
    });

    // Suscribirse al estado del carrito para saber si está abierto o cerrado
    this.cartSubscription = this.cartService.cartOpen$.subscribe(isOpen => {
      this.cartOpen = isOpen;
      console.log('Estado del carrito (abierto):', this.cartOpen);
    });
  }

  checkIfHome(url: string): void {
    this.isHome = url === '/home';
    console.log('Página actual es home:', this.isHome);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen; // Cambiar el estado del carrito
    console.log('Cambiando estado del carrito en HomeComponent:', this.cartOpen);
    this.cartService.toggleCart(this.cartOpen); // Notificar a otros componentes
  }

  scrollToSection() {
    const section = document.getElementById('nuestros-servicios');
    if (section) {
      // Calcula la posición de la sección y ajusta con un offset (p.ej., 50px)
      const yOffset = -75; // Ajusta este valor según el espacio deseado
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      // Desplaza suavemente hacia la posición calculada
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}

