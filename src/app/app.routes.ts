import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'home', 
        loadComponent: () => import('../app/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'tecnologia/:categoryId',
        loadComponent: () => import('../app/technology/technology.component').then(c => c.TechnologyComponent)
    },
    {
        path: 'joyeria/:categoryId',
        loadComponent: () => import('../app/jewelry/jewelry.component').then(c => c.JewelryComponent)
    },
    {
        path: 'herramientas/:categoryId',
        loadComponent: () => import('../app/tools/tools.component').then(c => c.ToolsComponent)
    },
    {
        path: 'accesorios/:categoryId',
        loadComponent: () => import('../app/accessories/accessories.component').then(c => c.AccessoriesComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('../app/about/about.component').then(c => c.AboutComponent)
    },
    {
        path: 'buy-gold',
        loadComponent: () => import('../app/buy-gold/buy-gold.component').then(c => c.BuyGoldComponent)
    },
    { 
        path: 'login', 
        loadComponent: () => import('../app/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register-user',
        loadComponent: () => import('../app/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'create-product',
        loadComponent: () => import('../app/product-form/product-form.component').then(c => c.ProductFormComponent)
    },
    {
        path: 'edit-product/:id',
        loadComponent: () => import('../app/product-form/product-form.component').then(c => c.ProductFormComponent),
    },
    {
        path: 'checkout',
        loadComponent: () => import('../app/cart-summary/cart-summary.component').then(c => c.CartSummaryComponent)
    },
    {
        path: 'order-payment',
        loadComponent: () => import('../app/checkout/checkout.component').then(c => c.CheckoutComponent)
    },
    {
        path: 'payment-response',
        loadComponent: () => import('../app/payment-response/payment-response.component').then(c => c.PaymentResponseComponent)
    },
    { 
        path: '', 
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
