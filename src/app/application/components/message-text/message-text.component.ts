import { Component, Input } from '@angular/core';
import { MessageText } from '../../types';

@Component({
  selector: 'app-message-text',
  templateUrl: './message-text.component.html',
  styleUrls: ['./message-text.component.css'],
})
export class MessageTextComponent {
  @Input() message?: MessageText;

  getMessageTextClasses() {
    return {
      alert: true,
      'alert-success': this.message?.status === 'success',
      'alert-danger': this.message?.status === 'error',
      'alert-warning': this.message?.status === 'warning',
    };
  }
}
