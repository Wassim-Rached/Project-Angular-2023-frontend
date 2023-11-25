import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css'],
})
export class GreetingComponent implements OnInit {
  isMemberOrAdmin: boolean = false;
  isAdmin: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isMemberOrAdmin = this.authService.isMember() || this.isAdmin;
  }
}
