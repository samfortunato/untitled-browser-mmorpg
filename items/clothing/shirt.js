/**
 * Players can wear shirts, clothing, etc.
 *
 * Their overworld sprite is small, so you'd see a small pixel version of the clothing item.
 * But the player card will show a more detailed portrait of the character,
 * where you can really see all of the details of their clothing.
 *
 * Honestly, maybe i should make the game a somewhat low poly 3D, and/or add
 * shaders to make things look a bit more pixely.
 *
 * Advancements in browser 3D may allow for this. Maybe make some shit in Unity.
 * could hire some modelers real quick to test this out.
 *
 * The girls have to look so sexy and cool.
 * The guys have to look so sexy and cool.
 *
 * Cute, cool, guys and girls.
 * Customization is the name of the game here.
 */
export class Shirt extends Item {
  playerCardSprite = '../path/to/card_sprite.gif';
  overworldSprite = '../path/to/overworld_sprite.gif';
}
