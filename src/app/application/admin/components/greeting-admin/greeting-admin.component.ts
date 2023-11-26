import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-greeting-admin',
  templateUrl: './greeting-admin.component.html',
  styleUrls: ['./greeting-admin.component.css'],
})
export class GreetingAdminComponent implements OnInit {
  // randomDogUrl without cors
  catPhotoUrl?: string;
  isLoadingPage = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // set loading to true
    this.isLoadingPage = true;

    // fetch cat photo
    this.http
      .get('https://api.thecatapi.com/v1/images/search')
      .subscribe((response: any) => {
        // set catPhotoUrl
        this.catPhotoUrl = response[0].url;
        // set loading to false
        this.isLoadingPage = false;
      });
  }
}
