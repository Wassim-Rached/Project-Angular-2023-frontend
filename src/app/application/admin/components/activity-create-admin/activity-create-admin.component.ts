import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/application/classes/activity';
import { Categorie } from 'src/app/application/classes/categorie';
import { ActivityService } from 'src/app/application/services/activity.service';
import { MessageText } from 'src/app/application/types';

@Component({
  selector: 'app-activity-create-admin',
  templateUrl: './activity-create-admin.component.html',
  styleUrls: ['./activity-create-admin.component.css'],
})
export class ActivityCreateAdminComponent implements OnInit {
  Form!: FormGroup;
  allCategories: Categorie[] = [];
  message?: MessageText;
  // loading states
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    // initialize form
    this.Form = this.fb.nonNullable.group({
      title: ['', Validators.required],
      photo: [null, Validators.required],
      is_free: [true, Validators.required],
      price: [0, Validators.required],
      maxParticipants: [null],
      date: ['', Validators.required],
      description: ['', Validators.required],
      categories: [null, Validators.required],
    });

    // get all categories
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
    this.Form.reset();
  }

  onSubmit() {
    // set loading state
    this.isSubmitting = true;

    // get form data
    const data = this.Form.value;
    // create form data for the photo
    const photoFormData = new FormData();
    photoFormData.append('photo', data.photo);
    delete data.photo;

    // create activity
    this.activityService.createActivity(data).subscribe({
      next: (createdActivity) => {
        // update activity photo
        this.activityService
          .updateActivity(createdActivity.id!, photoFormData as Activity)
          .subscribe({
            next: (updatedActivity) => {
              // reset form
              this.resetForm();
              // reset loading state
              this.isSubmitting = false;
              // show success message
              this.message = {
                text: 'activity created successfully',
                status: 'success',
              };
            },
            error: (error) => {
              // if we could not update the activity photo
              // we delete the created activity
              this.activityService
                .deleteActivityById(createdActivity.id!)
                .subscribe({
                  next: (deletedActivity) => {
                    // reset loading state
                    this.isSubmitting = false;
                    // show error message
                    this.message = {
                      text: 'failed to create activity with this photo',
                      status: 'error',
                    };
                    if (error.status === 400)
                      this.handleFormErrors(error.error);
                  },
                  error: (error) => {
                    // reset loading state
                    this.isSubmitting = false;
                    // show error message
                    this.message = {
                      text: 'something went wrong!',
                      status: 'error',
                    };
                  },
                });
            },
          });
      },
      error: (error) => {
        // reset loading state
        this.isSubmitting = false;
        // show error message
        this.message = {
          text: 'failed to create activity',
          status: 'error',
        };
        // if the error is 400
        // set the form errors
        if (error.status === 400) this.handleFormErrors(error.error);
      },
    });
  }

  public get isFree() {
    return this.Form.get('is_free')?.value;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Form.get('photo')?.setValue(file);
    }
  }

  // check if the field has required error
  public haveRequiredError(field: string) {
    return (
      this.Form.get(field)?.errors?.['required'] &&
      this.Form.get(field)?.touched
    );
  }

  // check if the field has certain error
  public fieldHasError(field: string, error: string = 'serverError'): boolean {
    const formFiled = this.Form.get(field);
    if (!formFiled) return false;

    return formFiled.hasError(error);
  }

  // check if the field has any error
  public fieldHasAnyError(field: string): boolean {
    const formFiled = this.Form.get(field);

    if (!formFiled) return false;

    return formFiled.invalid && (formFiled.touched || formFiled.dirty);
  }

  // get the server error message
  public getFieldServerErrorMessage(field: string): string {
    return this.Form.get(field)?.errors?.['serverError'];
  }

  // set the errors from the backend
  // on the form controls
  private handleFormErrors(errors: any): void {
    for (const field in errors) {
      if (this.Form.get(field)) {
        this.Form.get(field)?.setErrors({ serverError: errors[field][0] });
      }
    }
  }
}
