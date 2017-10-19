import "mocha";
import "should";

import Mars from "../mars";
import Robot from "../robot";
import { Orientation, noInstruction, coordinates, parseInstructions } from "../types";

describe("Mars", () => {
    describe("run", () => {
        it("returns the same number of robots as passed initially", () => {
            // Prepare
            const sampleRobots = [0, 0, 0, 0, 0].map(() => new Robot(coordinates([0, 0]), Orientation.N, noInstruction()));
            const m = new Mars([0, 0], sampleRobots);
            
            // Test/Assert
            m.run().should.be.of.length(5);
        });

        it("returns the expected positions of robots", () => {
            // Prepare
            const r1 = new Robot(coordinates([1, 1]), Orientation.E, parseInstructions("RFRFRFRF"));
            const r2 = new Robot(coordinates([3, 2]), Orientation.N, parseInstructions("FRRFLLFFRRFLL"));
            const r3 = new Robot(coordinates([0, 3]), Orientation.W, parseInstructions("LLFFFLFLFL"));
            const m = new Mars([5, 3], [r1, r2, r3]);
            
            // Test
            const [r1_, r2_, r3_] = m.run();
            
            // Assert
            r1_.toString().should.be.equal("1 1 E");
            r2_.toString().should.be.equal("3 3 N LOST");
            r3_.toString().should.be.equal("2 3 S");
        });
    })
})