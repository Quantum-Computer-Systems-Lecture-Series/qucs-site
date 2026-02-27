import { config } from '@keystatic/core';
import { seo, home, about, community, social, navigation, footer, team } from 'src/cms/singletons';
import { lectures } from 'src/cms/collections';

export default config({
  storage: {
    kind: 'github',
    repo: 'langxubai/qucs-site',
  },

  ui: {
    brand: { name: 'QuCS' },
    navigation: {
      'Content': ['home', 'about', 'community', 'lectures', 'team'],
      'Settings': ['seo', 'social', 'navigation', 'footer'],
    },
  },

  collections: {
    lectures,
  },

  singletons: {
    seo,
    home,
    about,
    community,
    social,
    navigation,
    footer,
    team,
  },
});
