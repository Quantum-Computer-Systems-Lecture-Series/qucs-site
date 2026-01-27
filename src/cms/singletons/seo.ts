import { fields, singleton } from '@keystatic/core';

export const seo = singleton({
  label: 'Site & SEO',
  path: 'src/content/settings/seo',
  schema: {
    siteTitle: fields.text({
      label: 'Site Title',
      description: 'Default title for your website',
      validation: { isRequired: true },
    }),
    siteDescription: fields.text({
      label: 'Site Description',
      description: 'Default meta description',
      multiline: true,
      validation: { isRequired: true },
    }),
    siteBase: fields.text({
      label: 'Site Base Path',
      description: 'Leave empty for root domain, or specify subdirectory like /blog',
      defaultValue: '',
    }),
    ogImage: fields.image({
      label: 'OG Image',
      description: 'Default Open Graph image (1200x630px recommended)',
      directory: 'public',
      publicPath: '/',
    }),
    twitterHandle: fields.text({
      label: 'Twitter Handle',
      description: 'Your Twitter handle (without @)',
    }),
  },
});
