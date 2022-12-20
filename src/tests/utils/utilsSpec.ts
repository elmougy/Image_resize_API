import supertest from "supertest";
import utils from "../../utils/utils";
import { promises as fsPromises } from "fs";

describe("Testing utils functions", () => {
  
  describe("Testing fileExists function", () => {
    it(`testing fileExists function return true`, async () => {
      expect(await utils.fileExists("smile.png")).toBe(true);
    });

    it(`testing fileExists function return false`, async () => {
      expect(await utils.fileExists("mile.png")).toBeFalsy;
    });
  });


});
