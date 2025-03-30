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
