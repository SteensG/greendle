import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'

// Load .env.local
const env = dotenv.parse(readFileSync('.env.local', 'utf8'))

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
})

const farms = [
  {
    _type: 'farm',
    name: 'Ashfield Organics',
    slug: { _type: 'slug', current: 'ashfield-organics' },
    location: 'Herefordshire',
    tagline: 'Four generations of organic farming in the heart of the Welsh Marches.',
    farmerNames: 'Tom & Sarah Ashfield',
    partnerSince: 2019,
    acreage: 320,
    familyGenerations: 4,
    harvestToGreendle: '60%',
    isFeatured: true,
    storyQuote: 'We farm the way our great-grandparents did — with patience, observation, and respect for what the soil tells us.',
    produceTags: ['Seasonal Veg', 'Heritage Grains', 'Salad Leaves'],
    heroStats: [
      { _key: 'stat1', value: '320', label: 'Acres' },
      { _key: 'stat2', value: '4th Gen', label: 'Family Farm' },
      { _key: 'stat3', value: 'Since 2019', label: 'Greendle Partner' },
    ],
    certifications: [
      { _key: 'cert1', icon: '🌿', title: 'Soil Association Certified', detail: 'Fully organic since 1998', featured: true },
      { _key: 'cert2', icon: '♻️', title: 'Zero Waste', detail: 'All crop waste composted on-site', featured: false },
    ],
    interviewQA: [
      { _key: 'qa1', question: 'What does organic farming mean to you?', answer: 'It means working with nature rather than against it. Every decision we make starts with the question: is this good for the soil?', speaker: 'Tom Ashfield', dark: false },
      { _key: 'qa2', question: 'What\'s your most exciting crop this season?', answer: 'Our heritage wheat varieties. We\'ve been trialling five old breeds this year and the flavour is extraordinary compared to modern varieties.', speaker: 'Sarah Ashfield', dark: true },
    ],
    inSeasonProduce: [
      { _key: 'p1', name: 'Cavolo Nero', description: 'Rich, dark kale perfect for winter soups', seasonStatus: 'In Season Now' },
      { _key: 'p2', name: 'Celeriac', description: 'Earthy root with a subtle celery flavour', seasonStatus: 'In Season Now' },
      { _key: 'p3', name: 'Purple Sprouting Broccoli', description: 'Sweet and tender, first of the year', seasonStatus: 'Coming Soon' },
    ],
    seoDescription: 'Ashfield Organics — four generations of certified organic farming in Herefordshire, partnered with Greendle since 2019.',
  },
  {
    _type: 'farm',
    name: 'Riverbank Growers',
    slug: { _type: 'slug', current: 'riverbank-growers' },
    location: 'Suffolk',
    tagline: 'Specialist salad and herb growers alongside the River Stour.',
    farmerNames: 'Priya & Dev Patel',
    partnerSince: 2021,
    acreage: 85,
    familyGenerations: 2,
    harvestToGreendle: '80%',
    isFeatured: false,
    storyQuote: 'Every bag of salad leaves you open was picked within 24 hours. That\'s the promise we make to every Greendle customer.',
    produceTags: ['Salad Leaves', 'Fresh Herbs', 'Edible Flowers'],
    heroStats: [
      { _key: 'stat1', value: '85', label: 'Acres' },
      { _key: 'stat2', value: '30+', label: 'Varieties' },
      { _key: 'stat3', value: 'Since 2021', label: 'Greendle Partner' },
    ],
    certifications: [
      { _key: 'cert1', icon: '🌱', title: 'Rainforest Alliance', detail: 'Sustainable water management certified', featured: true },
      { _key: 'cert2', icon: '🐝', title: 'Bee Friendly', detail: 'Wildflower margins around every field', featured: false },
    ],
    interviewQA: [
      { _key: 'qa1', question: 'How do you keep leaves so fresh?', answer: 'We harvest at dawn when the plants are fully hydrated, cool them immediately to 4°C, and pack within the hour. The cold chain never breaks.', speaker: 'Priya Patel', dark: false },
    ],
    inSeasonProduce: [
      { _key: 'p1', name: 'Wild Rocket', description: 'Peppery leaves with real heat', seasonStatus: 'In Season Now' },
      { _key: 'p2', name: 'Chervil', description: 'Delicate anise-flavoured herb', seasonStatus: 'In Season Now' },
      { _key: 'p3', name: 'Nasturtium Flowers', description: 'Peppery edible blooms', seasonStatus: 'Coming Soon' },
    ],
    seoDescription: 'Riverbank Growers — specialist salad and herb farm in Suffolk, delivering ultra-fresh leaves to Greendle customers.',
  },
]

