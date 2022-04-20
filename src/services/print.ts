import { Results } from '../models/results';

export class PrintService {
  public static printResults(results: Results) {
    for (const type in results) {
      console.log(`${type} (${results[type].count})- Average Height: ${results[type].avgHeight}dm - Average Weight: ${results[type].avgWeight}hg`);
    }
  }
}
