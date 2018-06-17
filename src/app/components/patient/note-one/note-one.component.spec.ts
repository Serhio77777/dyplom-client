import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteOneComponent } from './note-one.component';

describe('NoteOneComponent', () => {
  let component: NoteOneComponent;
  let fixture: ComponentFixture<NoteOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
