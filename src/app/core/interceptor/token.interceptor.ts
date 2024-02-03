import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  let tokenizedRequest: HttpRequest<any> = req;
  if (token) {
    tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(tokenizedRequest);
};
