export interface Results {
  all?: CategoryResults,
  bug?: CategoryResults,
  dark?: CategoryResults,
  dragon?: CategoryResults,
  electric?: CategoryResults,
  ghost?: CategoryResults,
  fairy?: CategoryResults,
  fighting?: CategoryResults,
  fire?: CategoryResults,
  flying?: CategoryResults,
  grass?: CategoryResults,
  ground?: CategoryResults,
  ice?: CategoryResults,
  normal?: CategoryResults,
  poison?: CategoryResults,
  psychic?: CategoryResults,
  rock?: CategoryResults,
  steel?: CategoryResults,
  water?: CategoryResults,
  [index: string]: CategoryResults,
}

export interface CategoryResults {
  count: number
  averageHeight: number,
  totalHeight: number,
  averageWeight: number,
  totalWeight: number,
}
