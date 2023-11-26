import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../classes/account';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit {
  account?: Account;
  profileId!: string;
  isAdmin?: boolean;
  isOwner: boolean = false;
  // loading states
  isLoadingPage = false;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    // set the loading page to true
    this.isLoadingPage = true;

    // get the profile id from the url
    this.profileId = this.activatedRoute.snapshot.params['profileId'];

    // get the account of the profile by id
    this.accountService.getAccountById(this.profileId).subscribe({
      next: (account) => {
        // set the account of the profile
        this.account = account;
        // get the current account id
        const currentAccountId = this.authService.getAccountId();
        // check if the current account is admin
        this.isAdmin = this.authService.isAdmin();
        // check if the current account is the owner of the profile
        this.isOwner = currentAccountId === account.id;
        // set the loading page to false
        this.isLoadingPage = false;
      },
      error: (error) => {
        // set the loading page to false
        this.isLoadingPage = false;
      },
    });
  }
}
