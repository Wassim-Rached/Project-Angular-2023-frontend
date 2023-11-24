import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-error-message',
  templateUrl: './input-error-message.component.html',
  styleUrls: ['./input-error-message.component.css'],
})
export class InputErrorMessageComponent {
  @Input() message: string = "this field can't be blank";
}
