import { getPlayerBounds } from '../../engine/meta.js';
import { setCurrentScene } from '../../engine/scene.js';

import { Entity } from '../entity.js';

import { Collider } from '../../components/collider.js';

import { Position } from '../../constructs/position.js';
import { Scene } from '../../scenes/scene.js';

import { isWithinBoundsOf } from '../../utils/collision.js';

/**
 * NOTES:
 * Not sure if I should separate the logic between scene change, and warp, and map change.
 * Doing this for now.
 *
 * not sure if i like the fact that you'll have to import 1) a scene, 2) the Collider class,
 * and 3) the Position class, just to build a `SceneWarp`.
 *
 * It might be cleaner to do something like this:
 * const sceneWarp = new SceneWarp(sceneToWarpTo)
 * sceneWarp.setBounds(topLeft, topRight, bottomRight, bottomLeft);
 * sceneWarp.setWarpPos(x, y);
 *
 * current way is this:
 * const sceneWarp = new SceneWarp(
 *   sceneToWarpTo,
 *   new Collider(topLeft, topRight, bottomRight, bottomLeft),
 *   new Position(x, y)
 * );
 *
 * dunno. this might just be code philosophy at this point.
 * maybe you'll just have to accept that all these Cool Little ClassesTM will
 * be tossed around everywhere?
 * what's the point of having them as abstractions if you don't use them?
 */

/** Change to a new scene, and warp to a certain position in that scene's map. */
export class SceneWarp extends Entity {
  /**
   * @param {Scene} scene
   * @param {Collider} collider
   * @param {Position} warpPos - Position to warp the player to in the next scene.
   */
  constructor(x, y, scene, collider, warpPos) {
    super(x, y);

    this.scene = scene;
    this.collider = collider;
    this.warpPos = warpPos;
  }

  update() {
    const warpBounds = { ...this.transform, ...this.collider };

    if (isWithinBoundsOf(warpBounds, getPlayerBounds())) {
      setCurrentScene(this.scene);
    }
  }

  draw(ctx) {
    this.collider._draw(ctx, this.transform.x, this.transform.y);
  }
}
