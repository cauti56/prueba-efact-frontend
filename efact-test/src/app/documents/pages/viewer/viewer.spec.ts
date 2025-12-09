import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewerComponent } from '../../documents/pages/viewer/viewer';
import { DocumentsService } from '../../services/documents';
import { of } from 'rxjs';

// Mock del service
class MockDocumentsService {
  getPDF(ticket: string) { return of(new Blob()); }
  getXML(ticket: string) { return of(new Blob()); }
  getCDR(ticket: string) { return of(new Blob()); }
}

describe('ViewerComponent', () => {
  let component: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;
  let service: DocumentsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewerComponent],
      providers: [
        { provide: DocumentsService, useClass: MockDocumentsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DocumentsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load files', () => {
    component.ticket = '123';
    component.loadFiles();
    expect(component.pdfUrl).toBeTruthy();
    expect(component.xmlUrl).toBeTruthy();
    expect(component.cdrUrl).toBeTruthy();
  });

  it('should clear files', () => {
    component.pdfUrl = 'pdf';
    component.xmlUrl = 'xml';
    component.cdrUrl = 'cdr';
    component.clearFiles();
    expect(component.pdfUrl).toBeNull();
    expect(component.xmlUrl).toBeNull();
    expect(component.cdrUrl).toBeNull();
  });
});
