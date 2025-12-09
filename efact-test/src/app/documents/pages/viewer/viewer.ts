import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DocumentsService } from '../../services/documents';
import { PipeUrlPipe } from './pipe-url.pipe';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [ CommonModule, FormsModule, PipeUrlPipe ],
  templateUrl: './viewer.html',
  styleUrls: ['./viewer.css']
})
export class ViewerComponent {

  private documentsService = inject(DocumentsService);

  ticket: string = '';
  pdfUrl: string | null = null;

  // Agregar estas propiedades para que el test funcione
  xmlUrl: string | null = null;
  cdrUrl: string | null = null;

  loadFiles() {
    this.documentsService.getPDF(this.ticket).subscribe(blob =>
      this.pdfUrl = URL.createObjectURL(blob)
    );
  }

  clearFiles() {
    this.pdfUrl = null;
    this.xmlUrl = null;
    this.cdrUrl = null;
  }

  /* DESCARGAS */
  downloadPDF() {
    this.documentsService.getPDF(this.ticket).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.ticket}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  downloadXML() {
    this.documentsService.getXML(this.ticket).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      this.xmlUrl = url; // Guardar para test o preview
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.ticket}.xml`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  downloadCDR() {
    this.documentsService.getCDR(this.ticket).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      this.cdrUrl = url; // Guardar para test o preview
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.ticket}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}
