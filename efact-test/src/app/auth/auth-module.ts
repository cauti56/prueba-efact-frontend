import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './pages/login/login'; // 🔹 Importamos el componente standalone

@NgModule({
  declarations: [
    // No declaramos Login porque es standalone
  ],
  imports: [
    CommonModule,
    Login // 🔹 Importamos el componente standalone
  ]
})
export class AuthModule { }
