import { config } from '@keystatic/core';
import { seo, home, about, community, social, navigation, footer, team } from 'src/cms/singletons';
import { lectures } from 'src/cms/collections';

export default config({
  storage: import.meta.env?.DEV
    ? { kind: 'local' }
    : {
      kind: 'github',
      repo: (import.meta.env?.PUBLIC_GITHUB_REPO || process.env.PUBLIC_GITHUB_REPO || 'Quantum-Computer-Systems-Lecture-Series/qucs-site') as `${string}/${string}`,
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
