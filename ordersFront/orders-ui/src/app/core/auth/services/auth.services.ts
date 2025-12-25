import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser, UserRole } from '../model/auth.model';
import { MessageService } from '../../ui/message.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly STORAGE_KEY = 'auth_user';

  constructor(private router: Router, private messageService: MessageService) {}

  loginClient(email: string, password: string): void {
    
    if (!email || !password) {
      this.messageService.error('Informe email e senha');
      return;
    }

    const user: AuthUser = {
      role: 'CLIENT',
      name: email
    };

    this.saveUser(user);
    this.messageService.success(`Seja bem-vindo, cliente!`);
    this.router.navigate(['/orders']);
  }

  loginOperator(user: string, password: string): void {
    if (!user || !password) {
      this.messageService.error('Informe usuário e senha');
      return;
    }

    const authUser: AuthUser = {
      role: 'OPERATOR',
      name: user
    };

    this.saveUser(authUser);
    this.messageService.success(`Bem vindo colaborador, ${user}`);
    this.router.navigate(['/products']);
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  getUser(): AuthUser | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  hasRole(role: UserRole): boolean {
    return this.getUser()?.role === role;
  }

  private saveUser(user: AuthUser): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }
}
