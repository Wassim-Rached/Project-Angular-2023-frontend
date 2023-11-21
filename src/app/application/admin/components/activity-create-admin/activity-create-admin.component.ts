import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Activity } from 'src/app/application/classes/activity';
import { Categorie } from 'src/app/application/classes/categorie';
import { ActivityService } from 'src/app/application/services/activity.service';

@Component({
  selector: 'app-activity-create-admin',
  templateUrl: './activity-create-admin.component.html',
  styleUrls: ['./activity-create-admin.component.css'],
})
export class ActivityCreateAdminComponent implements OnInit {
  form!: FormGroup;
  allCategories: Categorie[] = [];

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      title: [''],
      photo: [null],
      is_free: [true],
      price: [0],
      maxParticipants: [''],
      date: [''],
      description: [''],
      categories: [null],
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

  onSubmit() {
    const data = this.form.value;

    const photoFormData = new FormData();
    photoFormData.append('photo', data.photo);
    delete data.photo;

    this.activityService.createActivity(data).subscribe({
      next: (data) => {
        this.resetForm();
        alert('activity created successfully');
        this.activityService
          .updateActivity(data.id!, photoFormData as Activity)
          .subscribe({
            next: (data) => {
              console.log(data);
            },
          });
      },
      error: (error) => {
        alert('activity not created !! try again later');
      },
    });
  }

  public get isFree() {
    return this.form.get('is_free')?.value;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.form.get('photo')?.setValue(file);
    }
  }
}
