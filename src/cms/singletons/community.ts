import { fields, singleton } from '@keystatic/core';

export const community = singleton({
  label: 'Community Page',
  path: 'src/content/settings/community',
  schema: {
    welcomeText: fields.text({
      label: 'Welcome Text',
      description: 'Small text above the main heading',
      defaultValue: 'Join the',
    }),
    heading: fields.text({
      label: 'Main Heading',
      validation: { isRequired: true },
      defaultValue: 'QuCS Community',
    }),
    subheading: fields.text({
      label: 'Subheading',
      multiline: true,
      validation: { isRequired: true },
      defaultValue: 'Your quantum community hub for learning, collaboration, and career growth.',
    }),
    discordUrl: fields.text({
      label: 'Discord Invite URL',
      validation: { isRequired: true },
      defaultValue: 'https://tinyurl.com/qucs-dc',
    }),
    offerings: fields.array(
      fields.object({
        title: fields.text({
          label: 'Title',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
      }),
      {
        label: 'Offerings',
        itemLabel: (props) => props.fields.title.value || 'New Offering',
      }
    ),
    connectTitle: fields.text({
      label: 'Connect Section Title',
      defaultValue: 'Connect with us',
    }),
    connectText: fields.text({
      label: 'Connect Section Text',
      multiline: true,
      defaultValue: 'Join our Discord community to connect with fellow quantum computing enthusiasts, researchers, and learners. Ask questions, share insights, and stay updated on the latest developments.',
    }),
    involvedTitle: fields.text({
      label: 'Get Involved Section Title',
      defaultValue: 'Get involved',
    }),
    involvedText: fields.text({
      label: 'Get Involved Section Text',
      multiline: true,
      defaultValue: "Whether you're just starting your quantum journey or you're an experienced researcher, there's a place for you in our community.",
    }),
  },
});
