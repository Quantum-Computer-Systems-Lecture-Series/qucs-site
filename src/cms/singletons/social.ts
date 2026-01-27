import { fields, singleton } from '@keystatic/core';

export const social = singleton({
  label: 'Social Links',
  path: 'src/content/settings/social',
  schema: {
    links: fields.array(
      fields.object({
        name: fields.text({
          label: 'Platform Name',
          validation: { isRequired: true },
        }),
        url: fields.text({
          label: 'URL',
          validation: { isRequired: true },
        }),
      }),
      {
        label: 'Social Links',
        itemLabel: (props) => props.fields.name.value || 'New Link',
      }
    ),
  },
});
