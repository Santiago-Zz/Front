import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { cartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { MatMenuModule, } from '@angular/material/menu';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // Propiedad que controla la visibilidad de la barra de búsqueda
  searchQuery = '';

  // Mapeo de palabras clave a rutas y categoryId
  categoryMap = [
    { path: '/tecnologia', categoryId: '1', keywords: ['televisor', 'tv', 'consola', 'computador', 'laptop', 'bafle', 'equipo de sonido'] },
    { path: '/joyeria', categoryId: '2', keywords: ['cadena de oro', 'cadena de plata', 'pulseras', 'anillos', 'cadenas'] },
    { path: '/herramientas', categoryId: '3', keywords: ['taladro', 'herramienta'] },
    { path: '/accesorios', categoryId: '4', keywords: ['reloj', 'control', 'control xbox one', 'control play station', 'videojuegos'] }
  ];


  menuOpen = false;
  // mostrar carrito
  cartOpen = false;
  userOpen = false;

  // arr de productos 
  cartItems: any[] = [];
  total = 0;

  isHovered: boolean = false

  // Estado de autenticacion
  isAuthenticated = false;

  sidebarOpen: boolean = false;
  dropdownOpen: boolean = false;

  constructor(public router: Router, private authService: AuthService, private cartService: cartService, private productService: ProductService) { }

  ngOnInit(): void {
    // verifica si el usuario esta autenticado
    this.isAuthenticated = this.authService.isAuthenticated();

    // Subscribirnos al carrito para obtener los productos agregados
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  // Método para alternar hover
  toggleHover(isHovered: boolean): void {
    this.isHovered = isHovered
  }

  // opciones del menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Método para abrir/cerrar el sidebar del menu para movil
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Método para abrir/cerrar el dropdown dentro del sidebar dentro del menu movil de enlaces
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // mostrar opciones del usuario
  toggleUser() {
    this.userOpen = !this.userOpen;
  }
  // mostrar/ocultar carrito
  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  increaseQuantity(index: number) {
    const item = this.cartItems[index];
    item.quantity += 1;
    this.cartService.updateQuantity(item.id, item.quantity);
    this.calculateTotal();
  }

  decreaseQuantity(index: number) {
    const item = this.cartItems[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.updateQuantity(item.id, item.quantity);
      this.calculateTotal();
    }
  }

  removeCartItem(index: number) {
    this.cartService.removeCart(index);
  }

  // funcionamiento de busqueda de palabras clave (Barra de busqueda)
  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();

    // Verifica si `query` contiene texto
    if (!query) {
      console.log('Búsqueda vacía, no se realizará redirección.');
      return;
    }

    // Buscar coincidencia en el mapeo de categorías
    const matchedCategory = this.categoryMap.find(category =>
      category.keywords.some(keyword => query.includes(keyword))
    );

    if (matchedCategory) {
      const navigationUrl = `${matchedCategory.path}/${matchedCategory.categoryId}`;
      console.log(`Redirigiendo a la URL: ${navigationUrl}`);  // Registro detallado
      this.router.navigateByUrl(navigationUrl).then(success => {
        if (success) {
          console.log('Redirección exitosa');
        } else {
          console.log('Error en la redirección');
        }
      });
    } else {
      console.log('No se encontraron resultados, redirigiendo a página de "No encontrado"');
      this.router.navigate(['/search-not-found']);
    }
  }

  // Funcion para salir de la pagina
  logout() {
    this.authService.logout();
    this.isAuthenticated = false // actualiza el estado
    this.router.navigate(['/home'])
  }

  // Método para el perfil
  profile() {
    this.router.navigate(['/profile']);
  }
}
