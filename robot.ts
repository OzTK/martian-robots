import { 
    Orientation,
    InstructionValue,
    InstructionSet,
    Instruction,
    RobotPosition, 
    TYPE_COORDINATES, 
    TYPE_LOST, 
    orientationToString, 
    rotate,
    TYPE_NO_INSTRUCTION, 
    TYPE_INSTRUCTION,
    lost,
    coordinates
} from "./types";

import Mars from "./Mars";

export default class Robot {
    constructor(
        public position: RobotPosition,
        public orientation: Orientation,
        public instructions: InstructionSet) {};

    executeInstructions(mars: Mars, robot: Robot = this): Robot {
        switch ([robot.instructions.kind, robot.position.kind]) {
            case [TYPE_NO_INSTRUCTION,]:
            case [,TYPE_LOST]:
                return robot;
            case [TYPE_INSTRUCTION, TYPE_COORDINATES]:
                const instruction = robot.instructions as Instruction;
                return this.executeInstructions(mars
                    , new Robot(robot.getNextPosition(mars), robot.getNextOrientation(), instruction.next));
            default:
                throw new Error("Impossible robot case");
        }
    }

    getNextOrientation(): Orientation {
        if (this.instructions.kind === TYPE_INSTRUCTION 
            && this.instructions.value !== InstructionValue.F) {
            return rotate(this.orientation, this.instructions.value);
        }

        return this.orientation;
    }
    
    getNextPosition(mars: Mars): RobotPosition {
        if (this.instructions.kind === TYPE_INSTRUCTION 
            && this.instructions.value === InstructionValue.F) {
            const [x, y] = this.position.value;
            if (!mars.isPositionValid([x, y])) {
                return lost([x, y]);
            }
            switch (this.orientation) {
                case Orientation.N:
                    return coordinates([x, y+1]);
                case Orientation.S:
                    return coordinates([x, y-1]);
                case Orientation.E:
                    return coordinates([x-1, y]);
                case Orientation.W:
                    return coordinates([x+1, y]);
            }
        }

        return this.position;
    }

    toString(): string {
        const [x, y] = this.position.value;
        const initial = `${x} ${orientationToString(this.orientation)} ${y}`;
        switch (this.position.kind) {
            case TYPE_COORDINATES:
                return initial;
            case TYPE_LOST:
                return `${initial} LOST`;
        }
    }
}