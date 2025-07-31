import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';

  //declare reactive form using FormGroup and FormControl from Angular's Reactive Forms module
  // Define the form controls and their initial values
  // The form controls are used to capture user input for registration
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,}$/),
    ]), // Password must start with an uppercase letter and be at least 7 characters (letters or numbers) long
  });

  submitForm() {
    if (this.LoginForm.valid) {
      this.isLoading = true; // Set loading state to true when form is submitted

      // console.log(this.registerForm);
      this.authService.signIn(this.LoginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.errorMsg = ''; // Reset error message on successful registration
          console.log('Registration successful:', response);
          // navigate to login page
          this.successMsg = response.message; // Store success message
          // Display success message to the user

          //1-save the token in local storage
          localStorage.setItem('userToken', response.token);

          //2-decode the token to get user data
          this.authService.getUserData();

          //3-navigate to the home page
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000); // Optional: Delay before navigating to the home page
        },

        error: (err) => {
          this.isLoading = false; // Reset loading state on error
          // console.error('Registration failed:', error);
          // Handle registration error, show error message
          console.log(err.error.message);
          this.errorMsg = err.error.message;
          // Display error message to the user
        },
      });
    } else {
      this.errorMsg = 'Please fill in all required fields correctly.';
      // Optionally, you can also mark all controls as touched to show validation errors
      this.LoginForm.markAllAsTouched();
    }
  }
}
