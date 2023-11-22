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
  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const joinId = this.activatedRoute.snapshot.params['id'];
    this.accountService.getJoinFormById(joinId).subscribe({
      next: (joinForm) => {
        this.joinForm = joinForm;
      },
    });
  }
}
