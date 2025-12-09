import { NgModule } from '@angular/core';
import { DocumentsLayout } from './documents-layout';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [],
  imports: [
    DocumentsLayout,
    NavbarComponent
  ],
  exports: [
    DocumentsLayout
  ]
})
export class LayoutModule {}
