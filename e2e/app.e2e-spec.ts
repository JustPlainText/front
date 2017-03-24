import { FPage } from './app.po';

describe('JPT-F App', () => {
  let page: FPage;

  beforeEach(() => {
    page = new FPage();
  });

  it('should display message saying JPT-F', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('JPT-F');
  });
});
