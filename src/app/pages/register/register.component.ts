import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';

  //declare reactive form using FormGroup and FormControl from Angular's Reactive Forms module
  // Define the form controls and their initial values
  // The form controls are used to capture user input for registration
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,}$/),
      ]), // Password must start with an uppercase letter and be at least 7 characters (letters or numbers) long
      rePassword: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]), // Phone number must start with 01 and be followed by 0 or 1 or 2 or 5 then followed by 8 digits from 0 to 9
    },
    { validators: this.confirmPassword } // Custom validator to check if password and rePassword match
  );

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    // return password === rePassword ? null : { mismatch: true };
    //or
    if (password === rePassword) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.isLoading = true; // Set loading state to true when form is submitted
      // console.log(this.registerForm);
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.errorMsg = ''; // Reset error message on successful registration
          console.log('Registration successful:', response);
          // Handle successful registration, navigate to login page
          this.successMsg = response.message; // Store success message
          // Display success message to the user
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000); // Optional: Delay before navigating to login page
        },

        error: (error) => {
          this.isLoading = false; // Reset loading state on error
          // console.error('Registration failed:', error);
          // Handle registration error, show error message
          console.log(error.error.message);
          this.errorMsg = error.error.message;
          // Display error message to the user
        },
      });
    } else {
      this.errorMsg = 'Please fill in all required fields correctly.';
      // Optionally, you can also mark all controls as touched to show validation errors
      this.registerForm.markAllAsTouched();
    }
  }
}
