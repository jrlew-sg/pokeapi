export interface Results {
  all?: CategoryResults
  [index: string]: CategoryResults
}

export interface CategoryResults {
  count: number
  avgHeight: number,
  totalHeight: number,
  avgWeight: number,
  totalWeight: number,
}
