import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';
import { Account } from '../../classes/account';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public userAccount?: Account;
  public isLoggedIn!: boolean;

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    //
    this.isLoggedIn = this.authService.isLoggedIn;
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
        console.log(isLoggedIn);
      }
    });

    //
    this.accountService.getMyAccount().subscribe({
      next: (account) => {
        this.userAccount = account;
      },
      error: (error) => {
        this.userAccount = undefined;
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
