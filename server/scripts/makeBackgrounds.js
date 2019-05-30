const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });

const makeImages = () => {
  for (let i = 325; i < 360; i++) {
    // gm(1792, 768, `hsl(${i}), 100%, 90%`).write(
    gm(3584, 1536, `hsl(${i}), 100%, 90%`).write(
      `./image-layers/bgimages/${i}.png`,
      // gm(3584, 1536, `hsl(0,0,0)`).write(
      // `./image-layers/bgimages/black.png`,
      function(err) {
        if (err) {
          console.log(err);
          return;
        }
      }
    );
  }
};

makeImages();
