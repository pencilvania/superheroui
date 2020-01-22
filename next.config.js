// next.config.js
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withCSS = require("@zeit/next-css");
const withFonts = require('next-fonts');


if (typeof require !== "undefined") {
    require.extensions[".css"] = file => {};
  }
  
  module.exports = {
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: "empty"
      };
  
      return config;
    }
  };
  
  module.exports = withSass(withCSS(withImages(withFonts({  }))))
