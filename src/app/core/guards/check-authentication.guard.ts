import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const checkAuthenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("token");
  if(Boolean(token)) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
