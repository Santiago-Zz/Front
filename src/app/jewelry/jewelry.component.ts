import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../model/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { cartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jewelry',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './jewelry.component.html',
  styleUrl: './jewelry.component.scss'
})
export class JewelryComponent {
  // marcas del filtro
  brands: any[] = [
    { name: 'Marca A', count: 37 },
    { name: 'Marca B', count: 30 },
    { name: 'Marca C', count: 16 },
    { name: 'Marca D', count: 14 }
  ];

  products: Product[] = [];
  categoryId!: number;

  // organizacion de precios
  minPrice: number = 0;
  maxPrice: number = 0;

  // funciones para mostrar filtro y btn de organizar price
  showFilters: boolean = false;
  showSort: boolean = true;

  // verificar si el usuario es admin
  isAdmin: boolean = false;
  showCreateForm: boolean = false;

  // loading es para una barra de progress (NO SIRVE PARA MI PROYECTO)
  loading: boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private toastr: ToastrService, private cartService: cartService) { }

  ngOnInit(): void {
    // Capturar el ID de la categoría desde la URL
    const categoryId = Number(this.route.snapshot.paramMap.get('categoryId')); // Capturamos el 'id' desde la URL

    // Mostrar el id capturado en la consola
    console.log('ID de categoría capturado:', categoryId);

    if (categoryId) {
      console.log('ID de la categoría:', categoryId);  // Debug para ver si está capturando el ID correctamente
      this.loadProductsByCategory(Number(categoryId));
    }

    // Solo verificamos si es admin si hay un token
    const token = localStorage.getItem('authToken');
    if (token) {
      const tokenPayload = this.decodeToken(token);
      if (tokenPayload && tokenPayload.role === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      console.log('isAdmin:', this.isAdmin);  // Verifica si isAdmin está siendo true o false
    } else {
      console.error('No se encontró ningún token en localStorage.');
    }
  }

  loadProductsByCategory(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId).subscribe(
      (data: Product[]) => {
        this.products = data;
        console.log('Productos cargados:', this.products); // Debug para verificar los productos cargados
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  decodeToken(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload
    } catch (error: any) {
      console.error('Error decodificando el token:', error)
      return null
    }
  }

  editProduct(product: Product) {
    if (this.isAdmin) {
      console.log(`Editando el producto con ID: ${product.products_Id}`)
    }
  }

  deleteProduct(products_Id: number) {
    // Mostrar el ID del producto en la consola
    console.log("ID del producto a eliminar:", products_Id);
    if (this.isAdmin) {
      this.productService.deleteProduct(products_Id)
        .subscribe(() => {
          this.loadProductsByCategory(this.categoryId);
          this.toastr.warning('El producto fue eliminado con éxito.', 'Producto eliminado');
        })
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;  // Alterna el valor de true a false o viceversa.
    const filterText = document.getElementById('filterText');
    
    if (filterText) {
      filterText.textContent = this.showFilters ? 'Ocultar filtros' : 'Mostrar filtros';
    }
  }

  sort(order: string) {
    if (order === 'asc') {
      // Ordenar de menor a mayor precio
      this.products.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      // Ordenar de mayor a menor precio
      this.products.sort((a, b) => b.price - a.price);
    }

    console.log("productos ordenados: ", this.products)
  }

  applyPriceFilter(minPrice?: number, maxPrice?: number) {
    // Si los valores no son proporcionados, usar el rango personalizado
    if (minPrice === undefined || maxPrice === undefined) {
      minPrice = this.minPrice;  // Valores del input personalizado
      maxPrice = this.maxPrice;
    }

    // Implementa aquí la lógica de filtrado por rango
    console.log(`Aplicando filtro de precio: ${minPrice} - ${maxPrice}`);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log(`${product.name} agregado al carrito`);
  }
}
