import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from './application/environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  backendIsUp: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const URL = environment['BASE_API_URL'] + 'activities/';

    // health check for backend
    this.http.get(URL).subscribe({
      next: (res) => {
        // if it gets here, the backend is up
        // setTimeout(() => {
        // wait 2 seconds (just for the loading animation)
        this.backendIsUp = true;
        // }, 2000);
      },
      error: (Error) => {
        // else, the backend is down
        this.backendIsUp = false;
      },
    });
  }
}
