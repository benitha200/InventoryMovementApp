import {
  PrimeReact,
  PrimeReactContext
} from "./chunk-EPKSJ35I.js";
import {
  DomHandler,
  ObjectUtils,
  _mergeProps,
  classNames
} from "./chunk-AJ4SD5EQ.js";
import {
  require_react
} from "./chunk-O6O4HUXW.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/primereact/hooks/hooks.esm.js
var React = __toESM(require_react());
var import_react = __toESM(require_react());
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t)
          return;
        f = false;
      } else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
var usePrevious = function usePrevious2(newValue) {
  var ref = React.useRef(void 0);
  React.useEffect(function() {
    ref.current = newValue;
  });
  return ref.current;
};
var useUnmountEffect = function useUnmountEffect2(fn) {
  return React.useEffect(function() {
    return fn;
  }, []);
};
var useEventListener = function useEventListener2(_ref) {
  var _ref$target = _ref.target, target = _ref$target === void 0 ? "document" : _ref$target, type = _ref.type, listener = _ref.listener, options = _ref.options, _ref$when = _ref.when, when = _ref$when === void 0 ? true : _ref$when;
  var targetRef = React.useRef(null);
  var listenerRef = React.useRef(null);
  var prevListener = usePrevious(listener);
  var prevOptions = usePrevious(options);
  var bind = function bind2() {
    var bindOptions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (ObjectUtils.isNotEmpty(bindOptions.target)) {
      unbind();
      (bindOptions.when || when) && (targetRef.current = DomHandler.getTargetElement(bindOptions.target));
    }
    if (!listenerRef.current && targetRef.current) {
      listenerRef.current = function(event) {
        return listener && listener(event);
      };
      targetRef.current.addEventListener(type, listenerRef.current, options);
    }
  };
  var unbind = function unbind2() {
    if (listenerRef.current) {
      targetRef.current.removeEventListener(type, listenerRef.current, options);
      listenerRef.current = null;
    }
  };
  React.useEffect(function() {
    if (when) {
      targetRef.current = DomHandler.getTargetElement(target);
    } else {
      unbind();
      targetRef.current = null;
    }
  }, [target, when]);
  React.useEffect(function() {
    if (listenerRef.current && ("" + prevListener !== "" + listener || prevOptions !== options)) {
      unbind();
      when && bind();
    }
  }, [listener, options, when]);
  useUnmountEffect(function() {
    unbind();
  });
  return [bind, unbind];
};
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var useMergeProps = function useMergeProps2() {
  var context = (0, import_react.useContext)(PrimeReactContext);
  return function() {
    var _context$ptOptions;
    var options = _objectSpread$2({}, (context === null || context === void 0 || (_context$ptOptions = context.ptOptions) === null || _context$ptOptions === void 0 ? void 0 : _context$ptOptions.classNameMergeFunction) && {
      classNameMergeFunction: context.classNameMergeFunction
    });
    for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }
    return _mergeProps(props, options);
  };
};
var useMountEffect = function useMountEffect2(fn) {
  var mounted = React.useRef(false);
  return React.useEffect(function() {
    if (!mounted.current) {
      mounted.current = true;
      return fn && fn();
    }
  }, []);
};
var useOverlayScrollListener = function useOverlayScrollListener2(_ref) {
  var target = _ref.target, listener = _ref.listener, options = _ref.options, _ref$when = _ref.when, when = _ref$when === void 0 ? true : _ref$when;
  var targetRef = React.useRef(null);
  var listenerRef = React.useRef(null);
  var scrollableParents = React.useRef([]);
  var prevOptions = usePrevious(options);
  var context = React.useContext(PrimeReactContext);
  var bind = function bind2() {
    var bindOptions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (ObjectUtils.isNotEmpty(bindOptions.target)) {
      unbind();
      (bindOptions.when || when) && (targetRef.current = DomHandler.getTargetElement(bindOptions.target));
    }
    if (!listenerRef.current && targetRef.current) {
      var hideOnScroll = context ? context.hideOverlaysOnDocumentScrolling : PrimeReact.hideOverlaysOnDocumentScrolling;
      var nodes = scrollableParents.current = DomHandler.getScrollableParents(targetRef.current, hideOnScroll);
      listenerRef.current = function(event) {
        return listener && listener(event);
      };
      nodes.forEach(function(node) {
        return node.addEventListener("scroll", listenerRef.current, options);
      });
    }
  };
  var unbind = function unbind2() {
    if (listenerRef.current) {
      var nodes = scrollableParents.current;
      nodes.forEach(function(node) {
        return node.removeEventListener("scroll", listenerRef.current, options);
      });
      listenerRef.current = null;
    }
  };
  React.useEffect(function() {
    if (when) {
      targetRef.current = DomHandler.getTargetElement(target);
    } else {
      unbind();
      targetRef.current = null;
    }
  }, [target, when]);
  React.useEffect(function() {
    if (listenerRef.current && (listenerRef.current !== listener || prevOptions !== options)) {
      unbind();
      when && bind();
    }
  }, [listener, options]);
  useUnmountEffect(function() {
    unbind();
  });
  return [bind, unbind];
};
var useResizeListener = function useResizeListener2(_ref) {
  var listener = _ref.listener, _ref$when = _ref.when, when = _ref$when === void 0 ? true : _ref$when;
  return useEventListener({
    target: "window",
    type: "resize",
    listener,
    when
  });
};
var useOverlayListener = function useOverlayListener2(_ref) {
  var target = _ref.target, overlay = _ref.overlay, _listener = _ref.listener, _ref$when = _ref.when, when = _ref$when === void 0 ? true : _ref$when;
  var targetRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var _useEventListener = useEventListener({
    target: "window",
    type: "click",
    listener: function listener(event) {
      _listener && _listener(event, {
        type: "outside",
        valid: event.which !== 3 && isOutsideClicked(event)
      });
    }
  }), _useEventListener2 = _slicedToArray(_useEventListener, 2), bindDocumentClickListener = _useEventListener2[0], unbindDocumentClickListener = _useEventListener2[1];
  var _useResizeListener = useResizeListener({
    target: "window",
    listener: function listener(event) {
      _listener && _listener(event, {
        type: "resize",
        valid: !DomHandler.isTouchDevice()
      });
    }
  }), _useResizeListener2 = _slicedToArray(_useResizeListener, 2), bindWindowResizeListener = _useResizeListener2[0], unbindWindowResizeListener = _useResizeListener2[1];
  var _useEventListener3 = useEventListener({
    target: "window",
    type: "orientationchange",
    listener: function listener(event) {
      _listener && _listener(event, {
        type: "orientationchange",
        valid: true
      });
    }
  }), _useEventListener4 = _slicedToArray(_useEventListener3, 2), bindWindowOrientationChangeListener = _useEventListener4[0], unbindWindowOrientationChangeListener = _useEventListener4[1];
  var _useOverlayScrollList = useOverlayScrollListener({
    target,
    listener: function listener(event) {
      _listener && _listener(event, {
        type: "scroll",
        valid: true
      });
    }
  }), _useOverlayScrollList2 = _slicedToArray(_useOverlayScrollList, 2), bindOverlayScrollListener = _useOverlayScrollList2[0], unbindOverlayScrollListener = _useOverlayScrollList2[1];
  var isOutsideClicked = function isOutsideClicked2(event) {
    return targetRef.current && !(targetRef.current.isSameNode(event.target) || targetRef.current.contains(event.target) || overlayRef.current && overlayRef.current.contains(event.target));
  };
  var bind = function bind2() {
    bindDocumentClickListener();
    bindWindowResizeListener();
    bindWindowOrientationChangeListener();
    bindOverlayScrollListener();
  };
  var unbind = function unbind2() {
    unbindDocumentClickListener();
    unbindWindowResizeListener();
    unbindWindowOrientationChangeListener();
    unbindOverlayScrollListener();
  };
  React.useEffect(function() {
    if (when) {
      targetRef.current = DomHandler.getTargetElement(target);
      overlayRef.current = DomHandler.getTargetElement(overlay);
    } else {
      unbind();
      targetRef.current = overlayRef.current = null;
    }
  }, [target, overlay, when]);
  React.useEffect(function() {
    unbind();
  }, [when]);
  useUnmountEffect(function() {
    unbind();
  });
  return [bind, unbind];
};
var _id = 0;
var useStyle = function useStyle2(css) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var _useState = (0, import_react.useState)(false), _useState2 = _slicedToArray(_useState, 2), isLoaded = _useState2[0], setIsLoaded = _useState2[1];
  var styleRef = (0, import_react.useRef)(null);
  var context = (0, import_react.useContext)(PrimeReactContext);
  var defaultDocument = DomHandler.isClient() ? window.document : void 0;
  var _options$document = options.document, document2 = _options$document === void 0 ? defaultDocument : _options$document, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media;
  var update = function update2(newCSS) {
    isLoaded && css !== newCSS && (styleRef.current.textContent = newCSS);
  };
  var load = function load2() {
    if (!document2 || isLoaded)
      return;
    var styleContainer = (context === null || context === void 0 ? void 0 : context.styleContainer) || document2.head;
    styleRef.current = styleContainer.querySelector('style[data-primereact-style-id="'.concat(name, '"]')) || document2.getElementById(id) || document2.createElement("style");
    if (!styleRef.current.isConnected) {
      styleRef.current.type = "text/css";
      id && (styleRef.current.id = id);
      media && (styleRef.current.media = media);
      DomHandler.addNonce(styleRef.current, context && context.nonce || PrimeReact.nonce);
      styleContainer.appendChild(styleRef.current);
      name && styleRef.current.setAttribute("data-primereact-style-id", name);
    }
    styleRef.current.textContent = css;
    setIsLoaded(true);
  };
  var unload = function unload2() {
    if (!document2 || !styleRef.current)
      return;
    DomHandler.removeInlineStyle(styleRef.current);
    setIsLoaded(false);
  };
  (0, import_react.useEffect)(function() {
    if (!manual)
      load();
  }, [manual]);
  return {
    id,
    name,
    update,
    unload,
    load,
    isLoaded
  };
};
var useUpdateEffect = function useUpdateEffect2(fn, deps) {
  var mounted = React.useRef(false);
  return React.useEffect(function() {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return fn && fn();
  }, deps);
};

