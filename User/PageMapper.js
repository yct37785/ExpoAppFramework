/**
 * include any pages here by importing and including in screenMaps (feel free to remove the sample pages)
 * define default page under DEFAULT_SCREEN, value must match respective key in screenMaps
 */
import SampleHomePage from '../Framework/Sample/SampleHomePage';
import SampleTabsPage from '../Framework/Sample/SampleTabsPage';
import SampleMenusPage from '../Framework/Sample/SampleMenusPage';
import SampleEmptyPage from '../Framework/Sample/SampleEmptyPage';
import SampleSearchPage from '../Framework/Sample/SampleSearchPage';

export const screenMaps = {
  home: SampleHomePage,
  tabs: SampleTabsPage,
  menus: SampleMenusPage,
  empty: SampleEmptyPage,
  search: SampleSearchPage
};

export const DEFAULT_SCREEN = 'home';