import { TestBed, inject } from '@angular/core/testing';

import { APIKeyService } from './apikey.service';

describe('APIKeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIKeyService]
    });
  });

  it('should be created', inject([APIKeyService], (service: APIKeyService) => {
    expect(service).toBeTruthy();
  }));
});
