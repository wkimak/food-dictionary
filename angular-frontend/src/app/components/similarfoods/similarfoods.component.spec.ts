import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarfoodsComponent } from './similarfoods.component';

describe('SimilarfoodsComponent', () => {
  let component: SimilarfoodsComponent;
  let fixture: ComponentFixture<SimilarfoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarfoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarfoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
