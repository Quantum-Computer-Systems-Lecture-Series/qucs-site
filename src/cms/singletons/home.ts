import { fields, singleton } from '@keystatic/core';

export const home = singleton({
  label: 'Home Page',
  path: 'src/content/settings/home',
  schema: {
    welcomeText: fields.text({
      label: 'Welcome Text',
      description: 'Small text above the main heading',
      defaultValue: 'Welcome to',
    }),
    heading: fields.text({
      label: 'Main Heading',
      validation: { isRequired: true },
      defaultValue: 'QuCS Lecture Series',
    }),
    subheading: fields.text({
      label: 'Subheading',
      multiline: true,
      validation: { isRequired: true },
      defaultValue: 'A lecture series exploring quantum computing and its applications.',
    }),
    recentLecturesTitle: fields.text({
      label: 'Recent Lectures Section Title',
      defaultValue: 'Recent Lectures',
    }),
    aboutSeriesTitle: fields.text({
      label: 'About Series Section Title',
      defaultValue: 'About the Series',
    }),
    aboutSeriesText: fields.text({
      label: 'About Series Text',
      multiline: true,
      defaultValue: 'Learn about our lecture series, its goals, and what topics we cover.',
    }),
    speakersTitle: fields.text({
      label: 'Speakers Section Title',
      defaultValue: 'Our Speakers',
    }),
    speakersText: fields.text({
      label: 'Speakers Text',
      multiline: true,
      defaultValue: 'Meet the experts and researchers presenting in our lecture series.',
    }),
    contactEmail: fields.text({
      label: 'Contact Email',
      description: 'Email address for inquiries',
      defaultValue: 'contact@example.com',
    }),
    registrationUrl: fields.text({
      label: 'Registration URL',
      description: 'Link to registration page (optional)',
      defaultValue: '',
    }),
    calendarUrl: fields.text({
      label: 'Calendar URL',
      description: 'Google Calendar iCal URL for subscribing to lecture schedule (optional)',
      defaultValue: '',
    }),
  },
});
