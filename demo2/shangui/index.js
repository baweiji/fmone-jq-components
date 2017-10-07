var ShangUI =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _scrollBar = __webpack_require__(1);

var _scrollBar2 = _interopRequireDefault(_scrollBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function install($) {
  (0, _scrollBar2.default)($);
};

module.exports = {
  version: '1.0',
  install: install
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _resizeEvent = __webpack_require__(2);

var _bar = __webpack_require__(3);

var _bar2 = _interopRequireDefault(_bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function ($) {
  if (!$) return;

  var verticalBar = new _bar2.default($, { type: 'vertical' });
  var horizontalBar = new _bar2.default($, { type: 'horizontal' });

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

    (0, _resizeEvent.addResizeListener)(content[0], update);

    function onScrollHandler() {
      var wrap = wrapper.get(0);
      var moveY = wrap.scrollTop * 100 / wrap.clientHeight;
      var moveX = wrap.scrollLeft * 100 / wrap.clientWidth;

      verticalBar.move({ x: moveX, y: moveY });
      horizontalBar.move({ x: moveX, y: moveY });
    }

    function update() {
      var heightPercentage = void 0,
          widthPercentage = void 0;
      var wrap = wrapper.get(0);
      if (!wrap) return;

      heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
      widthPercentage = wrap.clientWidth * 100 / wrap.scrollWidth;

      me.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : '';
      me.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : '';

      verticalBar.updateSize({ height: me.sizeHeight });
      horizontalBar.updateSize({ width: me.sizeWidth });
    }
  };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* Modified from https://github.com/sdecima/javascript-detect-element-resize
 * version: 0.5.3
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Sebastián Décima
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
var isServer = typeof window === 'undefined';

/* istanbul ignore next */
var requestFrame = function () {
  if (isServer) return;
  var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
    return window.setTimeout(fn, 20);
  };
  return function (fn) {
    return raf(fn);
  };
}();

/* istanbul ignore next */
var cancelFrame = function () {
  if (isServer) return;
  var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
  return function (id) {
    return cancel(id);
  };
}();

/* istanbul ignore next */
var resetTrigger = function resetTrigger(element) {
  var trigger = element.__resizeTrigger__;
  var expand = trigger.firstElementChild;
  var contract = trigger.lastElementChild;
  var expandChild = expand.firstElementChild;

  contract.scrollLeft = contract.scrollWidth;
  contract.scrollTop = contract.scrollHeight;
  expandChild.style.width = expand.offsetWidth + 1 + 'px';
  expandChild.style.height = expand.offsetHeight + 1 + 'px';
  expand.scrollLeft = expand.scrollWidth;
  expand.scrollTop = expand.scrollHeight;
};

/* istanbul ignore next */
var checkTriggers = function checkTriggers(element) {
  return element.offsetWidth !== element.__resizeLast__.width || element.offsetHeight !== element.__resizeLast__.height;
};

/* istanbul ignore next */
var scrollListener = function scrollListener(event) {
  var _this = this;

  resetTrigger(this);
  if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
  this.__resizeRAF__ = requestFrame(function () {
    if (checkTriggers(_this)) {
      _this.__resizeLast__.width = _this.offsetWidth;
      _this.__resizeLast__.height = _this.offsetHeight;
      _this.__resizeListeners__.forEach(function (fn) {
        fn.call(_this, event);
      });
    }
  });
};

/* Detect CSS Animations support to detect element display/re-attach */
var attachEvent = isServer ? {} : document.attachEvent;
var DOM_PREFIXES = 'Webkit Moz O ms'.split(' ');
var START_EVENTS = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' ');
var RESIZE_ANIMATION_NAME = 'resizeanim';
var animation = false;
var keyFramePrefix = '';
var animationStartEvent = 'animationstart';

/* istanbul ignore next */
if (!attachEvent && !isServer) {
  var testElement = document.createElement('fakeelement');
  if (testElement.style.animationName !== undefined) {
    animation = true;
  }

  if (animation === false) {
    var prefix = '';
    for (var i = 0; i < DOM_PREFIXES.length; i++) {
      if (testElement.style[DOM_PREFIXES[i] + 'AnimationName'] !== undefined) {
        prefix = DOM_PREFIXES[i];
        keyFramePrefix = '-' + prefix.toLowerCase() + '-';
        animationStartEvent = START_EVENTS[i];
        animation = true;
        break;
      }
    }
  }
}

var stylesCreated = false;
/* istanbul ignore next */
var createStyles = function createStyles() {
  if (!stylesCreated && !isServer) {
    var animationKeyframes = '@' + keyFramePrefix + 'keyframes ' + RESIZE_ANIMATION_NAME + ' { from { opacity: 0; } to { opacity: 0; } } ';
    var animationStyle = keyFramePrefix + 'animation: 1ms ' + RESIZE_ANIMATION_NAME + ';';

    // opacity: 0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    var css = animationKeyframes + '\n      .resize-triggers { ' + animationStyle + ' visibility: hidden; opacity: 0; }\n      .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1 }\n      .resize-triggers > div { background: #eee; overflow: auto; }\n      .contract-trigger:before { width: 200%; height: 200%; }';

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    stylesCreated = true;
  }
};

/* istanbul ignore next */
var addResizeListener = exports.addResizeListener = function addResizeListener(element, fn) {
  if (isServer) return;
  if (attachEvent) {
    element.attachEvent('onresize', fn);
  } else {
    if (!element.__resizeTrigger__) {
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
      }
      createStyles();
      element.__resizeLast__ = {};
      element.__resizeListeners__ = [];

      var resizeTrigger = element.__resizeTrigger__ = document.createElement('div');
      resizeTrigger.className = 'resize-triggers';
      resizeTrigger.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>';
      element.appendChild(resizeTrigger);

      resetTrigger(element);
      element.addEventListener('scroll', scrollListener, true);

      /* Listen for a css animation to detect element display/re-attach */
      if (animationStartEvent) {
        resizeTrigger.addEventListener(animationStartEvent, function (event) {
          if (event.animationName === RESIZE_ANIMATION_NAME) {
            resetTrigger(element);
          }
        });
      }
    }
    element.__resizeListeners__.push(fn);
  }
};

/* istanbul ignore next */
var removeResizeListener = exports.removeResizeListener = function removeResizeListener(element, fn) {
  if (attachEvent) {
    element.detachEvent('onresize', fn);
  } else {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener);
      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
    }
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
};

Bar.prototype.move = function (position) {
  if (this.type == 'vertical') {
    this.thumb.css("transform", "translateY(" + position.y + "%)");
  } else {
    this.thumb.css("transform", "translateX(" + position.x + "%)");
  }
};

Bar.prototype.updateSize = function (size) {
  if (this.type == 'vertical') {
    this.thumb.css("height", size.height);
  } else {
    this.thumb.css("width", size.width);
  }
};

exports.default = Bar;

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

/***/ })
/******/ ]);