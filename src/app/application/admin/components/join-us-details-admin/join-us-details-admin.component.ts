import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoinUs } from 'src/app/application/classes/join-us';
import { AccountService } from 'src/app/application/services/account.service';

@Component({
  selector: 'app-join-us-details-admin',
  templateUrl: './join-us-details-admin.component.html',
  styleUrls: ['./join-us-details-admin.component.css'],
})
export class JoinUsDetailsAdminComponent implements OnInit {
  joinForm?: JoinUs;
  joinId?: string;
  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.joinId = this.activatedRoute.snapshot.params['joinUsId'];
    this.accountService.getJoinFormById(this.joinId!).subscribe({
      next: (joinForm) => {
        this.joinForm = joinForm;
      },
    });
  }

  Accept() {
    this.accountService.acceptJoiningForm(this.joinId!).subscribe({
      next: (status) => {
        if (this.joinForm) {
          this.joinForm.status = 'accepted';
        }
      },
    });
  }
  Reject() {
    this.accountService.rejectJoiningForm(this.joinId!).subscribe({
      next: (status) => {
        if (this.joinForm) {
          this.joinForm.status = 'rejected';
        }
      },
    });
  }
}
