import { addResizeListener, removeResizeListener } from 'main/utils/resize-event';
import Bar from './bar.js';

module.exports = function ($) {
  if (!$) return;

  var verticalBar = new Bar($, { type: 'vertical' });
  var horizontalBar = new Bar($, { type: 'horizontal' });

  $.fn.scrollBar = function (options) {
    var me = this;
    var container = $(this);
    var content = container.children();
    var wrapper = $("<div class='fm-scrollbar__wrapper'></div>");
    container.addClass("fm-scrollbar");

    var wrapperHeight = options.height;
    var wrapperWidth = container.width();
    wrapper.css('height', wrapperHeight);

    if (content.length > 1) {
      content = content.wrap("<div>").parent();
    }
    content.addClass("fm-scroller__view");

    wrapper = content.wrap(wrapper).parent();
    container.append(verticalBar.bar);
    container.append(horizontalBar.bar);

    wrapper.on('scroll', onScrollHandler);

    addResizeListener(content[0], update);

    function onScrollHandler() {
      var wrap = wrapper.get(0);
      var moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
      var moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);

      verticalBar.move({ x: moveX, y: moveY });
      horizontalBar.move({ x: moveX, y: moveY });
    }

    function update() {
      let heightPercentage, widthPercentage;
      const wrap = wrapper.get(0);
      if (!wrap) return;

      heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
      widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);

      me.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
      me.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';

      verticalBar.updateSize({ height: me.sizeHeight })
      horizontalBar.updateSize({ width: me.sizeWidth });
    }
  }
}