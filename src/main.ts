import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routeConfig } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig), provideHttpClient()],
}).catch((err) => console.error(err));
