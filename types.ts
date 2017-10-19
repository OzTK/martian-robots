export enum Orientation {
    N,
    S,
    E,
    W
}

export enum InstructionValue {
    L,
    R,
    F
}

export const TYPE_LOST = "lost";
export const TYPE_COORDINATES = "coordinates";
type Lost = { kind: "lost" };
type Coordinates = { kind: "coordinates", value: [number, number] };
export type RobotPosition = Coordinates | Lost;
export const lost = (): Lost => ({ kind: TYPE_LOST });
export const coordinates = (value: [number, number]): Coordinates => ({ kind: TYPE_COORDINATES, value });

export const TYPE_NO_INSTRUCTION = "noinstruction";
export const TYPE_INSTRUCTION = "instruction";
type NoInstruction = { kind: "noinstruction" };
type Instruction = { kind: "instruction", value: InstructionValue, next: InstructionSet };
export type InstructionSet = NoInstruction | Instruction;
export const noInstruction = (): NoInstruction => ({ kind: TYPE_NO_INSTRUCTION });
export const instruction = (value: InstructionValue, next: InstructionSet): Instruction => ({ kind: TYPE_INSTRUCTION, value, next });