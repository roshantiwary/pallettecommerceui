import { TestBed, inject } from '@angular/core/testing';

import { SingletonService } from './singleton.service';

describe('SingletonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingletonService]
    });
  });

  it('should ...', inject([SingletonService], (service: SingletonService) => {
    expect(service).toBeTruthy();
  }));
});
