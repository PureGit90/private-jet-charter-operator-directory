// Working brand, matched to the lead domain candidate (privatejetcharterpricescompared.com). It and the tagline
// are the only places the brand appears in code, so renaming is a one-file change once Marco picks a domain.
export const SITE_NAME = 'Private Jet Charter Prices Compared';
export const TAGLINE = 'What private jet charter companies actually publish about price.';
export const SITE_DESCRIPTION =
  'Hourly rates, named fees and broker or operator status for 22 private jet charter providers, each figure sourced to the provider\'s own page with the date we read it.';

// Nothing is crawlable until GATE approval. /publish-directory sets PUBLIC_NOINDEX=false.
export const NOINDEX = import.meta.env.PUBLIC_NOINDEX !== 'false';

// Contact address shown on the legal and corrections pages; pages omit the line when null.
export const CONTACT_EMAIL: string | null = 'sunshinesolutions305@outlook.com';

export const DATA_DATE = '2026-10-03';
export const DATA_DATE_LABEL = 'October 3, 2026';

export const CATEGORIES = [
  {
    slug: 'brokers-and-marketplaces',
    name: 'Brokers and marketplaces',
    short: 'Brokers and marketplaces',
    intro:
      'These companies say they find an aircraft for your trip from a network of operators. Most of the well-known names are in this group. The aircraft are flown by a different company, so the questions that matter are who that operator is, what you are charged on top of the aircraft price, and when you find out.',
  },
  {
    slug: 'operators',
    name: 'Operators with their own fleet',
    short: 'Own-fleet operators',
    intro:
      'These companies manage or operate aircraft themselves. In this set that is a short list, because most consumer-facing charter brands are brokers. An operator can tell you its own aircraft price directly, though a few also source aircraft from other operators when their own are busy.',
  },
] as const;

export const ROLES: Record<string, { label: string; note: string }> = {
  broker: { label: 'Broker', note: 'Describes itself as a broker or arranger that sources aircraft from other operators.' },
  marketplace: { label: 'Marketplace', note: 'Describes itself as an online platform that shows aircraft from many operators.' },
  operator: { label: 'Operator', note: 'Describes itself as managing or operating its own fleet.' },
};

export const PUBLISHES: Record<string, { label: string; note: string }> = {
  'category-ranges': { label: 'Hourly ranges by aircraft type', note: 'Publishes a low and high hourly rate for each aircraft category.' },
  'from-prices': { label: '"From" prices', note: 'Publishes only a starting hourly price.' },
  'all-in-medians': { label: 'All-in medians from its own quotes', note: 'Publishes median total prices from its own quote data.' },
  'planning-ranges': { label: 'Planning ranges', note: 'Publishes ranges it describes as planning estimates, before some charges.' },
  none: { label: 'No price on pages we read', note: 'Quote only. We read its pages and found no dollar figure for charter.' },
};

export const BASIS: Record<string, { label: string; note: string }> = {
  base: { label: 'Base hourly', note: 'The provider says fees or taxes are added on top.' },
  'all-in': { label: 'All-in', note: 'Total trip price divided by flight time, including positioning, fees and tax.' },
  planning: { label: 'Planning range', note: 'Described as a planning estimate before positioning, trip charges and taxes.' },
  from: { label: 'From price', note: 'A starting price. The page does not say what is included.' },
  unstated: { label: 'Basis not stated', note: 'The page does not say what the hourly figure includes.' },
  none: { label: 'No hourly rate', note: 'No hourly figure published.' },
};

export const RATE_CATEGORIES = [
  { id: 'turboprop', label: 'Turboprop' },
  { id: 'very-light', label: 'Very light jet' },
  { id: 'light', label: 'Light jet' },
  { id: 'midsize', label: 'Midsize jet' },
  { id: 'super-midsize', label: 'Super midsize jet' },
  { id: 'heavy', label: 'Heavy jet' },
  { id: 'ultra-long-range', label: 'Ultra long range jet' },
] as const;

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const categoryByName = (name: string) => CATEGORIES.find((c) => c.name === name);

export const fmtUsd = (n: number) => '$' + n.toLocaleString('en-US');
export const fmtRange = (low: number, high: number | null) => (high === null ? `from ${fmtUsd(low)}` : `${fmtUsd(low)} to ${fmtUsd(high)}`);
