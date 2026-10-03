import { RATE_CATEGORIES } from './site';

type Rate = { category: string; label: string; low: number; high: number | null; note?: string; shared?: boolean };
type Entry = { id: string; data: any };

export const alpha = (a: Entry, b: Entry) => a.data.name.localeCompare(b.data.name);

// Rows that apply to exactly one category (shared ranges are shown in tables but kept out of headline numbers).
export function specificRows(listings: Entry[], category: string) {
  const out: { id: string; name: string; basis: string; rate: Rate }[] = [];
  for (const l of listings) {
    for (const r of l.data.rates as Rate[]) {
      if (r.category === category && !r.shared) out.push({ id: l.id, name: l.data.name, basis: l.data.rateBasis, rate: r });
    }
  }
  return out;
}

export function categoryStats(listings: Entry[], category: string) {
  const rows = specificRows(listings, category);
  const providers = new Set(rows.map((r) => r.id));
  const lows = rows.map((r) => r.rate.low);
  const highs = rows.map((r) => r.rate.high).filter((h): h is number => h !== null);
  return {
    providers: providers.size,
    min: lows.length ? Math.min(...lows) : null,
    max: highs.length ? Math.max(...highs) : null,
    rows,
  };
}

export const labelFor = (id: string) => RATE_CATEGORIES.find((c) => c.id === id)?.label ?? id;

// Which common charges a provider names on the pages we read, derived from its feesNamed list.
export const FEE_TESTS: { key: string; label: string; test: RegExp }[] = [
  { key: 'fet', label: '7.5% excise tax', test: /excise/i },
  { key: 'segment', label: 'Segment fee', test: /segment/i },
  { key: 'position', label: 'Positioning', test: /position/i },
  { key: 'minimum', label: 'Daily minimum', test: /minimum/i },
  { key: 'airport', label: 'Landing and handling', test: /landing|handling|ramp|FBO|airport/i },
  { key: 'fuel', label: 'Fuel surcharge', test: /fuel/i },
  { key: 'crew', label: 'Crew overnight or per diem', test: /crew|overnight|per diem/i },
];
export const names = (l: Entry, test: RegExp) => (l.data.feesNamed as string[]).some((f) => test.test(f));
