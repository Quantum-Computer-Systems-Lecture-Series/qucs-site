import { fields, collection } from '@keystatic/core';
import { lectureCategories } from '@/utils/categoryLabels';

export const lectures = collection({
  label: 'Lectures',
  slugField: 'title',
  path: 'src/content/lectures/*',
  entryLayout: 'content',
  format: { contentField: 'content' },
  columns: ['title', 'speaker', 'lectureDate', 'category', 'visibility'],
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    description: fields.text({
      label: 'Description',
      multiline: true,
      description: 'A brief description of this lecture',
      validation: { isRequired: true }
    }),
    speaker: fields.text({
      label: 'Speaker Name',
      validation: { isRequired: true }
    }),
    speakerAffiliation: fields.text({
      label: 'Speaker Affiliation',
      description: 'University or organization',
    }),
    speakerBio: fields.text({
      label: 'Speaker Bio',
      multiline: true,
      description: 'Brief bio of the speaker'
    }),
    speakerEmail: fields.text({
      label: 'Speaker Email',
      description: 'Email address for contacting the speaker',
    }),
    lectureDate: fields.date({
      label: 'Lecture Date',
      validation: { isRequired: true }
    }),
    links: fields.array(
      fields.object({
        label: fields.text({
          label: 'Button Label',
          description: 'e.g., "Slides", "YouTube", "Bilibili"',
          validation: { isRequired: true }
        }),
        url: fields.url({
          label: 'URL',
          validation: { isRequired: true }
        }),
        type: fields.select({
          label: 'Link Type',
          description: 'Type of link (for styling)',
          options: [
            { label: 'Slides', value: 'slides' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Bilibili', value: 'bilibili' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'other',
        }),
      }),
      {
        label: 'Resource Links',
        description: '📺 Add links to videos, slides, and other resources. YouTube links will automatically be used as cover image thumbnails if no cover image is provided.',
        itemLabel: (props) => props.fields.label.value || 'New Link',
      }
    ),
    coverImageUrl: fields.text({
      label: 'Cover Image URL',
      description: '🖼️ Optional: Enter an external image URL. Priority order: This URL → Uploaded file → YouTube thumbnail from links → Default QuCS logo',
    }),
    coverImage: fields.image({
      label: 'Or Upload Cover Image',
      description: '📁 Optional: Upload a cover image (only used if URL above is empty). Falls back to YouTube thumbnail from links or default QuCS logo if not provided.',
      directory: 'src/assets/lectureimages',
      publicPath: '@assets/lectureimages/',
    }),
    category: fields.select({
      label: 'Category',
      description: 'Select a category for this lecture',
      options: lectureCategories,
      defaultValue: 'algorithms-and-theory',
    }),
    tags: fields.array(
      fields.text({ label: 'Tag' }),
      {
        label: 'Tags',
        description: 'Tags in order: 1) SpeakerName (PascalCase, no spaces), 2) InstitutionName (PascalCase, no spaces), 3) TopicTags (PascalCase, no spaces)',
        itemLabel: (props) => props.value || 'New Tag',
      }
    ),
    visibility: fields.select({
      label: 'Visibility',
      description: 'Control who can see this lecture',
      options: [
        { label: 'Private', value: 'private' },
        { label: 'Unlisted', value: 'unlisted' },
        { label: 'Public', value: 'public' },
      ],
      defaultValue: 'public',
    }),
    useMathJax: fields.checkbox({
      label: 'Use MathJax',
      description: 'Enable MathJax for rendering mathematical formulas',
      defaultValue: true,
    }),
    content: fields.markdoc({
      label: 'Content',
      options: {
        image: {
          directory: 'src/assets/lectureimages',
          publicPath: '@assets/lectureimages/',
        },
      },
    }),
  },
});
