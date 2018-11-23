import { TestBed } from '@angular/core/testing';

import { IngrediantsService } from './ingrediants.service';

describe('IngrediantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngrediantsService = TestBed.get(IngrediantsService);
    expect(service).toBeTruthy();
  });
});
