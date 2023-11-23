import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';
import { Account } from '../../classes/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userAccount?: Account;
  isAdmin = false;
  isNavbarLoading = false;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // set the loading state to true
    this.isNavbarLoading = true;

    // handle loading the current account
    this.loadCurrentAccount();

    // subscribe to the router events
    // for logout and when changing
    // the route in general
    this.router.events.subscribe({
      next: (event) => {
        if (event.constructor.name === 'NavigationEnd') {
          this.loadCurrentAccount();
        }
      },
    });
  }

  public loadCurrentAccount(): void {
    this.accountService.getMyAccount().subscribe({
      next: (account) => {
        // set the user account
        this.userAccount = account;
        // set the user role
        this.authService.setRole(account.role);
        // set the user account id
        this.authService.setAccountId(account.id!);
        // get the admin status
        this.isAdmin = this.authService.isAdmin();
        // set the loading state to false
        if (this.isNavbarLoading) this.isNavbarLoading = false;
      },
      error: (error) => {
        // set the user account to undefined
        this.userAccount = undefined;
        if (this.isNavbarLoading) this.isNavbarLoading = false;
      },
    });
  }

  onLogout(): void {
    // logout the user
    this.authService.logout();
    // reset the admin status
    this.isAdmin = this.authService.isAdmin();
  }
}
