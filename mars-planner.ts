import Mars from "./mars";
import Robot from "./robot";

export function run(input: string): string {
    const mars = parse(input);
    const result = mars.run();
    return print(result);
}

function parse(input: string): Mars {
    return new Mars([0, 0], []);
}

function print(robots: Robot[]): string {
    return "";
}