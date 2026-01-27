import { fields, singleton } from '@keystatic/core';

export const team = singleton({
  label: 'Team',
  path: 'src/content/settings/team',
  schema: {
    title: fields.text({
      label: 'Section Title',
      defaultValue: 'Our Team',
    }),
    description: fields.text({
      label: 'Team Description',
      multiline: true,
      description: 'Brief description of the organizing team',
    }),
    organizers: fields.array(
      fields.object({
        name: fields.text({
          label: 'Name',
          validation: { isRequired: true }
        }),
        affiliation: fields.text({
          label: 'Affiliation',
          description: 'University or organization'
        }),
        role: fields.text({
          label: 'Role',
          description: 'e.g., Organizer, Co-organizer'
        }),
        bio: fields.text({
          label: 'Bio',
          multiline: true,
        }),
        email: fields.text({
          label: 'Email',
        }),
        website: fields.text({
          label: 'Website URL',
        }),
        photo: fields.image({
          label: 'Photo',
          directory: 'src/assets/team',
          publicPath: '@assets/team/',
        }),
      }),
      {
        label: 'Organizers',
        itemLabel: (props) => props.fields.name.value || 'New Organizer',
      }
    ),
  },
});
