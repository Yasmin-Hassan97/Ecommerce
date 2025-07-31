import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  userData: any;
  signUp(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  signIn(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  getUserData(): void {
    this.userData = jwtDecode(localStorage.getItem('userToken')!);
    const jsonString = JSON.stringify(this.userData);
    localStorage.setItem('userData', jsonString);
  }

  signOut(): void {
    //1) Clear user token and user data from local storage
    localStorage.removeItem('userToken');
    //2) Clear user data from the service
    this.userData = null;
    //3) Navigate to the login page
    this.router.navigate(['/login']);
  }
}
