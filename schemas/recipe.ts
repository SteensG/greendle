import { defineField, defineType } from 'sanity'

export const recipeSchema = defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'isChefsPick', title: "Chef's Pick", type: 'boolean' }),
    defineField({ name: 'season', title: 'Season', type: 'string', options: { list: ['Spring', 'Summer', 'Autumn', 'Winter', 'Year-round'] } }),
    defineField({ name: 'weekOf', title: 'Week Of', type: 'string' }),
    defineField({ name: 'prepTime', title: 'Prep Time (minutes)', type: 'number' }),
    defineField({ name: 'cookTime', title: 'Cook Time (minutes)', type: 'number' }),
    defineField({ name: 'servings', title: 'Servings (e.g. 2–4)', type: 'string' }),
    defineField({ name: 'difficulty', title: 'Difficulty', type: 'string', options: { list: ['Easy', 'Medium', 'Hard'] } }),
    defineField({
      name: 'dietary',
      title: 'Dietary Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Pescatarian'] },
    }),
    defineField({ name: 'calories', title: 'Calories per Serving', type: 'number' }),
    defineField({ name: 'mealKit', title: 'Meal Kit (e.g. Grove Box)', type: 'string' }),
    defineField({
      name: 'sourceFarms',
      title: 'Source Farms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'farm' }] }],
    }),
    defineField({ name: 'additionalSources', title: 'Additional Sources (non-farm)', type: 'string' }),
    defineField({
      name: 'ingredientGroups',
      title: 'Ingredient Groups',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'groupName', type: 'string', title: 'Group Name' },
        { name: 'items', type: 'array', title: 'Items', of: [{ type: 'object', fields: [
          { name: 'quantity', type: 'string', title: 'Quantity' },
          { name: 'item', type: 'string', title: 'Item' },
        ]}] },
      ]}],
    }),
    defineField({
      name: 'steps',
      title: 'Method Steps',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', type: 'string', title: 'Step Title' },
        { name: 'duration', type: 'string', title: 'Duration (e.g. 5 min)' },
        { name: 'body', type: 'text', title: 'Instructions' },
        { name: 'isFinale', type: 'boolean', title: 'Final step (amber style)' },
      ]}],
    }),
    defineField({
      name: 'chefNotes',
      title: "Chef's Notes",
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'emoji', type: 'string', title: 'Icon (emoji)' },
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'body', type: 'text', title: 'Body' },
      ]}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'season', media: 'heroImage' },
  },
})
