"use client";
import {
  CheckIcon
} from "./chunk-B5P5U62F.js";
import {
  TimesIcon
} from "./chunk-UZT2JHVQ.js";
import "./chunk-7WHDMDI7.js";
import {
  Tooltip
} from "./chunk-7I3J4LLH.js";
import {
  ComponentBase,
  useHandleStyle,
  useMergeProps,
  useMountEffect
} from "./chunk-OED4RFH2.js";
import {
  PrimeReactContext,
  ariaLabel
} from "./chunk-EPKSJ35I.js";
import "./chunk-4ASWBRZ3.js";
import {
  DomHandler,
  IconUtils,
  ObjectUtils,
  classNames
} from "./chunk-AJ4SD5EQ.js";
import {
  require_react
} from "./chunk-O6O4HUXW.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/primereact/tristatecheckbox/tristatecheckbox.esm.js
var React = __toESM(require_react());
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
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
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return classNames("p-tristatecheckbox p-checkbox p-component", {
      "p-checkbox-disabled": props.disabled
    });
  },
  checkIcon: "p-checkbox-icon p-c",
  checkbox: function checkbox(_ref2) {
    var props = _ref2.props, focusedState = _ref2.focusedState;
    return classNames("p-checkbox-box", {
      "p-highlight": ObjectUtils.isNotEmpty(props.value),
      "p-disabled": props.disabled,
      "p-focus": focusedState
    });
  }
};
var TriStateCheckboxBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: "TriStateCheckbox",
    autoFocus: false,
    checkIcon: null,
    className: null,
    disabled: false,
    id: null,
    onChange: null,
    readOnly: false,
    style: null,
    tabIndex: "0",
    tooltip: null,
    tooltipOptions: null,
    uncheckIcon: null,
    value: null,
    children: void 0
  },
  css: {
    classes
  }
});
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
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var TriStateCheckbox = React.memo(React.forwardRef(function(inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = TriStateCheckboxBase.getProps(inProps, context);
  var _React$useState = React.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), focusedState = _React$useState2[0], setFocusedState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var _TriStateCheckboxBase = TriStateCheckboxBase.setMetaData({
    props,
    state: {
      focused: focusedState
    }
  }), ptm = _TriStateCheckboxBase.ptm, cx = _TriStateCheckboxBase.cx, isUnstyled = _TriStateCheckboxBase.isUnstyled;
  useHandleStyle(TriStateCheckboxBase.css.styles, isUnstyled, {
    name: "tristatecheckbox"
  });
  var onClick = function onClick2(event) {
    if (!props.disabled && !props.readOnly) {
      toggle(event);
    }
  };
  var toggle = function toggle2(event) {
    var newValue;
    if (props.value === null || props.value === void 0)
      newValue = true;
    else if (props.value === true)
      newValue = false;
    else if (props.value === false)
      newValue = null;
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: newValue,
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: newValue
        }
      });
    }
  };
  var onFocus = function onFocus2() {
    setFocusedState(true);
  };
  var onBlur = function onBlur2() {
    setFocusedState(false);
  };
  var onKeyDown = function onKeyDown2(e) {
    if (e.code === "Enter" || e.code === "Space") {
      toggle(e);
      e.preventDefault();
    }
  };
  React.useImperativeHandle(ref, function() {
    return {
      props,
      focus: function focus() {
        return DomHandler.focusFirstElement(elementRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  useMountEffect(function() {
    if (props.autoFocus) {
      DomHandler.focusFirstElement(elementRef.current);
    }
  });
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = TriStateCheckboxBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var checkIconProps = mergeProps({
    className: cx("checkIcon")
  }, ptm("checkIcon"));
  var uncheckIconProps = mergeProps({
    className: cx("checkIcon")
  }, ptm("uncheckIcon"));
  var icon;
  if (props.value === false) {
    icon = props.uncheckIcon || React.createElement(TimesIcon, uncheckIconProps);
  } else if (props.value === true) {
    icon = props.checkIcon || React.createElement(CheckIcon, checkIconProps);
  }
  var checkIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, checkIconProps), {
    props
  });
  var ariaValueLabel = props.value ? ariaLabel("trueLabel") : props.value === false ? ariaLabel("falseLabel") : ariaLabel("nullLabel");
  var ariaChecked = props.value ? "true" : "false";
  var checkboxProps = mergeProps(_objectSpread({
    className: cx("checkbox", {
      focusedState
    }),
    tabIndex: props.disabled ? "-1" : props.tabIndex,
    onFocus,
    onBlur,
    onKeyDown,
    role: "checkbox",
    "aria-checked": ariaChecked
  }, ariaProps), ptm("checkbox"));
  var srOnlyAriaProps = mergeProps({
    className: "p-sr-only p-hidden-accessible",
    "aria-live": "polite"
  }, ptm("srOnlyAria"));
  var rootProps = mergeProps({
    className: classNames(props.className, cx("root")),
    style: props.style,
    onClick,
    "data-p-disabled": props.disabled
  }, TriStateCheckboxBase.getOtherProps(props), ptm("root"));
  return React.createElement(React.Fragment, null, React.createElement("div", _extends({
    id: props.id,
    ref: elementRef
  }, rootProps), React.createElement("div", checkboxProps, checkIcon), focusedState && React.createElement("span", srOnlyAriaProps, ariaValueLabel)), hasTooltip && React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm("tooltip")
  }, props.tooltipOptions)));
}));
TriStateCheckbox.displayName = "TriStateCheckbox";
export {
  TriStateCheckbox
};
//# sourceMappingURL=primereact_tristatecheckbox.js.map
