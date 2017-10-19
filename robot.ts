import { Orientation, InstructionSet } from "./types";

export default class Robot {
    constructor(
        private position: [number, number],
        private orientation: Orientation,
        private instructions: InstructionSet) {};
}