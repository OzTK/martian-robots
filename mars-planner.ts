import Mars from "./mars";
import Robot from "./robot";
import { 
    Orientation,
    InstructionValue,
    InstructionSet,
    Instruction,
    RobotPosition, 
    TYPE_COORDINATES, 
    TYPE_LOST, 
    orientationFromString, 
    rotate,
    TYPE_NO_INSTRUCTION, 
    TYPE_INSTRUCTION,
    lost,
    coordinates,
    parseInstructions
} from "./types";

export function run(input: string): string {
    const mars = parse(input);
    const result = mars.run();
    return print(result);
}

function parse(input: string): Mars {
    const lines = input.split("\n");
    const [x, y] = lines[0].split(" ").map(c => parseInt(c));

    const entries = lines.slice(1).filter(l => l !== "");
    const robots = [];
    for (let i = 0; i < entries.length - 1; i += 2) {
        const posArgs = entries[i].split(" ");
        const [x, y] = posArgs.slice(0, 2).map(a => parseInt(a));
        const [,,orientation] = posArgs;
        const instructions = entries[i+1];

        robots.push(
            new Robot(coordinates([x, y]), orientationFromString(orientation), parseInstructions(instructions)));
    }

    return new Mars([x, y], robots);
}

function print(robots: Robot[]): string {
    return robots.map(r => r.toString()).join("\n");
}