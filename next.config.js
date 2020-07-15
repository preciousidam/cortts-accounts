const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withCss = require('@zeit/next-css');

module.exports = withFonts(
  withCss(
    withSass({
      webpack(config, options) {
        // custom webpack loaders if you need
        return config;
      }
    })
  )
);