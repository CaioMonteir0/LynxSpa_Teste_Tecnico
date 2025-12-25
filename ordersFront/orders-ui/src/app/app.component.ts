import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { TopAlertComponent } from './core/ui/top-alert.component';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { AuthService } from './core/auth/services/auth.services';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, TopAlertComponent, NavbarComponent],
  template: `
    <app-navbar *ngIf="showNavbar"></app-navbar>
    <app-top-alert></app-top-alert>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  showNavbar = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateNavbarVisibility();
      });
  }

  private updateNavbarVisibility() {
    const isLoginPage = this.router.url.startsWith('/login');
    this.showNavbar = this.authService.isAuthenticated() && !isLoginPage;
  }
}
