import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgotService } from '../../../../core/services/forgot/forgot.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/authentication/auth.service';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export class ForgotComponent {
  private readonly forgotService = inject(ForgotService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  step: number = 1;

  forgotPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
  });

  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  restPassForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  forgotPassword() {
    let emailValue = this.forgotPassForm.get('email')?.value;
    this.restPassForm.get('email')?.patchValue(emailValue);

    this.forgotService.forgotPassword(this.forgotPassForm.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.statusMsg == 'success') {
          this.step = 2;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  verifyCode() {
    this.forgotService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'Success') {
          this.step = 3;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  resetPass() {
    this.forgotService.resetPassword(this.restPassForm.value).subscribe({
      next: (response) => {
        console.log(response);

        //1-save the token in local storage
        localStorage.setItem('userToken', response.token);

        //2-decode the token to get user data
        this.authService.getUserData();

        //3-navigate to the home page
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000); // Optional: Delay before navigating to the home page
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
