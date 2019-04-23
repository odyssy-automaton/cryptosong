const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });
const path = require("path");
const pLimit = require("p-limit");
const limit = pLimit(1);

const db = require("../db-config");
const SongModel = require("../models/song");
const getHueForDate = require("../../src/helpers/hueConversion.js")
  .getHueForDate;

const rootDir = __dirname + "/../../";
const layersDir = rootDir + "image-layers/artlayers";
const outputDir = rootDir + "public/";

// const imagePath = path => layersDir + path;

// Note: you may have to precreate the 2009 and 2008 directory in outputDir

const createImagePathArray = r => {
  let array = [];
  array.push(layersDir + "/" + r.location.image);
  console.log(array);
  return array;
};

// The code to combine all images together

// merges the image from imagePath into buffer
const compositeImage = (buffer, imagePath) => {
  return new Promise((resolve, reject) => {
    gm(buffer)
      .composite(imagePath)
      .toBuffer("PNG", function(err, newBuffer) {
        if (err) reject(err);
        resolve(newBuffer);
      });
  });
};

const createImage = async (song, imagePathsToCombine) => {
  let newImage = null;
  bg = getHueForDate(song.date);
  if (bg.match("hsl")) {
    newImage = gm(1792, 768, bg);
  } else {
    newImage = gm(bg);
  }

  let newImageBuffer = await new Promise((resolve, reject) => {
    newImage.toBuffer("PNG", (err, buffer) => {
      if (err) reject(err);
      resolve(buffer);
    });
  });

  // composite images
  for (const imagePath of imagePathsToCombine) {
    newImageBuffer = await compositeImage(newImageBuffer, imagePath);
  }

  // write outputs
  // let largeImagePath = path.join(outputDir, song.imagePath),
  // smallImagePath = path.join(outputDir, song.imagePathSmall);
  let bgImagePath = path.join(outputDir, song.imagePathBg);

  gm(newImageBuffer).write(bgImagePath, err => {
    if (err) throw err;
    console.log(`created ${bgImagePath}`);
  });

  // composite doesn't accept crop so we have to create an intermediary buffer

  // let secondPass = gm(newImageBuffer)
  //   .resize(null, 400)
  //   .crop(400, 400, 280, 0)
  //   .autoOrient()
  //   .write(smallImagePath, err => {
  //     if (err) throw err;
  //     console.log(`created ${smallImagePath}`);
  //   });
};

async function main() {
  results = await SongModel.Song.find()
    // .populate("instruments")
    // .populate("beard")
    // .populate("topic")
    .populate("location");
  // .populate("mood")
  // .populate("mainInstrument")
  // .populate("secondaryInstrument");

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (const song of results) {
    try {
      await createImage(song, createImagePathArray(song));
    } catch (err) {
      console.log(`error creating ${song.title}`);
      console.log(err);
    }
    await delay(500);
  }

  console.log("finished");
  process.exit(0);
}

main();
