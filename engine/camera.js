import { getCurrentScene } from './scene.js';
import { getScreenDimensions } from './draw.js';
import { getPlayerTransform } from './meta.js';

import { Transform } from '../components/transform.js';

export class Camera {
	static transform = new Transform(0, 0);

	/**
	 * TODO: i think the "clamping" is useless?
	 * make sure you understand everything that's going on here...
	 */
	static update() {
		const mapSize = getCurrentScene().getMap().size;
		const playerPos = getPlayerTransform();
		const screenSize = getScreenDimensions();

		const centeredX = playerPos.x - (screenSize.w / 2);
		const centeredY = playerPos.y - (screenSize.h / 2);
		const clampX = Math.min(mapSize.w - screenSize.w, centeredX);
		const clampY = Math.min(mapSize.h - screenSize.h, centeredY);

		this.transform.x = Math.max(0, clampX);
		this.transform.y = Math.max(0, clampY);
	}
}
