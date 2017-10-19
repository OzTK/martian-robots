import { run } from "./mars-planner";

const input = "5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL";

const result = run(input);

console.log(result);