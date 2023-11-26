import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  Form!: FormGroup;
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
    this.Form.reset();
  }

  initForm() {
    this.Form = this.fb.nonNullable.group({
      title: [this.activity.title, Validators.required],
      photo: [null],
      is_free: [this.activity.is_free, Validators.required],
      price: [this.activity.price],
      max_participants: [this.activity.max_participants],
      date: [this.activity.date, Validators.required],
      description: [this.activity.description, Validators.required],
      categories: [this.activity.categories, Validators.required],
    });
  }

  onSubmit() {
    // set submitting state
    this.isSubmitting = true;

    const data = this.Form.value;

    const photoFormData = new FormData();
    photoFormData.append('photo', data.photo);

    if (data.photo) {
      // update the photo
      this.activityService
        .updateActivity(this.activityId, photoFormData as Activity)
        .subscribe({});
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

        // if the error is 400
        // set the form errors
        if (error.status === 400) this.handleFormErrors(error.error);

        // set submitting state
        this.isSubmitting = false;
      },
    });
  }

  public get isFree() {
    return this.Form.get('is_free')?.value ?? false;
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
