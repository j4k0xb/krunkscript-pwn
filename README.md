# KrunkScript Pwn

Userscript no longer works because JSON.parse can't be hooked.

> [!TIP]
> Check out the new decompiler: <https://krunkscript-decompiler.netlify.app/>
>
> - Outputs almost 100% identical KrunkScript syntax
> - Infers types through constraint propagation and data flow analysis
>
> ![Decompiler comparison](https://github.com/user-attachments/assets/8fe59fe0-e507-44d7-8fcb-8988bbfcd4db)

## Installation

1. Install [Tampermonkey](http://www.tampermonkey.net) for your browser.
2. Add the [userscript](https://github.com/j4k0xb/krunkscript-pwn/raw/master/script.user.js).

## Features

- Extract, deobfuscate and beautify compiled KrunkScript when you join a map with scripts.
- Online deobfuscator: <https://krunkscript-deobfuscator.netlify.app>

![Deobfuscator comparison](https://user-images.githubusercontent.com/55899582/188747147-44ee146f-7d93-4920-996d-3972bd1cb8ef.png)

- Read/modify global variables.
- Access everything from `GAME`.
- Inject own actions.

## How To Download Scripts

1. Use a chromium based browser
2. Open the developer console (F12)
3. Execute `queryObjects(Function.prototype)` (this may take a while)
4. Right-click on the resulting array and select "Store as global variable"
5. Execute `temp1.find(f=>{try{return f.toString().includes('V_start')}catch{}}).toString()`
6. Right-click on the resulting code on select "Copy string contents"

