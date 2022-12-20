import processing from "../../utils/processing";
import { promises as fsPromises } from "fs";

const thumbPath = `${__dirname}/../../assets/thumb`;

describe("Testing resizeImage function", () => {

    it(`testing resizeImage function to resize img`, async () => {
      await processing.resizeImage("smile.png", 200, 200);
      const mydir = await fsPromises.readdir(`${thumbPath}`);
      const img = mydir.find(
        (file) => file === `${thumbPath}/200_200_smile.png`
      );
      expect(img).toBeTruthy;
    });

  });


describe("Testing processImg function", () => {
    

    it(`testing processImg function to work`, async () => {

      await processing.processImg("smile.png", 200, 200);
      const mydir = await fsPromises.readdir(`${thumbPath}`);
      const img = mydir.find(
        (file) => file === `${thumbPath}/200_200_smile.png`
      );
      expect(img).toBeTruthy;
    });

    it(`testing processImg function to throw error`, async () => {
        
        expect(await processing.processImg("mile.png", 200, 200)).toThrowError;
      });

  });