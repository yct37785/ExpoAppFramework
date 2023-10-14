/**
 * include any pages here by importing and including in screenMaps (feel free to remove the sample pages)
 * define default page under DEFAULT_SCREEN, value must match respective key in screenMaps
 */
import SampleHomePage from '../Framework/Sample/SampleHomePage';
import SampleTabsPage from '../Framework/Sample/SampleTabsPage';
import SamplePage from '../Framework/Sample/SamplePage';
import SampleEmptyPage from '../Framework/Sample/SampleEmptyPage';

export const screenMaps = {
  home: SampleHomePage,
  tabs: SampleTabsPage,
  sample: SamplePage,
  empty: SampleEmptyPage,
};

export const DEFAULT_SCREEN = 'home';