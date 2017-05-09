import { FilterByPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByPipe();
    expect(pipe).toBeTruthy();
  });
});
