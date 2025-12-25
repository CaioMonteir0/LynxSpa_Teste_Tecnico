import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopAlertComponent } from './core/ui/top-alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopAlertComponent],
  template: `
    <app-top-alert></app-top-alert>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
