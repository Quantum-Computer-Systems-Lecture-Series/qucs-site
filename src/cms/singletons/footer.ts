import { fields, singleton } from '@keystatic/core';

export const footer = singleton({
  label: 'Footer',
  path: 'src/content/settings/footer',
  schema: {
    linksTitle: fields.text({
      label: 'Links Section Title',
      defaultValue: 'Links',
    }),
    socialsTitle: fields.text({
      label: 'Socials Section Title',
      defaultValue: 'Socials',
    }),
    copyrightText: fields.text({
      label: 'Copyright Text',
      description: 'Year is automatically prepended',
      defaultValue: 'QuCS. All rights reserved.',
    }),
  },
});
