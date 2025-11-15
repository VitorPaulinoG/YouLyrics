import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextualProductionPostComponent } from './textual-production-post.component';

describe('TextualProductionPostComponent', () => {
  let component: TextualProductionPostComponent;
  let fixture: ComponentFixture<TextualProductionPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextualProductionPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextualProductionPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
