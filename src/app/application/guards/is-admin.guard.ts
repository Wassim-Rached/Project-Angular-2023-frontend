import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../environments';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const routerService = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  routerService.navigate([environment['DEFAULT_REDIRECT_FORBIDDEN']]);
  return false;
};
