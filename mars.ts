import Robot from "./robot";

export default class Mars {
    [lostInSpaceCoordinates: number]: number

    constructor(public maxCoordinate: [number, number], private robots: Robot[]) {
    }

    run(): Robot[] {
        return this.robots.map(r => r.executeInstructions(this));
    }
    
    isPositionValid = ([x, y]: [number, number]) => x >= 0 && x <= this.maxCoordinate[0] && y >= 0 && y <= this.maxCoordinate[1];
}