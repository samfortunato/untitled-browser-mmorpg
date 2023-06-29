import { getCurrentScene } from '../../../engine/scene.js';
import { getMouseBounds, getMousePos, getWheelDelta, isMouseClicked } from '../../../engine/input.js';

import { Entity } from '../../entity.js';
import { CloseButtonNew } from '../close-button-new.js';

import { Collider } from '../../../components/collider.js';

import { Dimensions } from '../../../components/dimensions.js';
import { Offset } from '../../../constructs/offset.js';
import { calculateTileCrop, getTileset } from '../../../maps/tiles.js';
import { isWithinBoundsOf } from '../../../utils/collision.js';

import { TILE_SIZE_RAW, TILE_SIZE_RENDERED } from '../../../constants/draw.js';
import { AMOUNT_OF_TILES_ON_EACH_ROW } from './constants.js';

export class MapEditor extends Entity {
  dimensions = new Dimensions(TILE_SIZE_RENDERED * AMOUNT_OF_TILES_ON_EACH_ROW, document.documentElement.clientHeight);
  collider = new Collider(
    document.documentElement.clientWidth - this.dimensions.width,
    document.documentElement.clientWidth + this.dimensions.width,
    document.documentElement.clientHeight,
    document.documentElement.clientHeight,
  );
  scrollOffset = new Offset();

  tilesetName = getCurrentScene().map.tilesetName;
  tileset = getTileset(this.tilesetName);
  tileCount = 0;
  displayedTiles = [];
  selectedTileIndicatorPos = [0, 0];
  selectedTileId = 0;
  clickedTilePos = [0, 0];

  constructor() {
    super();

    this.closeButton = new CloseButtonNew(this.transform.x - 32, 0, this.onClose.bind(this));

    this.setScreenPosition();

    this.selectedTileIndicatorPos = [0 + this.transform.x, 0];

    if (this.tileset.complete) this.initializeDisplayedTiles()
    else this.tileset.onload = this.initializeDisplayedTiles.bind(this);
  }

  update() {
    this.setScreenPosition();
    this.setScrollOffset();
    this.setSelectedTile();
    this.getClickedTilePosOnMap();
    this.changeTileOnMap();

    this.closeButton.update();
  }

  draw(ctx) {
    ctx.fillStyle = 'black';

    // border
    ctx.globalAlpha = 0.3;
    ctx.fillRect(this.transform.x - 4, this.transform.y, 2, this.dimensions.height);
    ctx.globalAlpha = 1;
    ctx.fillRect(this.transform.x - 2, this.transform.y, this.dimensions.width + 2, this.dimensions.height);

    this.drawTiles(ctx);
    this.drawSelectedTileIndicator(ctx);

    this.closeButton.draw(ctx);

    // this.collider._draw(ctx, this.transform.x, this.transform.y);
  }

  drawTiles(ctx) {
    for (let y = 0; y < this.displayedTiles.length; y++) {
      for (let x = 0; x < this.displayedTiles[y].length; x++) {
        ctx.drawImage(
          getTileset(this.tilesetName),
          ...calculateTileCrop(this.tilesetName, this.displayedTiles[y][x]),
          TILE_SIZE_RAW, TILE_SIZE_RAW,
          (x * TILE_SIZE_RENDERED) + this.transform.x, (y * TILE_SIZE_RENDERED) + this.transform.y + this.scrollOffset.y,
          TILE_SIZE_RENDERED, TILE_SIZE_RENDERED
        );
      }
    }
  }

  drawSelectedTileIndicator(ctx) {
    ctx.fillStyle = 'white';

    ctx.beginPath();
    ctx.rect(
      (this.selectedTileIndicatorPos[0] + this.transform.x) * TILE_SIZE_RENDERED,
      this.selectedTileIndicatorPos[1] * TILE_SIZE_RENDERED,
      TILE_SIZE_RENDERED,
      TILE_SIZE_RENDERED,
    );
    ctx.stroke();
    ctx.closePath();
  }

  initializeDisplayedTiles() {
    this.tileCount = ((this.tileset.width / TILE_SIZE_RAW) * (this.tileset.height / TILE_SIZE_RAW));
    this.displayedTiles = this.buildDisplayedTiles();
  }

  buildDisplayedTiles() {
    const displayedTiles = [];
    let currentTileNumber = 0;

    for (let i = 0; i < this.tileCount / AMOUNT_OF_TILES_ON_EACH_ROW; i++) {
      displayedTiles[i] = [];

      for (let j = 0; j < AMOUNT_OF_TILES_ON_EACH_ROW; j++) {
        displayedTiles[i][j] = currentTileNumber;

        currentTileNumber++;
      }
    }

    return displayedTiles;
  }

  onClose() {
    this.destroy();
  }

  setScreenPosition() {
    this.transform.x = document.documentElement.clientWidth - this.dimensions.width;
    this.closeButton.transform.x = this.transform.x - 32;
  }

  setScrollOffset() {
    const maxScrollOffsetY = -(this.displayedTiles.length * TILE_SIZE_RENDERED - (document.documentElement.clientHeight * 0.5));
    const wheelDeltaY = -getWheelDelta().y;

    if (
      this.isMouseWithinWindowBounds() &&
      (
        wheelDeltaY < 0 && !(this.scrollOffset.y < maxScrollOffsetY) ||
        wheelDeltaY > 0 && !(this.scrollOffset.y > 0)
      )
    ) {
      this.scrollOffset.y += -getWheelDelta().y;
    }

    if (this.scrollOffset.y < maxScrollOffsetY) this.scrollOffset.y = maxScrollOffsetY;
    if (this.scrollOffset.y > 0) this.scrollOffset.y = 0;
  }

  setSelectedTile() {
    if (isMouseClicked() && this.isMouseWithinWindowBounds()) {
      const column = Math.floor((getMousePos().x - this.transform.x) / TILE_SIZE_RENDERED);
      const row = Math.abs(Math.floor((getMousePos().y - this.scrollOffset.y) / TILE_SIZE_RENDERED));
      const tileId = this.displayedTiles[row][column];

      this.selectedTileId = tileId;
      this.selectedTileIndicatorPos = [column, row];
    }
  }

  getClickedTilePosOnMap() {
    if (isMouseClicked() && !this.isMouseWithinWindowBounds()) {
      const column = Math.floor((getMousePos().x) / TILE_SIZE_RENDERED);
      const row = Math.floor(getMousePos().y / TILE_SIZE_RENDERED);

      this.clickedTilePos = [column, row];
    }
  }

  isMouseWithinWindowBounds() {
    const mapEditorPos = { ...this.transform, ...this.collider };

    return isWithinBoundsOf(mapEditorPos, getMouseBounds());
  }

  changeTileOnMap() {
    if (isMouseClicked() && !this.isMouseWithinWindowBounds() && !this.closeButton.isMouseWithinBoundsOfButton()) {
      const [column, row] = this.clickedTilePos;

      getCurrentScene().map.tiles[row][column] = this.selectedTileId;
    }
  }
}
