
import { promises as fsPromises } from "fs";
import sharp from "sharp";

const fullPath = `${__dirname}/../assets/full`;
const thumbPath = `${__dirname}/../assets/thumb`;


const resizeImage = async (
    fileName: string,
    width: number,
    height: number
  ): Promise<unknown> => {
    
    console.log("this is resize img");
    try {
      const resizedImg = await sharp(`${fullPath}/${fileName}`)
        .resize(width, height)
        .toFile(`${thumbPath}/${width}_${height}_${fileName}`);
  
      console.log("image resized ...");
      return;
    } catch (err) {
      console.log("error in resizeImage ...");
      console.error(err);
    }
  };

const processImg = async (
    fileName: string,
    width: number,
    height: number
  ): Promise<unknown> => {
    
    console.log("this is process img");
    const thumbDir = await fsPromises.readdir(`${thumbPath}`);
    //file name at the end to keep the extention type.
    try {
      const img = thumbDir.find(
        (file) => file === `${width}_${height}_${fileName}`
      );
      if (img) {
        console.log("found processed img");
        return;
      } else {
        console.log("not found img");
        await resizeImage(fileName, width, height);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  export default{
    resizeImage,
    processImg
  };