import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  Form!: FormGroup;
  @Input() profileId!: string;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.nonNullable.group({
      old_password: [''],
      new_password: [''],
    });
  }
  onSubmit() {
    const { old_password, new_password } = this.Form.value;
    this.accountService
      .changePassword(this.profileId, old_password, new_password)
      .subscribe({
        next: (res) => {
          alert('password changed !');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
