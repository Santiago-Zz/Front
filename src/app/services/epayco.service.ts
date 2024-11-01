import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';

declare var ePayco: any;

@Injectable({
  providedIn: 'root'
})
export class ePaycoService {
  private handler: any;

  constructor() {
    this.initializeEPayco();
  }

  initializeEPayco() {
    // Configura ePayco usando la llave pública y define si es entorno de pruebas
    this.handler = ePayco.checkout.configure({
      key: environment.EPAYCO_PUBLIC_KEY, // Llave pública desde environment
      test: true, // Cambiar a false en producción
    });
  }

  payWithEPayco(paymentData: any) {
    // Abre el módulo de pago con los datos proporcionados
    this.handler.open(paymentData);
  }
  
}
