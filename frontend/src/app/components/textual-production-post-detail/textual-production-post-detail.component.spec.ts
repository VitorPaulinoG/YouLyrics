import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextualProductionPostDetailComponent } from './textual-production-post-detail.component';

describe('TextualProductionPostDetailComponent', () => {
  let component: TextualProductionPostDetailComponent;
  let fixture: ComponentFixture<TextualProductionPostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextualProductionPostDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextualProductionPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
