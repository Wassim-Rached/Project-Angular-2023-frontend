import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/application/classes/activity';
import { Categorie } from 'src/app/application/classes/categorie';
import { ActivityService } from 'src/app/application/services/activity.service';
import { MessageText } from '../../../types';

@Component({
  selector: 'app-activity-modify',
  templateUrl: './activity-modify.component.html',
  styleUrls: ['./activity-modify.component.css'],
})
export class ActivityModifyComponent implements OnInit {
  form!: FormGroup;
  activity!: Activity;
  activityId!: string;
  allCategories: Categorie[] = [];
  message?: MessageText;
  // loading states
  isLoadingPage: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // set loading state
    this.isLoadingPage = true;

    // get activity id
    this.activityId = this.activatedRoute.snapshot.params['activityId'];

    // get activity by id
    this.activityService.getActivityById(this.activityId).subscribe({
      next: (activity) => {
        this.activity = activity;
        // initialize form
        this.initForm();

        // get all categories
        this.activityService.getAllCategories().subscribe({
          next: (data) => {
            // set categories
            this.allCategories = data;
            // set loading state
            this.isLoadingPage = false;
          },
        });
      },
      error: (error) => {
        // set loading state
        this.isLoadingPage = false;
        // set message error
        this.message = {
          text: error.message,
          status: 'error',
        };
      },
    });
  }

  resetForm() {
    this.form.reset();
  }

  initForm() {
    this.form = this.fb.nonNullable.group({
      title: [this.activity.title],
      photo: [null],
      is_free: [this.activity.is_free],
      price: [this.activity.price],
      maxParticipants: [this.activity.maxParticipants],
      date: [this.activity.date],
      description: [this.activity.description],
      categories: [this.activity.categories],
    });
  }

  onSubmit() {
    // set submitting state
    this.isSubmitting = true;

    const data = this.form.value;

    const photoFormData = new FormData();
    photoFormData.append('photo', data.photo);

    if (data.photo) {
      // update the photo
      this.activityService
        .updateActivity(this.activityId, photoFormData as Activity)
        .subscribe({
          next: (updatedActivityPhoto) => {
            console.log({ updatedActivityPhoto });
          },
          error: (error) => {
            console.error(error);
          },
        });
    }

    // delete the photo
    delete data.photo;

    this.activityService.updateActivity(this.activityId, data).subscribe({
      next: (data) => {
        // reset form
        this.resetForm();

        // set message success
        this.message = {
          text: 'activity updated successfully',
          status: 'success',
        };

        // set submitting state
        this.isSubmitting = false;

        // this.activityService.redirectAfterUpdate();
      },
      error: (error) => {
        // set message error
        this.message = {
          text: error.message,
          status: 'error',
        };

        // set submitting state
        this.isSubmitting = false;
      },
    });
  }

  public get isFree() {
    return this.form.get('is_free')?.value ?? false;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('photo')?.setValue(file);
    }
  }
}
