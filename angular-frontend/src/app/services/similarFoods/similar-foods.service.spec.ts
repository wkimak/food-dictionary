import { TestBed } from '@angular/core/testing';

import { SimilarFoodsService } from './similar-foods.service';

describe('SimilarFoodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimilarFoodsService = TestBed.get(SimilarFoodsService);
    expect(service).toBeTruthy();
  });
});
