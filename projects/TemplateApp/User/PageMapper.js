/**
 * include any pages here by importing and including in screenMaps (feel free to remove the sample pages)
 * define default page under DEFAULT_SCREEN, value must match respective key in screenMaps
 */
import SampleHomePage from '../Pages/SampleHomePage';
import SampleContainersPage from '../Pages/SampleContainersPage';
import SampleTabsPage from '../Pages/SampleTabsPage';
import SampleMenusPage from '../Pages/SampleMenusPage';
import SampleEmptyPage from '../Pages/SampleEmptyPage';
import SampleSearchPage from '../Pages/SampleSearchPage';
import SampleDataStoragePage from '../Pages/SampleDataStoragePage';

export const screenMaps = {
  home: SampleHomePage,
  containers: SampleContainersPage,
  tabs: SampleTabsPage,
  menus: SampleMenusPage,
  empty: SampleEmptyPage,
  search: SampleSearchPage,
  storage: SampleDataStoragePage
};

export const DEFAULT_SCREEN = 'home';