import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'documents-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `
    <app-navbar></app-navbar>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    app-navbar {
      display: block;
      width: 100%;
    }

    .content {
      padding: 20px;
      margin-top: 60px;  /* 🔥 Esto separa el contenido del navbar */
    }
  `]
})
export class DocumentsLayout {}
