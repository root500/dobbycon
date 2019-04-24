export default function(ctx) {
  // custom clip code
  if (this.clipPath) {
    ctx.save();
    if (this.clipPath.fixed) {
      var retina = this.canvas.getRetinaScaling();
      ctx.setTransform(retina, 0, 0, retina, 0, 0);
      // to handle zoom
      ctx.transform.apply(ctx, this.canvas.viewportTransform);
      //
      this.clipPath.transform(ctx);
    }
    this.clipPath._render(ctx);
    ctx.restore();
    ctx.clip();
  }

  // end custom clip code

  var x = -this.width / 2, y = -this.height / 2, elementToDraw;

  if (this.isMoving === false && this.resizeFilter && this._needsResize()) {
    this._lastScaleX = this.scaleX;
    this._lastScaleY = this.scaleY;
    this.applyResizeFilters();
  }
  elementToDraw = this._element;
  elementToDraw && ctx.drawImage(elementToDraw,
    0, 0, this.width, this.height,
    x, y, this.width, this.height);
  this._stroke(ctx);
  this._renderStroke(ctx);

};
