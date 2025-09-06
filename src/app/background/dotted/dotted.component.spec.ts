import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DottedComponent } from './dotted.component';

describe('DottedComponent', () => {
  let component: DottedComponent;
  let fixture: ComponentFixture<DottedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DottedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DottedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
