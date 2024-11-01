import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { locationService } from '../services/location.service';
import { cartService } from '../services/cart.service';
import { environment } from '../environments/environments';
import { ePaycoService } from '../services/epayco.service';

declare var ePayco: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  // Definir los formularios
  userForm!: FormGroup;
  shippingForm!: FormGroup;
  paymentForm!: FormGroup;

  user: any = {
    name: '',
    lastName: '',
    email: '',
    documentType: '',
    documentNumber: '',
    phone: ''
  };

  shipping: any = {
    department: '',
    city: '',
    address: '',
    additionalInfo: '',
    neighborhood: '',
    recipient: '',
    deliveryMethod: ''
  };

  billing: any = {
    address: '',
    department: '',
    city: ''
  };

  departments: any[] = [];
  cities: any[] = [];
  billingCities: any[] = [];
  cartItems: any[] = [];
  subtotal: number = 0;
  total: number = 0;
  envio: number = 0;
  selectedPaymentMethod: string = '';
  useShippingAddress: boolean = true;

  constructor(private locationService: locationService, private fb: FormBuilder, private cartService: cartService, private epaycoService: ePaycoService) { }

  ngOnInit(): void {
    this.initializeForms();
    
    // Suscribirse al carrito y otros valores desde CartService
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
    this.cartService.subtotal$.subscribe((value) => {
      this.subtotal = value;
      this.calculateTotal(); // Recalcular total cada vez que cambie el subtotal
    });

    this.cartService.envio$.subscribe((value) => {
      this.envio = value;
      this.calculateTotal(); // Recalcular total cada vez que cambie el envío
    });

    this.getDepartments();
  }

  initializeForms() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.shippingForm = this.fb.group({
      department: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      additionalInfo: [''],
      neighborhood: [''],
      recipient: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', Validators.required],
      cardHolderName: ['', Validators.required]
    });
  }

  // Calcular el total de los productos mas el envio
  calculateTotal() {
    this.total = this.subtotal + this.envio;
  }

  payWithEPayco() {
    // creacion de la data de pago a partir de los formularios
    if (this.userForm.valid && this.shippingForm.valid) {
      const paymentData = {
        name: 'Compra en tienda',
        description: 'Productos adquiridos en nuestra tienda',
        invoice: 'FACT-' + new Date().getTime(), // Número único de factura
        currency: 'COP',
        amount: '5000', // Total calculado de la compra
        tax_base: '0',
        tax: '0',
        country: 'CO',
        lang: 'es',
        external: 'false',
        response: 'https://mi-sitio.com/respuesta-pago',
        confirmation: 'https://mi-sitio.com/confirmacion',
  
        // Información del cliente
        name_billing: this.userForm.value.firstName + ' ' + this.userForm.value.lastName,
        address_billing: this.shippingForm.value.address,
        type_doc_billing: this.userForm.value.documentType,
        mobilephone_billing: this.userForm.value.phone,
        number_doc_billing: this.userForm.value.documentNumber,
      };
  
      this.epaycoService.payWithEPayco(paymentData);
    } else {
      console.error('Formulario incompleto. Por favor verifica los campos obligatorios.');
    }
  }

  // Obtener los departamentos
  getDepartments(): void {
    this.locationService.getDepartaments().subscribe(
      (data) => {
        this.departments = data; // Cargar departamentos obtenidos
      },
      (error: any) => {
        console.error('Error al obtener departamentos', error);
      }
    );
  }

  // Obtener ciudades según el departamento seleccionado
  onDepartmentChange(type: string): void {
    let departmentId = type === 'shipping' ? this.shippingForm.get('department')?.value : this.billing.department;

    if (departmentId) {
      departmentId = Number(departmentId);
      this.locationService.getCitiesByDepartmentId(departmentId).subscribe(
        (data) => {
          if (type === 'shipping') {
            this.cities = data; // Cargar las ciudades obtenidas para el departamento de envío
          } else if (type === 'billing') {
            this.billingCities = data; // Cargar las ciudades obtenidas para el departamento de facturación
          }
        },
        (error) => {
          console.error('Error al obtener ciudades', error);
        }
      );
    }
  }

  // Obtener el nombre del departamento a partir de su ID
  getDepartmentNameById(departmentId: number): string {
    if (!departmentId) {
      return '';
    }
    const department = this.departments.find(dept => Number(dept.id) === Number(departmentId));
    return department ? department.name : '';
  }

  // Obtener el nombre de la ciudad a partir de su ID
  getCityNameById(cityId: number): string {
    if (!cityId) {
      return '';
    }
    const city = this.cities.find(c => Number(c.id) === Number(cityId));
    return city ? city.name : '';
  }

  // Seleccionar el método de pago
  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }

  proceedToShipping() {
    const collapseOne = document.getElementById('collapseOne');
    const collapseTwo = document.getElementById('collapseTwo');

    if (collapseOne && collapseTwo) {
      collapseOne.classList.remove('show');
      collapseTwo.classList.add('show');
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  proceedToPayment() {
    const collapseTwo = document.getElementById('collapseTwo');
    const collapseThree = document.getElementById('collapseThree');

    if (collapseTwo && collapseThree) {
      collapseTwo.classList.remove('show');
      collapseThree.classList.add('show');
    } else {
      this.shippingForm.markAllAsTouched();
    }
  }

  editSection(id: number) {
    const collapseOne = document.getElementById('collapseOne');
    const collapseTwo = document.getElementById('collapseTwo');
    const collapseThree = document.getElementById('collapseThree');

    if (id === 1) {
      // Abrir sección de Datos personales
      collapseOne?.classList.add('show');
      collapseTwo?.classList.remove('show');
      collapseThree?.classList.remove('show');
    } else if (id === 2) {
      // Abrir sección de Envío
      collapseOne?.classList.remove('show');
      collapseTwo?.classList.add('show');
      collapseThree?.classList.remove('show');
    } else if (id === 3) {
      // Abrir sección de Pago
      collapseOne?.classList.remove('show');
      collapseTwo?.classList.remove('show');
      collapseThree?.classList.add('show');
    }
  }

  goBack(): void {
    window.history.back();
  }
}
