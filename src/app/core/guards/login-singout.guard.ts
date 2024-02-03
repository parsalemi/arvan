import { CanActivateFn } from '@angular/router';

export const loginSingoutGuard: CanActivateFn = () => {
  localStorage.removeItem('token');
  return true;
};
