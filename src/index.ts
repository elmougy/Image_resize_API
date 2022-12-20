import express from "express";
import fs from "fs";
import { promises as fsPromises } from "fs";
import utils from "./utils/utils";
import sharp from "sharp";

const app = express();
const port = 3000;
const path = `${__dirname}/assets/thumb`;

app.get("/", (req: express.Request, res: express.Response):void => {
  res.write(
    `please enter the write URL : <br> http://localhost:3000/api?fileName=val&width=val&height=val `
  );
  res.end();
});
app.get("/api", (req: express.Request, res: express.Response):void=> {
  utils.displayImg(req, res);
});

app.listen(port, () => {
  console.log("server started");
});

export default app;
