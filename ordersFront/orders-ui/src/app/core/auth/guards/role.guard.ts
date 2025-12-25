import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { MessageService } from '../../ui/message.service';
import { UserRole } from '../model/auth.model';

export const roleGuard = (roles: UserRole[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const messageService = inject(MessageService);

    const user = authService.getUser();

    if (!user) {
      router.navigate(['/login']);
      return false;
    }

    if (!roles.includes(user.role)) {
      messageService.error('Você não tem permissão para acessar esta área');

      
      router.navigate(['/login']);
      return false;
    }

    return true;
  };
};
