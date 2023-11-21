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
  didLike: boolean = false;
  isLoadingLike: boolean = false;

  constructor(
    private activityService: ActivityService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.activityService.didLike(this.activity.id!).subscribe({
        next: (response) => {
          this.didLike = response.did_like;
        },
      });
    }
  }

  public onLike() {
    if (this.didLike) return;
    if (!this.isAuthenticated) return;

    this.isLoadingLike = true;
    this.activityService.setLiked(this.activity.id!).subscribe({
      next: (response) => {
        this.activity.number_of_likes! += 1;
        this.didLike = true;
        this.isLoadingLike = false;
      },
      error: (error) => {
        this.isLoadingLike = false;
      },
    });
  }
}
