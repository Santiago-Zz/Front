import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  products_Id: number | null = null;
  selectedFile: File | null = null;
  message: string = '';
  products: Product[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
    // En el constructor, agrega una validación personalizada
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      image_url: [null, Validators.required],  // validación básica
      status: ['disponible', Validators.required],
      category_Id: [null, Validators.required]
    });

  };

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');  // Obtiene el parámetro como string

      if (id && !isNaN(+id)) {
        this.isEditMode = true;
        this.products_Id = +id;  // Convertir a número solo si es válido
        this.loadProductData(this.products_Id);
      } else {
        console.error('ID del producto no válido:', id);
      }
    });
  }

  loadProductData(id: number) {
    this.productService.getProductById(id).subscribe(product => {
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: product.quantity,
        status: product.status,
        category_Id: product.category_Id,
      });
    });
  }


  // agregar un nuevo producto a la base de datos
  addProduct() {
    if (this.productForm.invalid) {
      return;
    }

    const productData = new FormData();

    productData.append('name', this.productForm.value.name);
    productData.append('price', this.productForm.value.price.toString());
    productData.append('description', this.productForm.value.description);
    productData.append('quantity', this.productForm.value.quantity.toString());
    productData.append('status', this.productForm.value.status);
    productData.append('category_Id', this.productForm.value.category_Id.toString());

    // Si hay una imagen seleccionada, agregarla a FormData
    if (this.selectedFile) {
      productData.append('image_url', this.selectedFile, this.selectedFile.name);
    } else {
      productData.append('image_url', ''); // Enviar una cadena vacía si no hay imagen seleccionada
    }

    // Para mostrar el objeto en consola
    console.log('Objeto del producto enviado:', {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      description: this.productForm.value.description,
      quantity: this.productForm.value.quantity,
      status: this.productForm.value.status,
      category_Id: this.productForm.value.category_Id,
      image_url: this.selectedFile ? this.selectedFile.name : null,
    });

    if (this.isEditMode) {
      // Es edición, pasamos también el ID del producto
      this.productService.updateProduct(this.products_Id!, productData).subscribe(() => {
        this.toastr.info(`El producto fue actualizado con éxito`, 'Producto actualizado');
        this.router.navigate(['/home']);
      });
    } else {
      // Es creación
      this.productService.createProduct(productData).subscribe(
        () => {
          this.toastr.success('Producto creado con éxito', 'Creación');
          this.productForm.reset();
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error al crear el producto:', error);
          this.toastr.error('Error al crear el producto', 'Error');
        }
      );
    }
  }

  // Modificar un producto
  onEdit(product: Product) {
    console.log(`Editando el producto con ID: ${product.products_Id}`);
    this.router.navigate(['/edit-product', product.products_Id]);
  }


  // Manejo de imagenes
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.productForm.patchValue({ image_url: file });  // Actualizar el valor de image_url
      this.productForm.get('image_url')?.updateValueAndValidity();  // Marcarlo como válido
    }
  }
  
}
