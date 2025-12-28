import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser, UserRole } from '../model/auth.model';
import { MessageService } from '../../ui/message.service';
import { ClientService } from '../../../features/client/services/client.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly STORAGE_KEY = 'auth_user';

  private clientMock ={ //mock para caso não der tempo de concluir o login completo
    email: 'cliente@teste.com',
    password: '1234'
  }

  constructor(private router: Router, private messageService: MessageService, private clientService: ClientService) {}

  loginClient(email: string, password: string): void {

  if (email !== this.clientMock.email || password !== this.clientMock.password) {
    this.messageService.error('Informe email e senha válidos');
    return;
  }

  this.clientService.findByEmail(email.trim()).subscribe({
    next: clientData => {

      const user: AuthUser = {
        role: 'CLIENT',
        name: clientData.name
      };

      this.saveUser(user);
      this.messageService.success(`Seja bem-vindo, ${clientData.name}!`);
      this.router.navigate(['/client']);
    },
    error: () => {
      this.messageService.error('Erro ao buscar dados do cliente');
    }
  });
}


  loginOperator(user: string, password: string): void {
    if (!user || !password) {
      this.messageService.error('Informe usuário e senha válidos');
      return;
    }

    const authUser: AuthUser = {
      role: 'OPERATOR',
      name: user
    };

    this.saveUser(authUser);
    this.messageService.success(`Bem-vindo colaborador ${user} !`);
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
