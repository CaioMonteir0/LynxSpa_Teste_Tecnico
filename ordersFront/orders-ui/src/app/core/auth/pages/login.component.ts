import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  clientEmail = '';
  clientPassword = '';

  operatorUser = '';
  operatorPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginClient() {
    this.authService.login('CLIENT');
    this.router.navigate(['/orders']);
  }

  loginOperator() {
    this.authService.login('OPERATOR');
    this.router.navigate(['/products']);
  }
}
