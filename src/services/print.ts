import { Results } from '../models/results';

export class PrintService {
  public static printResults(results: Results) {
    for (const type in results) {
      console.log(`${type} (${results[type].count})- Average Height: ${results[type].averageHeight}dm - Average Weight: ${results[type].averageWeight}hg`);
    }
  }
}
