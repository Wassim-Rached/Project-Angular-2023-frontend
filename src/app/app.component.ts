import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from './application/environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  backendUp: boolean = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const URL = environment['BASE_API_URL'] + 'activities/';

    this.http.get(URL).subscribe({
      next: (res) => {
        this.backendUp = true;
      },
      error: (Error) => {
        console.log(Error);
      },
    });
  }
}