const recipes = [
  {
    _type: 'recipe',
    title: 'Wild Garlic Linguine',
    subtitle: 'Spring pasta with foraged wild garlic and pecorino',
    slug: { _type: 'slug', current: 'wild-garlic-linguine' },
    description: 'A simple, season-led pasta that lets wild garlic shine. Foraged from the edges of Ashfield\'s woodland, it has a gentle, grassy heat that pairs perfectly with aged pecorino.',
    isChefsPick: true,
    season: 'Spring',
    weekOf: 'Week of 17 March',
    prepTime: 10,
    cookTime: 15,
    servings: '2',
    difficulty: 'Easy',
    dietary: ['Vegetarian'],
    calories: 520,
    mealKit: 'Grove Box',
    ingredientGroups: [
      {
        _key: 'g1',
        groupName: 'Pasta',
        items: [
          { _key: 'i1', quantity: '200g', item: 'dried linguine' },
          { _key: 'i2', quantity: '1 tbsp', item: 'fine sea salt' },
        ],
      },
      {
        _key: 'g2',
        groupName: 'Sauce',
        items: [
          { _key: 'i3', quantity: '80g', item: 'wild garlic leaves, roughly chopped' },
          { _key: 'i4', quantity: '3 tbsp', item: 'extra virgin olive oil' },
          { _key: 'i5', quantity: '40g', item: 'pecorino romano, finely grated' },
          { _key: 'i6', quantity: '1', item: 'lemon, zest and juice' },
          { _key: 'i7', quantity: 'to taste', item: 'black pepper' },
        ],
      },
    ],
    steps: [
      { _key: 's1', title: 'Boil the pasta', duration: '12 min', body: 'Bring a large pan of well-salted water to a rolling boil. Add the linguine and cook until al dente, about 10–11 minutes. Reserve 150ml of pasta water before draining.' },
      { _key: 's2', title: 'Wilt the wild garlic', duration: '2 min', body: 'While the pasta cooks, warm the olive oil in a wide pan over medium heat. Add the wild garlic and toss for 60–90 seconds until just wilted. Remove from heat.' },
      { _key: 's3', title: 'Bring it together', duration: '2 min', body: 'Add the drained pasta to the garlic pan. Add half the pasta water and toss vigorously. Add the pecorino, lemon zest, and a squeeze of juice. Toss again, adding more pasta water if needed for a glossy sauce.', isFinale: true },
    ],
    chefNotes: [
      { _key: 'n1', emoji: '🌿', title: 'Wild garlic season', body: 'Wild garlic is fleeting — it\'s at its best from late February to April. Look for bright green, glossy leaves with a clean garlic scent.' },
      { _key: 'n2', emoji: '🧀', title: 'Pecorino vs Parmesan', body: 'Pecorino has a sharper, saltier bite that holds up well against the garlic. If you prefer something milder, parmesan works too.' },
    ],
    tags: ['pasta', 'spring', 'vegetarian', 'quick'],
    seoDescription: 'Wild Garlic Linguine — a seasonal spring pasta with foraged wild garlic and pecorino, ready in under 25 minutes.',
  },
  {
    _type: 'recipe',
    title: 'Roasted Celeriac Soup',
    subtitle: 'Velvety winter soup with toasted hazelnuts and chive oil',
    slug: { _type: 'slug', current: 'roasted-celeriac-soup' },
    description: 'Slow-roasting transforms celeriac into something wonderfully sweet and nutty. Finished with a bright chive oil and crunchy hazelnuts, this is the soup you want on a grey winter afternoon.',
    isChefsPick: false,
    season: 'Winter',
    weekOf: 'Week of 10 February',
    prepTime: 15,
    cookTime: 50,
    servings: '4',
    difficulty: 'Easy',
    dietary: ['Vegan', 'Gluten-free', 'Dairy-free'],
    calories: 310,
    mealKit: 'Harvest Box',
    ingredientGroups: [
      {
        _key: 'g1',
        groupName: 'Soup',
        items: [
          { _key: 'i1', quantity: '1 large', item: 'celeriac (~900g), peeled and cubed' },
          { _key: 'i2', quantity: '1', item: 'white onion, roughly chopped' },
          { _key: 'i3', quantity: '3 cloves', item: 'garlic' },
          { _key: 'i4', quantity: '3 tbsp', item: 'olive oil' },
          { _key: 'i5', quantity: '900ml', item: 'good vegetable stock' },
          { _key: 'i6', quantity: '1 tsp', item: 'white miso paste' },
        ],
      },
      {
        _key: 'g2',
        groupName: 'To serve',
        items: [
          { _key: 'i7', quantity: '30g', item: 'blanched hazelnuts, toasted and roughly chopped' },
          { _key: 'i8', quantity: '20g', item: 'chives, finely chopped' },
          { _key: 'i9', quantity: '4 tbsp', item: 'olive oil' },
        ],
      },
    ],
    steps: [
      { _key: 's1', title: 'Roast the celeriac', duration: '35 min', body: 'Heat oven to 200°C. Toss the celeriac, onion, and garlic with olive oil and a generous pinch of salt. Spread on a large baking tray and roast for 30–35 minutes, turning once, until golden and tender.' },
      { _key: 's2', title: 'Make the chive oil', duration: '5 min', body: 'Blend the chives with the olive oil and a pinch of salt until bright green and smooth. Pass through a fine sieve if you want it very clean. Set aside.' },
      { _key: 's3', title: 'Blend and season', duration: '10 min', body: 'Transfer the roasted veg to a blender. Add the warm stock and miso paste. Blend until very smooth, adding more stock if needed. Taste and adjust seasoning.', isFinale: true },
    ],
    chefNotes: [
      { _key: 'n1', emoji: '🥜', title: 'Toasting hazelnuts', body: 'Toast them in a dry pan over medium heat for 3–4 minutes, shaking often. You want them golden and fragrant but not bitter.' },
      { _key: 'n2', emoji: '🍜', title: 'The miso trick', body: 'A small spoon of white miso adds a subtle umami depth without making it taste "Asian". It just makes the soup taste more of itself.' },
    ],
    tags: ['soup', 'winter', 'vegan', 'gluten-free'],
    seoDescription: 'Roasted Celeriac Soup — a velvety vegan winter soup with toasted hazelnuts and chive oil, made with Ashfield Organics celeriac.',
  },
]

async function seed() {
  console.log('Seeding farms...')
  const farmDocs = []
  for (const farm of farms) {
    const doc = await client.createOrReplace({ ...farm, _id: `farm-${farm.slug.current}` })
    farmDocs.push(doc)
    console.log(`  ✓ ${farm.name}`)
  }

  console.log('Seeding recipes...')
  for (const recipe of recipes) {
    const sourceFarms = farmDocs
      .filter((_, i) => i === 0)
      .map(f => ({ _type: 'reference', _key: f._id, _ref: f._id }))

    await client.createOrReplace({
      ...recipe,
      _id: `recipe-${recipe.slug.current}`,
      sourceFarms,
    })
    console.log(`  ✓ ${recipe.title}`)
  }

  console.log('\nDone! Visit /studio to review and publish the documents.')
}

seed().catch(err => { console.error(err); process.exit(1) })
