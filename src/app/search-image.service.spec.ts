import { TestBed, inject } from '@angular/core/testing';

import { SearchImageService } from './search-image.service';

describe('SearchImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchImageService]
    });
  });

  it('should be created', inject([SearchImageService], (service: SearchImageService) => {
    expect(service).toBeTruthy();
  }));
});
