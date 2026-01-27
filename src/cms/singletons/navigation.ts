import { fields, singleton } from '@keystatic/core';

export const navigation = singleton({
  label: 'Navigation',
  path: 'src/content/settings/navigation',
  schema: {
    links: fields.array(
      fields.object({
        name: fields.text({
          label: 'Link Name',
          validation: { isRequired: true },
        }),
        url: fields.text({
          label: 'URL Path',
          description: 'Relative path (e.g., "blog", "about") or leave empty for home',
        }),
      }),
      {
        label: 'Navigation Links',
        itemLabel: (props) => props.fields.name.value || 'New Link',
      }
    ),
  },
});
