import { Component, OnInit } from '@angular/core';
import { JoinUs } from 'src/app/application/classes/join-us';
import { AccountService } from 'src/app/application/services/account.service';

@Component({
  selector: 'app-joining-list-admin',
  templateUrl: './joining-list-admin.component.html',
  styleUrls: ['./joining-list-admin.component.css'],
})
export class JoiningListAdminComponent implements OnInit {
  joiningForms: JoinUs[] = [];
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAllJoiningForms().subscribe({
      next: (data) => {
        console.log(data);
        this.joiningForms = data;
      },
    });
  }
  public Accept(id: string) {
    this.accountService.acceptJoiningForm(id).subscribe({
      next: (status) => {
        this.joiningForms.find((joiningForm) => {
          joiningForm.id === id;
        })!.status = status;
      },
    });
  }
  public Reject(id: string) {
    this.accountService.rejectJoiningForm(id).subscribe({
      next: (status) => {
        this.joiningForms.find((joiningForm) => {
          joiningForm.id === id;
        })!.status = status;
      },
    });
  }
}
