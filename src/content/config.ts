import { defineCollection, z } from 'astro:content';

const rate = z.object({
  category: z.enum(['turboprop', 'very-light', 'light', 'midsize', 'super-midsize', 'heavy', 'ultra-long-range']),
  // The provider's own label for the row, so nothing is silently re-labeled.
  label: z.string().min(1),
  low: z.number().positive(),
  high: z.number().positive().nullable(),
  note: z.string().optional(),
  // True when the provider gives one range that covers this category and a neighbour.
  shared: z.boolean().optional(),
});

const listings = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().min(1),
    directoryType: z.enum(['software-tool', 'local-business', 'service-provider']),
    summary: z.string().min(1),
    differentiator: z.string().min(1),
    url: z.string().url(),
    // Tracked referral link, set once an affiliate program approves us. The plain
    // url stays as the fallback so a listing never links nowhere.
    affiliateUrl: z.string().url().optional(),
    pricing: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    category: z.string().min(1),
    role: z.enum(['broker', 'marketplace', 'operator']),
    // What the provider's own pages say about what it is.
    roleBasis: z.string().min(1),
    // What kind of price the provider publishes, if any.
    publishes: z.enum(['category-ranges', 'from-prices', 'all-in-medians', 'planning-ranges', 'none']),
    // What the published hourly number includes, as far as the provider says.
    rateBasis: z.enum(['base', 'all-in', 'planning', 'from', 'unstated', 'none']),
    rates: z.array(rate).default([]),
    priceNote: z.string().min(1),
    instantEstimate: z.enum(['states-it-offers', 'not-stated']),
    feesNamed: z.array(z.string()).default([]),
    operatorDisclosure: z.string().min(1),
    // Does the provider say the operator is named before you book? Only 'says-yes' when its own pages say so.
    operatorNamed: z.enum(['says-yes', 'not-stated']),
    bestFor: z.string().min(1),
    skipIf: z.string().min(1),
    watchOut: z.array(z.string()).default([]),
    lastChecked: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    sources: z.array(z.string().url()).min(1),
  }),
});

export const collections = { listings };
