export interface Results {
    all: CategoryResults
    [index: string]: CategoryResults
}

export interface CategoryResults {
    count: number
    avgHeight: string,
    totalHeight: number,
    avgWeight: string,
    totalWeight: number,
}
