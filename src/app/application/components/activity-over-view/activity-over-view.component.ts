import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../classes/activity';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-activity-over-view',
  templateUrl: './activity-over-view.component.html',
  styleUrls: ['./activity-over-view.component.css'],
})
export class ActivityOverViewComponent implements OnInit {
  activity?: Activity;
  isAuthenticated: boolean = false;
  // data states
  didLike: boolean = false;
  didRegister: boolean = false;
  // loading states
  isLoadingLike: boolean = false;
  isPageLoading = false;
  isRegisterBtnLoading = false;

  constructor(
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // set loading state to true
    this.isPageLoading = true;

    // get activity id from route
    const activityId = this.activatedRoute.snapshot.params['id'];

    this.isAuthenticated = this.authService.isAuthenticated();

    // get activity by id
    this.activityService.getActivityById(activityId).subscribe({
      next: (activity) => {
        // Set activity
        this.activity = activity;

        // Check if user did register to activity
        this.didRegister = Boolean(
          this.activity.registred_accounts?.find(
            (account) => account.id === this.authService.getAccountId()
          )
        );

        // only if user is authenticated
        if (this.isAuthenticated) {
          // Check if user did like activity
          this.activityService.didLike(activityId).subscribe({
            next: (response) => {
              this.didLike = response.did_like;
              this.isPageLoading = false;
            },
            error: (error) => {
              this.isPageLoading = false;
            },
          });
        } else {
          // if user is not authenticated
          // stop loading page
          this.isPageLoading = false;
        }
      },
      error: (error) => {
        this.isPageLoading = false;
        this.activity = undefined;
      },
    });
  }

  onRegister(activityId: string) {
    this.isRegisterBtnLoading = true;
    this.activityService.registerToActivity(activityId).subscribe({
      next: (response) => {
        // Update activity to include
        // the account as registred
        this.accountService.getMyAccount().subscribe({
          next: (account) => {
            this.activity?.registred_accounts?.push(account);
            this.isRegisterBtnLoading = false;
            this.didRegister = true;
          },
        });
      },
      error: (error) => {
        this.isRegisterBtnLoading = false;
      },
    });
  }

  public onLike() {
    if (this.didLike) return;
    if (!this.isAuthenticated) return;

    this.isLoadingLike = true;
    this.activityService.setLiked(this.activity!.id!).subscribe({
      next: (response) => {
        this.activity!.number_of_likes! += 1;
        this.didLike = true;
        this.isLoadingLike = false;
      },
      error: (error) => {
        this.isLoadingLike = false;
      },
    });
  }

  public get activityIsFull(): boolean {
    return (
      this.activity!.registred_accounts!.length >=
      this.activity!.max_participants!
    );
  }
}
