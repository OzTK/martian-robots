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
        const kinds = robot.instructions.kind + robot.position.kind;
        if (robot.instructions.kind === TYPE_NO_INSTRUCTION || robot.position.kind === TYPE_LOST) {
            return robot;
        }

        return this.executeInstructions(mars
            , new Robot(robot.getNextPosition(mars), robot.getNextOrientation(), robot.instructions.next));
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
            const coords = this.move(this.position.value);
            if (!mars.isPositionValid(coords.value)) {
                const [x, y] = this.position.value;
                if (mars[x]) {
                    return this.position;
                }

                mars[x] = y;
                return lost([x, y]);
            }

            return coords;
        }

        return this.position;
    }

    private move([x, y]: [number, number]) {
        switch (this.orientation) {
            case Orientation.N:
                return coordinates([x, y+1]);
            case Orientation.S:
                return coordinates([x, y-1]);
            case Orientation.E:
                return coordinates([x+1, y]);
            case Orientation.W:
                return coordinates([x-1, y]);
        }
    }

    toString(): string {
        const [x, y] = this.position.value;
        const initial = `${x} ${y} ${orientationToString(this.orientation)}`;
        switch (this.position.kind) {
            case TYPE_COORDINATES:
                return initial;
            case TYPE_LOST:
                return `${initial} LOST`;
        }
    }
}