import { Component, OnInit } from '@angular/core';
import { Registration } from '../../classes/registration';
import { ActivityService } from '../../services/activity.service';
import { Status } from '../../classes/join-us';

@Component({
  selector: 'app-profile-registrations',
  templateUrl: './profile-registrations.component.html',
  styleUrls: ['./profile-registrations.component.css'],
})
export class ProfileRegistrationsComponent implements OnInit {
  activityRegistrations: Registration[] = [];
  // loading states
  isSubmitting: boolean = false;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.getAllMyActivityRegistrations().subscribe({
      next: (activityRegistrations) => {
        // set the activity registrations
        this.activityRegistrations = activityRegistrations;
        // set the loading page to false
        this.isSubmitting = false;
      },
      error: (error) => {
        // set the loading page to false
        this.isSubmitting = false;
      },
    });
  }

  public isAccepted(status: Status) {
    return status === 'accepted';
  }

  public isPending(status: Status) {
    return status === 'pending';
  }

  public isRejected(status: Status) {
    return status === 'rejected';
  }
}
