import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextualProductionPostMasterComponent } from './textual-production-post-master.component';

describe('TextualProductionPostComponent', () => {
  let component: TextualProductionPostMasterComponent;
  let fixture: ComponentFixture<TextualProductionPostMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextualProductionPostMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextualProductionPostMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
