const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

const devMode = process.env.NODE_ENV !== "production";

const uglifyjs = new UglifyJSPlugin({
  test: /\.js($|\?)/i,
  sourceMap: true
});

module.exports = {
  entry: ["./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          // 'postcss-loader',
          "sass-loader"
        ]
      },
      {
        test: [
          /\.eot$/,
          /\.png$/,
          /\.jpg$/,
          /\.gif$/,
          /\.ttf$/,
          /\.svg$/,
          /\.woff$/,
          /\.woff2$/
        ],
        loader: "url-loader"
      }
    ]
  },
  devServer: {
    port: 3001,
    open: true,
    proxy: {
      "/api": "http://localhost:3000",
      "/import": "http://localhost:3000"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
