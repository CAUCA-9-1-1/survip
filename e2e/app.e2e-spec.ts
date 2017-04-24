import { SurviPPage } from './app.po';

describe('survip App', () => {
  let page: SurviPPage;

  beforeEach(() => {
    page = new SurviPPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
