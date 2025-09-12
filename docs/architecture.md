# architecture

notes on how the game/game engine is constructed, etc.?

## notes

you have "draw" code, which draws things on the screen

it is in a specific style. it is limited to how things are on the baseline canvas API

options:
- accept that it's low level
- hide away somewhere/abstract away
	- make your own APIs as a wrapper on it?
- put drawing code in their own files, and treat it like shader code
	- can replace with actual shader/glsl/whatever stuff if you replace drawing engine with WebGL?

there is a lot of:
- low level drawing code
- low level "positioning" code
