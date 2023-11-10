import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit(form: FormGroup): void {
    const username = form.value.username;
    const password = form.value.password;
    this.authService.signin(username, password).subscribe({
      next: (response) => {
        this.authService.authentificate(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

// );
