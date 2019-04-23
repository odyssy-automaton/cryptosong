const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });

const makeImages = () => {
  for (let i = 0; i < 360; i++) {
    gm(1792, 768, `hsl(${i}), 100%, 90%`).write(
      `./build/bgimages/${i}.png`,
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
