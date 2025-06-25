import { defineCollection, z } from 'astro:content';

// Collection schemas following proper validation and security practices

// Collections schema - for product collections
const collectionsSchema = z.object({
  title: z.string(),
  description: z.string(),
  hero_image: z.string(),
  hero_alt: z.string(),
  featured: z.boolean().default(false),
  order: z.number(),
  features: z.array(z.string()),
  specifications: z.object({
    materials: z.array(z.string()),
    dimensions: z.string(),
    weight: z.string(),
    warranty: z.string(),
  }),
  products: z.array(z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    alt: z.string(),
    price_range: z.string(),
    material: z.string(),
    colors: z.array(z.string()),
    dimensions: z.string(),
  })),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
  }),
});

// Clientele schema - for client logos and information
const clienteleSchema = z.object({
  name: z.string(),
  logo: z.string(),
  alt: z.string(),
  website: z.string().url().optional(),
  order: z.number(),
  featured: z.boolean().default(false),
});

// Pages schema - for additional pages
const pagesSchema = z.object({
  title: z.string(),
  description: z.string(),
  hero_image: z.string().optional(),
  hero_alt: z.string().optional(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
  }),
});

// Settings schema - for site-wide settings
const settingsSchema = z.object({
  site_name: z.string(),
  site_description: z.string(),
  contact_email: z.string().email(),
  contact_phone: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
  }),
  social_links: z.array(z.object({
    platform: z.string(),
    url: z.string().url(),
    icon: z.string(),
  })),
  business_hours: z.object({
    weekdays: z.string(),
    weekends: z.string(),
    closed: z.string(),
  }),
});

// Define collections with proper validation
export const collections = {
  collections: defineCollection({
    type: 'content',
    schema: collectionsSchema,
  }),
  clientele: defineCollection({
    type: 'content',
    schema: clienteleSchema,
  }),
  pages: defineCollection({
    type: 'content',
    schema: pagesSchema,
  }),
  settings: defineCollection({
    type: 'content',
    schema: settingsSchema,
  }),
}; 