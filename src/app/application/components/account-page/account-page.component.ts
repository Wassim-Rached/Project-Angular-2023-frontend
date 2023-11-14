import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../classes/account';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit {
  isOwner: boolean = false;
  account!: Account;
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.accountService.getMyAccount().subscribe({
      next: (account) => {
        this.account = account;
        const profileId = this.activatedRoute.snapshot.params['profileId'];
        this.isOwner = profileId === account.id;
        console.log(profileId);
        console.log(account.id);
      },
    });
  }
  onDelete() {
    this.accountService.deleteAccountById(this.account.id!).subscribe({
      next: (data) => {
        console.log(data);
        this.authService.logout();
        this.authService.redirectAfterLogout();
      },
    });
  }
}
