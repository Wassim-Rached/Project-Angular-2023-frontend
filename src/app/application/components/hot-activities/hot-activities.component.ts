import { Component, OnInit } from '@angular/core';
import { Activity } from '../../classes/activity';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-hot-activities',
  templateUrl: './hot-activities.component.html',
  styleUrls: ['./hot-activities.component.css'],
})
export class HotActivitiesComponent implements OnInit {
  activities: Activity[] = [];
  isSubmitting: boolean = false;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.isSubmitting = true;
    this.activityService.getAllActivities().subscribe({
      next: (activities) => {
        this.activities = activities.slice(0, 6);
        this.isSubmitting = false;
      },
      error: (err) => {
        this.isSubmitting = false;
      },
    });
  }
}
