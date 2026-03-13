import { defineField, defineType } from 'sanity'

export const farmSchema = defineType({
  name: 'farm',
  title: 'Farm',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Farm Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'location', title: 'Location (County)', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'farmerNames', title: 'Farmer Names', type: 'string' }),
    defineField({ name: 'partnerSince', title: 'Partner Since (Year)', type: 'number' }),
    defineField({ name: 'acreage', title: 'Acreage', type: 'number' }),
    defineField({ name: 'familyGenerations', title: 'Family Generations on Land', type: 'number' }),
    defineField({ name: 'harvestToGreendle', title: 'Harvest to Greendle (%)', type: 'string' }),
    defineField({
      name: 'heroStats',
      title: 'Hero Stats',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'value', type: 'string', title: 'Value' },
        { name: 'label', type: 'string', title: 'Label' },
      ]}],
    }),
    defineField({ name: 'storyQuote', title: 'Pull Quote', type: 'text', rows: 3 }),
    defineField({ name: 'storyBody', title: 'Farm Story', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'produceTags',
      title: 'Produce Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'inSeasonProduce',
      title: 'In-Season Produce',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'description', type: 'string', title: 'Description' },
        { name: 'seasonStatus', type: 'string', title: 'Season Status', options: { list: ['In Season Now', 'Coming Soon', 'Off Season'] } },
        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
      ]}],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'icon', type: 'string', title: 'Icon (emoji)' },
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'detail', type: 'string', title: 'Detail' },
        { name: 'featured', type: 'boolean', title: 'Featured (dark card)' },
      ]}],
    }),
    defineField({
      name: 'interviewQA',
      title: 'Interview Q&A',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'question', type: 'string', title: 'Question' },
        { name: 'answer', type: 'text', title: 'Answer' },
        { name: 'speaker', type: 'string', title: 'Speaker' },
        { name: 'dark', type: 'boolean', title: 'Dark card' },
      ]}],
    }),
    defineField({ name: 'isFeatured', title: 'Featured / Spotlight', type: 'boolean' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'location', media: 'heroImage' },
  },
})
