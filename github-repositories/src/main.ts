import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { RootComponent } from './app/app/root/root';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './app/interceptors/interceptor';

bootstrapApplication(RootComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([JwtInterceptor]))
  ]
});

