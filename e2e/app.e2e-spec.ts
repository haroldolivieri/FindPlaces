import { FindPlacesPage } from './app.po';

describe('find-places App', () => {
  let page: FindPlacesPage;

  beforeEach(() => {
    page = new FindPlacesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
