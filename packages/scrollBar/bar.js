function Bar($, options) {
  this.bar = $("<div class='fm-scrollbar__bar'></div>");
  this.thumb = $("<div class='fm-scrollbar__thumb'></div>");

  this.init(options);
}

Bar.prototype.init = function (options) {
  if (!options.type) {
    options.type = 'vertical';
  }
  this.type = options.type;

  this.bar.addClass("is-" + options.type);
  this.bar.append(this.thumb);
}

Bar.prototype.move = function(position) {
  if (this.type == 'vertical') {
    this.thumb.css("transform", "translateY(" + position.y + "%)");
  } else {
    this.thumb.css("transform", "translateX(" + position.x + "%)");
  }
}

Bar.prototype.updateSize = function(size){
  if (this.type == 'vertical') {
    this.thumb.css("height", size.height);
  } else {
    this.thumb.css("width", size.width);
  }
}

export default Bar;

// export default ($, options) => {


//   // function clickTrackHandler() {

//   // }

//   // this.clickThumbHandler = () => {

//   // }

//   // this.startDrag = (e) => {
//   //   e.stopImmediatePropagation();
//   //   me.cursorDown = true;

//   //   $(document).on('mousemove', mouseMoveDocumentHandler);
//   //   $(document).on('mouseup', mouseUpDocumentHandler);
//   //   document.onselectstart = () => false;
//   // }


//   // this.mouseMoveDocumentHandler = (e) => {
//   //   if (this.cursorDown === false) return;
//   //   const prevPage = this[this.bar.axis];

//   //   if (!prevPage) return;

//   //   const offset = ((this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1);
//   //   const thumbClickPosition = (this.$refs.thumb[this.bar.offset] - prevPage);
//   //   const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$el[this.bar.offset]);

//   //   this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
//   // }

//   // this.mouseUpDocumentHandler = (e) => {
//   //   this.cursorDown = false;
//   //   this[this.bar.axis] = 0;
//   //   off(document, 'mousemove', this.mouseMoveDocumentHandler);
//   //   document.onselectstart = null;
//   // }

//   this.move = (position) => {


//   }


//   return {
//     dom: bar,
//     move: this.move
//   }
// }