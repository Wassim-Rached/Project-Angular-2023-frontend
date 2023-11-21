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
  isAuthenticated: any;
  didLike: boolean = false;
  didRegister: boolean = false;
  activity?: Activity;
  isPageLoading = false;
  isRegisterBtnLoading = false;

  constructor(
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.isPageLoading = true;
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

        // Check if user did like activity
        this.activityService.didLike(activityId).subscribe({
          next: (response) => {
            console.log(response);
            this.didLike = response.did_like;
            this.isPageLoading = false;
          },
        });
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
            alert('Registration done !');
            this.isRegisterBtnLoading = false;
          },
        });
      },
      error: (error) => {
        alert('Error while registering to activity');
        this.isRegisterBtnLoading = false;
      },
    });
  }

  onLike() {
    if (this.didLike) return;
    if (!this.isAuthenticated) return;

    this.activityService.setLiked(this.activity!.id!).subscribe({
      next: (response) => {
        if (this.activity && this.activity.number_of_likes) {
          this.activity.number_of_likes += 1;
        }
        this.didLike = true;
      },
      error: (error) => {},
    });
  }
}
