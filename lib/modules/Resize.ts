import { BaseModule } from "./BaseModule";

export class Resize extends BaseModule {
  boxes: HTMLElement[] = [];
  dragBox: HTMLElement | null = null;
  dragStartX: number = 0;
  preDragWidth: number = 0;

  onCreate = () => {
    // track resize handles
    this.boxes = [];

    // add 4 resize handles
    this.addBox("nwse-resize"); // top left
    this.addBox("nesw-resize"); // top right
    this.addBox("nwse-resize"); // bottom right
    this.addBox("nesw-resize"); // bottom left

    this.positionBoxes();
  };

  onDestroy = () => {
    for (const box of this.boxes) {
      box.removeEventListener("mousedown", this.handleMousedown, false);
    }

    // reset drag handle cursors
    this.setCursor("");
  };

  positionBoxes = () => {
    const handleXOffset = `${-parseFloat(this.options.handleStyles.width) / 2}px`;
    const handleYOffset = `${-parseFloat(this.options.handleStyles.height) / 2}px`;

    // set the top and left for each drag handle
    [
      { left: handleXOffset, top: handleYOffset }, // top left
      { right: handleXOffset, top: handleYOffset }, // top right
      { right: handleXOffset, bottom: handleYOffset }, // bottom right
      { left: handleXOffset, bottom: handleYOffset }, // bottom left
    ].forEach((pos, idx) => {
      Object.assign(this.boxes[idx].style, pos);
    });
  };

  addBox = (cursor: string) => {
    // create div element for resize handle
    const box = document.createElement("div");
    box.classList.add(cursor);

    // Star with the specified styles
    Object.assign(box.style, this.options.handleStyles);
    box.style.cursor = cursor;

    // Set the width/height to use 'px'
    box.style.width = this.options.handleStyles.width;
    box.style.height = this.options.handleStyles.height;

    // listen for mousedown on each box
    box.addEventListener("mousedown", this.handleMousedown, false);
    box.addEventListener("touchstart", this.handleMousedown, {
      passive: false,
    });
    // add drag handle to document
    this.overlay?.appendChild(box);
    // keep track of drag handle
    this.boxes.push(box);
  };

  handleMousedown = (evt: MouseEvent | TouchEvent) => {
    if (evt.target instanceof HTMLElement) {
      // note which box
      this.dragBox = evt.target;
      // note starting mousedown position
      if (evt.type === "touchstart") {
        this.dragStartX = (evt as TouchEvent).changedTouches[0].clientX;
      } else {
        this.dragStartX = (evt as MouseEvent).clientX;
      }
      // store the width before the drag
      if (this.img) {
        this.preDragWidth = this.img.width || this.img.naturalWidth;
      }
      // set the proper cursor everywhere
      this.setCursor(this.dragBox.style.cursor);
      // listen for movement and mouseup
      document.addEventListener("mousemove", this.handleDrag);
      document.addEventListener("touchmove", this.handleDrag, {
        passive: false,
      });
      document.addEventListener("mouseup", this.handleMouseup, true);
      document.addEventListener("touchend", this.handleMouseup, true);
      document.addEventListener("touchcancel", this.handleMouseup, true);
    } else {
      console.warn("mousedown target is not an HTMLElement");
    }
  };

  handleMouseup = (evt: MouseEvent | TouchEvent) => {
    evt.stopPropagation();

    // reset cursor everywhere
    this.setCursor("");
    // stop listening for movement and mouseup
    document.removeEventListener("mousemove", this.handleDrag);
    document.removeEventListener("touchmove", this.handleDrag);
    document.removeEventListener("mouseup", this.handleMouseup, true);
    document.removeEventListener("touchend", this.handleMouseup, true);
    document.removeEventListener("touchcancel", this.handleMouseup, true);
  };

  handleDrag = (evt: MouseEvent | TouchEvent) => {
    if (!this.img) {
      // image not set yet
      return;
    }
    // update image size
    let clientX: number;
    if (evt.type === "touchmove") {
      clientX = (evt as TouchEvent).changedTouches[0].clientX;
    } else {
      clientX = (evt as MouseEvent).clientX;
    }

    const deltaX = clientX - this.dragStartX;
    if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {
      // left-side resize handler; dragging right shrinks image
      this.img.width = Math.max(
        Math.round(this.preDragWidth - deltaX),
        this.options.minWidth,
      );
    } else {
      // right-side resize handler; dragging right enlarges image
      this.img.width = Math.max(
        Math.round(this.preDragWidth + deltaX),
        this.options.minWidth,
      );
    }
    this.requestUpdate();
  };

  setCursor = (value: string) => {
    [document.body, this.img].forEach((el) => {
      if (el) {
        el.style.cursor = value; // eslint-disable-line no-param-reassign
      }
    });
  };
}
