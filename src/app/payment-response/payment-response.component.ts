import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-payment-response',
  standalone: true,
  imports: [],
  templateUrl: './payment-response.component.html',
  styleUrl: './payment-response.component.scss'
})
export class PaymentResponseComponent implements OnInit {
  paymentStatus: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.paymentStatus = params['x_response']
      })
  }
}
