import { Velocity3D } from '../constructs/velocity3d.js';

/**
 * Represents the current status of any physical properties of an entity.
 *
 * e.g. An entity's velocity. */
export class Physics {
  velocity = new Velocity3D();
}
