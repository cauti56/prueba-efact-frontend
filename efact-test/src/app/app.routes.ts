import { Routes } from '@angular/router';
import { Login } from './auth/pages/login/login';
import { ViewerComponent } from './documents/pages/viewer/viewer';
import { authGuard } from './core/guards/auth-guard';
import { DocumentsLayout } from './core/layout/documents-layout'; // IMPORTA LAYOUT

export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: 'documents',
    component: DocumentsLayout, // <-- ESTE ES EL DISEÑO CON NAVBAR
    canActivate: [authGuard],
    children: [
      { path: '', component: ViewerComponent }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
