import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '../../classes/activity';
import { ActivityService } from '../../services/activity.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.css'],
})
export class ActivityCardComponent implements OnInit {
  @Input() activity!: Activity;
  isAuthenticated!: boolean;
  isAdmin?: boolean;
  didLike: boolean = false;
  // loading states
  isLoadingLike: boolean = false;
  isPageLoading: boolean = false;

  constructor(
    private activityService: ActivityService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // set the loading state to true
    this.isPageLoading = true;

    // set the authenticated state
    this.isAuthenticated = this.authService.isAuthenticated();

    // set the admin state
    this.isAdmin = this.authService.isAdmin();

    // if the user is authenticated
    if (this.isAuthenticated) {
      this.activityService.didLike(this.activity.id!).subscribe({
        next: (response) => {
          // set the did like state
          this.didLike = response.did_like;
          // set the loading state to false
          this.isPageLoading = false;
        },
        error: (error) => {
          // set the loading state to false
          this.isPageLoading = false;
        },
      });
    } else {
      // set the loading state to false
      this.isPageLoading = false;
    }
  }

  public onLike() {
    if (this.didLike) return;
    if (!this.isAuthenticated) return;

    // set the loading like state to true
    this.isLoadingLike = true;

    this.activityService.setLiked(this.activity.id!).subscribe({
      next: (response) => {
        // increment the number of likes
        // and set the did like state to true
        this.activity.number_of_likes! += 1;
        this.didLike = true;

        // set the loading like state to false
        this.isLoadingLike = false;
      },
      error: (error) => {
        // set the loading like state to false
        this.isLoadingLike = false;
      },
    });
  }
}
