import express from "express";
import { promises as fsPromises } from "fs";
import processing from "./processing";


const fullPath = `${__dirname}/../assets/full`;
const thumbPath = `${__dirname}/../assets/thumb`;

const fileExists = async (fileName: string): Promise<unknown> => {
  try {
    const fullDir = await fsPromises.readdir(`${fullPath}`);
    //file name at the end to keep the extention type.
    const img = fullDir.find((file) => file === `${fileName}`);
    if (img) {
      console.log("file exists");
      return true;
    } else {
      console.log("file does not exists");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const checkNumericValue = (value: unknown): boolean=>{

  //let val = /^\d+$/.test(value as string);
  let val = Number(value);

  console.log(`numeric value conversion is ${val}`);
  if(val && val>0){
    return true;
  }
  return false;
}


const displayImg = async (
  req: express.Request,
  res: express.Response
): Promise<unknown> => {

  console.log("this is displayImg");
  const reqParams = req.query;
  const fileName = reqParams.fileName as string;
  let widthVal = reqParams.width as string;
  let heightVal = reqParams.height as string;
  let isFileExists = await fileExists(fileName);

  if (checkNumericValue((widthVal)) &&  checkNumericValue(heightVal) && isFileExists) {
    console.log("valid parameters ...proceeding");
    try {

      await processing.processImg(fileName, parseInt(widthVal), parseInt(heightVal));

      const img = await fsPromises.readFile(
        `${thumbPath}/${widthVal}_${heightVal}_${fileName}`
      );
      
      const imgContent = Buffer.from(img).toString("base64");
      res.write(
        `<html><body><img  src="data:image/jpeg;base64, ${imgContent}"></body></html>`
      );
      //res.write(Buffer.from(img).toString("base64"));
      res.end();
      console.log("image displayed");
    } catch (error) {
      console.log(`errors displaying image error: ${error}`);
      res.status(400);
      res.send(`errors displaying image error: ${error}`);
    }
  } else {
    let errorMsg: string[] = [];
    if (!isFileExists) {
      errorMsg.push("wrong file name");
    }
    if (!checkNumericValue(widthVal)) {
      errorMsg.push("not a valid width");
    }
    if (!checkNumericValue(heightVal)) {
      errorMsg.push("not a valid height");
    }
    console.log("unvalid parameters");
    res.write(
      `<html><body al> <center> </br><p style="color:red" >${errorMsg} </p> 
      </br> plese enter valid arguments "?fileName=val&width=val&height=val"</center> </body></html>`
    );
    console.error(errorMsg);
    res.end();
    console.log("------NO image displayed ------");
  }

  return;
};

export default {
  displayImg,
  fileExists,
};
