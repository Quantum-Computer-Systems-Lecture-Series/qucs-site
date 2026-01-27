import { fields, singleton } from '@keystatic/core';

export const about = singleton({
  label: 'About Page',
  path: 'src/content/about/index',
  entryLayout: 'content',
  format: { contentField: 'content' },
  schema: {
    title: fields.text({
      label: 'Page Title',
      validation: { isRequired: true },
      defaultValue: 'About Me',
    }),
    content: fields.markdoc({
      label: 'Content',
      options: {
        image: {
          directory: 'public/images',
          publicPath: '/images/',
        },
      },
    }),
  },
});
