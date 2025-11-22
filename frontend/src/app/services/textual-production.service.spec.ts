import { TestBed } from '@angular/core/testing';

import { TextualProductionService } from './textual-production.service';

describe('TextualProductionService', () => {
  let service: TextualProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextualProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
