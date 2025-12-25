import { Injectable } from '@angular/core';

export type UserRole = 'CLIENT' | 'OPERATOR';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private role: UserRole | null = null;

  login(role: UserRole) {
    this.role = role;
    localStorage.setItem('role', role);
  }

  logout() {
    this.role = null;
    localStorage.removeItem('role');
  }

  getRole(): UserRole | null {
    return this.role || (localStorage.getItem('role') as UserRole);
  }

  isLoggedIn(): boolean {
    return this.getRole() !== null;
  }
}
