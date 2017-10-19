export enum Orientation {
    N,
    S,
    E,
    W
}

export function orientationFromString(v:string): Orientation {
    switch (v) {
        case "N":
            return Orientation.N;
        case "S":
            return Orientation.S;
        case "E":
            return Orientation.E;
        case "W":
            return Orientation.W;
        default:
            throw new Error("Invalid orientation");
    }
}

export function orientationToString(o: Orientation): string {
    switch (o) {
        case Orientation.N:
            return "N";
        case Orientation.S:
            return "S";
        case Orientation.E:
            return "E";
        case Orientation.W:
            return "W";
        default:
            throw new Error("Invalid orientation");
    }
}

export function rotate(orientation: Orientation, instruction: InstructionValue): Orientation {
    switch ([orientation, instruction]) {
        case [Orientation.N, InstructionValue.L]:
            return Orientation.W;
        case [Orientation.S, InstructionValue.L]:
            return Orientation.E;
        case [Orientation.E, InstructionValue.L]:
            return Orientation.N;
        case [Orientation.W, InstructionValue.L]:
            return Orientation.S;
        case [Orientation.N, InstructionValue.R]:
            return Orientation.E;
        case [Orientation.S, InstructionValue.R]:
            return Orientation.W;
        case [Orientation.E, InstructionValue.R]:
            return Orientation.S;
        case [Orientation.W, InstructionValue.R]:
            return Orientation.N;
        default:
            return orientation;
    }
}

export enum InstructionValue {
    L,
    R,
    F
}

export function instructionFromString(v:string): InstructionValue {
    switch (v) {
        case "L":
            return InstructionValue.L;
        case "R":
            return InstructionValue.R;
        case "F":
            return InstructionValue.F;
        default:
            throw new Error("Invalid instruction");
    }
}

export const TYPE_LOST = "lost";
export const TYPE_COORDINATES = "coordinates";
type Lost = { kind: "lost", value: [number, number] };
type Coordinates = { kind: "coordinates", value: [number, number] };
export type RobotPosition = Coordinates | Lost;
export const lost = (value: [number, number]): Lost => ({ kind: TYPE_LOST, value });
export const coordinates = (value: [number, number]): Coordinates => ({ kind: TYPE_COORDINATES, value });

export const TYPE_NO_INSTRUCTION = "noinstruction";
export const TYPE_INSTRUCTION = "instruction";
type NoInstruction = { kind: "noinstruction" };
export type Instruction = { kind: "instruction", value: InstructionValue, next: InstructionSet };
export type InstructionSet = NoInstruction | Instruction;
export const noInstruction = (): NoInstruction => ({ kind: TYPE_NO_INSTRUCTION });
export const instruction = (value: InstructionValue, next: InstructionSet): Instruction => ({ kind: TYPE_INSTRUCTION, value, next });