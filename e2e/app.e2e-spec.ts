import { PallettePage } from './app.po';

describe('pallette App', () => {
  let page: PallettePage;

  beforeEach(() => {
    page = new PallettePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
