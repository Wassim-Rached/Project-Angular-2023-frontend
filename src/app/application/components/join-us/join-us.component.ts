import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../classes/account';
import { JoinUs } from '../../classes/join-us';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css'],
})
export class JoinUsComponent implements OnInit {
  Form!: FormGroup;
  join?: JoinUs;
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.accountService.getAllJoiningForms().subscribe({
      next: (data) => {
        this.join = data[0];
        console.log(this.join);
      },
    });

    this.Form = this.fb.nonNullable.group({
      how_found_us: ['', Validators.required],
      goals: ['', Validators.required],
      reasons: ['', Validators.required],
      receive_emails: [true],
    });
  }
  public haveRequiredError(field: string) {
    return (
      this.Form.get(field)?.errors?.['required'] &&
      this.Form.get(field)?.touched
    );
  }

  public JoinClub() {
    this.accountService.joinClub(this.Form.value).subscribe({
      next: (data) => {
        console.log(data);
        alert('Successfully joined club');
      },
      error: () => alert('Failed to join club'),
    });
  }
}
