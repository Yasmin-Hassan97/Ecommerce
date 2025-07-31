import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from '../../core/services/checkout/checkout.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly FormBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly checkoutService = inject(CheckoutService);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);

  paymentForm: any;
  cartId: string = '';

  paymentMethod: string = '';

  ngOnInit(): void {
    // this.paymentForm = new FormGroup({
    //   details: new FormControl(null, [
    //     Validators.required,
    //   ,
    //   ]),
    //   phone: new FormControl(null, [Validators.required ,   Validators.pattern(/^01[0125][0-9]{8}$/)]),
    //   city: new FormControl(null, [Validators.required]),
    // });

    this.paymentForm = this.FormBuilder.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: [null, [Validators.required]],
      cash: [null, [Validators.required]],
      card: [null, [Validators.required]],
    });

    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.cartId = res.get('id')!;
        console.log(this.cartId);
      },
    });
  }

  submitPaymentForm(): void {
    console.log(this.paymentForm.value);

    if (this.paymentMethod == 'card') {
      this.checkoutService
        .checkoutSession(this.cartId, this.paymentForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
            this.cartService.cartItemsNumber.set(0); //===> signal type
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else if (this.paymentMethod == 'cash') {
      this.checkoutService
        .createCashOrder(this.cartId, this.paymentForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status === 'success') {
              this.router.navigate(['/allorders']);
            }
            this.cartService.cartItemsNumber.set(0); //===> signal type
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
