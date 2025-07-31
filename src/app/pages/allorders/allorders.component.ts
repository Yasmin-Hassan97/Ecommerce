import { Component, inject, OnInit } from '@angular/core';
import { AllordersService } from '../../core/services/allorders/allorders.service';
import { IOrders } from '../../shared/interfaces/iorders';
import { IUserData } from '../../shared/interfaces/iuser-data';
import { last, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  userOrders: IOrders = {} as IOrders;

  userData: IUserData = {} as IUserData;

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.getUserOrders(userData.id);
    }
  }

  private readonly allordersService = inject(AllordersService);

  getUserOrders(userId: String): void {
    this.allordersService.getUserOrders(userId).subscribe({
      next: (res) => {
        console.log(res[res.length - 1]);

        this.userOrders = res[res.length - 1];
        console.log('User Data:', res.user);
        this.userData = res[res.length - 1].user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
