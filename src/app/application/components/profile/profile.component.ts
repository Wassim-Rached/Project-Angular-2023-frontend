import { Component, Input } from '@angular/core';
import { Account } from '../../classes/account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  @Input() account!: Account;
  constructor() {}
}
