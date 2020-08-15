import { CanAccessPipe } from './can-access.pipe';

describe('CanAccessPipe', () => {
  it('create an instance', () => {
    const pipe = new CanAccessPipe();
    expect(pipe).toBeTruthy();
  });
});
