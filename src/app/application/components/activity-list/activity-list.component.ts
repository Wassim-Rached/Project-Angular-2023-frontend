import { Component, OnInit } from '@angular/core';
import { Activity } from '../../classes/activity';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
})
export class ActivityListComponent implements OnInit {
  activities!: Activity[];

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.getAllActivities().subscribe({
      next: (activities) => {
        this.activities = activities;
      },
      error: (error) => {
        this.activities = [];
      },
    });
  }
}
