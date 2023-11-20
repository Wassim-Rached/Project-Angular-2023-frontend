import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../classes/activity';

@Component({
  selector: 'app-activity-over-view',
  templateUrl: './activity-over-view.component.html',
  styleUrls: ['./activity-over-view.component.css'],
})
export class ActivityOverViewComponent implements OnInit {
  isAuthenticated: any;
  didLike: boolean = false;
  activity?: Activity;

  constructor(
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const activityId = this.activatedRoute.snapshot.params['id'];
    this.activityService.getActivityById(activityId).subscribe({
      next: (activity) => {
        this.activity = activity;
      },
      error: (error) => {
        this.activity = undefined;
      },
    });
  }
  onRegister(activityId: string) {
    this.activityService.registerToActivity(activityId).subscribe({
      next: (res) => {
        alert('Registration done !');
      },
      error: (error) => {
        console.log('Error', error);
      },
    });
  }

  onLike() {}
}
