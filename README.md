# KrunkScript Deobfuscator

[![Netlify Status](https://api.netlify.com/api/v1/badges/7d6d9a70-6666-40a5-9f4c-7adfc59dbe1f/deploy-status)](https://app.netlify.com/sites/krunkscript-deobfuscator/deploys)

Deobfuscate and beautify compiled KrunkScript

![screenshot](https://user-images.githubusercontent.com/55899582/188747147-44ee146f-7d93-4920-996d-3972bd1cb8ef.png)

## Usage

1. Install [Tampermonkey](http://www.tampermonkey.net) for your browser
2. Add the [userscript](https://github.com/j4k0xb/krunkscript-deobfuscator/raw/master/script.user.js).
3. Open the browser console and join a map with scripts
4. The deobfuscated code will be logged

## API

Base URL: https://krunkscript-deobfuscator.netlify.app

POST [/api/convert](https://krunkscript-deobfuscator.netlify.app/api/convert)

The body has to contain the js client script of a hosted map (usually starts with `"use strict";`)

See [here](./script.user.js) for an example.
