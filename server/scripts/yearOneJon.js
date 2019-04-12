const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });
const path = require("path");
const pLimit = require("p-limit");
const limit = pLimit(1);

const db = require("../../db-config");
const SongModel = require("../models/song");
const getHueForDate = require("../../src/helpers/hueConversion.js")
  .getHueForDate;

const rootDir = __dirname + "/../../";
const layersDir = rootDir + "build/artlayers";
const outputDir = rootDir + "build/";

const imagePath = path => layersDir + path;

// Note: you may have to precreate the 2009 directory in outputDir
 
/*
const slugify = text => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
*/

// create the array of image paths to composite together
const createImagePathArray = r => {
  let array = [];
  array.push(layersDir + "/mood_" + r.mood.name.toLowerCase() + ".png");
  beardPath = r.beard
    ? imagePath(
        `/beard_${r.beard.name.toLowerCase().replace(/\//g, "")}.png`
      )
    : imagePath("/beard_na.png");
  array.push(beardPath);
  addTopic(r, array);
  addInstrumentLayers(r, array);
  console.log(array);
  return array;
};

const addTopic = (song, array) => {
  const basicTopicName = song.topic.name.toLowerCase().replace(/\s/g, "");
  if (song.topic.name == "Poetic") {
    array.push(
      imagePath(`/topic_${basicTopicName}${song.date.getDay() + 1}.png`)
    );
    return;
  }
  if (
    (song.secondaryInstrument.name == "baritone uke" ||
      song.secondaryInstrument.name == "uke") &&
    fs.existsSync(imagePath(`/topic_${basicTopicName}-uke.png`))
  ) {
    array.push(imagePath(`/topic_${basicTopicName}-uke.png`));
    return;
  }
  array.push(imagePath(`/topic_${basicTopicName}.png`));
};

const addInstrumentLayers = (song, array) => {
  if (song.topic.name.toLowerCase() == "instrumental") {
    array.push(
      layersDir +
        "/instrument_" +
        song.mainInstrument.name.toLowerCase().replace(/\s/g, "") +
        ".png"
    );
  }
  if (
    [
      "congas",
      "drum machine",
      "harpsichord",
      "keyboard",
      "organ",
      "piano"
    ].includes(song.secondaryInstrument.name.toLowerCase())
  ) {
    array.push(layersDir + "/instrument_vocals_no_hands.png");
    array.push(
      layersDir +
        "/instrument_" +
        song.secondaryInstrument.name.toLowerCase().replace(/\s/g, "") +
        ".png"
    );
    return;
  }
  if (
    song.secondaryInstrument &&
    song.mainInstrument.name.toLowerCase() == "vocals"
  ) {
    array.push(
      layersDir +
        "/instrument_" +
        song.secondaryInstrument.name.toLowerCase().replace(/\s/g, "") +
        ".png"
    );
    array.push(layersDir + "/instrument_vocals_no_hands.png");
    return;
  }
  array.push(
    layersDir +
      "/instrument_" +
      song.mainInstrument.name.toLowerCase().replace(/\s/g, "") +
      ".png"
  );
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
  // bg = getHueForDate(song.date);
  // if (bg.match("hsl")) {
  //   newImage = gm(1792, 768, bg);
  // } else {
  //   newImage = gm(bg);
  }

  let newImageBuffer = await new Promise((resolve, reject) => {
    newImage.toBuffer("PNG", (err, buffer) => {
      if (err) reject(err);
      resolve(buffer);
    })
  });

  // composite images
  for (const imagePath of imagePathsToCombine) {
    newImageBuffer = await compositeImage(newImageBuffer, imagePath);
  }

  // write outputs
  let largeImagePath = path.join(outputDir, song.imagePath),
    smallImagePath = path.join(outputDir, song.imagePathSmall);
  gm(newImageBuffer).write(largeImagePath, err => {
    if (err) throw err;
    console.log(`created ${largeImagePath}`);
  });

  // composite doesn't accept crop so we have to create an intermediary buffer

  let secondPass = gm(newImageBuffer)
    .resize(null, 400)
    .crop(400, 400, 280, 0)
    .autoOrient()
    .write(smallImagePath, err => {
      if (err) throw err;
      console.log(`created ${smallImagePath}`);
    });
};

async function main() {
  results = await SongModel.Song.find()
    .populate("instruments")
    .populate("beard")
    .populate("topic")
    .populate("location")
    .populate("mood")
    .populate("mainInstrument")
    .populate("secondaryInstrument");

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (const song of results) {
    try {
      await createImage(song, createImagePathArray(song));
    } catch(err) {
      console.log(`error creating ${song.title}`);
      console.log(err);
    }
    await delay(500);
  }

  console.log("finished");
  process.exit(0);
}

main();
