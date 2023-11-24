import { Component, Input } from '@angular/core';
import { Account } from '../../classes/account';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.css'],
})
export class ProfileAboutComponent {
  @Input() account!: Account;
}
