import { groq } from 'next-sanity'

// ─── Farm queries ────────────────────────────────────────────────────────────

export const farmsListQuery = groq`
  *[_type == "farm"] | order(partnerSince asc) {
    _id,
    name,
    slug,
    location,
    tagline,
    heroImage,
    farmerNames,
    partnerSince,
    acreage,
    produceTags,
    certifications,
    isFeatured,
  }
`

export const farmBySlugQuery = groq`
  *[_type == "farm" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    location,
    tagline,
    heroImage,
    farmerNames,
    partnerSince,
    acreage,
    familyGenerations,
    harvestToGreendle,
    heroStats,
    storyQuote,
    storyBody,
    produceTags,
    inSeasonProduce,
    certifications,
    interviewQA,
    isFeatured,
    seoDescription,
  }
`

export const farmSlugsQuery = groq`
  *[_type == "farm" && defined(slug.current)] { "slug": slug.current }
`

// ─── Recipe queries ──────────────────────────────────────────────────────────

export const recipesListQuery = groq`
  *[_type == "recipe"] | order(_createdAt desc) {
    _id,
    title,
    subtitle,
    slug,
    heroImage,
    description,
    isChefsPick,
    season,
    prepTime,
    cookTime,
    servings,
    difficulty,
    dietary,
    calories,
    mealKit,
    tags,
    sourceFarms[]-> { name, slug, location },
  }
`

export const recipeBySlugQuery = groq`
  *[_type == "recipe" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    heroImage,
    description,
    isChefsPick,
    season,
    weekOf,
    prepTime,
    cookTime,
    servings,
    difficulty,
    dietary,
    calories,
    mealKit,
    sourceFarms[]-> { name, slug, location },
    additionalSources,
    ingredientGroups,
    steps,
    chefNotes,
    tags,
    seoDescription,
  }
`

export const recipeSlugsQuery = groq`
  *[_type == "recipe" && defined(slug.current)] { "slug": slug.current }
`
