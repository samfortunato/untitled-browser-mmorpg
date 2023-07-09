# Untitled Browser MMORPG

Other, Inc.'s first game - a retro MMORPG that runs entirely in your browser.

# Philosophy

- `update` should update all logical things about an object.
- `draw` should only draw the current snapshot of the object. no manipulation or state change should happen within `draw`.

- an organized codebase is a good codebase.
- reorganize frequently. if there's a better way to organize things, compress, or move things around, do it.
  don't be lazy! put the work in!

- try to document, as this is an experiment in how to do this in general. we are not following a script or a guide,
  but instead are figuring it out as we go.
  clean code is most important here. but, if things are incomplete, document and write down your ideas.
- argument types/types of declared but not yet defined variables are the only types needed.
  every other type can be inferred.
  use JSDoc for now.
