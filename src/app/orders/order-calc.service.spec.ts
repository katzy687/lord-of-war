import { TestBed, inject } from '@angular/core/testing';

import { OrderCalcService } from './order-calc.service';

describe('OrderCalcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderCalcService]
    });
  });

  it('should be created', inject([OrderCalcService], (service: OrderCalcService) => {
    expect(service).toBeTruthy();
  }));
});
