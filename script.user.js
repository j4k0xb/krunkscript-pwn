// ==UserScript==
// @name         KrunkScript pwn
// @description  Extract/deobfuscate/hook/inject KrunkScript
// @version      1.0.0
// @author       j4k0xb
// @downloadURL  https://github.com/j4k0xb/krunkscript-pwn/raw/master/script.user.js
// @updateURL    https://github.com/j4k0xb/krunkscript-pwn/raw/master/script.user.js
// @match        https://krunker.io/*
// @exclude      https://krunker.io/*.html*
// @grant        none
// ==/UserScript==

/* globals krnk */

// USAGE:
// read global variables: krnk.getVars()
// modify them: krnk.eval('V_someVar = 100')
// access everything from GAME: krnk.V_PLAYERS.V_list()

// inject your own actions that run additionally
const actions = {
  render(delta) {
    const { V_width, V_height } = krnk.V_OVERLAY.V_getSize();
    for (const player of krnk.V_PLAYERS.V_list()) {
      if (player.V_isYou || player.V_health <= 0) continue;
      const pos = krnk.V_SCENE.V_posToScreen(player.V_position.V_x, player.V_position.V_y, player.V_position.V_z);
      if (!pos.V_onScreen) continue;
      krnk.V_OVERLAY.V_drawLine(V_width / 2, V_height / 2, pos.V_x, pos.V_y, 2, '#ff0000', 0.8);
    }
  }
};


Object.defineProperty(window, 'krnk', { value: actions });
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);

const originalParse = JSON.parse;
setTimeout(() => {
  JSON.parse = text => {
    const map = originalParse(text);
    if (map?.scripts?.client?.includes(' ')) deobfuscate(map.scripts.client);
    if (map?.objects && map?.name) patchKrunkscript(map);
    return map;
  };
}, 2000);

function patchKrunkscript(map) {
  map.scripts ??= {
    client: `return{render:()=>{},onNetworkMessage:()=>{},onPlayerUpdate:()=>{},start:()=>{},update:()=>{},onPlayerSpawn:()=>{},onPlayerDeath:()=>{},onKeyPress:()=>{},onKeyUp:()=>{},onKeyHeld:()=>{},onMouseClick:()=>{},onMouseUp:()=>{},onMouseScroll:()=>{},onDIVClicked:()=>{}};`
  };
  const script = map.scripts.client;
  const vars = script.match(/^(let.+\n)+/m)?.[0]?.match(/(?<=^let )\w+/gm) || [];

  map.scripts.client = `
  const actions = (() => {
    krnk.eval = x => eval(x);
    krnk.getVars = () => ({ ${vars.join(',')} });
    ${script}
  })();
  Object.assign(krnk, this.GAME);
  for (const [name, fn] of Object.entries(actions)) {
    actions[name] = (...args) => {
      fn.apply(this, args);
      krnk[name]?.apply(this, args);
    };
  }
  return actions;`;
}

async function deobfuscate(script) {
  const response = await fetch('https://krunkscript-deobfuscator.netlify.app/api/convert', {
    method: 'POST',
    body: script,
  });
  iframe.contentWindow.console.log(await response.text());
}
