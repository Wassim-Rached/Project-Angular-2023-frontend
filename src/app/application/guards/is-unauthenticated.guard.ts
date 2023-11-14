import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../environments';
import { inject } from '@angular/core';

export const isUnauthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const routerService = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  routerService.navigate([environment['DEFAULT_REDIRECT_FORBIDDEN']]);
  return false;
};
