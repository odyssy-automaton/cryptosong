import React, { Component } from "react";

import "../styles/Home.scss";

export default class HeroCanvas extends Component {
  componentDidMount() {
    this.loadCanvas();
  }

  componentDidUpdate(prevProps) {
    if (this.props.imagePathBg !== prevProps.imagePathBg) {
      this.loadCanvas();
    }
  }

  loadCanvas() {
    const image = new Image();
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    image.crossOrigin = "anonymous"; // getting CORs errors

    image.onload = () => {
      ctx.drawImage(
        image,
        image.width - 10,
        image.height - 10, // Start at botom right corner,
        10,
        10, // "Get" a `10 * 10` (w * h) area from the source image (crop),
        0,
        0, // Place the result at 0, 0 in the canvas,
        10,
        10 // With as width / height: 100 * 100 (scale)
      );
      const pixelData = ctx.getImageData(9, 9, 1, 1).data;
      this.props.cb(pixelData);
    };
    image.src = this.props.imagePathBg;
  }

  render() {
    return (
      <div>
        <canvas id="canvas" width="10px" height="10px" />
      </div>
    );
  }
}
