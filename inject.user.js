// ==UserScript==
// @name         KrunkScript injector
// @description  Hooks and cheats
// @version      0.1
// @match        https://krunker.io/*
// @exclude      https://krunker.io/*.html
// @grant        none
// ==/UserScript==

/* globals krnk */

// USAGE:
// read global variables: krnk.getVars()
// modify them: krnk.eval('V_someVar = 100')
// access everything from GAME: krnk.V_PLAYERS.V_list()

const DEFAULT_SCRIPT = `
"use strict";
return {render:()=>{},onNetworkMessage:()=>{},onPlayerUpdate:()=>{},start:()=>{},update:()=>{},onPlayerSpawn:()=>{},onPlayerDeath:()=>{},onKeyPress:()=>{},onKeyUp:()=>{},onKeyHeld:()=>{},onMouseClick:()=>{},onMouseUp:()=>{},onMouseScroll:()=>{},onDIVClicked:()=>{}};`;

Object.defineProperty(window, 'krnk', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: {
    // inject ur own actions that run additionally
    render(delta) {
      const { V_width, V_height } = krnk.V_OVERLAY.V_getSize();
      for (const player of krnk.V_PLAYERS.V_list()) {
        if (player.V_isYou || player.V_health <= 0) continue;
        const pos = krnk.V_SCENE.V_posToScreen(player.V_position.V_x, player.V_position.V_y, player.V_position.V_z);
        if (!pos.V_onScreen) continue;
        krnk.V_OVERLAY.V_drawLine(V_width / 2, V_height / 2, pos.V_x, pos.V_y, 2, '#ff0000', 0.8);
      }
    }
  },
});

const originalParse = JSON.parse;
setTimeout(() => {
  JSON.parse = text => {
    const map = originalParse(text);
    if (map?.objects && map?.name) patchKrunkscript(map);
    return map;
  };
}, 2000);

function patchKrunkscript(map) {
  if (!map.scripts?.client) map.scripts = { client: '' };

  let src = map.scripts.client;
  if (!src.includes('return')) src = DEFAULT_SCRIPT;

  const vars = src.match(/^(let.+\n)+/m)?.[0]?.match(/(?<=^let )\w+/gm) || [];

  map.scripts.client = `
  const ret = (() => {
    krnk.eval = x => eval(x);
    krnk.getVars = () => ({ ${vars.join(',')} });
    ${src}
  })();
  Object.assign(krnk, this.GAME);
  for (const [name, fn] of Object.entries(ret)) {
    ret[name] = (...args) => {
      fn.apply(this, args);
      krnk[name]?.apply(this, args);
    };
  }
  return ret;`;
}
