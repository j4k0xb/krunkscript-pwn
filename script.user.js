// ==UserScript==
// @name         KrunkScript deobfuscator
// @description  Deobfuscate and beautify compiled KrunkScript
// @version      0.1
// @author       j4k0xb
// @match        https://krunker.io/*
// @exclude      https://krunker.io/*.html*
// @grant        none
// ==/UserScript==

const originalParse = JSON.parse;
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);

setTimeout(() => {
  JSON.parse = text => {
    const obj = originalParse(text);
    if (obj?.scripts?.client?.includes(' ')) {
      deobfuscate(obj.scripts.client);
    }
    return obj;
  };
}, 2000);

async function deobfuscate(script) {
  const response = await fetch('https://krunkscript-deobfuscator.netlify.app/api/convert', {
    method: 'POST',
    body: script,
  });
  iframe.contentWindow.console.log(await response.text());
}
