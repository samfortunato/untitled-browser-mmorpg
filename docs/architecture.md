# architecture

notes on how the game/game engine is constructed, etc.?

## notes

### lifecycle

everything generally gets called the same way

order:

1. init
2. sync
3. listen
4. update
5. draw
6. destroy

- init
	- on first init. gets called when object first appears?
- sync
	- sync with game server, which is the *actual* game, running on a remote server. the authority/source of truth!
- listen
	- listens for events in the event queue. responds to them?
	- maybe can be called `respond`
	- possibly will only run on the server? because the server is the one that is controlling how everything is updated, etc.?
- update
	- update the object as normal, whatever it's supposed to do per frame?
- draw
	- visually draw the object on the screen, however it does this?
- destroy
	- gets called when the object gets destroyed. perform anything necessary during this, then object gets destroyed!

### drawing

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
