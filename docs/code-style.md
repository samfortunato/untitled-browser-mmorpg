# code style

- `const FOO = 'bar'` = a constant.

- `let Foo = 'bar'` = an important global that can change.

- no monkey patching
  - create utils/functionalities/modules to encapsulate related functionality, and import them

- you should have code written pretty simply!
  - e.g. you have a shop. you can buy things, sell things.
  - reflect that easily in the code!

- maybe assume understanding of domain knowledge
  - e.g. you don't have to explain what "translation" is in the context of geometry, e.g. translating an object in space.

- simple verbs! function names should have simple verbs!
  - keep them consistent across related objects, related functions, related functionality?
    - e.g. init, listen, sync, update, draw, destroy

- keep it simple?
  - prefer vanilla javascript over everything else if you can
  - use vanilla APIs over abstractions, or anything complicated?
    - e.g. use `localStorage` and vanilla `localStorage` API to store data locally, as opposed to some complicated solution?
      - make it simple and explicit. maybe have to add a proxy intercept, though. e.g. `StorageProxy`
