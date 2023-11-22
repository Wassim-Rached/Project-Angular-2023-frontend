import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/application/classes/activity';
import { Categorie } from 'src/app/application/classes/categorie';
import { ActivityService } from 'src/app/application/services/activity.service';

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

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activityId = this.activatedRoute.snapshot.params['activityId'];

    this.activityService.getActivityById(this.activityId).subscribe({
      next: (activity) => {
        this.activity = activity;
        this.initForm();
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.activityService.getAllCategories().subscribe({
      next: (data) => {
        this.allCategories = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  resetForm() {
    this.form.reset();
  }

  initForm() {
    this.form = this.fb.nonNullable.group({
      title: [this.activity.title],
      // photo: [null],
      is_free: [this.activity.is_free],
      price: [this.activity.price],
      maxParticipants: [this.activity.maxParticipants],
      date: [this.activity.date],
      description: [this.activity.description],
      categories: [this.activity.categories],
    });
  }

  onSubmit() {
    const data = this.form.value;

    // const photoFormData = new FormData();
    // photoFormData.append('photo', data.photo);

    // if (data.photo) {
    //   // update the photo
    //   this.activityService
    //     .updateActivity(this.activityId, photoFormData as Activity)
    //     .subscribe({
    //       next: (data) => {
    //         console.log({ photo: data });
    //       },
    //     });
    // }

    // delete the photo
    // delete data.photo;

    this.activityService.updateActivity(this.activityId, data).subscribe({
      next: (data) => {
        this.resetForm();
        alert('activity updated successfully');
        this.activityService.redirectAfterUpdate();
      },
      error: (error) => {
        alert('activity not updated !! try again later');
      },
    });
  }

  public get isFree() {
    return this.form.get('is_free')?.value ?? false;
  }

  // onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.form.get('photo')?.setValue(file);
  //   }
  // }
}
