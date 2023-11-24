import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.css'],
})
export class ProfileDeleteComponent implements OnInit {
  accountId!: string;

  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // get the profile id
    this.accountId = this.authService.getAccountId()!;
  }

  onDelete() {
    const confirmDelete = confirm(
      'Are you sure you want to delete your account?'
    );

    if (!confirmDelete) return;

    this.accountService.deleteAccountById(this.accountId).subscribe({
      next: (data) => {
        this.authService.logout();
      },
    });
  }
}
