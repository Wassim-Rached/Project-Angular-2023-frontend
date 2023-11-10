import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '../../classes/activity';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.css'],
})
export class ActivityCardComponent implements OnInit {
  @Input() activity!: Activity;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    console.log(this.activity.number_of_likes);
  }
}