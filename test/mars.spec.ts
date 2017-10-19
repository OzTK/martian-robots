import "mocha";
import "should";

import Mars from "../mars";
import Robot from "../robot";
import { Orientation, noInstruction } from "../types";

describe("Mars", () => {
    describe("run", () => {
        it("returns the same number of robots as passed initially", () => {
            const sampleRobots = [0, 0, 0, 0, 0].map(() => new Robot([0, 0], Orientation.N, noInstruction()));
            const m = new Mars([0, 0], sampleRobots);
            m.run().should.be.of.length(5);
        });
    })
})