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
  public userAccount?: Account;
  public isAdmin = false;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //
    this.router.events.subscribe({
      next: (event) => {
        if (event.constructor.name === 'NavigationEnd') {
          this.accountService.getMyAccount().subscribe({
            next: (account) => {
              this.userAccount = account;
              this.authService.setRole(account.role);
              this.isAdmin = this.authService.isAdmin();
            },
            error: (error) => {
              this.userAccount = undefined;
            },
          });
        }
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.authService.redirectAfterLogout();
  }
}
