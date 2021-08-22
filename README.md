# metro-minify-esbuild

> Use [ESBuild](https://github.com/evanw/esbuild) to make your React Native code bundle faster.

Metro Bundler (used for React Native, Instagram, Internal Facebook) allows for any minifier you'd like. ESBuild is a very powerful transpiler / bundler -- but if you use it for transpilation then you can't use any babel plugins (like reanimated, decorators, strip flow types (required for React Native)). So a decent compromise is to use ESBuild for smaller tasks like minifying the output JavaScript bundle.

You write JavaScript -> Babel turns it into older JavaScript -> Minifier makes it small.

By default, Metro uses uglify-es, which currently produces the smallest bundles out of all popular minifiers, but it's ~46x slower than ESBuild.

> View [minifier benchmarks](https://github.com/privatenumber/minification-benchmarks).

## Usage

```
yarn add -D metro-minify-esbuild esbuild
```

Now set ESBuild with `transformer.minifierPath`, and pass in [`ESBuild` options](https://esbuild.github.io/api/#transform-api) via `transformer.minifierConfig`.

`metro.config.js`

```js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.transformer.minifierPath = "metro-minify-esbuild";
config.transformer.minifierConfig = {
  // ESBuild options...
};

module.exports = config;
```

## Performance

### Hello World

The following is a base project generated with `expo init my-app`, then bundled for production with Metro:

#### Before

(uglify)

Roughly ~12 seconds, and 833kb.

```
iOS Bundling complete 11937ms

Bundle                Size
┌ index.ios.js      833 kB
└ index.ios.js.map  3.3 MB
```

#### After

(esbuild)

Roughly ~9.8 seconds, and 840kb.

About 2 seconds faster, and 7kb larger -- this can improve overtime with newer versions of esbuild, which is why the minifier isn't dictating a specific version of esbuild to use.

```
iOS Bundling complete 9751ms

Bundle                 Size
┌ index.ios.js       840 kB
└ index.ios.js.map  2.46 MB
```

### Kitchen Sink

Bundling the Expo [Native Component List](https://github.com/expo/expo/tree/master/apps/native-component-list) (everything).

#### Before

(uglify)

~151 seconds.

```
iOS Bundling complete 151312ms
Copying 112 ios assets

Bundle                 Size
┌ index.ios.js      8.99 MB
└ index.ios.js.map  26.2 MB
```

#### After

(esbuild)

~53 seconds (about 3x faster), 4kb bigger. This one can change a lot in time, sometimes when the computer is running very slow it's closer to 100s, still substantially faster than uglify.

```
iOS Bundling complete 52952ms
Copying 112 ios assets

Bundle                 Size
┌ index.ios.js      9.03 MB
└ index.ios.js.map  17.8 MB
```
