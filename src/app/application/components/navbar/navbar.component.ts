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
  userAccount?: Account;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
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
