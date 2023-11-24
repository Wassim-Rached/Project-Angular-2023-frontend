import { Component, OnInit } from '@angular/core';
import { Activity } from '../../classes/activity';
import { ActivityService } from '../../services/activity.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Categorie } from '../../classes/categorie';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
})
export class ActivityListComponent implements OnInit {
  activities!: Activity[];
  Form!: FormGroup;
  categories: Categorie[] = [];
  // loading states
  isPageLoading: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private activityService: ActivityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // set loading page to true
    this.isPageLoading = true;

    // init form
    this.Form = this.fb.group({
      // names are choosen for the backend specifications
      title__icontains: [''],
      categories__name: [''],
    });

    // get all categories
    this.activityService.getAllCategories().subscribe({
      next: (categories) => {
        // set categories
        this.categories = categories;
        // set loading page to false
        this.isPageLoading = false;
      },
      error: (error) => {
        // set loading page to false
        this.isPageLoading = false;
      },
    });

    // get all activities
    this.queryActivities();
  }

  queryActivities(
    title__icontains: string = '',
    categories__name: string = ''
  ) {
    // set loading state to true
    this.isSubmitting = true;

    // set params
    const params = new HttpParams()
      .set('title__icontains', title__icontains)
      .set('categories__name', categories__name);

    this.activityService.getAllActivities(params).subscribe({
      next: (activities) => {
        // set activities
        this.activities = activities;
        // set loading state to false
        this.isSubmitting = false;
      },
      error: (error) => {
        // set loading state to false
        this.isSubmitting = false;
      },
    });
  }

  onSubmit() {
    // get title__icontains
    const { title__icontains, categories__name } = this.Form.value;

    // query activities
    this.queryActivities(title__icontains, categories__name);
  }
}
