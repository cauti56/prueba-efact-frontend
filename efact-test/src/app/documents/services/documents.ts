import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api';

  getPDF(ticket: string) {
    return this.http.get(`${this.baseUrl}/pdf/${ticket}`, {
      responseType: 'blob'
    });
  }

  getXML(ticket: string) {
    return this.http.get(`${this.baseUrl}/xml/${ticket}`, {
      responseType: 'blob'
    });
  }

  getCDR(ticket: string) {
    return this.http.get(`${this.baseUrl}/cdr/${ticket}`, {
      responseType: 'blob'
    });
  }
}
