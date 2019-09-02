import expect from "expect";
import Tree from "../utils/tree";
import FIXTURE from "./fixture";

describe("Tree", function() {
  describe("findRoot", function() {
    it("should return an object whithout the property parent_id", function() {
      const tree = new Tree(FIXTURE.fixture);
      console.log(tree);
      expect(tree.rootId).toEqual(1);
    });
  });
});
