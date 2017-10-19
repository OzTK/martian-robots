import Robot from "./robot";

export default class Mars {
    constructor(maxCoordinate: [number, number], private robots: Robot[]) {}
    run(): Robot[] {
        return this.robots;
    }
}