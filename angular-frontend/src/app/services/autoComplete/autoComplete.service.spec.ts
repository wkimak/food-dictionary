import { TestBed } from '@angular/core/testing';

import { AutoCompleteService } from './autoComplete.service';

describe('autoCompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoCompleteService = TestBed.get(AutoCompleteService);
    expect(service).toBeTruthy();
  });
});
