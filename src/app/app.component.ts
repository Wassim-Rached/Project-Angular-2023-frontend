import { Component, OnInit } from '@angular/core';
import { AuthService } from './application/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService) { }
  ngOnInit(): void {
    this.auth.login("admin", "pass").subscribe((data) => {
      console.log(data)
    })
      , (e: any) => {
        console.log(e);
      }
  }
}

