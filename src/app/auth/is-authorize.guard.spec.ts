import { TestBed } from '@angular/core/testing';

import { IsAuthorizeGuard } from './is-authorize.guard';

describe('IsAuthorizeGuard', () => {
  let guard: IsAuthorizeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAuthorizeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
