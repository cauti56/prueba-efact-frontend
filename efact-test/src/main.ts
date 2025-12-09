import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { tokenInterceptor } from './app/core/interceptors/token-interceptor';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],
    provideHttpClient(
      withInterceptors([tokenInterceptor])
    )
  ]
}).catch(err => console.error(err));
