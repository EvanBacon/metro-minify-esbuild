/**
 * Copyright (c) Evan Bacon.
 *
 * This source code is licensed under the MIT license.
 */

function minify({ code, map, reserved, config }) {
  // easiest package ever lol
  const minified = require("esbuild").transformSync(code, {
    minify: true,
    legalComments: "none",
    ...config,
  });
  return minified;
}

module.exports = minify;