// node_modules/primereact/componentbase/componentbase.esm.js
function _arrayLikeToArray2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray2(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray2(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray2(o, minLen);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread();
}
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
function _toPrimitive2(input, hint) {
  if (_typeof2(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof2(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey2(arg) {
  var key = _toPrimitive2(arg, "string");
  return _typeof2(key) === "symbol" ? key : String(key);
}
function _defineProperty2(obj, key, value) {
  key = _toPropertyKey2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var baseStyle = "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n}\n\n.p-hidden-accessible input,\n.p-hidden-accessible select {\n    transform: scale(0);\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: var(--scrollbar-width);\n}\n";
var buttonStyles = "\n.p-button {\n    margin: 0;\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n    align-items: center;\n    vertical-align: bottom;\n    text-align: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-button-label {\n    flex: 1 1 auto;\n}\n\n.p-button-icon-right {\n    order: 1;\n}\n\n.p-button:disabled {\n    cursor: default;\n}\n\n.p-button-icon-only {\n    justify-content: center;\n}\n\n.p-button-icon-only .p-button-label {\n    visibility: hidden;\n    width: 0;\n    flex: 0 0 auto;\n}\n\n.p-button-vertical {\n    flex-direction: column;\n}\n\n.p-button-icon-bottom {\n    order: 2;\n}\n\n.p-buttonset .p-button {\n    margin: 0;\n}\n\n.p-buttonset .p-button:not(:last-child) {\n    border-right: 0 none;\n}\n\n.p-buttonset .p-button:not(:first-of-type):not(:last-of-type) {\n    border-radius: 0;\n}\n\n.p-buttonset .p-button:first-of-type {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n\n.p-buttonset .p-button:last-of-type {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n\n.p-buttonset .p-button:focus {\n    position: relative;\n    z-index: 1;\n}\n";
var checkboxStyles = "\n.p-checkbox {\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n    vertical-align: bottom;\n    position: relative;\n}\n\n.p-checkbox.p-checkbox-disabled {\n    cursor: auto;\n}\n\n.p-checkbox-box {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n";
var inputTextStyles = "\n.p-inputtext {\n    margin: 0;\n}\n\n.p-fluid .p-inputtext {\n    width: 100%;\n}\n\n/* InputGroup */\n.p-inputgroup {\n    display: flex;\n    align-items: stretch;\n    width: 100%;\n}\n\n.p-inputgroup-addon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-inputgroup .p-float-label {\n    display: flex;\n    align-items: stretch;\n    width: 100%;\n}\n\n.p-inputgroup .p-inputtext,\n.p-fluid .p-inputgroup .p-inputtext,\n.p-inputgroup .p-inputwrapper,\n.p-fluid .p-inputgroup .p-input {\n    flex: 1 1 auto;\n    width: 1%;\n}\n\n/* Floating Label */\n.p-float-label {\n    display: block;\n    position: relative;\n}\n\n.p-float-label label {\n    position: absolute;\n    pointer-events: none;\n    top: 50%;\n    margin-top: -0.5rem;\n    transition-property: all;\n    transition-timing-function: ease;\n    line-height: 1;\n}\n\n.p-float-label textarea ~ label,\n.p-float-label .p-mention ~ label {\n    top: 1rem;\n}\n\n.p-float-label input:focus ~ label,\n.p-float-label input:-webkit-autofill ~ label,\n.p-float-label input.p-filled ~ label,\n.p-float-label textarea:focus ~ label,\n.p-float-label textarea.p-filled ~ label,\n.p-float-label .p-inputwrapper-focus ~ label,\n.p-float-label .p-inputwrapper-filled ~ label,\n.p-float-label .p-tooltip-target-wrapper ~ label {\n    top: -0.75rem;\n    font-size: 12px;\n}\n\n.p-float-label .p-placeholder,\n.p-float-label input::placeholder,\n.p-float-label .p-inputtext::placeholder {\n    opacity: 0;\n    transition-property: all;\n    transition-timing-function: ease;\n}\n\n.p-float-label .p-focus .p-placeholder,\n.p-float-label input:focus::placeholder,\n.p-float-label .p-inputtext:focus::placeholder {\n    opacity: 1;\n    transition-property: all;\n    transition-timing-function: ease;\n}\n\n.p-input-icon-left,\n.p-input-icon-right {\n    position: relative;\n    display: inline-block;\n}\n\n.p-input-icon-left > i,\n.p-input-icon-right > i,\n.p-input-icon-left > svg,\n.p-input-icon-right > svg,\n.p-input-icon-left > .p-input-prefix,\n.p-input-icon-right > .p-input-suffix {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n\n.p-fluid .p-input-icon-left,\n.p-fluid .p-input-icon-right {\n    display: block;\n    width: 100%;\n}\n";
var radioButtonStyles = "\n.p-radiobutton {\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n    vertical-align: bottom;\n}\n\n.p-radiobutton-box {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.p-radiobutton-icon {\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    transform: translateZ(0) scale(.1);\n    border-radius: 50%;\n    visibility: hidden;\n}\n\n.p-radiobutton-box.p-highlight .p-radiobutton-icon {\n    transform: translateZ(0) scale(1.0, 1.0);\n    visibility: visible;\n}\n\n";
var iconStyles = "\n.p-icon {\n    display: inline-block;\n}\n\n.p-icon-spin {\n    -webkit-animation: p-icon-spin 2s infinite linear;\n    animation: p-icon-spin 2s infinite linear;\n}\n\nsvg.p-icon {\n    pointer-events: auto;\n}\n\nsvg.p-icon g,\n.p-disabled svg.p-icon {\n    pointer-events: none;\n}\n\n@-webkit-keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n\n@keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n";
var commonStyle = "\n@layer primereact {\n    .p-component, .p-component * {\n        box-sizing: border-box;\n    }\n\n    .p-hidden {\n        display: none;\n    }\n\n    .p-hidden-space {\n        visibility: hidden;\n    }\n\n    .p-reset {\n        margin: 0;\n        padding: 0;\n        border: 0;\n        outline: 0;\n        text-decoration: none;\n        font-size: 100%;\n        list-style: none;\n    }\n\n    .p-disabled, .p-disabled * {\n        cursor: default;\n        pointer-events: none;\n        user-select: none;\n    }\n\n    .p-component-overlay {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-unselectable-text {\n        user-select: none;\n    }\n\n    .p-scrollbar-measure {\n        width: 100px;\n        height: 100px;\n        overflow: scroll;\n        position: absolute;\n        top: -9999px;\n    }\n\n    @-webkit-keyframes p-fadein {\n      0%   { opacity: 0; }\n      100% { opacity: 1; }\n    }\n    @keyframes p-fadein {\n      0%   { opacity: 0; }\n      100% { opacity: 1; }\n    }\n\n    .p-link {\n        text-align: left;\n        background-color: transparent;\n        margin: 0;\n        padding: 0;\n        border: none;\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .p-link:disabled {\n        cursor: default;\n    }\n\n    /* Non react overlay animations */\n    .p-connected-overlay {\n        opacity: 0;\n        transform: scaleY(0.8);\n        transition: transform .12s cubic-bezier(0, 0, 0.2, 1), opacity .12s cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-connected-overlay-visible {\n        opacity: 1;\n        transform: scaleY(1);\n    }\n\n    .p-connected-overlay-hidden {\n        opacity: 0;\n        transform: scaleY(1);\n        transition: opacity .1s linear;\n    }\n\n    /* React based overlay animations */\n    .p-connected-overlay-enter {\n        opacity: 0;\n        transform: scaleY(0.8);\n    }\n\n    .p-connected-overlay-enter-active {\n        opacity: 1;\n        transform: scaleY(1);\n        transition: transform .12s cubic-bezier(0, 0, 0.2, 1), opacity .12s cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-connected-overlay-enter-done {\n        transform: none;\n    }\n\n    .p-connected-overlay-exit {\n        opacity: 1;\n    }\n\n    .p-connected-overlay-exit-active {\n        opacity: 0;\n        transition: opacity .1s linear;\n    }\n\n    /* Toggleable Content */\n    .p-toggleable-content-enter {\n        max-height: 0;\n    }\n\n    .p-toggleable-content-enter-active {\n        overflow: hidden;\n        max-height: 1000px;\n        transition: max-height 1s ease-in-out;\n    }\n\n    .p-toggleable-content-enter-done {\n        transform: none;\n    }\n\n    .p-toggleable-content-exit {\n        max-height: 1000px;\n    }\n\n    .p-toggleable-content-exit-active {\n        overflow: hidden;\n        max-height: 0;\n        transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);\n    }\n\n    .p-sr-only {\n        border: 0;\n        clip: rect(1px, 1px, 1px, 1px);\n        clip-path: inset(50%);\n        height: 1px;\n        margin: -1px;\n        overflow: hidden;\n        padding: 0;\n        position: absolute;\n        width: 1px;\n        word-wrap: normal;\n    }\n\n    /* @todo Refactor */\n    .p-menu .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n\n    ".concat(buttonStyles, "\n    ").concat(checkboxStyles, "\n    ").concat(inputTextStyles, "\n    ").concat(radioButtonStyles, "\n    ").concat(iconStyles, "\n}\n");
var ComponentBase = {
  cProps: void 0,
  cParams: void 0,
  cName: void 0,
  defaultProps: {
    pt: void 0,
    ptOptions: void 0,
    unstyled: false
  },
  context: {},
  globalCSS: void 0,
  classes: {},
  styles: "",
  extend: function extend() {
    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var css = props.css;
    var defaultProps = _objectSpread(_objectSpread({}, props.defaultProps), ComponentBase.defaultProps);
    var inlineStyles = {};
    var getProps = function getProps2(props2) {
      var context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      ComponentBase.context = context;
      ComponentBase.cProps = props2;
      return ObjectUtils.getMergedProps(props2, defaultProps);
    };
    var getOtherProps = function getOtherProps2(props2) {
      return ObjectUtils.getDiffProps(props2, defaultProps);
    };
    var getPTValue = function getPTValue2() {
      var _ComponentBase$contex;
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var searchInDefaultPT = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      if (obj.hasOwnProperty("pt") && obj.pt !== void 0) {
        obj = obj.pt;
      }
      var originalkey = key;
      var isNestedParam = /./g.test(originalkey) && !!params[originalkey.split(".")[0]];
      var fkey = isNestedParam ? ObjectUtils.toFlatCase(originalkey.split(".")[1]) : ObjectUtils.toFlatCase(originalkey);
      var hostName = params.hostName && ObjectUtils.toFlatCase(params.hostName);
      var componentName = hostName || params.props && params.props.__TYPE && ObjectUtils.toFlatCase(params.props.__TYPE) || "";
      var isTransition = fkey === "transition";
      var datasetPrefix = "data-pc-";
      var getHostInstance = function getHostInstance2(params2) {
        return params2 !== null && params2 !== void 0 && params2.props ? params2.hostName ? params2.props.__TYPE === params2.hostName ? params2.props : getHostInstance2(params2.parent) : params2.parent : void 0;
      };
      var getPropValue = function getPropValue2(name) {
        var _params$props, _getHostInstance;
        return ((_params$props = params.props) === null || _params$props === void 0 ? void 0 : _params$props[name]) || ((_getHostInstance = getHostInstance(params)) === null || _getHostInstance === void 0 ? void 0 : _getHostInstance[name]);
      };
      ComponentBase.cParams = params;
      ComponentBase.cName = componentName;
      var _ref = getPropValue("ptOptions") || ComponentBase.context.ptOptions || {}, _ref$mergeSections = _ref.mergeSections, mergeSections = _ref$mergeSections === void 0 ? true : _ref$mergeSections, _ref$mergeProps = _ref.mergeProps, useMergeProps3 = _ref$mergeProps === void 0 ? false : _ref$mergeProps;
      var getPTClassValue = function getPTClassValue2() {
        var value = getOptionValue.apply(void 0, arguments);
        if (Array.isArray(value))
          return {
            className: classNames.apply(void 0, _toConsumableArray(value))
          };
        if (ObjectUtils.isString(value))
          return {
            className: value
          };
        if (value !== null && value !== void 0 && value.hasOwnProperty("className") && Array.isArray(value.className)) {
          return {
            className: classNames.apply(void 0, _toConsumableArray(value.className))
          };
        }
        return value;
      };
      var globalPT = searchInDefaultPT ? isNestedParam ? _useGlobalPT(getPTClassValue, originalkey, params) : _useDefaultPT(getPTClassValue, originalkey, params) : void 0;
      var self = isNestedParam ? void 0 : _usePT(_getPT(obj, componentName), getPTClassValue, originalkey, params);
      var datasetProps = !isTransition && _objectSpread(_objectSpread({}, fkey === "root" && _defineProperty2({}, "".concat(datasetPrefix, "name"), params.props && params.props.__parentMetadata ? ObjectUtils.toFlatCase(params.props.__TYPE) : componentName)), {}, _defineProperty2({}, "".concat(datasetPrefix, "section"), fkey));
      return mergeSections || !mergeSections && self ? useMergeProps3 ? _mergeProps([globalPT, self, Object.keys(datasetProps).length ? datasetProps : {}], {
        classNameMergeFunction: (_ComponentBase$contex = ComponentBase.context.ptOptions) === null || _ComponentBase$contex === void 0 ? void 0 : _ComponentBase$contex.classNameMergeFunction
      }) : _objectSpread(_objectSpread(_objectSpread({}, globalPT), self), Object.keys(datasetProps).length ? datasetProps : {}) : _objectSpread(_objectSpread({}, self), Object.keys(datasetProps).length ? datasetProps : {});
    };
    var setMetaData = function setMetaData2() {
      var metadata = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var props2 = metadata.props, state = metadata.state;
      var ptm = function ptm2() {
        var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return getPTValue((props2 || {}).pt, key, _objectSpread(_objectSpread({}, metadata), params));
      };
      var ptmo = function ptmo2() {
        var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return getPTValue(obj, key, params, false);
      };
      var isUnstyled = function isUnstyled2() {
        return ComponentBase.context.unstyled || PrimeReact.unstyled || props2.unstyled;
      };
      var cx = function cx2() {
        var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return !isUnstyled() ? getOptionValue(css && css.classes, key, _objectSpread({
          props: props2,
          state
        }, params)) : void 0;
      };
      var sx = function sx2() {
        var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var when = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
        if (when) {
          var _ComponentBase$contex2;
          var self = getOptionValue(css && css.inlineStyles, key, _objectSpread({
            props: props2,
            state
          }, params));
          var base = getOptionValue(inlineStyles, key, _objectSpread({
            props: props2,
            state
          }, params));
          return _mergeProps([base, self], {
            classNameMergeFunction: (_ComponentBase$contex2 = ComponentBase.context.ptOptions) === null || _ComponentBase$contex2 === void 0 ? void 0 : _ComponentBase$contex2.classNameMergeFunction
          });
        }
        return void 0;
      };
      return {
        ptm,
        ptmo,
        sx,
        cx,
        isUnstyled
      };
    };
    return _objectSpread(_objectSpread({
      getProps,
      getOtherProps,
      setMetaData
    }, props), {}, {
      defaultProps
    });
  }
};
var getOptionValue = function getOptionValue2(obj) {
  var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var fKeys = String(ObjectUtils.toFlatCase(key)).split(".");
  var fKey = fKeys.shift();
  var matchedPTOption = ObjectUtils.isNotEmpty(obj) ? Object.keys(obj).find(function(k) {
    return ObjectUtils.toFlatCase(k) === fKey;
  }) : "";
  return fKey ? ObjectUtils.isObject(obj) ? getOptionValue2(ObjectUtils.getItemValue(obj[matchedPTOption], params), fKeys.join("."), params) : void 0 : ObjectUtils.getItemValue(obj, params);
};
var _getPT = function _getPT2(pt) {
  var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var callback = arguments.length > 2 ? arguments[2] : void 0;
  var _usept = pt === null || pt === void 0 ? void 0 : pt["_usept"];
  var getValue = function getValue2(value) {
    var _ref3;
    var checkSameKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var _value = callback ? callback(value) : value;
    var _key = ObjectUtils.toFlatCase(key);
    return (_ref3 = checkSameKey ? _key !== ComponentBase.cName ? _value === null || _value === void 0 ? void 0 : _value[_key] : void 0 : _value === null || _value === void 0 ? void 0 : _value[_key]) !== null && _ref3 !== void 0 ? _ref3 : _value;
  };
  return ObjectUtils.isNotEmpty(_usept) ? {
    _usept,
    originalValue: getValue(pt.originalValue),
    value: getValue(pt.value)
  } : getValue(pt, true);
};
var _usePT = function _usePT2(pt, callback, key, params) {
  var fn = function fn2(value2) {
    return callback(value2, key, params);
  };
  if (pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept")) {
    var _ref4 = pt["_usept"] || ComponentBase.context.ptOptions || {}, _ref4$mergeSections = _ref4.mergeSections, mergeSections = _ref4$mergeSections === void 0 ? true : _ref4$mergeSections, _ref4$mergeProps = _ref4.mergeProps, useMergeProps3 = _ref4$mergeProps === void 0 ? false : _ref4$mergeProps, classNameMergeFunction = _ref4.classNameMergeFunction;
    var originalValue = fn(pt.originalValue);
    var value = fn(pt.value);
    if (originalValue === void 0 && value === void 0)
      return void 0;
    else if (ObjectUtils.isString(value))
      return value;
    else if (ObjectUtils.isString(originalValue))
      return originalValue;
    return mergeSections || !mergeSections && value ? useMergeProps3 ? _mergeProps([originalValue, value], {
      classNameMergeFunction
    }) : _objectSpread(_objectSpread({}, originalValue), value) : value;
  }
  return fn(pt);
};
var getGlobalPT = function getGlobalPT2() {
  return _getPT(ComponentBase.context.pt || PrimeReact.pt, void 0, function(value) {
    return ObjectUtils.getItemValue(value, ComponentBase.cParams);
  });
};
var getDefaultPT = function getDefaultPT2() {
  return _getPT(ComponentBase.context.pt || PrimeReact.pt, void 0, function(value) {
    return getOptionValue(value, ComponentBase.cName, ComponentBase.cParams) || ObjectUtils.getItemValue(value, ComponentBase.cParams);
  });
};
var _useGlobalPT = function _useGlobalPT2(callback, key, params) {
  return _usePT(getGlobalPT(), callback, key, params);
};
var _useDefaultPT = function _useDefaultPT2(callback, key, params) {
  return _usePT(getDefaultPT(), callback, key, params);
};
var useHandleStyle = function useHandleStyle2(styles) {
  var config = arguments.length > 2 ? arguments[2] : void 0;
  var name = config.name, _config$styled = config.styled, styled = _config$styled === void 0 ? false : _config$styled, _config$hostName = config.hostName, hostName = _config$hostName === void 0 ? "" : _config$hostName;
  var globalCSS = _useGlobalPT(getOptionValue, "global.css", ComponentBase.cParams);
  var componentName = ObjectUtils.toFlatCase(name);
  var _useStyle = useStyle(baseStyle, {
    name: "base",
    manual: true
  }), loadBaseStyle = _useStyle.load;
  var _useStyle2 = useStyle(commonStyle, {
    name: "common",
    manual: true
  }), loadCommonStyle = _useStyle2.load;
  var _useStyle3 = useStyle(globalCSS, {
    name: "global",
    manual: true
  }), loadGlobalStyle = _useStyle3.load;
  var _useStyle4 = useStyle(styles, {
    name,
    manual: true
  }), load = _useStyle4.load;
  var hook = function hook2(hookName) {
    if (!hostName) {
      var selfHook = _usePT(_getPT((ComponentBase.cProps || {}).pt, componentName), getOptionValue, "hooks.".concat(hookName));
      var defaultHook = _useDefaultPT(getOptionValue, "hooks.".concat(hookName));
      selfHook === null || selfHook === void 0 || selfHook();
      defaultHook === null || defaultHook === void 0 || defaultHook();
    }
  };
  hook("useMountEffect");
  useMountEffect(function() {
    loadBaseStyle();
    loadGlobalStyle();
    loadCommonStyle();
    if (!styled)
      load();
  });
  useUpdateEffect(function() {
    hook("useUpdateEffect");
  });
  useUnmountEffect(function() {
    hook("useUnmountEffect");
  });
};

export {
  usePrevious,
  useUnmountEffect,
  useEventListener,
  useMergeProps,
  useMountEffect,
  useOverlayScrollListener,
  useResizeListener,
  useOverlayListener,
  useStyle,
  useUpdateEffect,
  ComponentBase,
  useHandleStyle
};
//# sourceMappingURL=chunk-OED4RFH2.js.map
