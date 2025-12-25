import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.service';

@Component({
  standalone: true,
  selector: 'app-top-alert',
  imports: [CommonModule],
  template: `
    <div class="top-alert" *ngIf="message$ | async as message">
      <div
        class="alert"
        [ngClass]="{
          'alert-danger': message.type === 'error',
          'alert-success': message.type === 'success'
        }"
        role="alert"
      >
        <i
          class="bi me-2"
          [ngClass]="{
            'bi-exclamation-triangle-fill': message.type === 'error',
            'bi-check-circle-fill': message.type === 'success'
          }"
        ></i>
        {{ message.text }}
      </div>
    </div>
  `,
  styles: [`
    .top-alert {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1055;
      min-width: 320px;
      max-width: 600px;
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translate(-50%, -10px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }
  `]
})
export class TopAlertComponent {

  message$;

  constructor(private messageService: MessageService) {
    this.message$ = this.messageService.message$;
  }
}

