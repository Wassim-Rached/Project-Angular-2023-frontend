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
  public isAuthenticated!: boolean;

  constructor(
    private activityService: ActivityService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  public onLike() {
    if (!this.isAuthenticated) return;

    this.activityService.setLiked(this.activity.id!).subscribe({
      next: (res) => {
        console.log(res);
        this.activity.number_of_likes! += 1;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
