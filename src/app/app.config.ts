import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { tokenInterceptor } from "./core/interceptor/token.interceptor";
import { provideToastr } from "ngx-toastr";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([tokenInterceptor])),provideRouter(routes),provideAnimations(),
    provideToastr(),]
};
