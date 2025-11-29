import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextualProductionMainContentComponent } from './textual-production-main-content.component';

describe('TextualProductionMainContentComponent', () => {
  let component: TextualProductionMainContentComponent;
  let fixture: ComponentFixture<TextualProductionMainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextualProductionMainContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextualProductionMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
