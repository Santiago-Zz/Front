import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buy-gold',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './buy-gold.component.html',
  styleUrl: './buy-gold.component.scss'
})

export class BuyGoldComponent implements OnInit {

  preciosOro: { tipo: string, precio: number, nuevoPrecio?: number }[] = [
    { tipo: '18K Nacional', precio: 200000 },
    { tipo: '18K Ley 750', precio: 228000 },
    { tipo: '24K', precio: 288000 },
    { tipo: '22K', precio: 257000 },
    { tipo: '16K', precio: 188000 },
    { tipo: '14K', precio: 156000 }
  ];

  isAdmin: boolean = false;

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    // Lógica para verificar si es administrador
    const token = localStorage.getItem('authToken');
    if (token) {
      const tokenPayload = this.decodeToken(token);
      if (tokenPayload && tokenPayload.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

  decodeToken(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }

  updatePrice(oro: any) {
    if (oro.nuevoPrecio && oro.nuevoPrecio > 0) {
      oro.precio = oro.nuevoPrecio;
      oro.nuevoPrecio = null; // Limpia el campo después de actualizar

      // Aquí puedes hacer la llamada al servicio para guardar el cambio en la base de datos.
      console.log('Precio actualizado:', oro);
    }
    this.toastr.success('Precios actualizados con éxito.', 'Actualización de Precios');
  }
}
