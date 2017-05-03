"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
			}var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
				var n = t[o][1][e];return s(n ? n : e);
			}, l, l.exports, e, t, n, r);
		}return n[o].exports;
	}var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
		s(r[o]);
	}return s;
})({ 1: [function (require, module, exports) {
		(function () {
			"use strict";

			var math = require("mathjs/dist/math.min.js");
			var CURRENTCELL = void 0,
			    DECLARATIONS = void 0;

			function intersection() {
				var args = [].slice.call(arguments).sort(function (a, b) {
					return a.length - b.length;
				}),
				    intersection = new Set(args[0]);
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = intersection[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var elem = _step.value;

						for (var i = 1; i < args.length; i++) {
							if (!args[i].includes(elem)) {
								intersection.delete(elem);
								break;
							}
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				return [].concat(_toConsumableArray(intersection));
			}

			function traverse(matrix, callback) {
				for (var i = 0; i < matrix.length; i++) {
					var item = matrix[i];
					if (Array.isArray(item)) traverse(item, callback);else callback(item, i, matrix);
				}
			}

			function replaceForA() {
				return {
					boolean: {
						true: 1,
						false: 0
					},
					string: 0,
					undefined: 0,
					null: 0,
					Array: 0
				};
			}

			function coerce(value, options) {
				if (options) {
					var type = math.typeof(value);
					if (options.replace) {
						if (options.replace[type] && _typeof(options.replace[type]) === "object" && typeof options.replace[type][value] !== "undefined") return options.replace[type][value];
						if (typeof options.replace[type] !== "undefined") return options.replace[type];
					}
					if (typeof options.NA !== "undefined" && type === "undefined") return options.NA;
					if (typeof options.NaN !== "undefined" && type !== "number") return options.NaN;
				}
				return value;
			}

			function match(pattern, coordinate2) {
				var c1 = pattern.split("."),
				    c2 = coordinate2.split(".");
				return c1.length === c2.length && c1.every(function (key, i) {
					var parts = key.split(":");
					if (parts.length === 1) return parts[0] === "*" || parts[0] === c2[i];
					if (parts[0] === "*") return parts[1] === "*" || c2[i] <= parts[1];
					if (c2[i] >= parts[0]) return parts[1] === "*" || c2[i] <= parts[1];
					return false;
				});
			}

			var VARGS = [];
			function getargs(args) {
				var last = args[args.length - 1],
				    options = last && (typeof last === "undefined" ? "undefined" : _typeof(last)) === "object" && !Array.isArray(last) ? last : null;
				var values = [];
				!options || (args = args.slice(0, args.length - 1));
				var result = [];
				for (var i = 0; i < args.length; i++) {
					if (args[i] === VARGS) {
						var varg = VARGS.shift();
						if (Array.isArray(varg)) {
							var _iteratorNormalCompletion2 = true;
							var _didIteratorError2 = false;
							var _iteratorError2 = undefined;

							try {
								for (var _iterator2 = varg[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
									var arg = _step2.value;
									result.push(arg);
								}
							} catch (err) {
								_didIteratorError2 = true;
								_iteratorError2 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion2 && _iterator2.return) {
										_iterator2.return();
									}
								} finally {
									if (_didIteratorError2) {
										throw _iteratorError2;
									}
								}
							}
						} else {
							results.push(varg);
						}
					} else result.push(args[i]);
				}
				VARGS.splice(0, VARGS.length); // do we need this?
				return [result, options];
			}

			var FUNCTIONS = {};
			var declarations = function declarations() {
				var keys = Object.keys(FUNCTIONS);
				var str = "const ";
				keys.forEach(function (key, i) {
					str += key + "=functions['" + key + "']";
					if (i < keys.length - 1) str += ",";
				});
				str += ";";
				return str;
			};

			FUNCTIONS.$ = function (coordinates, options) {
				var values = [],
				    cells = FUNCTIONS.cells(coordinates);
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = cells[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var cell = _step3.value;
						options && options.if ? !options.if(cell.value) || values.push(cell.value) : values.push(cell.value);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}

				return values;
			};
			FUNCTIONS.varg = function (arg) {
				VARGS.push(arg);
				return VARGS;
			};
			FUNCTIONS.values = FUNCTIONS.$a = function (coordinates, options) {
				var values = [],
				    cells = FUNCTIONS.cells(coordinates);
				options = Object.assign({ replace: replaceForA() }, options || {});
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = cells[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var cell = _step4.value;
						options && options.if ? !options.if(cell.value) || values.push(coerce(cell.value, options)) : values.push(coerce(cell.value, options));
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}

				return values;
			};
			FUNCTIONS.cells = function (pattern) {
				if (CURRENTCELL) {
					var observers = Cell.observers[pattern];
					if (!observers) {
						observers = {};
						Cell.observers[pattern] = observers;
						//Cell.index(pattern,Cell.observerIndex); // enable once indexing and find enhanced to support ranges
					}
					observers[CURRENTCELL.coordinates] = true;
				}
				return Cell.find(pattern, Cell.cellIndex);
			};
			FUNCTIONS.average = function () {
				var v = void 0,
				    options = void 0;

				var _getargs = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs2 = _slicedToArray(_getargs, 2);

				v = _getargs2[0];
				options = _getargs2[1];

				if (options && options.if) v = v.filter(options.if);
				v = v.filter(function (item) {
					return typeof item === "number";
				});
				if (v.length === 0) return 0;
				return v.reduce(function (accumulator, current) {
					return accumulator + current;
				}, 0) / v.length;
			};
			FUNCTIONS.averagea = function () {
				var v = void 0,
				    options = void 0;

				var _getargs3 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs4 = _slicedToArray(_getargs3, 2);

				v = _getargs4[0];
				options = _getargs4[1];

				if (options && options.if) v = v.filter(options.if);
				if (v.length === 0) return 0;
				options = Object.assign({ replace: replaceForA() }, options || {});
				return v.reduce(function (accumulator, current) {
					return accumulator + coerce(current, options);
				}, 0) / v.length;
			};
			FUNCTIONS.count = function () {
				var v = void 0,
				    options = void 0;

				var _getargs5 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs6 = _slicedToArray(_getargs5, 2);

				v = _getargs6[0];
				options = _getargs6[1];

				if (options && options.if) v = v.filter(options.if);
				v = v.filter(function (item) {
					return typeof item === "number";
				});
				return v.length;
			};
			FUNCTIONS.counta = function () {
				var v = void 0,
				    options = void 0;

				var _getargs7 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs8 = _slicedToArray(_getargs7, 2);

				v = _getargs8[0];
				options = _getargs8[1];

				if (options && options.if) v = v.filter(options.if);
				v = v.filter(function (item) {
					return item !== null && typeof item !== "undefined";
				});
				return v.length;
			};
			FUNCTIONS.extend = function () {
				var parts = CURRENTCELL.coordinates.split("."),
				    startcol = parseInt(parts[1]),
				    startrow = parseInt(parts[2]);
				var v = void 0,
				    options = void 0;

				var _getargs9 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs10 = _slicedToArray(_getargs9, 2);

				v = _getargs10[0];
				options = _getargs10[1];

				for (var row = 0; row < v[0].length; row++) {
					for (var col = 0; col < v[0][row].length; col++) {
						if (row === 0 && col === 0) continue;
						Cell(parts[0] + "." + (col + startcol) + "." + (row + startrow), v[0][row][col]); // null,CURRENTCELL.sheet
					}
				}
				return v[0][0];
			};
			FUNCTIONS.format = function () {
				var v = void 0,
				    options = void 0;

				var _getargs11 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs12 = _slicedToArray(_getargs11, 2);

				v = _getargs12[0];
				options = _getargs12[1];

				if (options && options.if) v = v.filter(options.if);
				return math.format.apply(math, _toConsumableArray(v).concat([options]));
			};
			FUNCTIONS.intersection = function () {
				var v = void 0,
				    options = void 0;

				var _getargs13 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs14 = _slicedToArray(_getargs13, 2);

				v = _getargs14[0];
				options = _getargs14[1];

				if (v.length === 0) return [];
				var result = intersection.apply(undefined, _toConsumableArray(v));
				if (options && options.if) return result.filter(options.if);
				return result;
			};
			FUNCTIONS.max = function () {
				// pattern,options or v1,v2,v3...options
				var v = void 0,
				    options = void 0;

				var _getargs15 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs16 = _slicedToArray(_getargs15, 2);

				v = _getargs16[0];
				options = _getargs16[1];

				if (options && options.if) v = v.filter(options.if);
				if (v.length === 0) return -Infinity;
				if (Array.isArray(v[0])) return math.max.apply(math, _toConsumableArray(v));
				return v.reduce(function (accumulator, current) {
					return accumulator > current ? accumulator : current;
				}, -Infinity);
			};
			FUNCTIONS.maxa = function () {
				var v = void 0,
				    options = void 0;

				var _getargs17 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs18 = _slicedToArray(_getargs17, 2);

				v = _getargs18[0];
				options = _getargs18[1];

				if (options && options.if) v = v.filter(options.if);
				if (v.length === 0) return -Infinity;
				options = Object.assign({ replace: replaceForA() }, options || {});
				traverse(v, function (item, i, array) {
					return array[i] = coerce(item, { replace: replaceForA() });
				});
				if (Array.isArray(v[0])) return math.max.apply(math, _toConsumableArray(v));
				return v.reduce(function (accumulator, current) {
					return accumulator > current ? accumulator : current;
				}, -Infinity);
			};
			FUNCTIONS.median = function () {
				var v = void 0,
				    options = void 0;

				var _getargs19 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs20 = _slicedToArray(_getargs19, 2);

				v = _getargs20[0];
				options = _getargs20[1];

				if (options && options.if) v = v.filter(options.if);
				return math.median.apply(math, _toConsumableArray(v));
			};
			FUNCTIONS.mode = function () {
				var v = void 0,
				    options = void 0;

				var _getargs21 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs22 = _slicedToArray(_getargs21, 2);

				v = _getargs22[0];
				options = _getargs22[1];

				if (options && options.if) v = v.filter(options.if);
				return math.mode.apply(math, _toConsumableArray(v));
			};
			FUNCTIONS.min = function () {
				// pattern,options or v1,v2,v3...options
				var v = void 0,
				    options = void 0;

				var _getargs23 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs24 = _slicedToArray(_getargs23, 2);

				v = _getargs24[0];
				options = _getargs24[1];

				if (options && options.if) v = v.filter(options.if);
				if (v.length === 0) return Infinity;
				if (Array.isArray(v[0])) return math.min.apply(math, _toConsumableArray(v));
				return v.reduce(function (accumulator, current) {
					return accumulator < current ? accumulator : current;
				}, Infinity);
			};
			FUNCTIONS.mina = function () {
				var v = void 0,
				    options = void 0;

				var _getargs25 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs26 = _slicedToArray(_getargs25, 2);

				v = _getargs26[0];
				options = _getargs26[1];

				if (options && options.if) v = v.filter(options.if);
				if (v.length === 0) return Infinity;
				options = Object.assign({ replace: replaceForA() }, options || {});
				traverse(v, function (item, i, array) {
					return array[i] = coerce(item, { replace: replaceForA() });
				});
				if (Array.isArray(v[0])) return math.min.apply(math, _toConsumableArray(v));
				return v.reduce(function (accumulator, current) {
					return accumulator < current ? accumulator : current;
				}, Infinity);
			};
			FUNCTIONS.product = function () {
				var v = void 0,
				    options = void 0;

				var _getargs27 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs28 = _slicedToArray(_getargs27, 2);

				v = _getargs28[0];
				options = _getargs28[1];

				if (options && options.if) v = v.filter(options.if);
				v = v.filter(function (item) {
					return typeof item === "number" || Array.isArray(item);
				});
				if (v.length === 0) return 0;
				if (Array.isArray(v[0])) return math.multiply.apply(math, _toConsumableArray(v));
				return v.reduce(function (accumulator, current) {
					return accumulator * (typeof current === "number" ? current : 1);
				}, 1);
			};
			FUNCTIONS.producta = function () {
				var v = void 0,
				    options = void 0;

				var _getargs29 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs30 = _slicedToArray(_getargs29, 2);

				v = _getargs30[0];
				options = _getargs30[1];

				if (options && options.if) v = v.filter(options.if);
				if (v.length === 0) return 0;
				options = Object.assign({
					boolean: {
						true: 1,
						false: 0
					},
					string: 1,
					undefined: 1,
					null: 1,
					Array: 1
				}, options || {});
				traverse(v, function (item, i, array) {
					return array[i] = coerce(item, { replace: replaceForA() });
				});
				if (Array.isArray(v[0])) return math.multiply.apply(math, _toConsumableArray(v));
				return v.reduce(function (accumulator, current) {
					return accumulator * (typeof current === "number" ? current : 1);
				}, 1);
			};
			FUNCTIONS.dotProduct = function () {
				var v = void 0,
				    options = void 0;

				var _getargs31 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs32 = _slicedToArray(_getargs31, 2);

				v = _getargs32[0];
				options = _getargs32[1];

				if (options && options.if) v = v.filter(options.if);
				return math.dotMultiply.apply(math, _toConsumableArray(v));
			};
			FUNCTIONS.quotient = function () {
				var v = void 0,
				    options = void 0;

				var _getargs33 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs34 = _slicedToArray(_getargs33, 2);

				v = _getargs34[0];
				options = _getargs34[1];

				if (options && options.if) v = v.filter(options.if);
				v = v.filter(function (item) {
					return typeof item === "number" || Array.isArray(item);
				});
				if (v.length === 0) return 0;
				return math.divide.apply(math, _toConsumableArray(v));
			};
			FUNCTIONS.quotienta = function () {
				var v = void 0,
				    options = void 0;

				var _getargs35 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs36 = _slicedToArray(_getargs35, 2);

				v = _getargs36[0];
				options = _getargs36[1];

				options = Object.assign({ replace: { boolean: 1, string: 1, undefined: 1 } }, options || {});
				if (options.if) v = v.filter(options.if);
				if (v.length === 0) return -Infinity;
				return v.reduce(function (accumulator, current) {
					return accumulator / coerce(current, options);
				}, 1);
			};
			FUNCTIONS.dotQuotient = function () {
				var v = void 0,
				    options = void 0;

				var _getargs37 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs38 = _slicedToArray(_getargs37, 2);

				v = _getargs38[0];
				options = _getargs38[1];

				if (options && options.if) v = v.filter(options.if);
				return math.dotDivide.apply(math, _toConsumableArray(v));
			};
			FUNCTIONS.sum = function () {
				var v = void 0,
				    options = void 0;

				var _getargs39 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs40 = _slicedToArray(_getargs39, 2);

				v = _getargs40[0];
				options = _getargs40[1];

				if (options && options.if) v = v.filter(options.if);
				if (Array.isArray(v[0])) return math.add.apply(math, _toConsumableArray(v));
				return v.reduce(function (accumulator, current) {
					return accumulator + (typeof current === "number" ? current : 0);
				}, 0);
			};
			FUNCTIONS.suma = function () {
				var v = void 0,
				    options = void 0;

				var _getargs41 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs42 = _slicedToArray(_getargs41, 2);

				v = _getargs42[0];
				options = _getargs42[1];

				options = Object.assign({ replace: replaceForA() }, options || {});
				if (options && options.if) v = v.filter(options.if);
				return v.reduce(function (accumulator, current) {
					return accumulator + coerce(current, options);
				}, 0);
			};
			FUNCTIONS.type = function () {
				var v = void 0,
				    options = void 0;

				var _getargs43 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs44 = _slicedToArray(_getargs43, 2);

				v = _getargs44[0];
				options = _getargs44[1];

				return math.typeof.apply(math, _toConsumableArray(v));
			};
			FUNCTIONS.variance = function () {
				var v = void 0,
				    options = void 0;

				var _getargs45 = getargs([].concat(Array.prototype.slice.call(arguments)));

				var _getargs46 = _slicedToArray(_getargs45, 2);

				v = _getargs46[0];
				options = _getargs46[1];

				if (options && options.if) v = v.filter(options.if);
				v = v.filter(function (item) {
					return typeof item === "number";
				});
				if (v.length === 0) return 0;
				return math.var.apply(math, _toConsumableArray(v));
			};

			var _loop = function _loop(key) {
				if (!FUNCTIONS[key] && !["chain", "clone", "config", "compile", "createUnit", "false", "forEach", "format", "index", "import", "json", "matrix", "print", "help", "map", "null", "parse", "parser", "range", "sparse", "true", "typed", "typeof", "var"].includes(key)) {
					FUNCTIONS[key] = function () {
						var v = void 0,
						    options = void 0;

						var _getargs47 = getargs([].concat(Array.prototype.slice.call(arguments)));

						var _getargs48 = _slicedToArray(_getargs47, 2);

						v = _getargs48[0];
						options = _getargs48[1];

						if (options && options.if) v = v.filter(options.if);
						return math[key].apply(math, _toConsumableArray(v));
					};
				}
			};

			for (var key in math) {
				_loop(key);
			}

			DECLARATIONS = declarations();

			function Cell(coordinates, value, options, space) {
				var me = this,
				    isnew = this && this instanceof Cell,
				    cell = Cell.cells[coordinates];
				// return Cell if found and not creating new one
				if (cell && !isnew) {
					if (arguments.length === 1) return cell;
					cell.value = value;
					!options || Object.assign(this.options, options);
					return cell;
				}
				// create a new Cell
				if (!isnew) {
					if (typeof value === "undefined" && (!space || space.options.sparse)) return; // no point in creating cell
					return new Cell(coordinates, value, options, space);
				}
				!space || (space.cells[coordinates] = true);
				this.coordinates = coordinates;
				this.options = {};
				this.computed = null;
				Object.assign(this.options, options);
				Object.defineProperty(this, "references", { enumerable: false, configurable: true, writable: true, value: {} });
				this.data = value;
				Object.defineProperty(this, "calculating", { writable: true });
				Object.defineProperty(this, "value", {
					enumerable: false,
					configurable: true,
					get: function get() {
						return this.valueOf();
					},
					set: function set(value) {
						this.data = value;
						this.compile().calc();
						return true;
					}
				});
				Cell.cells[coordinates] = this;
				Cell.index(coordinates, Cell.cellIndex);
				this.compile().calc();
			}
			Cell.prototype.addReferences = function () {
				for (var i = 0; i < arguments.length; i++) {
					arguments[i] === this || (this.references[arguments[i].coordinates] = true);
				}
			};
			Cell.prototype.deleteReferences = function () {
				for (var i = 0; i < arguments.length; i++) {
					delete this.references[arguments[i].coordinates];
				}
			};
			Cell.prototype.clearReferences = function () {
				this.references = {};
			};
			Cell.prototype.compile = function () {
				delete this.compiled;
				if (typeof this.data === "string" && this.data.indexOf("=") === 0) {
					this.compiled = new Function("functions", "return function() { " + DECLARATIONS + "return " + this.data.substring(1) + "; }")(FUNCTIONS);
				}
				for (var pattern in Cell.observers) {
					var observers = [];
					for (var coordinates in Cell.observers[pattern]) {
						observers.push(Cell.cells[coordinates]);
					}if (match(pattern, this.coordinates)) this.addReferences.apply(this, observers);
				}
				return this;
			};
			Cell.prototype.calc = function () {
				var cascade = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				var me = this;
				function calc() {
					if (me.compiled) {
						var current = CURRENTCELL;
						CURRENTCELL = me;
						me.computed = me.compiled();
						CURRENTCELL = current;
					}
					!me.options.oncalculated || me.options.oncalculated(me);
					me.calculating = null;
				}
				me.calculating || (me.calculating = setTimeout(calc));
				if (cascade) {
					for (var coordinates in me.references) {
						Cell.cells[coordinates].calc();
					}
				}
			};
			Cell.prototype.valueOf = function () {
				!CURRENTCELL || this.addReferences(CURRENTCELL);
				return this.compiled ? this.computed : this.data;
			};
			Cell.find = function (pattern, index) {
				function find(parts, node, position, results) {
					if (node) {
						if (position === parts.length) {
							var cell = Cell.cells[node.coordinates];
							!cell || results.push(cell);
							return;
						}
						node = node.nodes;
						var part = parts[position],
						    rangetype = part.includes(":") ? ":" : part.includes("|") ? "|" : null;
						if (!rangetype) {
							if (part === "*") {
								var keys = Object.keys(node),
								    next = position + 1;
								var _iteratorNormalCompletion5 = true;
								var _didIteratorError5 = false;
								var _iteratorError5 = undefined;

								try {
									for (var _iterator5 = keys[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
										var key = _step5.value;
										find(parts, node[key], next, results);
									}
								} catch (err) {
									_didIteratorError5 = true;
									_iteratorError5 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion5 && _iterator5.return) {
											_iterator5.return();
										}
									} finally {
										if (_didIteratorError5) {
											throw _iteratorError5;
										}
									}
								}
							} else {
								node = node[part];
								find(parts, node, ++position, results);
							}
						} else {
							var range = part.split(rangetype);
							var isnum = false;
							if (rangetype === ":") {
								for (var i = 0; i < range.length; i++) {
									if (parseInt(range[i]) == range[i]) {
										range[i] = parseInt(range[i]);
										isnum = true;
									}
								}
							}
							var _keys = Object.keys(node),
							    _next = position + 1;
							var _iteratorNormalCompletion6 = true;
							var _didIteratorError6 = false;
							var _iteratorError6 = undefined;

							try {
								var _loop2 = function _loop2() {
									var key = _step6.value;

									if (rangetype === ":") {
										key = isnum && parseInt(key) == key ? parseInt(key) : key;
										if (range[0] === "*" || key >= range[0]) {
											if (key <= range[1]) find(parts, node[key], _next, results);
										}
									} else if (range.some(function (item) {
										return item == key;
									})) {
										find(parts, node[key], _next, results);
									}
								};

								for (var _iterator6 = _keys[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
									_loop2();
								}
							} catch (err) {
								_didIteratorError6 = true;
								_iteratorError6 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion6 && _iterator6.return) {
										_iterator6.return();
									}
								} finally {
									if (_didIteratorError6) {
										throw _iteratorError6;
									}
								}
							}
						}
					}
				}
				var results = [];
				find(pattern.split("."), index, 0, results);
				return results;
			};
			Cell.index = function (coordinates, index) {
				// need to enhance to support compiling ranges
				var parts = coordinates.split(".");
				var node = index.nodes;
				for (var i = 0; i < parts.length; i++) {
					node[parts[i]] || (node[parts[i]] = { nodes: {} });
					if (i === parts.length - 1) node[parts[i]].coordinates = coordinates;else node = node[parts[i]].nodes;
				}
			};
			Cell.cells = {};
			Cell.observers = {};
			Cell.cellIndex = { nodes: {} };
			Cell.observerIndex = { nodes: {} };

			var Row = function () {
				function Row(sheet, id, data) {
					_classCallCheck(this, Row);

					this.sheet = sheet;
					id || (id = sheet.rows.length + 1);
					sheet.rows.push(id);
					var cols = 0;
					if (sheet.options.columns) {
						for (var property in sheet.options.columns) {
							Cell(sheet.name + "." + property + "." + id, data[property], sheet.options.columns[property], sheet);
						}
					} else if (Array.isArray(data)) {
						for (var i = 0; i < data.length; i++, cols++) {
							Cell(sheet.name + "." + (i + 1) + "." + id, data[i], {}, sheet);
						}
					} else {
						var keys = Object.keys(data);
						for (var _i = 0; _i < data.length; _i++, cols++) {
							Cell(sheet.name + "." + (_i + 1) + "." + id, data[keys[_i]], {}, sheet);
						}
					}
					if (sheet.options.columnCount && cols < sheet.options.columnCount) {
						while (cols++ < sheet.options.columnCount) {
							Cell(sheet.name + "." + cols + "." + id, null, {}, sheet);
						}
					}
				}

				_createClass(Row, [{
					key: "cells",
					value: function cells() {
						// return a non-sparse array of cells for rendering
					}
				}]);

				return Row;
			}();

			function match(pattern, coordinate2) {
				var c1 = pattern.split("."),
				    c2 = coordinate2.split(".");
				return c1.length === c2.length && c1.every(function (key, i) {
					var parts = key.split(":");
					if (parts.length === 1) return parts[0] === "*" || parts[0] === c2[i];
					if (parts[0] === "*") return parts[1] === "*" || c2[i] <= parts[1];
					if (c2[i] >= parts[0]) return parts[1] === "*" || c2[i] <= parts[1];
					return false;
				});
			}

			function Hypercalc() {
				var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				var me = this;
				me.options = Object.assign({}, options);
				me.functions = new Proxy(FUNCTIONS, {
					set: function set(target, property, value) {
						if (typeof value !== "function") throw new Error("Hypercalc custom function must be a function: ", value);
						target[property] = value;
						DECLARATIONS = declarations();
						return true;
					}
				});
				this.Sheet = function () {
					function Sheet(name) {
						var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { sparse: me.options.sparse };

						_classCallCheck(this, Sheet);

						var sheet = me.sheets[name];
						if (sheet || !this) return sheet;
						this.name = name;
						this.options = {};
						Object.assign(this.options, options);
						this.rows = [];
						this.cells = {};
						me.sheets[name] = this;
					}

					_createClass(Sheet, [{
						key: "createRow",
						value: function createRow(id, data) {
							return new Row(this, id, data);
						}
					}, {
						key: "import",
						value: function _import(array, options) {
							// options should just modify options for the sheet
							for (var i = 0; i < array.length; i++) {
								this.createRow(i + 1, array[i]);
							}
						}
					}]);

					return Sheet;
				}();
				me.sheets = {};
				this.Space = function () {
					function Space(name) {
						var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { sparse: me.options.sparse };

						_classCallCheck(this, Space);

						var space = me.spaces[name];
						if (space || !this) return space;
						this.name = name;
						this.options = {};
						Object.assign(this.options, options);
						this.cells = {};
						me.spaces[name] = this;
					}

					_createClass(Space, [{
						key: "createVector",
						value: function createVector(vector, data) {
							var _this = this;

							var coordinates = this.name + ".";
							Object.keys(this.options.dimensions).forEach(function (key, i, dimensions) {
								if (!["number", "boolean", "string"].includes(_typeof(vector[key]))) throw new Error("Incompatible vector " + _this.name);
								coordinates += vector[key] + (i < dimensions.length - 1 ? "." : "");
							});
							Cell(coordinates, data, this.options.contains, this);
						}
					}]);

					return Space;
				}();
				me.spaces = {};
			}
			Hypercalc.prototype.Cell = Cell;
			Hypercalc.getArgs = getargs;

			module.exports = Hypercalc;
			if (typeof window !== "undefined") window.Hypercalc = Hypercalc;
		}).call(this);
	}, { "mathjs/dist/math.min.js": 2 }], 2: [function (require, module, exports) {
		/**
   * math.js
   * https://github.com/josdejong/mathjs
   *
   * Math.js is an extensive math library for JavaScript and Node.js,
   * It features real and complex numbers, units, matrices, a large set of
   * mathematical functions, and a flexible expression parser.
   *
   * @version 3.12.2
   * @date    2017-04-30
   *
   * @license
   * Copyright (C) 2013-2017 Jos de Jong <wjosdejong@gmail.com>
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not
   * use this file except in compliance with the License. You may obtain a copy
   * of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
   * License for the specific language governing permissions and limitations under
   * the License.
   */
		!function (e, t) {
			"object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.math = t() : e.math = t();
		}(this, function () {
			return function (e) {
				function t(n) {
					if (r[n]) return r[n].exports;var i = r[n] = { i: n, l: !1, exports: {} };return e[n].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
				}var r = {};return t.m = e, t.c = r, t.i = function (e) {
					return e;
				}, t.d = function (e, r, n) {
					t.o(e, r) || Object.defineProperty(e, r, { configurable: !1, enumerable: !0, get: n });
				}, t.n = function (e) {
					var r = e && e.__esModule ? function () {
						return e.default;
					} : function () {
						return e;
					};return t.d(r, "a", r), r;
				}, t.o = function (e, t) {
					return Object.prototype.hasOwnProperty.call(e, t);
				}, t.p = "", t(t.s = 518);
			}([function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					function i(t, r, n) {
						var i = e.Matrix.storage(r || "default");return new i(t, n);
					}var a = n("matrix", { "": function _() {
							return i([]);
						}, string: function string(e) {
							return i([], e);
						}, "string, string": function stringString(e, t) {
							return i([], e, t);
						}, Array: function Array(e) {
							return i(e);
						}, Matrix: function Matrix(e) {
							return i(e, e.storage());
						}, "Array | Matrix, string": i, "Array | Matrix, string, string": i });return a.toTex = { 0: "\\begin{bmatrix}\\end{bmatrix}", 1: "\\left(${args[0]}\\right)", 2: "\\left(${args[0]}\\right)" }, a;
				}t.name = "matrix", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				e.exports = function e(t, r, n) {
					return t && "function" == typeof t.map ? t.map(function (t) {
						return e(t, r, n);
					}) : r(t);
				};
			}, function (e, t, r) {
				"use strict";
				function n(e) {
					for (var t = [], r = 0; r < e; r++) {
						t.push(0);
					}return t;
				}t.isNumber = function (e) {
					return "number" == typeof e;
				}, t.isInteger = function (e) {
					return !!isFinite(e) && e == Math.round(e);
				}, t.sign = Math.sign || function (e) {
					return e > 0 ? 1 : e < 0 ? -1 : 0;
				}, t.format = function (e, r) {
					if ("function" == typeof r) return r(e);if (e === 1 / 0) return "Infinity";if (e === -(1 / 0)) return "-Infinity";if (isNaN(e)) return "NaN";var n = "auto",
					    i = void 0;switch (r && (r.notation && (n = r.notation), t.isNumber(r) ? i = r : r.precision && (i = r.precision)), n) {case "fixed":
							return t.toFixed(e, i);case "exponential":
							return t.toExponential(e, i);case "engineering":
							return t.toEngineering(e, i);case "auto":
							return t.toPrecision(e, i, r && r.exponential).replace(/((\.\d*?)(0+))($|e)/, function () {
								var e = arguments[2],
								    t = arguments[4];return "." !== e ? e + t : t;
							});default:
							throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", or "fixed".');}
				}, t.splitNumber = function (e) {
					var t = String(e).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);if (!t) throw new SyntaxError("Invalid number " + e);var r = t[1],
					    n = t[2],
					    i = parseFloat(t[4] || "0"),
					    a = n.indexOf(".");i += a !== -1 ? a - 1 : n.length - 1;var o = n.replace(".", "").replace(/^0*/, function (e) {
						return i -= e.length, "";
					}).replace(/0*$/, "").split("").map(function (e) {
						return parseInt(e);
					});return 0 === o.length && (o.push(0), i++), { sign: r, coefficients: o, exponent: i };
				}, t.toEngineering = function (e, r) {
					if (isNaN(e) || !isFinite(e)) return String(e);var i = t.roundDigits(t.splitNumber(e), r),
					    a = i.exponent,
					    o = i.coefficients,
					    s = a % 3 === 0 ? a : a < 0 ? a - 3 - a % 3 : a - a % 3,
					    u = a >= 0 ? a : Math.abs(s);o.length - 1 < u && (o = o.concat(n(u - (o.length - 1))));for (var c = Math.abs(a - s), f = 1; --c >= 0;) {
						f++;
					}var l = o.slice(f).join(""),
					    p = l.match(/[1-9]/) ? "." + l : "",
					    h = o.slice(0, f).join("") + p + "e" + (a >= 0 ? "+" : "") + s.toString();return i.sign + h;
				}, t.toFixed = function (e, r) {
					if (isNaN(e) || !isFinite(e)) return String(e);var i = t.splitNumber(e),
					    a = t.roundDigits(i, i.exponent + 1 + (r || 0)),
					    o = a.coefficients,
					    s = a.exponent + 1,
					    u = s + (r || 0);return o.length < u && (o = o.concat(n(u - o.length))), s < 0 && (o = n(-s + 1).concat(o), s = 1), r && o.splice(s, 0, 0 === s ? "0." : "."), a.sign + o.join("");
				}, t.toExponential = function (e, r) {
					if (isNaN(e) || !isFinite(e)) return String(e);var i = t.splitNumber(e),
					    a = r ? t.roundDigits(i, r) : i,
					    o = a.coefficients,
					    s = a.exponent;o.length < r && (o = o.concat(n(r - o.length)));var u = o.shift();return a.sign + u + (o.length > 0 ? "." + o.join("") : "") + "e" + (s >= 0 ? "+" : "") + s;
				}, t.toPrecision = function (e, r, i) {
					if (isNaN(e) || !isFinite(e)) return String(e);var a = i && void 0 !== i.lower ? i.lower : .001,
					    o = i && void 0 !== i.upper ? i.upper : 1e5,
					    s = t.splitNumber(e),
					    u = Math.abs(Math.pow(10, s.exponent));if (u < a || u >= o) return t.toExponential(e, r);var c = r ? t.roundDigits(s, r) : s,
					    f = c.coefficients,
					    l = c.exponent;f.length < r && (f = f.concat(n(r - f.length))), f = f.concat(n(l - f.length + 1 + (f.length < r ? r - f.length : 0))), f = n(-l).concat(f);var p = l > 0 ? l : 0;return p < f.length - 1 && f.splice(p + 1, 0, "."), c.sign + f.join("");
				}, t.roundDigits = function (e, t) {
					for (var r = { sign: e.sign, coefficients: e.coefficients, exponent: e.exponent }, n = r.coefficients; t <= 0;) {
						n.unshift(0), r.exponent++, t++;
					}if (n.length > t) {
						var i = n.splice(t, n.length - t);if (i[0] >= 5) {
							var a = t - 1;for (n[a]++; 10 === n[a];) {
								n.pop(), 0 === a && (n.unshift(0), r.exponent++, a++), a--, n[a]++;
							}
						}
					}return r;
				}, t.digits = function (e) {
					return e.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
				}, t.DBL_EPSILON = Number.EPSILON || 2.220446049250313e-16, t.nearlyEqual = function (e, r, n) {
					if (null == n) return e == r;if (e == r) return !0;if (isNaN(e) || isNaN(r)) return !1;if (isFinite(e) && isFinite(r)) {
						var i = Math.abs(e - r);return i < t.DBL_EPSILON || i <= Math.max(Math.abs(e), Math.abs(r)) * n;
					}return !1;
				};
			}, function (e, t, r) {
				"use strict";
				t.symbols = { Alpha: "A", alpha: "\\alpha", Beta: "B", beta: "\\beta", Gamma: "\\Gamma", gamma: "\\gamma", Delta: "\\Delta", delta: "\\delta", Epsilon: "E", epsilon: "\\epsilon", varepsilon: "\\varepsilon", Zeta: "Z", zeta: "\\zeta", Eta: "H", eta: "\\eta", Theta: "\\Theta", theta: "\\theta", vartheta: "\\vartheta", Iota: "I", iota: "\\iota", Kappa: "K", kappa: "\\kappa", varkappa: "\\varkappa", Lambda: "\\Lambda", lambda: "\\lambda", Mu: "M", mu: "\\mu", Nu: "N", nu: "\\nu", Xi: "\\Xi", xi: "\\xi", Omicron: "O", omicron: "o", Pi: "\\Pi", pi: "\\pi", varpi: "\\varpi", Rho: "P", rho: "\\rho", varrho: "\\varrho", Sigma: "\\Sigma", sigma: "\\sigma", varsigma: "\\varsigma", Tau: "T", tau: "\\tau", Upsilon: "\\Upsilon", upsilon: "\\upsilon", Phi: "\\Phi", phi: "\\phi", varphi: "\\varphi", Chi: "X", chi: "\\chi", Psi: "\\Psi", psi: "\\psi", Omega: "\\Omega", omega: "\\omega", true: "\\mathrm{True}", false: "\\mathrm{False}", i: "i", inf: "\\infty", Inf: "\\infty", infinity: "\\infty", Infinity: "\\infty", oo: "\\infty", lim: "\\lim", undefined: "\\mathbf{?}" }, t.operators = { transpose: "^\\top", factorial: "!", pow: "^", dotPow: ".^\\wedge", unaryPlus: "+", unaryMinus: "-", bitNot: "~", not: "\\neg", multiply: "\\cdot", divide: "\\frac", dotMultiply: ".\\cdot", dotDivide: ".:", mod: "\\mod", add: "+", subtract: "-", to: "\\rightarrow", leftShift: "<<", rightArithShift: ">>", rightLogShift: ">>>", equal: "=", unequal: "\\neq", smaller: "<", larger: ">", smallerEq: "\\leq", largerEq: "\\geq", bitAnd: "\\&", bitXor: "\\underline{|}", bitOr: "|", and: "\\wedge", xor: "\\veebar", or: "\\vee" }, t.defaultTemplate = "\\mathrm{${name}}\\left(${args}\\right)";var n = { deg: "^\\circ" };t.toSymbol = function (e, r) {
					if (r = "undefined" != typeof r && r) return n.hasOwnProperty(e) ? n[e] : "\\mathrm{" + e + "}";if (t.symbols.hasOwnProperty(e)) return t.symbols[e];if (e.indexOf("_") !== -1) {
						var i = e.indexOf("_");return t.toSymbol(e.substring(0, i)) + "_{" + t.toSymbol(e.substring(i + 1)) + "}";
					}return e;
				};
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = e.DenseMatrix,
					    o = function o(e, t, r, _o) {
						var u,
						    c = e._data,
						    f = e._size,
						    l = e._datatype,
						    p = r;"string" == typeof l && (u = l, t = n.convert(t, u), p = n.find(r, [u, u]));var h = f.length > 0 ? s(p, 0, f, f[0], c, t, _o) : [];return new a({ data: h, size: i(f), datatype: u });
					},
					    s = function s(e, t, r, n, i, a, o) {
						var u = [];if (t === r.length - 1) for (var c = 0; c < n; c++) {
							u[c] = o ? e(a, i[c]) : e(i[c], a);
						} else for (var f = 0; f < n; f++) {
							u[f] = s(e, t + 1, r, r[t + 1], i[f], a, o);
						}return u;
					};return o;
				}var i = r(6).clone;t.name = "algorithm14", t.factory = n;
			}, function (e, t) {
				function r() {
					function e(e, t) {
						if (void 0 !== r[e]) throw new Error('Cannot register type "' + e + '": already exists');r[e] = t;
					}function t(e, t, n) {
						if (Object.hasOwnProperty.call(r, e.type)) {
							var i = r[e.type];return i(e, t, n);
						}if ("function" != typeof e._compile || Object.hasOwnProperty.call(e, "_compile")) throw new Error('Cannot compile node: unknown type "' + e.type + '"');return e._compile(t, n);
					}var r = {};return { register: e, compile: t };
				}t.factory = r;
			}, function (e, t, r) {
				"use strict";
				t.clone = function e(r) {
					var n = typeof r === "undefined" ? "undefined" : _typeof(r);if ("number" === n || "string" === n || "boolean" === n || null === r || void 0 === r) return r;if ("function" == typeof r.clone) return r.clone();if (Array.isArray(r)) return r.map(function (t) {
						return e(t);
					});if (r instanceof Number) return new Number(r.valueOf());if (r instanceof String) return new String(r.valueOf());if (r instanceof Boolean) return new Boolean(r.valueOf());if (r instanceof Date) return new Date(r.valueOf());if (r && r.isBigNumber === !0) return r;if (r instanceof RegExp) throw new TypeError("Cannot clone " + r);return t.map(r, e);
				}, t.map = function (e, t) {
					var r = {};for (var n in e) {
						Object.hasOwnProperty.call(e, n) && (r[n] = t(e[n]));
					}return r;
				}, t.extend = function (e, t) {
					for (var r in t) {
						Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
					}return e;
				}, t.deepExtend = function e(t, r) {
					if (Array.isArray(r)) throw new TypeError("Arrays are not supported by deepExtend");for (var n in r) {
						if (Object.hasOwnProperty.call(r, n)) if (r[n] && r[n].constructor === Object) void 0 === t[n] && (t[n] = {}), t[n].constructor === Object ? e(t[n], r[n]) : t[n] = r[n];else {
							if (Array.isArray(r[n])) throw new TypeError("Arrays are not supported by deepExtend");t[n] = r[n];
						}
					}return t;
				}, t.deepEqual = function (e, r) {
					var n, i, a;if (Array.isArray(e)) {
						if (!Array.isArray(r)) return !1;if (e.length != r.length) return !1;for (i = 0, a = e.length; i < a; i++) {
							if (!t.deepEqual(e[i], r[i])) return !1;
						}return !0;
					}if (e instanceof Object) {
						if (Array.isArray(r) || !(r instanceof Object)) return !1;for (n in e) {
							if (!t.deepEqual(e[n], r[n])) return !1;
						}for (n in r) {
							if (!t.deepEqual(e[n], r[n])) return !1;
						}return !0;
					}return (typeof e === "undefined" ? "undefined" : _typeof(e)) == (typeof r === "undefined" ? "undefined" : _typeof(r)) && e == r;
				}, t.canDefineProperty = function () {
					try {
						if (Object.defineProperty) return Object.defineProperty({}, "x", { get: function get() {} }), !0;
					} catch (e) {}return !1;
				}, t.lazy = function (e, r, n) {
					if (t.canDefineProperty()) {
						var i,
						    a = !0;Object.defineProperty(e, r, { get: function get() {
								return a && (i = n(), a = !1), i;
							}, set: function set(e) {
								i = e, a = !1;
							}, configurable: !0, enumerable: !0 });
					} else e[r] = n();
				}, t.traverse = function (e, t) {
					var r = e;if (t) for (var n = t.split("."), i = 0; i < n.length; i++) {
						var a = n[i];a in r || (r[a] = {}), r = r[a];
					}return r;
				}, t.isFactory = function (e) {
					return e && "function" == typeof e.factory;
				};
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r) {
					var i,
					    a = e.length;if (a != t[r]) throw new f(a, t[r]);if (r < t.length - 1) {
						var o = r + 1;for (i = 0; i < a; i++) {
							var s = e[i];if (!Array.isArray(s)) throw new f(t.length - 1, t.length, "<");n(e[i], t, o);
						}
					} else for (i = 0; i < a; i++) {
						if (Array.isArray(e[i])) throw new f(t.length + 1, t.length, ">");
					}
				}function i(e, r, n, a) {
					var o,
					    s,
					    u = e.length,
					    c = r[n],
					    f = Math.min(u, c);if (e.length = c, n < r.length - 1) {
						var l = n + 1;for (o = 0; o < f; o++) {
							s = e[o], Array.isArray(s) || (s = [s], e[o] = s), i(s, r, l, a);
						}for (o = f; o < c; o++) {
							s = [], e[o] = s, i(s, r, l, a);
						}
					} else {
						for (o = 0; o < f; o++) {
							for (; Array.isArray(e[o]);) {
								e[o] = e[o][0];
							}
						}if (a !== t.UNINITIALIZED) for (o = f; o < c; o++) {
							e[o] = a;
						}
					}
				}function a(e, t) {
					var r,
					    n = [];if (0 === t.length) {
						if (0 === e.length) throw new f(null, null, "!=");return e.shift();
					}for (r = 0; r < t[0]; r += 1) {
						n.push(a(e, t.slice(1)));
					}return n;
				}function o(e, t, r) {
					var n, i;if (r < t) {
						var a = r + 1;for (n = 0, i = e.length; n < i; n++) {
							e[n] = o(e[n], t, a);
						}
					} else for (; Array.isArray(e);) {
						e = e[0];
					}return e;
				}function s(e, t, r) {
					var n, i;if (Array.isArray(e)) {
						var a = r + 1;for (n = 0, i = e.length; n < i; n++) {
							e[n] = s(e[n], t, a);
						}
					} else for (var o = r; o < t; o++) {
						e = [e];
					}return e;
				}var u = r(2),
				    c = r(12),
				    f = (r(6), r(63), r(9)),
				    l = r(44);t.size = function (e) {
					for (var t = []; Array.isArray(e);) {
						t.push(e.length), e = e[0];
					}return t;
				}, t.validate = function (e, t) {
					var r = 0 == t.length;if (r) {
						if (Array.isArray(e)) throw new f(e.length, 0);
					} else n(e, t, 0);
				}, t.validateIndex = function (e, t) {
					if (!u.isNumber(e) || !u.isInteger(e)) throw new TypeError("Index must be an integer (value: " + e + ")");if (e < 0 || "number" == typeof t && e >= t) throw new l(e, t);
				}, t.UNINITIALIZED = {}, t.resize = function (e, t, r) {
					if (!Array.isArray(e) || !Array.isArray(t)) throw new TypeError("Array expected");if (0 === t.length) throw new Error("Resizing to scalar is not supported");t.forEach(function (e) {
						if (!u.isNumber(e) || !u.isInteger(e) || e < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + c.format(t) + ")");
					});var n = void 0 !== r ? r : 0;return i(e, t, 0, n), e;
				}, t.reshape = function (e, r) {
					var n,
					    i = t.flatten(e),
					    o = function o(e) {
						return e.reduce(function (e, t) {
							return e * t;
						});
					};if (!Array.isArray(e) || !Array.isArray(r)) throw new TypeError("Array expected");if (0 === r.length) throw new f(0, o(t.size(e)), "!=");try {
						n = a(i, r);
					} catch (n) {
						if (n instanceof f) throw new f(o(r), o(t.size(e)), "!=");throw n;
					}if (i.length > 0) throw new f(o(r), o(t.size(e)), "!=");return n;
				}, t.squeeze = function (e, r) {
					for (var n = r || t.size(e); Array.isArray(e) && 1 === e.length;) {
						e = e[0], n.shift();
					}for (var i = n.length; 1 === n[i - 1];) {
						i--;
					}return i < n.length && (e = o(e, i, 0), n.length = i), e;
				}, t.unsqueeze = function (e, r, n, i) {
					var a = i || t.size(e);if (n) for (var o = 0; o < n; o++) {
						e = [e], a.unshift(1);
					}for (e = s(e, r, 0); a.length < r;) {
						a.push(1);
					}return e;
				}, t.flatten = function (e) {
					if (!Array.isArray(e)) return e;var t = [];return e.forEach(function e(r) {
						Array.isArray(r) ? r.forEach(e) : t.push(r);
					}), t;
				}, t.isArray = Array.isArray;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var i = e.DenseMatrix,
					    o = function o(e, t, r) {
						var o = e._data,
						    u = e._size,
						    c = e._datatype,
						    f = t._data,
						    l = t._size,
						    p = t._datatype,
						    h = [];if (u.length !== l.length) throw new a(u.length, l.length);for (var m = 0; m < u.length; m++) {
							if (u[m] !== l[m]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + l + ")");h[m] = u[m];
						}var d,
						    g = r;"string" == typeof c && c === p && (d = c, t = n.convert(t, d), g = n.find(r, [d, d]));var v = h.length > 0 ? s(g, 0, h, h[0], o, f) : [];return new i({ data: v, size: h, datatype: d });
					},
					    s = function s(e, t, r, n, i, a) {
						var o = [];if (t === r.length - 1) for (var u = 0; u < n; u++) {
							o[u] = e(i[u], a[u]);
						} else for (var c = 0; c < n; c++) {
							o[c] = s(e, t + 1, r, r[t + 1], i[c], a[c]);
						}return o;
					};return o;
				}var i = r(25),
				    a = r(9),
				    o = i.string;o.isString;t.name = "algorithm13", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r) {
					if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");this.actual = e, this.expected = t, this.relation = r, this.message = "Dimension mismatch (" + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + " " + (this.relation || "!=") + " " + (Array.isArray(t) ? "[" + t.join(", ") + "]" : t) + ")", this.stack = new Error().stack;
				}n.prototype = new RangeError(), n.prototype.constructor = RangeError, n.prototype.name = "DimensionError", n.prototype.isDimensionError = !0, e.exports = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("equalScalar", { "boolean, boolean": function booleanBoolean(e, t) {
							return e === t;
						}, "number, number": function numberNumber(e, r) {
							return e === r || i(e, r, t.epsilon);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
							return e.eq(r) || a(e, r, t.epsilon);
						}, "Fraction, Fraction": function FractionFraction(e, t) {
							return e.equals(t);
						}, "Complex, Complex": function ComplexComplex(e, t) {
							return e.equals(t);
						}, "Unit, Unit": function UnitUnit(e, t) {
							if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return o(e.value, t.value);
						}, "string, string": function stringString(e, t) {
							return e === t;
						} });return o;
				}var i = r(2).nearlyEqual,
				    a = r(35);t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = r(3),
					    u = n(r(0)),
					    c = n(r(19)),
					    f = n(r(22)),
					    l = n(r(10)),
					    p = n(r(15)),
					    h = n(r(4)),
					    m = e.DenseMatrix,
					    d = e.SparseMatrix,
					    g = o("multiply", i({ "Array, Array": function ArrayArray(e, t) {
							v(a.size(e), a.size(t));var r = g(u(e), u(t));return r && r.isMatrix === !0 ? r.valueOf() : r;
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r = e.size(),
							    n = t.size();return v(r, n), 1 === r.length ? 1 === n.length ? y(e, t, r[0]) : x(e, t) : 1 === n.length ? b(e, t) : N(e, t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return g(e, u(t));
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return g(u(e, t.storage()), t);
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = p(e, t, f, !1);break;case "dense":
									r = h(e, t, f, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = p(t, e, f, !0);break;case "dense":
									r = h(t, e, f, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return h(u(e), t, f, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return h(u(t), e, f, !0).valueOf();
						}, "any, any": f, "any, any, ...any": function anyAnyAny(e, t, r) {
							for (var n = g(e, t), i = 0; i < r.length; i++) {
								n = g(n, r[i]);
							}return n;
						} }, f.signatures)),
					    v = function v(e, t) {
						switch (e.length) {case 1:
								switch (t.length) {case 1:
										if (e[0] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");break;case 2:
										if (e[0] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + e[0] + ") must match Matrix rows (" + t[0] + ")");break;default:
										throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + t.length + " dimensions)");}break;case 2:
								switch (t.length) {case 1:
										if (e[1] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + e[1] + ") must match Vector length (" + t[0] + ")");break;case 2:
										if (e[1] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + e[1] + ") must match Matrix B rows (" + t[0] + ")");break;default:
										throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + t.length + " dimensions)");}break;default:
								throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + e.length + " dimensions)");}
					},
					    y = function y(e, t, r) {
						if (0 === r) throw new Error("Cannot multiply two empty vectors");var n,
						    i = e._data,
						    a = e._datatype,
						    s = t._data,
						    u = t._datatype,
						    l = c,
						    p = f;a && u && a === u && "string" == typeof a && (n = a, l = o.find(c, [n, n]), p = o.find(f, [n, n]));for (var h = p(i[0], s[0]), m = 1; m < r; m++) {
							h = l(h, p(i[m], s[m]));
						}return h;
					},
					    x = function x(e, t) {
						switch (t.storage()) {case "dense":
								return w(e, t);}throw new Error("Not implemented");
					},
					    w = function w(e, t) {
						var r,
						    n = e._data,
						    i = e._size,
						    a = e._datatype,
						    s = t._data,
						    u = t._size,
						    l = t._datatype,
						    p = i[0],
						    h = u[1],
						    d = c,
						    g = f;a && l && a === l && "string" == typeof a && (r = a, d = o.find(c, [r, r]), g = o.find(f, [r, r]));for (var v = [], y = 0; y < h; y++) {
							for (var x = g(n[0], s[0][y]), w = 1; w < p; w++) {
								x = d(x, g(n[w], s[w][y]));
							}v[y] = x;
						}return new m({ data: v, size: [h], datatype: r });
					},
					    b = function b(e, t) {
						switch (e.storage()) {case "dense":
								return E(e, t);case "sparse":
								return O(e, t);}
					},
					    N = function N(e, t) {
						switch (e.storage()) {case "dense":
								switch (t.storage()) {case "dense":
										return M(e, t);case "sparse":
										return A(e, t);}break;case "sparse":
								switch (t.storage()) {case "dense":
										return T(e, t);case "sparse":
										return _(e, t);}}
					},
					    E = function E(e, t) {
						var r,
						    n = e._data,
						    i = e._size,
						    a = e._datatype,
						    s = t._data,
						    u = t._datatype,
						    l = i[0],
						    p = i[1],
						    h = c,
						    d = f;a && u && a === u && "string" == typeof a && (r = a, h = o.find(c, [r, r]), d = o.find(f, [r, r]));for (var g = [], v = 0; v < l; v++) {
							for (var y = n[v], x = d(y[0], s[0]), w = 1; w < p; w++) {
								x = h(x, d(y[w], s[w]));
							}g[v] = x;
						}return new m({ data: g, size: [l], datatype: r });
					},
					    M = function M(e, t) {
						var r,
						    n = e._data,
						    i = e._size,
						    a = e._datatype,
						    s = t._data,
						    u = t._size,
						    l = t._datatype,
						    p = i[0],
						    h = i[1],
						    d = u[1],
						    g = c,
						    v = f;a && l && a === l && "string" == typeof a && (r = a, g = o.find(c, [r, r]), v = o.find(f, [r, r]));for (var y = [], x = 0; x < p; x++) {
							var w = n[x];y[x] = [];for (var b = 0; b < d; b++) {
								for (var N = v(w[0], s[0][b]), E = 1; E < h; E++) {
									N = g(N, v(w[E], s[E][b]));
								}y[x][b] = N;
							}
						}return new m({ data: y, size: [p, d], datatype: r });
					},
					    A = function A(e, t) {
						var r = e._data,
						    n = e._size,
						    i = e._datatype,
						    a = t._values,
						    s = t._index,
						    u = t._ptr,
						    p = t._size,
						    h = t._datatype;if (!a) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");var m,
						    g = n[0],
						    v = p[1],
						    y = c,
						    x = f,
						    w = l,
						    b = 0;i && h && i === h && "string" == typeof i && (m = i, y = o.find(c, [m, m]), x = o.find(f, [m, m]), w = o.find(l, [m, m]), b = o.convert(0, m));for (var N = [], E = [], M = [], A = new d({ values: N, index: E, ptr: M, size: [g, v], datatype: m }), O = 0; O < v; O++) {
							M[O] = E.length;var T = u[O],
							    _ = u[O + 1];if (_ > T) for (var S = 0, C = 0; C < g; C++) {
								for (var z, k = C + 1, B = T; B < _; B++) {
									var I = s[B];S !== k ? (z = x(r[C][I], a[B]), S = k) : z = y(z, x(r[C][I], a[B]));
								}S !== k || w(z, b) || (E.push(C), N.push(z));
							}
						}return M[v] = E.length, A;
					},
					    O = function O(e, t) {
						var r = e._values,
						    n = e._index,
						    i = e._ptr,
						    a = e._datatype;if (!r) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var s,
						    u = t._data,
						    p = t._datatype,
						    h = e._size[0],
						    m = t._size[0],
						    g = [],
						    v = [],
						    y = [],
						    x = c,
						    w = f,
						    b = l,
						    N = 0;a && p && a === p && "string" == typeof a && (s = a, x = o.find(c, [s, s]), w = o.find(f, [s, s]), b = o.find(l, [s, s]), N = o.convert(0, s));var E = [],
						    M = [];y[0] = 0;for (var A = 0; A < m; A++) {
							var O = u[A];if (!b(O, N)) for (var T = i[A], _ = i[A + 1], S = T; S < _; S++) {
								var C = n[S];M[C] ? E[C] = x(E[C], w(O, r[S])) : (M[C] = !0, v.push(C), E[C] = w(O, r[S]));
							}
						}for (var z = v.length, k = 0; k < z; k++) {
							var B = v[k];g[k] = E[B];
						}return y[1] = v.length, new d({ values: g, index: v, ptr: y, size: [h, 1], datatype: s });
					},
					    T = function T(e, t) {
						var r = e._values,
						    n = e._index,
						    i = e._ptr,
						    a = e._datatype;if (!r) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var s,
						    u = t._data,
						    p = t._datatype,
						    h = e._size[0],
						    m = t._size[0],
						    g = t._size[1],
						    v = c,
						    y = f,
						    x = l,
						    w = 0;a && p && a === p && "string" == typeof a && (s = a, v = o.find(c, [s, s]), y = o.find(f, [s, s]), x = o.find(l, [s, s]), w = o.convert(0, s));for (var b = [], N = [], E = [], M = new d({ values: b, index: N, ptr: E, size: [h, g], datatype: s }), A = [], O = [], T = 0; T < g; T++) {
							E[T] = N.length;for (var _ = T + 1, S = 0; S < m; S++) {
								var C = u[S][T];if (!x(C, w)) for (var z = i[S], k = i[S + 1], B = z; B < k; B++) {
									var I = n[B];O[I] !== _ ? (O[I] = _, N.push(I), A[I] = y(C, r[B])) : A[I] = v(A[I], y(C, r[B]));
								}
							}for (var P = E[T], R = N.length, U = P; U < R; U++) {
								var q = N[U];b[U] = A[q];
							}
						}return E[g] = N.length, M;
					},
					    _ = function _(e, t) {
						var r,
						    n = e._values,
						    i = e._index,
						    a = e._ptr,
						    s = e._datatype,
						    u = t._values,
						    l = t._index,
						    p = t._ptr,
						    h = t._datatype,
						    m = e._size[0],
						    g = t._size[1],
						    v = n && u,
						    y = c,
						    x = f;s && h && s === h && "string" == typeof s && (r = s, y = o.find(c, [r, r]), x = o.find(f, [r, r]));for (var w, b, N, E, M, A, O, T, _ = v ? [] : void 0, S = [], C = [], z = new d({ values: _, index: S, ptr: C, size: [m, g], datatype: r }), k = v ? [] : void 0, B = [], I = 0; I < g; I++) {
							C[I] = S.length;var P = I + 1;for (M = p[I], A = p[I + 1], E = M; E < A; E++) {
								if (T = l[E], v) for (b = a[T], N = a[T + 1], w = b; w < N; w++) {
									O = i[w], B[O] !== P ? (B[O] = P, S.push(O), k[O] = x(u[E], n[w])) : k[O] = y(k[O], x(u[E], n[w]));
								} else for (b = a[T], N = a[T + 1], w = b; w < N; w++) {
									O = i[w], B[O] !== P && (B[O] = P, S.push(O));
								}
							}if (v) for (var R = C[I], U = S.length, q = R; q < U; q++) {
								var j = S[q];_[q] = k[j];
							}
						}return C[g] = S.length, z;
					};return g.toTex = { 2: "\\left(${args[0]}" + s.operators.multiply + "${args[1]}\\right)" }, g;
				}var i = r(6).extend,
				    a = r(7);t.name = "multiply", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, r) {
					if (Array.isArray(e)) {
						for (var i = "[", a = e.length, o = 0; o < a; o++) {
							0 != o && (i += ", "), i += n(e[o], r);
						}return i += "]";
					}return t.format(e, r);
				}var i = r(2).format,
				    a = r(505).format;t.isString = function (e) {
					return "string" == typeof e;
				}, t.endsWith = function (e, t) {
					var r = e.length - t.length,
					    n = e.length;return e.substring(r, n) === t;
				}, t.format = function (e, r) {
					if ("number" == typeof e) return i(e, r);if (e && e.isBigNumber === !0) return a(e, r);if (e && e.isFraction === !0) return r && "decimal" === r.fraction ? e.toString() : e.s * e.n + "/" + e.d;if (Array.isArray(e)) return n(e, r);if (t.isString(e)) return '"' + e + '"';if ("function" == typeof e) return e.syntax ? String(e.syntax) : "function";if (e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
						if ("function" == typeof e.format) return e.format(r);if (e && e.toString() !== {}.toString()) return e.toString();var o = [];for (var s in e) {
							e.hasOwnProperty(s) && o.push('"' + s + '": ' + t.format(e[s], r));
						}return "{" + o.join(", ") + "}";
					}return String(e);
				}, t.stringify = function (e) {
					var t = String(e).replace(/([^\\]|^)"/g, function (e, t) {
						return t + '\\"';
					});return '"' + t + '"';
				};
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o, s) {
					function u() {
						if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
					}function c(e) {
						for (var t in e) {
							if (Object.hasOwnProperty.call(e, t) && t in i) throw new Error('Scope contains an illegal symbol, "' + t + '" is a reserved keyword');
						}
					}var f = n(r(5)).compile;return u.prototype.eval = function (e) {
						return this.compile().eval(e);
					}, u.prototype.type = "Node", u.prototype.isNode = !0, u.prototype.comment = "", u.prototype.compile = function () {
						if (arguments.length > 0) throw new Error("Calling compile(math) is deprecated. Call the function as compile() instead.");var e = { math: s.expression.mathWithTransform, args: {}, _validateScope: c },
						    t = {},
						    r = f(this, e, t),
						    n = Object.keys(e).map(function (e) {
							return "    var " + e + ' = defs["' + e + '"];';
						}),
						    i = n.join(" ") + 'return {  "eval": function (scope) {    if (scope) _validateScope(scope);    scope = scope || {};    return ' + r + ";  }};",
						    a = new Function("defs", i);return a(e);
					}, u.prototype.forEach = function (e) {
						throw new Error("Cannot run forEach on a Node interface");
					}, u.prototype.map = function (e) {
						throw new Error("Cannot run map on a Node interface");
					}, u.prototype._ifNode = function (e) {
						if (!e || !e.isNode) throw new TypeError("Callback function must return a Node");return e;
					}, u.prototype.traverse = function (e) {
						function t(e, r) {
							e.forEach(function (e, n, i) {
								r(e, n, i), t(e, r);
							});
						}e(this, null, null), t(this, e);
					}, u.prototype.transform = function (e) {
						function t(e, r) {
							return e.map(function (e, n, i) {
								var a = r(e, n, i);return t(a, r);
							});
						}var r = e(this, null, null);return t(r, e);
					}, u.prototype.filter = function (e) {
						var t = [];return this.traverse(function (r, n, i) {
							e(r, n, i) && t.push(r);
						}), t;
					}, u.prototype.find = function () {
						throw new Error("Function Node.find is deprecated. Use Node.filter instead.");
					}, u.prototype.match = function () {
						throw new Error("Function Node.match is deprecated. See functions Node.filter, Node.transform, Node.traverse.");
					}, u.prototype.clone = function () {
						throw new Error("Cannot clone a Node interface");
					}, u.prototype.cloneDeep = function () {
						return this.map(function (e) {
							return e.cloneDeep();
						});
					}, u.prototype.equals = function (e) {
						return !!e && a(this, e);
					}, u.prototype.toString = function (e) {
						var t;if (e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) switch (_typeof(e.handler)) {case "object":case "undefined":
								break;case "function":
								t = e.handler(this, e);break;default:
								throw new TypeError("Object or function expected as callback");}return "undefined" != typeof t ? t : this._toString(e);
					}, u.prototype._toString = function () {
						throw new Error("_toString not implemented for " + this.type);
					}, u.prototype.toTex = function (e) {
						var t;if (e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) switch (_typeof(e.handler)) {case "object":case "undefined":
								break;case "function":
								t = e.handler(this, e);break;default:
								throw new TypeError("Object or function expected as callback");}return "undefined" != typeof t ? t : this._toTex(e);
					}, u.prototype._toTex = function (e) {
						throw new Error("_toTex not implemented for " + this.type);
					}, u.prototype.getIdentifier = function () {
						return this.type;
					}, u.prototype.getContent = function () {
						return this;
					}, u;
				}var i = r(64),
				    a = r(6).deepEqual;t.name = "Node", t.path = "expression.node", t.math = !0, t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = e.DenseMatrix,
					    o = function o(e, t, r, _o2) {
						var s = e._data,
						    u = e._size,
						    c = e._datatype,
						    f = t._values,
						    l = t._index,
						    p = t._ptr,
						    h = t._size,
						    m = t._datatype;if (u.length !== h.length) throw new i(u.length, h.length);if (u[0] !== h[0] || u[1] !== h[1]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + h + ")");if (!f) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var d,
						    g = u[0],
						    v = u[1],
						    y = 0,
						    x = r;"string" == typeof c && c === m && (d = c, y = n.convert(0, d), x = n.find(r, [d, d]));for (var w = [], b = 0; b < g; b++) {
							w[b] = [];
						}for (var N = [], E = [], M = 0; M < v; M++) {
							for (var A = M + 1, O = p[M], T = p[M + 1], _ = O; _ < T; _++) {
								var S = l[_];N[S] = _o2 ? x(f[_], s[S][M]) : x(s[S][M], f[_]), E[S] = A;
							}for (var C = 0; C < g; C++) {
								E[C] === A ? w[C][M] = N[C] : w[C][M] = _o2 ? x(y, s[C][M]) : x(s[C][M], y);
							}
						}return new a({ data: w, size: [g, v], datatype: d });
					};return o;
				}var i = r(9);t.name = "algorithm03", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(10)),
					    o = e.SparseMatrix,
					    s = function s(e, t, r, n) {
						var s = e._values,
						    u = e._index,
						    c = e._ptr,
						    f = e._size,
						    l = e._datatype;if (!s) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var p,
						    h = f[0],
						    m = f[1],
						    d = a,
						    g = 0,
						    v = r;"string" == typeof l && (p = l, d = i.find(a, [p, p]), g = i.convert(0, p), t = i.convert(t, p), v = i.find(r, [p, p]));for (var y = [], x = [], w = [], b = new o({ values: y, index: x, ptr: w, size: [h, m], datatype: p }), N = 0; N < m; N++) {
							w[N] = x.length;for (var E = c[N], M = c[N + 1], A = E; A < M; A++) {
								var O = u[A],
								    T = n ? v(t, s[A]) : v(s[A], t);d(T, g) || (x.push(O), y.push(T));
							}
						}return w[m] = x.length, b;
					};return s;
				}t.name = "algorithm11", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var i = e.DenseMatrix,
					    a = function a(e, t, r, _a) {
						var o = e._values,
						    s = e._index,
						    u = e._ptr,
						    c = e._size,
						    f = e._datatype;if (!o) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var l,
						    p = c[0],
						    h = c[1],
						    m = r;"string" == typeof f && (l = f, t = n.convert(t, l), m = n.find(r, [l, l]));for (var d = [], g = new i({ data: d, size: [p, h], datatype: l }), v = [], y = [], x = 0; x < h; x++) {
							for (var w = x + 1, b = u[x], N = u[x + 1], E = b; E < N; E++) {
								var M = s[E];v[M] = o[E], y[M] = w;
							}for (var A = 0; A < p; A++) {
								0 === x && (d[A] = []), y[A] === w ? d[A][x] = _a ? m(t, v[A]) : m(v[A], t) : d[A][x] = _a ? m(t, 0) : m(0, t);
							}
						}return g;
					};return a;
				}t.name = "algorithm12", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(0)),
					    s = n(r(19)),
					    u = r(3),
					    c = n(r(29)),
					    f = n(r(76)),
					    l = n(r(34)),
					    p = n(r(8)),
					    h = n(r(4)),
					    m = a("add", i({ "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = f(e, t, s);break;default:
											r = c(t, e, s, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = c(e, t, s, !1);break;default:
											r = p(e, t, s);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return m(o(e), o(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return m(o(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return m(e, o(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = l(e, t, s, !1);break;default:
									r = h(e, t, s, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = l(t, e, s, !0);break;default:
									r = h(t, e, s, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return h(o(e), t, s, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return h(o(t), e, s, !0).valueOf();
						}, "any, any": s, "any, any, ...any": function anyAnyAny(e, t, r) {
							for (var n = m(e, t), i = 0; i < r.length; i++) {
								n = m(n, r[i]);
							}return n;
						} }, s.signatures));return m.toTex = { 2: "\\left(${args[0]}" + u.operators.add + "${args[1]}\\right)" }, m;
				}var i = r(6).extend;t.name = "add", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(22)),
					    o = i("divide", { "number, number": function numberNumber(e, t) {
							return e / t;
						}, "Complex, Complex": function ComplexComplex(e, t) {
							return e.div(t);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
							return e.div(t);
						}, "Fraction, Fraction": function FractionFraction(e, t) {
							return e.div(t);
						}, "Unit, number | Fraction | BigNumber": function UnitNumberFractionBigNumber(e, t) {
							var r = e.clone();return r.value = o(null === r.value ? r._normalize(1) : r.value, t), r;
						}, "number | Fraction | BigNumber, Unit": function numberFractionBigNumberUnit(e, t) {
							var r = t.pow(-1);return r.value = a(null === r.value ? r._normalize(1) : r.value, e), r;
						}, "Unit, Unit": function UnitUnit(e, t) {
							return e.divide(t);
						} });return o;
				}t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var i = n("add", { "number, number": function numberNumber(e, t) {
							return e + t;
						}, "Complex, Complex": function ComplexComplex(e, t) {
							return e.add(t);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
							return e.plus(t);
						}, "Fraction, Fraction": function FractionFraction(e, t) {
							return e.add(t);
						}, "Unit, Unit": function UnitUnit(e, t) {
							if (null == e.value) throw new Error("Parameter x contains a unit with undefined value");if (null == t.value) throw new Error("Parameter y contains a unit with undefined value");if (!e.equalBase(t)) throw new Error("Units do not match");var r = e.clone();return r.value = i(r.value, t.value), r.fixPrefix = !1, r;
						} });return i;
				}t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = r(3),
					    s = n(r(0)),
					    u = n(r(19)),
					    c = n(r(32)),
					    f = n(r(29)),
					    l = n(r(14)),
					    p = n(r(59)),
					    h = n(r(34)),
					    m = n(r(8)),
					    d = n(r(4)),
					    g = a("subtract", { "number, number": function numberNumber(e, t) {
							return e - t;
						}, "Complex, Complex": function ComplexComplex(e, t) {
							return e.sub(t);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
							return e.minus(t);
						}, "Fraction, Fraction": function FractionFraction(e, t) {
							return e.sub(t);
						}, "Unit, Unit": function UnitUnit(e, t) {
							if (null == e.value) throw new Error("Parameter x contains a unit with undefined value");if (null == t.value) throw new Error("Parameter y contains a unit with undefined value");if (!e.equalBase(t)) throw new Error("Units do not match");var r = e.clone();return r.value = g(r.value, t.value), r.fixPrefix = !1, r;
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r = e.size(),
							    n = t.size();if (r.length !== n.length) throw new i(r.length, n.length);var a;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											a = p(e, t, g);break;default:
											a = l(t, e, g, !0);}break;default:
									switch (t.storage()) {case "sparse":
											a = f(e, t, g, !1);break;default:
											a = m(e, t, g);}}return a;
						}, "Array, Array": function ArrayArray(e, t) {
							return g(s(e), s(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return g(s(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return g(e, s(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = h(e, c(t), u);break;default:
									r = d(e, t, g);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = h(t, e, g, !0);break;default:
									r = d(t, e, g, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return d(s(e), t, g, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return d(s(t), e, g, !0).valueOf();
						} });return g.toTex = { 2: "\\left(${args[0]}" + o.operators.subtract + "${args[1]}\\right)" }, g;
				}var i = r(9);t.name = "subtract", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t) {
					if (s(e)) {
						if (Object.hasOwnProperty.call(e, t)) return e[t];if (!(t in e)) return;
					}if ("function" == typeof e[t] && o(e, t)) throw new Error('Cannot access method "' + t + '" as a property');throw new Error('No access to property "' + t + '"');
				}function i(e, t, r) {
					if (s(e)) {
						if (!(t in e)) return e[t] = r;if (Object.hasOwnProperty.call(e, t)) return e[t] = r;
					}throw new Error('No access to property "' + t + '"');
				}function a(e, t) {
					if (!o(e, t)) throw new Error('No access to method "' + t + '"');
				}function o(e, t) {
					return "constructor" !== t && (!(!Object.hasOwnProperty.call(e, t) || !s(e)) || u[t]);
				}function s(e) {
					return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.constructor === Object;
				}var u = { abs: !0, absoluteValue: !0, acos: !0, acosh: !0, acot: !0, acoth: !0, acsc: !0, acsch: !0, add: !0, and: !0, arg: !0, asec: !0, asech: !0, asin: !0, asinh: !0, atan: !0, atan2: !0, atanh: !0, bellNumbers: !0, bignumber: !0, bitAnd: !0, bitNot: !0, bitOr: !0, bitXor: !0, boolean: !0,
					catalan: !0, cbrt: !0, ceil: !0, chain: !0, clone: !0, cloneDeep: !0, cmp: !0, combinations: !0, compare: !0, comparedTo: !0, compile: !0, complex: !0, composition: !0, concat: !0, config: !0, conj: !0, conjugate: !0, cos: !0, cosh: !0, cosine: !0, cot: !0, coth: !0, create: !0, createUnit: !0, cross: !0, csc: !0, csch: !0, cube: !0, cubeRoot: !0, decimalPlaces: !0, deepEqual: !0, derivative: !0, det: !0, diag: !0, diagonal: !0, distance: !0, div: !0, divToInt: !0, divide: !0, dividedBy: !0, dividedToIntegerBy: !0, done: !0, dot: !0, dotDivide: !0, dotMultiply: !0, dotPow: !0, dp: !0, emit: !0, eq: !0, equal: !0, equalBase: !0, equals: !0, erf: !0, eval: !0, exp: !0, eye: !0, factorial: !0, filter: !0, fix: !0, flatten: !0, floor: !0, forEach: !0, format: !0, formatUnits: !0, fraction: !0, gamma: !0, gcd: !0, greaterThan: !0, greaterThanOrEqualTo: !0, gt: !0, gte: !0, hasBase: !0, help: !0, hyperbolicCosine: !0, hyperbolicSine: !0, hyperbolicTangent: !0, hypot: !0, im: !0, import: !0, index: !0, intersect: !0, inv: !0, inverse: !0, inverseCosine: !0, inverseHyperbolicCosine: !0, inverseHyperbolicSine: !0, inverseHyperbolicTangent: !0, inverseSine: !0, inverseTangent: !0, isFinite: !0, isInt: !0, isInteger: !0, isNaN: !0, isNeg: !0, isNegative: !0, isNumeric: !0, isPos: !0, isPositive: !0, isPrime: !0, isZero: !0, kldivergence: !0, kron: !0, larger: !0, largerEq: !0, lcm: !0, leftShift: !0, lessThan: !0, lessThanOrEqualTo: !0, ln: !0, log: !0, log10: !0, log2: !0, logarithm: !0, lsolve: !0, lt: !0, lte: !0, lup: !0, lusolve: !0, mad: !0, map: !0, matrix: !0, max: !0, mean: !0, median: !0, min: !0, minus: !0, mod: !0, mode: !0, modulo: !0, mul: !0, multinomial: !0, multiply: !0, naturalExponential: !0, naturalLogarithm: !0, neg: !0, negated: !0, noConflict: !0, norm: !0, not: !0, nthRoot: !0, number: !0, off: !0, on: !0, once: !0, ones: !0, or: !0, parse: !0, parser: !0, partitionSelect: !0, permutations: !0, pickRandom: !0, plus: !0, pow: !0, precision: !0, print: !0, prod: !0, quantileSeq: !0, random: !0, randomInt: !0, range: !0, re: !0, reshape: !0, resize: !0, rightArithShift: !0, rightLogShift: !0, round: !0, sd: !0, sec: !0, sech: !0, set: !0, sign: !0, simplify: !0, sin: !0, sine: !0, sinh: !0, size: !0, slu: !0, smaller: !0, smallerEq: !0, sort: !0, sparse: !0, splitUnit: !0, sqrt: !0, square: !0, squareRoot: !0, squeeze: !0, std: !0, stirlingS2: !0, string: !0, sub: !0, subset: !0, subtract: !0, sum: !0, swapRows: !0, tan: !0, tangent: !0, tanh: !0, times: !0, to: !0, toArray: !0, toBinary: !0, toContinued: !0, toDP: !0, toDecimalPlaces: !0, toExponential: !0, toFixed: !0, toFraction: !0, toHex: !0, toHexadecimal: !0, toJSON: !0, toLatex: !0, toNearest: !0, toNumber: !0, toNumeric: !0, toOctal: !0, toPower: !0, toPrecision: !0, toSD: !0, toSignificantDigits: !0, toString: !0, toTex: !0, toVector: !0, trace: !0, transform: !0, transpose: !0, traverse: !0, trunc: !0, truncated: !0, typed: !0, typeof: !0, unaryMinus: !0, unaryPlus: !0, unequal: !0, unit: !0, usolve: !0, valueOf: !0, var: !0, xgcd: !0, xor: !0, zeros: !0 };t.getSafeProperty = n, t.setSafeProperty = i, t.validateSafeMethod = a, t.isSafeMethod = o;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var i = n("multiplyScalar", { "number, number": function numberNumber(e, t) {
							return e * t;
						}, "Complex, Complex": function ComplexComplex(e, t) {
							return e.mul(t);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
							return e.times(t);
						}, "Fraction, Fraction": function FractionFraction(e, t) {
							return e.mul(t);
						}, "number | Fraction | BigNumber | Complex, Unit": function numberFractionBigNumberComplexUnit(e, t) {
							var r = t.clone();return r.value = null === r.value ? r._normalize(e) : i(r.value, e), r;
						}, "Unit, number | Fraction | BigNumber | Complex": function UnitNumberFractionBigNumberComplex(e, t) {
							var r = e.clone();return r.value = null === r.value ? r._normalize(t) : i(r.value, t), r;
						}, "Unit, Unit": function UnitUnit(e, t) {
							return e.multiply(t);
						} });return i;
				}t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(10)),
					    s = e.SparseMatrix,
					    u = function u(e, t, r, n) {
						var u = e._data,
						    c = e._size,
						    f = e._datatype,
						    l = t._values,
						    p = t._index,
						    h = t._ptr,
						    m = t._size,
						    d = t._datatype;if (c.length !== m.length) throw new i(c.length, m.length);if (c[0] !== m[0] || c[1] !== m[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + m + ")");if (!l) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var g,
						    v = c[0],
						    y = c[1],
						    x = o,
						    w = 0,
						    b = r;"string" == typeof f && f === d && (g = f, x = a.find(o, [g, g]), w = a.convert(0, g), b = a.find(r, [g, g]));for (var N = [], E = [], M = [], A = 0; A < y; A++) {
							M[A] = E.length;for (var O = h[A], T = h[A + 1], _ = O; _ < T; _++) {
								var S = p[_],
								    C = n ? b(l[_], u[S][A]) : b(u[S][A], l[_]);x(C, w) || (E.push(S), N.push(C));
							}
						}return M[y] = E.length, new s({ values: N, index: E, ptr: M, size: [v, y], datatype: g });
					};return u;
				}var i = r(9);t.name = "algorithm02", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = e.DenseMatrix,
					    o = function o(e, t, r) {
						var o = e._size,
						    u = e._datatype,
						    c = t._size,
						    f = t._datatype;if (o.length !== c.length) throw new i(o.length, c.length);if (o[0] !== c[0] || o[1] !== c[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + c + ")");var l,
						    p = o[0],
						    h = o[1],
						    m = 0,
						    d = r;"string" == typeof u && u === f && (l = u, m = n.convert(0, l), d = n.find(r, [l, l]));var g,
						    v,
						    y = [];for (g = 0; g < p; g++) {
							y[g] = [];
						}var x = new a({ data: y, size: [p, h], datatype: l }),
						    w = [],
						    b = [],
						    N = [],
						    E = [];for (v = 0; v < h; v++) {
							var M = v + 1;for (s(e, v, N, w, M), s(t, v, E, b, M), g = 0; g < p; g++) {
								var A = N[g] === M ? w[g] : m,
								    O = E[g] === M ? b[g] : m;y[g][v] = d(A, O);
							}
						}return x;
					},
					    s = function s(e, t, r, n, i) {
						for (var a = e._values, o = e._index, s = e._ptr, u = s[t], c = s[t + 1]; u < c; u++) {
							var f = o[u];r[f] = i, n[f] = a[u];
						}
					};return o;
				}var i = r(9);t.name = "algorithm07", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				t.array = r(7), t.boolean = r(508), t.function = r(37), t.number = r(2), t.object = r(6), t.string = r(12), t.types = r(63), t.emitter = r(138);
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("abs", { number: Math.abs, Complex: function Complex(e) {
							return e.abs();
						}, BigNumber: function BigNumber(e) {
							return e.abs();
						}, Fraction: function Fraction(e) {
							return e.abs();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a, !0);
						}, Unit: function Unit(e) {
							return e.abs();
						} });return a.toTex = { 1: "\\left|${args[0]}\\right|" }, a;
				}var i = r(1);t.name = "abs", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, s, u) {
					function c(e) {
						if (!(this instanceof c)) throw new SyntaxError("Constructor must be called with the new operator");if ("string" != typeof e) throw new TypeError('String expected for parameter "name"');this.name = e;
					}function f(e, t, r) {
						t.undef = l, t.Unit = m, t.getSafeProperty = o;var n = a(e.name);return r[e.name] ? e.name : e.name in t.math ? "(" + n + " in scope ? getSafeProperty(scope, " + n + ") : getSafeProperty(math, " + n + "))" : "(" + n + " in scope ? getSafeProperty(scope, " + n + ") : " + (m.isValuelessUnit(e.name) ? "new Unit(null, " + n + ")" : "undef(" + n + ")") + ")";
					}function l(e) {
						throw new Error("Undefined symbol " + e);
					}var p = n(r(5)).register,
					    h = (n(r(5)).compile, n(r(13))),
					    m = n(r(136));return c.prototype = new h(), c.prototype.type = "SymbolNode", c.prototype.isSymbolNode = !0, p(c.prototype.type, f), c.prototype.forEach = function (e) {}, c.prototype.map = function (e) {
						return this.clone();
					}, c.prototype.clone = function () {
						return new c(this.name);
					}, c.prototype._toString = function (e) {
						return this.name;
					}, c.prototype._toTex = function (e) {
						var t = !1;"undefined" == typeof u[this.name] && m.isValuelessUnit(this.name) && (t = !0);var r = i.toSymbol(this.name, t);return "\\" === r[0] ? r : " " + r;
					}, c;
				}var i = r(3),
				    a = r(12).stringify,
				    o = r(21).getSafeProperty;t.name = "SymbolNode", t.path = "expression.node", t.math = !0, t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(0)),
					    u = n(r(14)),
					    c = n(r(24)),
					    f = n(r(16)),
					    l = n(r(8)),
					    p = n(r(4)),
					    h = r(3),
					    m = o("larger", { "boolean, boolean": function booleanBoolean(e, t) {
							return e > t;
						}, "number, number": function numberNumber(e, r) {
							return e > r && !i(e, r, t.epsilon);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
							return e.gt(r) && !a(e, r, t.epsilon);
						}, "Fraction, Fraction": function FractionFraction(e, t) {
							return 1 === e.compare(t);
						}, "Complex, Complex": function ComplexComplex() {
							throw new TypeError("No ordering relation is defined for complex numbers");
						}, "Unit, Unit": function UnitUnit(e, t) {
							if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return m(e.value, t.value);
						}, "string, string": function stringString(e, t) {
							return e > t;
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = c(e, t, m);break;default:
											r = u(t, e, m, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = u(e, t, m, !1);break;default:
											r = l(e, t, m);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return m(s(e), s(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return m(s(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return m(e, s(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = f(e, t, m, !1);break;default:
									r = p(e, t, m, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = f(t, e, m, !0);break;default:
									r = p(t, e, m, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return p(s(e), t, m, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return p(s(t), e, m, !0).valueOf();
						} });return m.toTex = { 2: "\\left(${args[0]}" + h.operators.larger + "${args[1]}\\right)" }, m;
				}var i = r(2).nearlyEqual,
				    a = r(35);t.name = "larger", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = e.DenseMatrix,
					    o = function o(e, t, r, _o3) {
						var s = e._data,
						    u = e._size,
						    c = e._datatype,
						    f = t._values,
						    l = t._index,
						    p = t._ptr,
						    h = t._size,
						    m = t._datatype;if (u.length !== h.length) throw new i(u.length, h.length);if (u[0] !== h[0] || u[1] !== h[1]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + h + ")");if (!f) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var d,
						    g,
						    v = u[0],
						    y = u[1],
						    x = "string" == typeof c && c === m ? c : void 0,
						    w = x ? n.find(r, [x, x]) : r,
						    b = [];for (d = 0; d < v; d++) {
							b[d] = [];
						}var N = [],
						    E = [];for (g = 0; g < y; g++) {
							for (var M = g + 1, A = p[g], O = p[g + 1], T = A; T < O; T++) {
								d = l[T], N[d] = _o3 ? w(f[T], s[d][g]) : w(s[d][g], f[T]), E[d] = M;
							}for (d = 0; d < v; d++) {
								E[d] === M ? b[d][g] = N[d] : b[d][g] = s[d][g];
							}
						}return new a({ data: b, size: [v, y], datatype: x });
					};return o;
				}var i = r(9);t.name = "algorithm01", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(t, r) {
						if (1 != arguments.length && 2 != arguments.length) throw new i("parse", arguments.length, 1, 2);if (he = r && r.nodes ? r.nodes : {}, "string" == typeof t) return me = t, v();if (Array.isArray(t) || t instanceof e.Matrix) return a(t, function (e) {
							if ("string" != typeof e) throw new TypeError("String expected");return me = e, v();
						});throw new TypeError("String or matrix expected");
					}function u() {
						ge = 0, ve = me.charAt(0), we = 0, be = null;
					}function c() {
						ge++, ve = me.charAt(ge);
					}function f() {
						return me.charAt(ge - 1);
					}function l() {
						return me.charAt(ge + 1);
					}function p() {
						return me.charAt(ge + 2);
					}function h() {
						for (xe = fe.NULL, ye = "", de = ""; s.isWhitespace(ve, we);) {
							c();
						}if ("#" == ve) for (; "\n" != ve && "" != ve;) {
							de += ve, c();
						}if ("" == ve) return void (xe = fe.DELIMITER);if ("\n" == ve && !we) return xe = fe.DELIMITER, ye = ve, void c();var e = ve + l(),
						    t = e + p();if (3 == t.length && le[t]) return xe = fe.DELIMITER, ye = t, c(), c(), void c();if (2 == e.length && le[e]) return xe = fe.DELIMITER, ye = e, c(), void c();if (le[ve]) return xe = fe.DELIMITER, ye = ve, void c();if (!s.isDigitDot(ve)) {
							if (s.isAlpha(ve, f(), l())) {
								for (; s.isAlpha(ve, f(), l()) || s.isDigit(ve);) {
									ye += ve, c();
								}return void (xe = pe.hasOwnProperty(ye) ? fe.DELIMITER : fe.SYMBOL);
							}for (xe = fe.UNKNOWN; "" != ve;) {
								ye += ve, c();
							}throw W('Syntax error in part "' + ye + '"');
						}if (xe = fe.NUMBER, "." == ve) ye += ve, c(), s.isDigit(ve) || (xe = fe.DELIMITER);else {
							for (; s.isDigit(ve);) {
								ye += ve, c();
							}s.isDecimalMark(ve, l()) && (ye += ve, c());
						}for (; s.isDigit(ve);) {
							ye += ve, c();
						}if (e = l(), "E" == ve || "e" == ve) if (s.isDigit(e) || "-" == e || "+" == e) {
							if (ye += ve, c(), "+" != ve && "-" != ve || (ye += ve, c()), !s.isDigit(ve)) throw W('Digit expected, got "' + ve + '"');for (; s.isDigit(ve);) {
								ye += ve, c();
							}if (s.isDecimalMark(ve, l())) throw W('Digit expected, got "' + ve + '"');
						} else if ("." == e) throw c(), W('Digit expected, got "' + ve + '"');
					}function m() {
						do {
							h();
						} while ("\n" == ye);
					}function d() {
						we++;
					}function g() {
						we--;
					}function v() {
						u(), h();var e = y();if ("" != ye) throw xe == fe.DELIMITER ? Y("Unexpected operator " + ye) : W('Unexpected part "' + ye + '"');return e;
					}function y() {
						var e,
						    t,
						    r = [];for ("" != ye && "\n" != ye && ";" != ye && (e = x(), e.comment = de); "\n" == ye || ";" == ye;) {
							0 == r.length && e && (t = ";" != ye, r.push({ node: e, visible: t })), h(), "\n" != ye && ";" != ye && "" != ye && (e = x(), e.comment = de, t = ";" != ye, r.push({ node: e, visible: t }));
						}return r.length > 0 ? new K(r) : (e || (e = new te("undefined", "undefined"), e.comment = de), e);
					}function x() {
						var e,
						    t,
						    r,
						    n,
						    i = w();if ("=" == ye) {
							if (i && i.isSymbolNode) return e = i.name, m(), r = x(), new Q(new ce(e), r);if (i && i.isAccessorNode) return m(), r = x(), new Q(i.object, i.index, r);if (i && i.isFunctionNode && (n = !0, t = [], e = i.name, i.args.forEach(function (e, r) {
								e && e.isSymbolNode ? t[r] = e.name : n = !1;
							}), n)) return m(), r = x(), new re(e, t, r);throw W("Invalid left hand side of assignment operator =");
						}return i;
					}function w() {
						for (var e = b(); "?" == ye;) {
							var t = be;be = we, m();var r = e,
							    n = x();if (":" != ye) throw W("False part of conditional expression expected");be = null, m();var i = x();e = new ee(r, n, i), be = t;
						}return e;
					}function b() {
						for (var e = N(); "or" == ye;) {
							m(), e = new ae("or", "or", [e, N()]);
						}return e;
					}function N() {
						for (var e = E(); "xor" == ye;) {
							m(), e = new ae("xor", "xor", [e, E()]);
						}return e;
					}function E() {
						for (var e = M(); "and" == ye;) {
							m(), e = new ae("and", "and", [e, M()]);
						}return e;
					}function M() {
						for (var e = A(); "|" == ye;) {
							m(), e = new ae("|", "bitOr", [e, A()]);
						}return e;
					}function A() {
						for (var e = O(); "^|" == ye;) {
							m(), e = new ae("^|", "bitXor", [e, O()]);
						}return e;
					}function O() {
						for (var e = T(); "&" == ye;) {
							m(), e = new ae("&", "bitAnd", [e, T()]);
						}return e;
					}function T() {
						var e, t, r, n, i;for (e = _(), t = { "==": "equal", "!=": "unequal", "<": "smaller", ">": "larger", "<=": "smallerEq", ">=": "largerEq" }; ye in t;) {
							r = ye, n = t[r], m(), i = [e, _()], e = new ae(r, n, i);
						}return e;
					}function _() {
						var e, t, r, n, i;for (e = S(), t = { "<<": "leftShift", ">>": "rightArithShift", ">>>": "rightLogShift" }; ye in t;) {
							r = ye, n = t[r], m(), i = [e, S()], e = new ae(r, n, i);
						}return e;
					}function S() {
						var e, t, r, n, i;for (e = C(), t = { to: "to", in: "to" }; ye in t;) {
							r = ye, n = t[r], m(), "in" === r && "" === ye ? e = new ae("*", "multiply", [e, new ce("in")], !0) : (i = [e, C()], e = new ae(r, n, i));
						}return e;
					}function C() {
						var e,
						    t = [];if (e = ":" == ye ? new te("1", "number") : z(), ":" == ye && be !== we) {
							for (t.push(e); ":" == ye && t.length < 3;) {
								m(), ")" == ye || "]" == ye || "," == ye || "" == ye ? t.push(new ce("end")) : t.push(z());
							}e = 3 == t.length ? new ue(t[0], t[2], t[1]) : new ue(t[0], t[1]);
						}return e;
					}function z() {
						var e, t, r, n, i;for (e = k(), t = { "+": "add", "-": "subtract" }; ye in t;) {
							r = ye, n = t[r], m(), i = [e, k()], e = new ae(r, n, i);
						}return e;
					}function k() {
						var e, t, r, n, i;for (e = B(), t = e, r = { "*": "multiply", ".*": "dotMultiply", "/": "divide", "./": "dotDivide", "%": "mod", mod: "mod" };;) {
							if (ye in r) n = ye, i = r[n], m(), t = B(), e = new ae(n, i, [e, t]);else {
								if (!(xe == fe.SYMBOL || "in" == ye && e && e.isConstantNode) && (xe != fe.NUMBER || t.isConstantNode || t.isOperatorNode && "!" !== t.op) && "(" != ye) break;t = B(), e = new ae("*", "multiply", [e, t], !0);
							}
						}return e;
					}function B() {
						var e,
						    t,
						    r = { "-": "unaryMinus", "+": "unaryPlus", "~": "bitNot", not: "not" }[ye];return r ? (e = ye, m(), t = [B()], new ae(e, r, t)) : I();
					}function I() {
						var e, t, r, n;return e = P(), "^" != ye && ".^" != ye || (t = ye, r = "^" == t ? "pow" : "dotPow", m(), n = [e, B()], e = new ae(t, r, n)), e;
					}function P() {
						var e, t, r, n, i;for (e = R(), t = { "!": "factorial", "'": "transpose" }; ye in t;) {
							r = ye, n = t[r], h(), i = [e], e = new ae(r, n, i), e = q(e);
						}return e;
					}function R() {
						var e = [];if (xe == fe.SYMBOL && he[ye]) {
							var t = he[ye];if (h(), "(" == ye) {
								if (e = [], d(), h(), ")" != ye) for (e.push(x()); "," == ye;) {
									h(), e.push(x());
								}if (")" != ye) throw W("Parenthesis ) expected");g(), h();
							}return new t(e);
						}return U();
					}function U() {
						var e, t;return xe == fe.SYMBOL || xe == fe.DELIMITER && ye in pe ? (t = ye, h(), e = new ce(t), e = q(e)) : j();
					}function q(e, t) {
						for (var r; !("(" != ye && "[" != ye && "." != ye || t && t.indexOf(ye) === -1);) {
							if (r = [], "(" == ye) {
								if (!(e.isSymbolNode || e.isAccessorNode || e.isFunctionNode)) return e;if (d(), h(), ")" != ye) for (r.push(x()); "," == ye;) {
									h(), r.push(x());
								}if (")" != ye) throw W("Parenthesis ) expected");g(), h(), e = new se(e, r);
							} else if ("[" == ye) {
								if (d(), h(), "]" != ye) for (r.push(x()); "," == ye;) {
									h(), r.push(x());
								}if ("]" != ye) throw W("Parenthesis ] expected");g(), h(), e = new X(e, new ne(r));
							} else {
								if (h(), xe != fe.SYMBOL) throw W("Property name expected after dot");r.push(new te(ye)), h();var n = !0;e = new X(e, new ne(r, n));
							}
						}return e;
					}function j() {
						var e, t;return '"' == ye ? (t = L(), e = new te(t, "string"), e = q(e)) : F();
					}function L() {
						for (var e = ""; "" != ve && '"' != ve;) {
							"\\" == ve && (e += ve, c()), e += ve, c();
						}if (h(), '"' != ye) throw W('End of string " expected');return h(), e;
					}function F() {
						var e, t, r, n;if ("[" == ye) {
							if (d(), h(), "]" != ye) {
								var i = D();if (";" == ye) {
									for (r = 1, t = [i]; ";" == ye;) {
										h(), t[r] = D(), r++;
									}if ("]" != ye) throw W("End of matrix ] expected");g(), h(), n = t[0].items.length;for (var a = 1; a < r; a++) {
										if (t[a].items.length != n) throw Y("Column dimensions mismatch (" + t[a].items.length + " != " + n + ")");
									}e = new J(t);
								} else {
									if ("]" != ye) throw W("End of matrix ] expected");g(), h(), e = i;
								}
							} else g(), h(), e = new J([]);return q(e);
						}return $();
					}function D() {
						for (var e = [x()], t = 1; "," == ye;) {
							h(), e[t] = x(), t++;
						}return new J(e);
					}function $() {
						if ("{" == ye) {
							var e,
							    t = {};do {
								if (h(), "}" != ye) {
									if ('"' == ye) e = L();else {
										if (xe != fe.SYMBOL) throw W("Symbol or string expected as object key");e = ye, h();
									}if (":" != ye) throw W("Colon : expected after object key");h(), t[e] = x();
								}
							} while ("," == ye);if ("}" != ye) throw W("Comma , or bracket } expected after object value");h();var r = new ie(t);return r = q(r);
						}return G();
					}function G() {
						var e;return xe == fe.NUMBER ? (e = ye, h(), new te(e, "number")) : H();
					}function H() {
						var e;if ("(" == ye) {
							if (d(), h(), e = x(), ")" != ye) throw W("Parenthesis ) expected");return g(), h(), e = new oe(e), e = q(e);
						}return V();
					}function V() {
						throw W("" == ye ? "Unexpected end of expression" : "Value expected");
					}function Z() {
						return ge - ye.length + 1;
					}function W(e) {
						var t = Z(),
						    r = new SyntaxError(e + " (char " + t + ")");return r.char = t, r;
					}function Y(e) {
						var t = Z(),
						    r = new SyntaxError(e + " (char " + t + ")");return r.char = t, r;
					}var X = n(r(86)),
					    J = n(r(65)),
					    Q = n(r(87)),
					    K = n(r(88)),
					    ee = n(r(89)),
					    te = n(r(45)),
					    re = n(r(90)),
					    ne = n(r(91)),
					    ie = n(r(92)),
					    ae = n(r(52)),
					    oe = n(r(53)),
					    se = n(r(46)),
					    ue = n(r(66)),
					    ce = n(r(27)),
					    fe = { NULL: 0, DELIMITER: 1, NUMBER: 2, SYMBOL: 3, UNKNOWN: 4 },
					    le = { ",": !0, "(": !0, ")": !0, "[": !0, "]": !0, "{": !0, "}": !0, '"': !0, ";": !0, "+": !0, "-": !0, "*": !0, ".*": !0, "/": !0, "./": !0, "%": !0, "^": !0, ".^": !0, "~": !0, "!": !0, "&": !0, "|": !0, "^|": !0, "'": !0, "=": !0, ":": !0, "?": !0, "==": !0, "!=": !0, "<": !0, ">": !0, "<=": !0, ">=": !0, "<<": !0, ">>": !0, ">>>": !0 },
					    pe = { mod: !0, to: !0, in: !0, and: !0, xor: !0, or: !0, not: !0 },
					    he = {},
					    me = "",
					    de = "",
					    ge = 0,
					    ve = "",
					    ye = "",
					    xe = fe.NULL,
					    we = 0,
					    be = null;return s.isAlpha = function (e, t, r) {
						return s.isValidLatinOrGreek(e) || s.isValidMathSymbol(e, r) || s.isValidMathSymbol(t, e);
					}, s.isValidLatinOrGreek = function (e) {
						return (/^[a-zA-Z_\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(e)
						);
					}, s.isValidMathSymbol = function (e, t) {
						return (/^[\uD835]$/.test(e) && /^[\uDC00-\uDFFF]$/.test(t) && /^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(t)
						);
					}, s.isWhitespace = function (e, t) {
						return " " == e || "\t" == e || "\n" == e && t > 0;
					}, s.isDecimalMark = function (e, t) {
						return "." == e && "/" !== t && "*" !== t && "^" !== t;
					}, s.isDigitDot = function (e) {
						return e >= "0" && e <= "9" || "." == e;
					}, s.isDigit = function (e) {
						return e >= "0" && e <= "9";
					}, s;
				}var i = r(43),
				    a = r(1);t.name = "parse", t.path = "expression", t.factory = n;
			}, function (e, t, r) {
				var n = r(44);t.transform = function (e) {
					return e && e.isIndexError ? new n(e.index + 1, e.min + 1, void 0 !== e.max ? e.max + 1 : void 0) : e;
				};
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = r(3),
					    s = a("unaryMinus", { number: function number(e) {
							return -e;
						}, Complex: function Complex(e) {
							return e.neg();
						}, BigNumber: function BigNumber(e) {
							return e.neg();
						}, Fraction: function Fraction(e) {
							return e.neg();
						}, Unit: function Unit(e) {
							var t = e.clone();return t.value = s(e.value), t;
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, s, !0);
						} });return s.toTex = { 1: o.operators.unaryMinus + "\\left(${args[0]}\\right)" }, s;
				}var i = r(1);t.name = "unaryMinus", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(t, r) {
						var n = u(t),
						    i = n ? new e.BigNumber(0) : 0;if (c(t), r) {
							var o = f(r);return t.length > 0 ? o.resize(t, i) : o;
						}var s = [];return t.length > 0 ? a(s, t, i) : s;
					}function u(e) {
						var t = !1;return e.forEach(function (e, r, n) {
							e && e.isBigNumber === !0 && (t = !0, n[r] = e.toNumber());
						}), t;
					}function c(e) {
						e.forEach(function (e) {
							if ("number" != typeof e || !i(e) || e < 0) throw new Error("Parameters in function zeros must be positive integers");
						});
					}var f = n(r(0)),
					    l = o("zeros", { "": function _() {
							return "Array" === t.matrix ? s([]) : s([], "default");
						}, "...number | BigNumber | string": function numberBigNumberString(e) {
							var r = e[e.length - 1];if ("string" == typeof r) {
								var n = e.pop();return s(e, n);
							}return "Array" === t.matrix ? s(e) : s(e, "default");
						}, Array: s, Matrix: function Matrix(e) {
							var t = e.storage();return s(e.valueOf(), t);
						}, "Array | Matrix, string": function ArrayMatrixString(e, t) {
							return s(e.valueOf(), t);
						} });return l.toTex = void 0, l;
				}var i = r(2).isInteger,
				    a = r(7).resize;t.name = "zeros", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var i = e.DenseMatrix,
					    a = function a(e, t, r, _a2) {
						var o = e._values,
						    s = e._index,
						    u = e._ptr,
						    c = e._size,
						    f = e._datatype;if (!o) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var l,
						    p = c[0],
						    h = c[1],
						    m = r;"string" == typeof f && (l = f, t = n.convert(t, l), m = n.find(r, [l, l]));for (var d = [], g = new i({ data: d, size: [p, h], datatype: l }), v = [], y = [], x = 0; x < h; x++) {
							for (var w = x + 1, b = u[x], N = u[x + 1], E = b; E < N; E++) {
								var M = s[E];v[M] = o[E], y[M] = w;
							}for (var A = 0; A < p; A++) {
								0 === x && (d[A] = []), y[A] === w ? d[A][x] = _a2 ? m(t, v[A]) : m(v[A], t) : d[A][x] = t;
							}
						}return g;
					};return a;
				}t.name = "algorithm10", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				e.exports = function (e, t, r) {
					if (null == r) return e.eq(t);if (e.eq(t)) return !0;if (e.isNaN() || t.isNaN()) return !1;if (e.isFinite() && t.isFinite()) {
						var n = e.minus(t).abs();if (n.isZero()) return !0;var i = e.constructor.max(e.abs(), t.abs());return n.lte(i.times(r));
					}return !1;
				};
			}, function (e, t, r) {
				"use strict";
				e.exports = function e(t, r) {
					t && t.isMatrix === !0 && (t = t.valueOf());for (var n = 0, i = t.length; n < i; n++) {
						var a = t[n];Array.isArray(a) ? e(a, r) : r(a);
					}
				};
			}, function (e, t) {
				t.memoize = function (e, t) {
					return function r() {
						"object" != _typeof(r.cache) && (r.cache = {});for (var n = [], i = 0; i < arguments.length; i++) {
							n[i] = arguments[i];
						}var a = t ? t(n) : JSON.stringify(n);return a in r.cache ? r.cache[a] : r.cache[a] = e.apply(e, n);
					};
				}, t.maxArgumentCount = function (e) {
					return Object.keys(e.signatures || {}).reduce(function (e, t) {
						var r = (t.match(/,/g) || []).length + 1;return Math.max(e, r);
					}, -1);
				};
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(18)),
					    s = n(r(11)),
					    u = n(r(114)),
					    c = n(r(0)),
					    f = n(r(15)),
					    l = n(r(4)),
					    p = a("divide", i({ "Array | Matrix, Array | Matrix": function ArrayMatrixArrayMatrix(e, t) {
							return s(e, u(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = f(e, t, o, !1);break;case "dense":
									r = l(e, t, o, !1);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return l(c(e), t, o, !1).valueOf();
						}, "any, Array | Matrix": function anyArrayMatrix(e, t) {
							return s(e, u(t));
						} }, o.signatures));return p.toTex = { 2: "\\frac{${args[0]}}{${args[1]}}" }, p;
				}var i = r(6).extend;t.name = "divide", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(r, n) {
						if (t.predictable && !i(n) && r < 0) try {
							var a = m(n),
							    o = d(a);if ((n === o || Math.abs((n - o) / n) < 1e-14) && a.d % 2 === 1) return (a.n % 2 === 0 ? 1 : -1) * Math.pow(-r, n);
						} catch (e) {}return r * r < 1 && n === 1 / 0 || r * r > 1 && n === -(1 / 0) ? 0 : t.predictable && (r < -1 && n === 1 / 0 || r > -1 && r < 0 && n === -(1 / 0)) ? NaN : i(n) || r >= 0 || t.predictable ? Math.pow(r, n) : new e.Complex(r, 0).pow(n, 0);
					}function u(e, t) {
						if (!i(t) || t < 0) throw new TypeError("For A^b, b must be a positive integer (value is " + t + ")");var r = a(e);if (2 != r.length) throw new Error("For A^b, A must be 2 dimensional (A has " + r.length + " dimensions)");if (r[0] != r[1]) throw new Error("For A^b, A must be square (size is " + r[0] + "x" + r[1] + ")");for (var n = l(r[0]).valueOf(), o = e; t >= 1;) {
							1 == (1 & t) && (n = p(o, n)), t >>= 1, o = p(o, o);
						}return n;
					}function c(e, t) {
						return h(u(e.valueOf(), t));
					}var f = r(3),
					    l = n(r(54)),
					    p = n(r(11)),
					    h = n(r(0)),
					    m = n(r(131)),
					    d = n(r(78)),
					    g = o("pow", { "number, number": s, "Complex, Complex": function ComplexComplex(e, t) {
							return e.pow(t);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(r, n) {
							return n.isInteger() || r >= 0 || t.predictable ? r.pow(n) : new e.Complex(r.toNumber(), 0).pow(n.toNumber(), 0);
						}, "Fraction, Fraction": function FractionFraction(e, r) {
							if (1 !== r.d) {
								if (t.predictable) throw new Error("Function pow does not support non-integer exponents for fractions.");return s(e.valueOf(), r.valueOf());
							}return e.pow(r);
						}, "Array, number": u, "Array, BigNumber": function ArrayBigNumber(e, t) {
							return u(e, t.toNumber());
						}, "Matrix, number": c, "Matrix, BigNumber": function MatrixBigNumber(e, t) {
							return c(e, t.toNumber());
						}, "Unit, number": function UnitNumber(e, t) {
							return e.pow(t);
						} });return g.toTex = { 2: "\\left(${args[0]}\\right)" + f.operators.pow + "{${args[1]}}" }, g;
				}var i = r(2).isInteger,
				    a = r(7).size;t.name = "pow", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(0)),
					    u = n(r(14)),
					    c = n(r(24)),
					    f = n(r(16)),
					    l = n(r(8)),
					    p = n(r(4)),
					    h = r(3),
					    m = o("smaller", { "boolean, boolean": function booleanBoolean(e, t) {
							return e < t;
						}, "number, number": function numberNumber(e, r) {
							return e < r && !i(e, r, t.epsilon);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
							return e.lt(r) && !a(e, r, t.epsilon);
						}, "Fraction, Fraction": function FractionFraction(e, t) {
							return e.compare(t) === -1;
						}, "Complex, Complex": function ComplexComplex(e, t) {
							throw new TypeError("No ordering relation is defined for complex numbers");
						}, "Unit, Unit": function UnitUnit(e, t) {
							if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return m(e.value, t.value);
						}, "string, string": function stringString(e, t) {
							return e < t;
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = c(e, t, m);break;default:
											r = u(t, e, m, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = u(e, t, m, !1);break;default:
											r = l(e, t, m);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return m(s(e), s(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return m(s(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return m(e, s(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = f(e, t, m, !1);break;default:
									r = p(e, t, m, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = f(t, e, m, !0);break;default:
									r = p(t, e, m, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return p(s(e), t, m, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return p(s(t), e, m, !0).valueOf();
						} });return m.toTex = { 2: "\\left(${args[0]}" + h.operators.smaller + "${args[1]}\\right)" }, m;
				}var i = r(2).nearlyEqual,
				    a = r(35);t.name = "smaller", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("isInteger", { number: a.isInteger, BigNumber: function BigNumber(e) {
							return e.isInt();
						}, Fraction: function Fraction(e) {
							return 1 === e.d && isFinite(e.n);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, o);
						} });return o;
				}var i = r(1),
				    a = r(2);t.name = "isInteger", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				e.exports = function (e) {
					return Array.isArray(e) || e && e.isMatrix === !0;
				};
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, i) {
					if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");this.fn = e, this.count = t, this.min = r, this.max = i, this.message = "Wrong number of arguments in function " + e + " (" + t + " provided, " + r + (void 0 != i ? "-" + i : "") + " expected)", this.stack = new Error().stack;
				}n.prototype = new Error(), n.prototype.constructor = Error, n.prototype.name = "ArgumentsError", n.prototype.isArgumentsError = !0, e.exports = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r) {
					if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");this.index = e, arguments.length < 3 ? (this.min = 0, this.max = t) : (this.min = t, this.max = r), void 0 !== this.min && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : void 0 !== this.max && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
				}n.prototype = new RangeError(), n.prototype.constructor = RangeError, n.prototype.name = "IndexError", n.prototype.isIndexError = !0, e.exports = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(e, t) {
						if (!(this instanceof s)) throw new SyntaxError("Constructor must be called with the new operator");if (t) {
							if ("string" != typeof t) throw new TypeError('String expected for parameter "valueType"');if ("string" != typeof e) throw new TypeError('String expected for parameter "value"');this.value = e, this.valueType = t;
						} else this.value = e + "", this.valueType = i(e);if (!p[this.valueType]) throw new TypeError('Unsupported type of value "' + this.valueType + '"');
					}function u(e, r, n) {
						switch (e.valueType) {case "number":
								return "BigNumber" === t.number ? "math.bignumber(" + a(e.value) + ")" : "Fraction" === t.number ? "math.fraction(" + a(e.value) + ")" : (c(e.value), e.value.replace(/^(0*)[0-9]/, function (e, t) {
									return e.substring(t.length);
								}));case "string":
								return a(e.value);case "boolean":
								return "true" === String(e.value) ? "true" : "false";case "undefined":
								return "undefined";case "null":
								return "null";default:
								throw new TypeError('Unsupported type of constant "' + e.valueType + '"');}
					}function c(e) {
						if (!/^[\-+]?((\d+\.?\d*)|(\d*\.?\d+))([eE][+\-]?\d+)?$/.test(e)) throw new Error('Invalid numeric value "' + e + '"');
					}var f = n(r(5)).register,
					    l = (n(r(5)).compile, n(r(13))),
					    p = { number: !0, string: !0, boolean: !0, undefined: !0, null: !0 };return s.prototype = new l(), s.prototype.type = "ConstantNode", s.prototype.isConstantNode = !0, f(s.prototype.type, u), s.prototype.forEach = function (e) {}, s.prototype.map = function (e) {
						return this.clone();
					}, s.prototype.clone = function () {
						return new s(this.value, this.valueType);
					}, s.prototype._toString = function (e) {
						switch (this.valueType) {case "string":
								return a(this.value);default:
								return this.value;}
					}, s.prototype._toTex = function (e) {
						var t,
						    r = this.value;switch (this.valueType) {case "string":
								return "\\mathtt{" + a(r) + "}";case "number":
								return t = r.toLowerCase().indexOf("e"), t !== -1 ? r.substring(0, t) + "\\cdot10^{" + r.substring(t + 1) + "}" : r;default:
								return r;}
					}, s;
				}var i = r(63).type,
				    a = r(12).stringify;t.name = "ConstantNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, u, c) {
					function f(e, t) {
						if (!(this instanceof f)) throw new SyntaxError("Constructor must be called with the new operator");if ("string" == typeof e && (e = new v(e)), !e || !e.isNode) throw new TypeError('Node expected as parameter "fn"');if (!Array.isArray(t) || !t.every(function (e) {
							return e && e.isNode;
						})) throw new TypeError('Array containing Nodes expected for parameter "args"');this.fn = e, this.args = t || [], Object.defineProperty(this, "name", { get: function () {
								return this.fn.name || "";
							}.bind(this), set: function set() {
								throw new Error("Cannot assign a new name, name is read-only");
							} });var r = function r() {
							throw new Error("Property `FunctionNode.object` is deprecated, use `FunctionNode.fn` instead");
						};Object.defineProperty(this, "object", { get: r, set: r });
					}function l(e, t, r) {
						var n,
						    i = d(e.fn, t, r),
						    o = e.args.map(function (e) {
							return d(e, t, r);
						}),
						    u = p(t, r);if (e.fn.isSymbolNode) {
							var c = e.fn.name,
							    f = t.math[c],
							    l = "function" == typeof f && 1 == f.rawArgs;return l ? (n = e._getUniqueArgumentsName(t), t[n] = e.args, i + "(" + n + ", math, " + u + ")") : i + "(" + o.join(", ") + ")";
						}if (e.fn.isAccessorNode && e.fn.index.isObjectProperty()) {
							n = e._getUniqueArgumentsName(t), t[n] = e.args, t.validateSafeMethod = s;var h = d(e.fn.object, t, r),
							    m = a(e.fn.index.getObjectProperty());return "(function () {var object = " + h + ";validateSafeMethod(object, " + m + ");return (object[" + m + "] && object[" + m + "].rawArgs)  ? object[" + m + "](" + n + ", math, " + u + ") : object[" + m + "](" + o.join(", ") + ")})()";
						}return n = e._getUniqueArgumentsName(t), t[n] = e.args, "(function () {var fn = " + i + ";return (fn && fn.rawArgs)  ? fn(" + n + ", math, " + u + ") : fn(" + o.join(", ") + ")})()";
					}function p(e, t) {
						var r = Object.keys(t);if (0 === r.length) return "scope";e.extend = o;var n = r.map(function (e) {
							return a(e) + ": " + e;
						}).join(", ");return "extend(extend({}, scope), {" + n + "})";
					}function h(e, t, r) {
						for (var n, i = "", a = new RegExp("\\$(?:\\{([a-z_][a-z_0-9]*)(?:\\[([0-9]+)\\])?\\}|\\$)", "ig"), o = 0; null !== (n = a.exec(e));) {
							if (i += e.substring(o, n.index), o = n.index, "$$" === n[0]) i += "$", o++;else {
								o += n[0].length;var s = t[n[1]];if (!s) throw new ReferenceError("Template: Property " + n[1] + " does not exist.");if (void 0 === n[2]) switch (typeof s === "undefined" ? "undefined" : _typeof(s)) {case "string":
										i += s;break;case "object":
										if (s.isNode) i += s.toTex(r);else {
											if (!Array.isArray(s)) throw new TypeError("Template: " + n[1] + " has to be a Node, String or array of Nodes");i += s.map(function (e, t) {
												if (e && e.isNode) return e.toTex(r);throw new TypeError("Template: " + n[1] + "[" + t + "] is not a Node.");
											}).join(",");
										}break;default:
										throw new TypeError("Template: " + n[1] + " has to be a Node, String or array of Nodes");} else {
									if (!s[n[2]] || !s[n[2]].isNode) throw new TypeError("Template: " + n[1] + "[" + n[2] + "] is not a Node.");i += s[n[2]].toTex(r);
								}
							}
						}return i += e.slice(o);
					}var m = n(r(5)).register,
					    d = n(r(5)).compile,
					    g = n(r(13)),
					    v = n(r(27));f.prototype = new g(), f.prototype.type = "FunctionNode", f.prototype.isFunctionNode = !0, m(f.prototype.type, l), f.prototype._getUniqueArgumentsName = function (e) {
						var t,
						    r = 0;do {
							t = "args" + r, r++;
						} while (t in e);return t;
					}, f.prototype.forEach = function (e) {
						for (var t = 0; t < this.args.length; t++) {
							e(this.args[t], "args[" + t + "]", this);
						}
					}, f.prototype.map = function (e) {
						for (var t = this.fn.map(e), r = [], n = 0; n < this.args.length; n++) {
							r[n] = this._ifNode(e(this.args[n], "args[" + n + "]", this));
						}return new f(t, r);
					}, f.prototype.clone = function () {
						return new f(this.fn, this.args.slice(0));
					};var y = f.prototype.toString;f.prototype.toString = function (e) {
						var t,
						    r = this.fn.toString(e);return e && "object" == _typeof(e.handler) && e.handler.hasOwnProperty(r) && (t = e.handler[r](this, e)), "undefined" != typeof t ? t : y.call(this, e);
					}, f.prototype._toString = function (e) {
						var t = this.args.map(function (t) {
							return t.toString(e);
						});return this.fn.toString(e) + "(" + t.join(", ") + ")";
					};var x = f.prototype.toTex;return f.prototype.toTex = function (e) {
						var t;return e && "object" == _typeof(e.handler) && e.handler.hasOwnProperty(this.name) && (t = e.handler[this.name](this, e)), "undefined" != typeof t ? t : x.call(this, e);
					}, f.prototype._toTex = function (e) {
						var t,
						    r = this.args.map(function (t) {
							return t.toTex(e);
						});!c[this.name] || "function" != typeof c[this.name].toTex && "object" != _typeof(c[this.name].toTex) && "string" != typeof c[this.name].toTex || (t = c[this.name].toTex);var n;switch (typeof t === "undefined" ? "undefined" : _typeof(t)) {case "function":
								n = t(this, e);break;case "string":
								n = h(t, this, e);break;case "object":
								switch (_typeof(t[r.length])) {case "function":
										n = t[r.length](this, e);break;case "string":
										n = h(t[r.length], this, e);}}return "undefined" != typeof n ? n : h(i.defaultTemplate, this, e);
					}, f.prototype.getIdentifier = function () {
						return this.type + ":" + this.name;
					}, f;
				}var i = r(3),
				    a = r(12).stringify,
				    o = r(6).extend,
				    s = r(21).validateSafeMethod;t.name = "FunctionNode", t.path = "expression.node", t.math = !0, t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t) {
					var r = e;"keep" !== t && (r = e.getContent());for (var n = r.getIdentifier(), i = 0; i < o.length; i++) {
						if (n in o[i]) return i;
					}return null;
				}function i(e, t) {
					var r = e;"keep" !== t && (r = e.getContent());var i = r.getIdentifier(),
					    a = n(r, t);if (null === a) return null;var s = o[a][i];if (s.hasOwnProperty("associativity")) {
						if ("left" === s.associativity) return "left";if ("right" === s.associativity) return "right";throw Error("'" + i + "' has the invalid associativity '" + s.associativity + "'.");
					}return null;
				}function a(e, t, r) {
					var i = e,
					    a = t;if ("keep" !== r) var i = e.getContent(),
					    a = t.getContent();var s = i.getIdentifier(),
					    u = a.getIdentifier(),
					    c = n(i, r);if (null === c) return null;var f = o[c][s];if (f.hasOwnProperty("associativeWith") && f.associativeWith instanceof Array) {
						for (var l = 0; l < f.associativeWith.length; l++) {
							if (f.associativeWith[l] === u) return !0;
						}return !1;
					}return null;
				}var o = [{ AssignmentNode: {}, FunctionAssignmentNode: {} }, { ConditionalNode: { latexLeftParens: !1, latexRightParens: !1, latexParens: !1 } }, { "OperatorNode:or": { associativity: "left", associativeWith: [] } }, { "OperatorNode:xor": { associativity: "left", associativeWith: [] } }, { "OperatorNode:and": { associativity: "left", associativeWith: [] } }, { "OperatorNode:bitOr": { associativity: "left", associativeWith: [] } }, { "OperatorNode:bitXor": { associativity: "left", associativeWith: [] } }, { "OperatorNode:bitAnd": { associativity: "left", associativeWith: [] } }, { "OperatorNode:equal": { associativity: "left", associativeWith: [] }, "OperatorNode:unequal": { associativity: "left", associativeWith: [] }, "OperatorNode:smaller": { associativity: "left", associativeWith: [] }, "OperatorNode:larger": { associativity: "left", associativeWith: [] }, "OperatorNode:smallerEq": { associativity: "left", associativeWith: [] }, "OperatorNode:largerEq": { associativity: "left", associativeWith: [] } }, { "OperatorNode:leftShift": { associativity: "left", associativeWith: [] }, "OperatorNode:rightArithShift": { associativity: "left", associativeWith: [] }, "OperatorNode:rightLogShift": { associativity: "left", associativeWith: [] } }, { "OperatorNode:to": { associativity: "left", associativeWith: [] } }, { RangeNode: {} }, { "OperatorNode:add": { associativity: "left", associativeWith: ["OperatorNode:add", "OperatorNode:subtract"] }, "OperatorNode:subtract": { associativity: "left", associativeWith: [] } }, { "OperatorNode:multiply": { associativity: "left", associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "Operator:dotMultiply", "Operator:dotDivide"] }, "OperatorNode:divide": { associativity: "left", associativeWith: [], latexLeftParens: !1, latexRightParens: !1, latexParens: !1 }, "OperatorNode:dotMultiply": { associativity: "left", associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "OperatorNode:dotMultiply", "OperatorNode:doDivide"] }, "OperatorNode:dotDivide": { associativity: "left", associativeWith: [] }, "OperatorNode:mod": { associativity: "left", associativeWith: [] } }, { "OperatorNode:unaryPlus": { associativity: "right" }, "OperatorNode:unaryMinus": { associativity: "right" }, "OperatorNode:bitNot": { associativity: "right" }, "OperatorNode:not": { associativity: "right" } }, { "OperatorNode:pow": { associativity: "right", associativeWith: [], latexRightParens: !1 }, "OperatorNode:dotPow": { associativity: "right", associativeWith: [] } }, { "OperatorNode:factorial": { associativity: "left" } }, { "OperatorNode:transpose": { associativity: "left" } }];e.exports.properties = o, e.exports.getPrecedence = n, e.exports.getAssociativity = i, e.exports.isAssociativeWith = a;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					function a(r) {
						return r >= 0 || t.predictable ? Math.sqrt(r) : new e.Complex(r, 0).sqrt();
					}var o = n("sqrt", { number: a, Complex: function Complex(e) {
							return e.sqrt();
						}, BigNumber: function BigNumber(e) {
							return !e.isNegative() || t.predictable ? e.sqrt() : a(e.toNumber());
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, o, !0);
						}, Unit: function Unit(e) {
							return e.pow(.5);
						} });return o.toTex = { 1: "\\sqrt{${args[0]}}" }, o;
				}var i = r(1);t.name = "sqrt", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(0)),
					    u = n(r(14)),
					    c = n(r(59)),
					    f = n(r(16)),
					    l = n(r(8)),
					    p = n(r(4)),
					    h = o("compare", { "boolean, boolean": function booleanBoolean(e, t) {
							return e === t ? 0 : e > t ? 1 : -1;
						}, "number, number": function numberNumber(e, r) {
							return e === r || i(e, r, t.epsilon) ? 0 : e > r ? 1 : -1;
						}, "BigNumber, BigNumber": function BigNumberBigNumber(r, n) {
							return r.eq(n) || a(r, n, t.epsilon) ? new e.BigNumber(0) : new e.BigNumber(r.cmp(n));
						}, "Fraction, Fraction": function FractionFraction(t, r) {
							return new e.Fraction(t.compare(r));
						}, "Complex, Complex": function ComplexComplex() {
							throw new TypeError("No ordering relation is defined for complex numbers");
						}, "Unit, Unit": function UnitUnit(e, t) {
							if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return h(e.value, t.value);
						}, "string, string": function stringString(e, t) {
							return e === t ? 0 : e > t ? 1 : -1;
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = c(e, t, h);break;default:
											r = u(t, e, h, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = u(e, t, h, !1);break;default:
											r = l(e, t, h);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return h(s(e), s(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return h(s(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return h(e, s(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = f(e, t, h, !1);break;default:
									r = p(e, t, h, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = f(t, e, h, !0);break;default:
									r = p(t, e, h, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return p(s(e), t, h, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return p(s(t), e, h, !0).valueOf();
						} });return h.toTex = void 0, h;
				}var i = r(2).nearlyEqual,
				    a = r(35);t.name = "compare", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("isNegative", { number: function number(e) {
							return e < 0;
						}, BigNumber: function BigNumber(e) {
							return e.isNeg() && !e.isZero() && !e.isNaN();
						}, Fraction: function Fraction(e) {
							return e.s < 0;
						}, Unit: function Unit(e) {
							return a(e.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a;
				}var i = r(1);r(2);t.name = "isNegative", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("isPositive", { number: function number(e) {
							return e > 0;
						}, BigNumber: function BigNumber(e) {
							return !e.isNeg() && !e.isZero() && !e.isNaN();
						}, Fraction: function Fraction(e) {
							return e.s > 0 && e.n > 0;
						}, Unit: function Unit(e) {
							return a(e.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a;
				}var i = r(1);r(2);t.name = "isPositive", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o, s) {
					function u(e, t, r, n) {
						if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");if ("string" != typeof e) throw new TypeError('string expected for parameter "op"');if ("string" != typeof t) throw new TypeError('string expected for parameter "fn"');if (!Array.isArray(r) || !r.every(function (e) {
							return e && e.isNode;
						})) throw new TypeError('Array containing Nodes expected for parameter "args"');this.implicit = n === !0, this.op = e, this.fn = t, this.args = r || [];
					}function c(e, t, r) {
						if (!t.math[e.fn]) throw new Error("Function " + e.fn + ' missing in provided namespace "math"');var n = e.args.map(function (e) {
							return p(e, t, r);
						});return "math." + e.fn + "(" + n.join(", ") + ")";
					}function f(e, t, r, n) {
						var i = a.getPrecedence(e, t),
						    o = a.getAssociativity(e, t);if ("all" === t || r.length > 2 && "OperatorNode:add" !== e.getIdentifier() && "OperatorNode:multiply" !== e.getIdentifier()) {
							var s = r.map(function (e) {
								switch (e.getContent().type) {case "ArrayNode":case "ConstantNode":case "SymbolNode":case "ParenthesisNode":
										return !1;default:
										return !0;}
							});return s;
						}if (0 === r.length) return [];if (1 === r.length) {
							var u = a.getPrecedence(r[0], t);if (n && null !== u) {
								var c, f;if ("keep" === t ? (c = r[0].getIdentifier(), f = e.getIdentifier()) : (c = r[0].getContent().getIdentifier(), f = e.getContent().getIdentifier()), a.properties[i][f].latexLeftParens === !1) return [!1];if (a.properties[u][c].latexParens === !1) return [!1];
							}return null === u ? [!1] : u <= i ? [!0] : [!1];
						}if (2 === r.length) {
							var l,
							    p = a.getPrecedence(r[0], t),
							    h = a.isAssociativeWith(e, r[0], t);l = null !== p && (p === i && "right" === o && !h || p < i);var m,
							    d = a.getPrecedence(r[1], t),
							    g = a.isAssociativeWith(e, r[1], t);if (m = null !== d && (d === i && "left" === o && !g || d < i), n) {
								var f, v, y;"keep" === t ? (f = e.getIdentifier(), v = e.args[0].getIdentifier(), y = e.args[1].getIdentifier()) : (f = e.getContent().getIdentifier(), v = e.args[0].getContent().getIdentifier(), y = e.args[1].getContent().getIdentifier()), null !== p && (a.properties[i][f].latexLeftParens === !1 && (l = !1), a.properties[p][v].latexParens === !1 && (l = !1)), null !== d && (a.properties[i][f].latexRightParens === !1 && (m = !1), a.properties[d][y].latexParens === !1 && (m = !1));
							}return [l, m];
						}if (r.length > 2 && ("OperatorNode:add" === e.getIdentifier() || "OperatorNode:multiply" === e.getIdentifier())) {
							var x = r.map(function (r) {
								var n = a.getPrecedence(r, t),
								    s = a.isAssociativeWith(e, r, t),
								    u = a.getAssociativity(r, t);return null !== n && (i === n && o === u && !s || n < i);
							});return x;
						}
					}var l = n(r(5)).register,
					    p = n(r(5)).compile,
					    h = n(r(13));n(r(45)), n(r(27)), n(r(46));return u.prototype = new h(), u.prototype.type = "OperatorNode", u.prototype.isOperatorNode = !0, l(u.prototype.type, c), u.prototype.forEach = function (e) {
						for (var t = 0; t < this.args.length; t++) {
							e(this.args[t], "args[" + t + "]", this);
						}
					}, u.prototype.map = function (e) {
						for (var t = [], r = 0; r < this.args.length; r++) {
							t[r] = this._ifNode(e(this.args[r], "args[" + r + "]", this));
						}return new u(this.op, this.fn, t);
					}, u.prototype.clone = function () {
						return new u(this.op, this.fn, this.args.slice(0), this.implicit);
					}, u.prototype._toString = function (e) {
						var t = e && e.parenthesis ? e.parenthesis : "keep",
						    r = e && e.implicit ? e.implicit : "hide",
						    n = this.args,
						    i = f(this, t, n, !1);if (1 === n.length) {
							var o = a.getAssociativity(this, t),
							    s = n[0].toString(e);return i[0] && (s = "(" + s + ")"), "right" === o ? this.op + s : "left" === o ? s + this.op : s + this.op;
						}if (2 == n.length) {
							var u = n[0].toString(e),
							    c = n[1].toString(e);return i[0] && (u = "(" + u + ")"), i[1] && (c = "(" + c + ")"), this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" == r ? u + " " + c : u + " " + this.op + " " + c;
						}if (n.length > 2 && ("OperatorNode:add" === this.getIdentifier() || "OperatorNode:multiply" === this.getIdentifier())) {
							var l = n.map(function (t, r) {
								return t = t.toString(e), i[r] && (t = "(" + t + ")"), t;
							});return this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" === r ? l.join(" ") : l.join(" " + this.op + " ");
						}return this.fn + "(" + this.args.join(", ") + ")";
					}, u.prototype._toTex = function (e) {
						var t = e && e.parenthesis ? e.parenthesis : "keep",
						    r = e && e.implicit ? e.implicit : "hide",
						    n = this.args,
						    o = f(this, t, n, !0),
						    s = i.operators[this.fn];if (s = "undefined" == typeof s ? this.op : s, 1 === n.length) {
							var u = a.getAssociativity(this, t),
							    c = n[0].toTex(e);return o[0] && (c = "\\left(" + c + "\\right)"), "right" === u ? s + c : "left" === u ? c + s : c + s;
						}if (2 === n.length) {
							var l = n[0],
							    p = l.toTex(e);o[0] && (p = "\\left(" + p + "\\right)");var h = n[1],
							    m = h.toTex(e);o[1] && (m = "\\left(" + m + "\\right)");var d;switch (d = "keep" === t ? l.getIdentifier() : l.getContent().getIdentifier(), this.getIdentifier()) {case "OperatorNode:divide":
									return s + "{" + p + "}{" + m + "}";case "OperatorNode:pow":
									switch (p = "{" + p + "}", m = "{" + m + "}", d) {case "ConditionalNode":case "OperatorNode:divide":
											p = "\\left(" + p + "\\right)";}case "OperatorNode:multiply":
									if (this.implicit && "hide" === r) return p + "~" + m;}return p + s + m;
						}if (n.length > 2 && ("OperatorNode:add" === this.getIdentifier() || "OperatorNode:multiply" === this.getIdentifier())) {
							var g = n.map(function (t, r) {
								return t = t.toTex(e), o[r] && (t = "\\left(" + t + "\\right)"), t;
							});return "OperatorNode:multiply" === this.getIdentifier() && this.implicit ? g.join("~") : g.join(s);
						}return "\\mathrm{" + this.fn + "}\\left(" + n.map(function (t) {
							return t.toTex(e);
						}).join(",") + "\\right)";
					}, u.prototype.getIdentifier = function () {
						return this.type + ":" + this.fn;
					}, u;
				}var i = r(3),
				    a = r(47);t.name = "OperatorNode", t.path = "expression.node", t.math = !0, t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e) {
						if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (!e || !e.isNode) throw new TypeError('Node expected for parameter "content"');this.content = e;
					}function o(e, t, r) {
						return u(e.content, t, r);
					}var s = n(r(5)).register,
					    u = n(r(5)).compile,
					    c = n(r(13));return a.prototype = new c(), a.prototype.type = "ParenthesisNode", a.prototype.isParenthesisNode = !0, s(a.prototype.type, o), a.prototype.getContent = function () {
						return this.content.getContent();
					}, a.prototype.forEach = function (e) {
						e(this.content, "content", this);
					}, a.prototype.map = function (e) {
						var t = e(this.content, "content", this);return new a(t);
					}, a.prototype.clone = function () {
						return new a(this.content);
					}, a.prototype._toString = function (e) {
						return !e || e && !e.parenthesis || e && "keep" === e.parenthesis ? "(" + this.content.toString(e) + ")" : this.content.toString(e);
					}, a.prototype._toTex = function (e) {
						return !e || e && !e.parenthesis || e && "keep" === e.parenthesis ? "\\left(" + this.content.toTex(e) + "\\right)" : this.content.toTex(e);
					}, a;
				}t.name = "ParenthesisNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(e, t) {
						switch (e.length) {case 0:
								return t ? c(t) : [];case 1:
								return u(e[0], e[0], t);case 2:
								return u(e[0], e[1], t);default:
								throw new Error("Vector containing two values expected");}
					}function u(t, r, n) {
						var o = t && t.isBigNumber === !0 ? e.BigNumber : r && r.isBigNumber === !0 ? e.BigNumber : null;if (t && t.isBigNumber === !0 && (t = t.toNumber()), r && r.isBigNumber === !0 && (r = r.toNumber()), !a(t) || t < 1) throw new Error("Parameters in function eye must be positive integers");if (!a(r) || r < 1) throw new Error("Parameters in function eye must be positive integers");var s = o ? new e.BigNumber(1) : 1,
						    u = o ? new o(0) : 0,
						    c = [t, r];if (n) {
							var f = e.Matrix.storage(n);return f.diagonal(c, s, 0, u);
						}for (var l = i.resize([], c, u), p = t < r ? t : r, h = 0; h < p; h++) {
							l[h][h] = s;
						}return l;
					}var c = n(r(0)),
					    f = o("eye", { "": function _() {
							return "Matrix" === t.matrix ? c([]) : [];
						}, string: function string(e) {
							return c(e);
						}, "number | BigNumber": function numberBigNumber(e) {
							return u(e, e, "Matrix" === t.matrix ? "default" : void 0);
						}, "number | BigNumber, string": function numberBigNumberString(e, t) {
							return u(e, e, t);
						}, "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(e, r) {
							return u(e, r, "Matrix" === t.matrix ? "default" : void 0);
						}, "number | BigNumber, number | BigNumber, string": function numberBigNumberNumberBigNumberString(e, t, r) {
							return u(e, t, r);
						}, Array: function Array(e) {
							return s(e);
						}, "Array, string": function ArrayString(e, t) {
							return s(e, t);
						}, Matrix: function Matrix(e) {
							return s(e.valueOf(), e.storage());
						}, "Matrix, string": function MatrixString(e, t) {
							return s(e.valueOf(), t);
						} });return f.toTex = void 0, f;
				}var i = r(7),
				    a = r(2).isInteger;t.name = "eye", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, u) {
					function c(e, t) {
						if (!t || t.isIndex !== !0) throw new TypeError("Index expected");if (1 != t.size().length) throw new f(t.size().length, 1);var r = e.length;s(t.min()[0], r), s(t.max()[0], r);var n = t.dimension(0),
						    i = "";return n.forEach(function (t) {
							i += e.charAt(t);
						}), i;
					}function l(e, t, r, n) {
						if (!t || t.isIndex !== !0) throw new TypeError("Index expected");if (1 != t.size().length) throw new f(t.size().length, 1);if (void 0 !== n) {
							if ("string" != typeof n || 1 !== n.length) throw new TypeError("Single character expected as defaultValue");
						} else n = " ";var i = t.dimension(0),
						    a = i.size()[0];if (a != r.length) throw new f(i.size()[0], r.length);var o = e.length;s(t.min()[0]), s(t.max()[0]);for (var u = [], c = 0; c < o; c++) {
							u[c] = e.charAt(c);
						}if (i.forEach(function (e, t) {
							u[e] = r.charAt(t[0]);
						}), u.length > o) for (c = o - 1, a = u.length; c < a; c++) {
							u[c] || (u[c] = n);
						}return u.join("");
					}var p = n(r(0)),
					    h = u("subset", { "Array, Index": function ArrayIndex(e, t) {
							var r = p(e),
							    n = r.subset(t);return n && n.valueOf();
						}, "Matrix, Index": function MatrixIndex(e, t) {
							return e.subset(t);
						}, "Object, Index": i, "string, Index": c, "Array, Index, any": function ArrayIndexAny(e, t, r) {
							return p(o(e)).subset(t, r, void 0).valueOf();
						}, "Array, Index, any, any": function ArrayIndexAnyAny(e, t, r, n) {
							return p(o(e)).subset(t, r, n).valueOf();
						}, "Matrix, Index, any": function MatrixIndexAny(e, t, r) {
							return e.clone().subset(t, r);
						}, "Matrix, Index, any, any": function MatrixIndexAnyAny(e, t, r, n) {
							return e.clone().subset(t, r, n);
						}, "string, Index, string": l, "string, Index, string, string": l, "Object, Index, any": a });return h.toTex = void 0, h;
				}function i(e, t) {
					if (1 !== t.size().length) throw new f(t.size(), 1);var r = t.dimension(0);if ("string" != typeof r) throw new TypeError("String expected as index to retrieve an object property");return u(e, r);
				}function a(e, t, r) {
					if (1 !== t.size().length) throw new f(t.size(), 1);var n = t.dimension(0);if ("string" != typeof n) throw new TypeError("String expected as index to retrieve an object property");var i = o(e);return c(i, n, r), i;
				}var o = r(6).clone,
				    s = r(7).validateIndex,
				    u = r(21).getSafeProperty,
				    c = r(21).setSafeProperty,
				    f = r(9);t.name = "subset", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = r(3),
					    u = n(r(0)),
					    c = e.DenseMatrix,
					    f = e.SparseMatrix,
					    l = o("transpose", { Array: function Array(e) {
							return l(u(e)).valueOf();
						}, Matrix: function Matrix(e) {
							var t,
							    r = e.size();switch (r.length) {case 1:
									t = e.clone();break;case 2:
									var n = r[0],
									    i = r[1];if (0 === i) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + a(r) + ")");switch (e.storage()) {case "dense":
											t = p(e, n, i);break;case "sparse":
											t = h(e, n, i);}break;default:
									throw new RangeError("Matrix must be a vector or two dimensional (size: " + a(this._size) + ")");}return t;
						}, any: function any(e) {
							return i(e);
						} }),
					    p = function p(e, t, r) {
						for (var n, a = e._data, o = [], s = 0; s < r; s++) {
							n = o[s] = [];for (var u = 0; u < t; u++) {
								n[u] = i(a[u][s]);
							}
						}return new c({ data: o, size: [r, t], datatype: e._datatype });
					},
					    h = function h(e, t, r) {
						for (var n = e._values, a = e._index, o = e._ptr, s = n ? [] : void 0, u = [], c = [], l = [], p = 0; p < t; p++) {
							l[p] = 0;
						}var h, m, d;for (h = 0, m = a.length; h < m; h++) {
							l[a[h]]++;
						}for (var g = 0, v = 0; v < t; v++) {
							c.push(g), g += l[v], l[v] = c[v];
						}for (c.push(g), d = 0; d < r; d++) {
							for (var y = o[d], x = o[d + 1], w = y; w < x; w++) {
								var b = l[a[w]]++;u[b] = d, n && (s[b] = i(n[w]));
							}
						}return new f({ values: s, index: u, ptr: c, size: [r, t], datatype: e._datatype });
					};return l.toTex = { 1: "\\left(${args[0]}\\right)" + s.operators.transpose }, l;
				}var i = r(6).clone,
				    a = r(12).format;t.name = "transpose", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("combinations", { "number, number": function numberNumber(e, t) {
							var r, n, i;if (!a(e) || e < 0) throw new TypeError("Positive integer value expected in function combinations");if (!a(t) || t < 0) throw new TypeError("Positive integer value expected in function combinations");if (t > e) throw new TypeError("k must be less than or equal to n");for (r = Math.max(t, e - t), n = 1, i = 1; i <= e - r; i++) {
								n = n * (r + i) / i;
							}return n;
						}, "BigNumber, BigNumber": function BigNumberBigNumber(t, r) {
							var n,
							    a,
							    o,
							    s,
							    u = new e.BigNumber(1);if (!i(t) || !i(r)) throw new TypeError("Positive integer value expected in function combinations");if (r.gt(t)) throw new TypeError("k must be less than n in function combinations");for (n = t.minus(r), r.lt(n) && (n = r), a = u, o = u, s = t.minus(n); o.lte(s); o = o.plus(1)) {
								a = a.times(n.plus(o)).dividedBy(o);
							}return a;
						} });return o.toTex = { 2: "\\binom{${args[0]}}{${args[1]}}" }, o;
				}function i(e) {
					return e.isInteger() && e.gte(0);
				}var a = r(2).isInteger;t.name = "combinations", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(117)),
					    s = r(3),
					    u = a("factorial", { number: function number(e) {
							if (e < 0) throw new Error("Value must be non-negative");return o(e + 1);
						}, BigNumber: function BigNumber(e) {
							if (e.isNegative()) throw new Error("Value must be non-negative");return o(e.plus(1));
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, u);
						} });return u.toTex = { 1: "\\left(${args[0]}\\right)" + s.operators.factorial }, u;
				}var i = r(1);t.name = "factorial", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(10)),
					    s = e.SparseMatrix,
					    u = function u(e, t, r) {
						var n = e._values,
						    u = e._index,
						    c = e._ptr,
						    f = e._size,
						    l = e._datatype,
						    p = t._values,
						    h = t._index,
						    m = t._ptr,
						    d = t._size,
						    g = t._datatype;if (f.length !== d.length) throw new i(f.length, d.length);if (f[0] !== d[0] || f[1] !== d[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + d + ")");var v,
						    y = f[0],
						    x = f[1],
						    w = o,
						    b = 0,
						    N = r;"string" == typeof l && l === g && (v = l, w = a.find(o, [v, v]), b = a.convert(0, v), N = a.find(r, [v, v]));var E,
						    M,
						    A,
						    O,
						    T = n && p ? [] : void 0,
						    _ = [],
						    S = [],
						    C = new s({ values: T, index: _, ptr: S, size: [y, x], datatype: v }),
						    z = T ? [] : void 0,
						    k = T ? [] : void 0,
						    B = [],
						    I = [];for (M = 0; M < x; M++) {
							S[M] = _.length;var P = M + 1;for (A = c[M], O = c[M + 1]; A < O; A++) {
								E = u[A], _.push(E), B[E] = P, z && (z[E] = n[A]);
							}for (A = m[M], O = m[M + 1]; A < O; A++) {
								E = h[A], B[E] !== P && _.push(E), I[E] = P, k && (k[E] = p[A]);
							}if (T) for (A = S[M]; A < _.length;) {
								E = _[A];var R = B[E],
								    U = I[E];if (R === P || U === P) {
									var q = R === P ? z[E] : b,
									    j = U === P ? k[E] : b,
									    L = N(q, j);w(L, b) ? _.splice(A, 1) : (T.push(L), A++);
								}
							}
						}return S[x] = _.length, C;
					};return u;
				}var i = r(9);t.name = "algorithm05", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(10)),
					    u = e.SparseMatrix,
					    c = function c(e, t, r) {
						var n = e._values,
						    c = e._size,
						    f = e._datatype,
						    l = t._values,
						    p = t._size,
						    h = t._datatype;if (c.length !== p.length) throw new a(c.length, p.length);if (c[0] !== p[0] || c[1] !== p[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + p + ")");var m,
						    d = c[0],
						    g = c[1],
						    v = s,
						    y = 0,
						    x = r;"string" == typeof f && f === h && (m = f, v = o.find(s, [m, m]), y = o.convert(0, m), x = o.find(r, [m, m]));for (var w = n && l ? [] : void 0, b = [], N = [], E = new u({ values: w, index: b, ptr: N, size: [d, g], datatype: m }), M = w ? [] : void 0, A = [], O = [], T = 0; T < g; T++) {
							N[T] = b.length;var _ = T + 1;if (i(e, T, A, M, O, _, E, x), i(t, T, A, M, O, _, E, x), M) for (var S = N[T]; S < b.length;) {
								var C = b[S];if (O[C] === _) {
									var z = M[C];v(z, y) ? b.splice(S, 1) : (w.push(z), S++);
								} else b.splice(S, 1);
							} else for (var k = N[T]; k < b.length;) {
								var B = b[k];O[B] !== _ ? b.splice(k, 1) : k++;
							}
						}return N[g] = b.length, E;
					};return c;
				}var i = r(509),
				    a = r(9);t.name = "algorithm06", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				var n = r(42);e.exports = function (e) {
					for (var t = 0; t < e.length; t++) {
						if (n(e[t])) return !0;
					}return !1;
				};
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r) {
					var a, o, s, u;if (t <= 0) {
						if (Array.isArray(e[0])) {
							for (u = i(e), o = [], a = 0; a < u.length; a++) {
								o[a] = n(u[a], t - 1, r);
							}return o;
						}for (s = e[0], a = 1; a < e.length; a++) {
							s = r(s, e[a]);
						}return s;
					}for (o = [], a = 0; a < e.length; a++) {
						o[a] = n(e[a], t - 1, r);
					}return o;
				}function i(e) {
					var t,
					    r,
					    n = e.length,
					    i = e[0].length,
					    a = [];for (r = 0; r < i; r++) {
						var o = [];for (t = 0; t < n; t++) {
							o.push(e[t][r]);
						}a.push(o);
					}return a;
				}var a = r(7).size,
				    o = r(44);e.exports = function (e, t, r) {
					var i = Array.isArray(e) ? a(e) : e.size();if (t < 0 || t >= i.length) throw new o(t, i.length);return e && e.isMatrix === !0 ? e.create(n(e.valueOf(), t, r)) : n(e, t, r);
				};
			}, function (e, t, r) {
				"use strict";
				t.type = function (e) {
					var t = typeof e === "undefined" ? "undefined" : _typeof(e);return "object" === t ? null === e ? "null" : e instanceof Boolean ? "boolean" : e instanceof Number ? "number" : e instanceof String ? "string" : Array.isArray(e) ? "Array" : e instanceof Date ? "Date" : e instanceof RegExp ? "RegExp" : "Object" : "function" === t ? "Function" : t;
				}, t.isScalar = function (e) {
					return !(e && e.isMatrix || Array.isArray(e));
				};
			}, function (e, t, r) {
				"use strict";
				e.exports = { end: !0 };
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e) {
						if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (this.items = e || [], !Array.isArray(this.items) || !this.items.every(function (e) {
							return e && e.isNode;
						})) throw new TypeError("Array containing Nodes expected");var t = function t() {
							throw new Error("Property `ArrayNode.nodes` is deprecated, use `ArrayNode.items` instead");
						};Object.defineProperty(this, "nodes", { get: t, set: t });
					}function o(e, t, r) {
						var n = "Array" !== t.math.config().matrix,
						    i = e.items.map(function (e) {
							return u(e, t, r);
						});return (n ? "math.matrix([" : "[") + i.join(",") + (n ? "])" : "]");
					}var s = n(r(5)).register,
					    u = n(r(5)).compile,
					    c = n(r(13));return a.prototype = new c(), a.prototype.type = "ArrayNode", a.prototype.isArrayNode = !0, s(a.prototype.type, o), a.prototype.forEach = function (e) {
						for (var t = 0; t < this.items.length; t++) {
							var r = this.items[t];e(r, "items[" + t + "]", this);
						}
					}, a.prototype.map = function (e) {
						for (var t = [], r = 0; r < this.items.length; r++) {
							t[r] = this._ifNode(e(this.items[r], "items[" + r + "]", this));
						}return new a(t);
					}, a.prototype.clone = function () {
						return new a(this.items.slice(0));
					}, a.prototype._toString = function (e) {
						var t = this.items.map(function (t) {
							return t.toString(e);
						});return "[" + t.join(", ") + "]";
					}, a.prototype._toTex = function (e) {
						var t = "\\begin{bmatrix}";return this.items.forEach(function (r) {
							t += r.items ? r.items.map(function (t) {
								return t.toTex(e);
							}).join("&") : r.toTex(e), t += "\\\\";
						}), t += "\\end{bmatrix}";
					}, a;
				}t.name = "ArrayNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e, t, r) {
						if (!(this instanceof o)) throw new SyntaxError("Constructor must be called with the new operator");if (!e || !e.isNode) throw new TypeError("Node expected");if (!t || !t.isNode) throw new TypeError("Node expected");if (r && (!r || !r.isNode)) throw new TypeError("Node expected");if (arguments.length > 3) throw new Error("Too many arguments");this.start = e, this.end = t, this.step = r || null;
					}function s(e, t, r) {
						return "math.range(" + f(e.start, t, r) + ", " + f(e.end, t, r) + (e.step ? ", " + f(e.step, t, r) : "") + ")";
					}function u(e, t) {
						var r = i.getPrecedence(e, t),
						    n = {},
						    a = i.getPrecedence(e.start, t);if (n.start = null !== a && a <= r || "all" === t, e.step) {
							var o = i.getPrecedence(e.step, t);n.step = null !== o && o <= r || "all" === t;
						}var s = i.getPrecedence(e.end, t);return n.end = null !== s && s <= r || "all" === t, n;
					}var c = n(r(5)).register,
					    f = n(r(5)).compile,
					    l = n(r(13));return o.prototype = new l(), o.prototype.type = "RangeNode", o.prototype.isRangeNode = !0, o.prototype.needsEnd = function () {
						var e = this.filter(function (e) {
							return e && e.isSymbolNode && "end" == e.name;
						});return e.length > 0;
					}, c(o.prototype.type, s), o.prototype.forEach = function (e) {
						e(this.start, "start", this), e(this.end, "end", this), this.step && e(this.step, "step", this);
					}, o.prototype.map = function (e) {
						return new o(this._ifNode(e(this.start, "start", this)), this._ifNode(e(this.end, "end", this)), this.step && this._ifNode(e(this.step, "step", this)));
					}, o.prototype.clone = function () {
						return new o(this.start, this.end, this.step && this.step);
					}, o.prototype._toString = function (e) {
						var t,
						    r = e && e.parenthesis ? e.parenthesis : "keep",
						    n = u(this, r),
						    i = this.start.toString(e);if (n.start && (i = "(" + i + ")"), t = i, this.step) {
							var a = this.step.toString(e);n.step && (a = "(" + a + ")"), t += ":" + a;
						}var o = this.end.toString(e);return n.end && (o = "(" + o + ")"), t += ":" + o;
					}, o.prototype._toTex = function (e) {
						var t = e && e.parenthesis ? e.parenthesis : "keep",
						    r = u(this, t),
						    n = this.start.toTex(e);if (r.start && (n = "\\left(" + n + "\\right)"), this.step) {
							var i = this.step.toTex(e);r.step && (i = "\\left(" + i + "\\right)"), n += ":" + i;
						}var a = this.end.toTex(e);return r.end && (a = "\\left(" + a + "\\right)"), n += ":" + a;
					}, o;
				}var i = r(47);t.name = "RangeNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e) {
					var t = e.DenseMatrix,
					    r = function r(e, _r, n) {
						var i = e.size();if (2 !== i.length) throw new RangeError("Matrix must be two dimensional (size: " + a.format(i) + ")");var u = i[0],
						    c = i[1];if (u !== c) throw new RangeError("Matrix must be square (size: " + a.format(i) + ")");var f, l, p;if (_r && _r.isMatrix === !0) {
							var h = _r.size();if (1 === h.length) {
								if (h[0] !== u) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for (f = [], p = _r._data, l = 0; l < u; l++) {
									f[l] = [p[l]];
								}return new t({ data: f, size: [u, 1], datatype: _r._datatype });
							}if (2 === h.length) {
								if (h[0] !== u || 1 !== h[1]) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");if (_r.isDenseMatrix === !0) {
									if (n) {
										for (f = [], p = _r._data, l = 0; l < u; l++) {
											f[l] = [p[l][0]];
										}return new t({ data: f, size: [u, 1], datatype: _r._datatype });
									}return _r;
								}for (f = [], l = 0; l < u; l++) {
									f[l] = [0];
								}for (var m = _r._values, d = _r._index, g = _r._ptr, v = g[1], y = g[0]; y < v; y++) {
									l = d[y], f[l][0] = m[y];
								}return new t({ data: f, size: [u, 1], datatype: _r._datatype });
							}throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
						}if (s(_r)) {
							var x = o.size(_r);if (1 === x.length) {
								if (x[0] !== u) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for (f = [], l = 0; l < u; l++) {
									f[l] = [_r[l]];
								}return new t({ data: f, size: [u, 1] });
							}if (2 === x.length) {
								if (x[0] !== u || 1 !== x[1]) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for (f = [], l = 0; l < u; l++) {
									f[l] = [_r[l][0]];
								}return new t({ data: f, size: [u, 1] });
							}throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
						}
					};return r;
				}var i = r(25),
				    a = i.string,
				    o = i.array,
				    s = Array.isArray;t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n() {
					var e = function e(_e2) {
						return -_e2 - 2;
					};return e;
				}t.name = "cs_flip", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("map", { "Array, function": i, "Matrix, function": function MatrixFunction(e, t) {
							return e.map(t);
						} });return a.toTex = void 0, a;
				}function i(e, t) {
					var r = a(t),
					    n = function n(i, a) {
						return Array.isArray(i) ? i.map(function (e, t) {
							return n(e, a.concat(t));
						}) : 1 === r ? t(i) : 2 === r ? t(i, a) : t(i, a, e);
					};return n(e, []);
				}var a = r(37).maxArgumentCount;t.name = "map", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e, t) {
						return -c(e, t);
					}function s(e, t, r) {
						if (!i(t) || t < 0) throw new Error("k must be a non-negative integer");if (e && e.isMatrix) {
							var n = e.size();if (n.length > 1) throw new Error("Only one dimensional matrices supported");return u(e.valueOf(), t, r);
						}if (Array.isArray(e)) return u(e, t, r);
					}function u(e, t, r) {
						if (t >= e.length) throw new Error("k out of bounds");for (var n = 0, i = e.length - 1; n < i;) {
							for (var a = n, o = i, s = e[Math.floor(Math.random() * (i - n + 1)) + n]; a < o;) {
								if (r(e[a], s) >= 0) {
									var u = e[o];e[o] = e[a], e[a] = u, --o;
								} else ++a;
							}r(e[a], s) > 0 && --a, t <= a ? i = a : n = a + 1;
						}return e[t];
					}var c = n(r(49));return a("partitionSelect", { "Array | Matrix, number": function ArrayMatrixNumber(e, t) {
							return s(e, t, c);
						}, "Array | Matrix, number, string": function ArrayMatrixNumberString(e, t, r) {
							if ("asc" === r) return s(e, t, c);if ("desc" === r) return s(e, t, o);throw new Error('Compare string must be "asc" or "desc"');
						}, "Array | Matrix, number, function": s });
				}var i = r(2).isInteger;t.name = "partitionSelect", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, s, u) {
					function c(e) {
						if (!h.hasOwnProperty(e)) throw new Error("Unknown distribution " + e);var t = Array.prototype.slice.call(arguments, 1),
						    r = h[e].apply(this, t);return function (e) {
							var t = { random: function random(e, t, r) {
									var s, u, l;if (arguments.length > 3) throw new i("random", arguments.length, 0, 3);if (1 === arguments.length ? a(e) ? s = e : l = e : 2 === arguments.length ? a(e) ? (s = e, l = t) : (u = e, l = t) : (s = e, u = t, l = r), void 0 !== u && !o(u) || void 0 !== l && !o(l)) throw new TypeError("Invalid argument in function random");if (void 0 === l && (l = 1), void 0 === u && (u = 0), void 0 !== s) {
										var p = c(s.valueOf(), u, l, n);return s && s.isMatrix === !0 ? f(p) : p;
									}return n(u, l);
								}, randomInt: s({ "number | Array": function numberArray(e) {
										var t = 0;if (a(e)) {
											var r = e,
											    n = 1,
											    i = c(r.valueOf(), t, n, u);return r && r.isMatrix === !0 ? f(i) : i;
										}var n = e;return u(t, n);
									}, "number | Array, number": function numberArrayNumber(e, t) {
										if (a(e)) {
											var r = e,
											    n = t,
											    i = 0,
											    o = c(r.valueOf(), i, n, u);return r && r.isMatrix === !0 ? f(o) : o;
										}var i = e,
										    n = t;return u(i, n);
									}, "Array, number, number": function ArrayNumberNumber(e, t, r) {
										var n = c(e.valueOf(), t, r, u);return e && e.isMatrix === !0 ? f(n) : n;
									} }), pickRandom: s({ Array: function Array(e) {
										return r(e);
									}, "Array, number | Array": function ArrayNumberArray(e, t) {
										var n, i;if (Array.isArray(t)) i = t;else {
											if (!o(t)) throw new TypeError("Invalid argument in function pickRandom");n = t;
										}return r(e, n, i);
									}, "Array, number | Array, Array | number": function ArrayNumberArrayArrayNumber(e, t, n) {
										var i, a;if (Array.isArray(t) ? (a = t, i = n) : (a = n, i = t), !Array.isArray(a) || !o(i)) throw new TypeError("Invalid argument in function pickRandom");return r(e, i, a);
									} }) },
							    r = function r(e, t, _r2) {
								var n = "undefined" == typeof t;if (n && (t = 1), e && e.isMatrix === !0) e = e.valueOf();else if (!Array.isArray(e)) throw new TypeError("Unsupported type of value in function pickRandom");if (l.size(e).length > 1) throw new Error("Only one dimensional vectors supported");if ("undefined" != typeof _r2) {
									if (_r2.length != e.length) throw new Error("Weights must have the same length as possibles");for (var i = 0, a = 0, s = _r2.length; a < s; a++) {
										if (!o(_r2[a]) || _r2[a] < 0) throw new Error("Weights must be an array of positive numbers");i += _r2[a];
									}
								}var u = e.length;if (0 == u) return [];if (t >= u) return e;for (var c, f = []; f.length < t;) {
									if ("undefined" == typeof _r2) c = e[Math.floor(p() * u)];else for (var h = p() * i, a = 0, s = e.length; a < s; a++) {
										if (h -= _r2[a], h < 0) {
											c = e[a];break;
										}
									}f.indexOf(c) == -1 && f.push(c);
								}return n ? f[0] : f;
							},
							    n = function n(t, r) {
								return t + e() * (r - t);
							},
							    u = function u(t, r) {
								return Math.floor(t + e() * (r - t));
							},
							    c = function c(e, t, r, n) {
								var i,
								    a,
								    o = [];if (e = e.slice(0), e.length > 1) for (var a = 0, i = e.shift(); a < i; a++) {
									o.push(c(e, t, r, n));
								} else for (var a = 0, i = e.shift(); a < i; a++) {
									o.push(n(t, r));
								}return o;
							};return t;
						}(r);
					}var f = n(r(0)),
					    l = r(7),
					    p = n(r(429)),
					    h = { uniform: function uniform() {
							return p;
						}, normal: function normal() {
							return function () {
								for (var e, t, r = -1; r < 0 || r > 1;) {
									e = p(), t = p(), r = 1 / 6 * Math.pow(-2 * Math.log(e), .5) * Math.cos(2 * Math.PI * t) + .5;
								}return r;
							};
						} };return c.toTex = void 0, c;
				}var i = r(43),
				    a = r(42),
				    o = r(2).isNumber;t.name = "distribution", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(0)),
					    o = n(r(10)),
					    s = n(r(14)),
					    u = n(r(24)),
					    c = n(r(16)),
					    f = n(r(8)),
					    l = n(r(4)),
					    p = r(3),
					    h = i("equal", { "any, any": function anyAny(e, t) {
							return null === e ? null === t : null === t ? null === e : void 0 === e ? void 0 === t : void 0 === t ? void 0 === e : o(e, t);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {
										case "sparse":
											r = u(e, t, o);break;default:
											r = s(t, e, o, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = s(e, t, o, !1);break;default:
											r = f(e, t, o);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return h(a(e), a(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return h(a(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return h(e, a(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = c(e, t, o, !1);break;default:
									r = l(e, t, o, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = c(t, e, o, !0);break;default:
									r = l(t, e, o, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return l(a(e), t, o, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return l(a(t), e, o, !0).valueOf();
						} });return h.toTex = { 2: "\\left(${args[0]}" + p.operators.equal + "${args[1]}\\right)" }, h;
				}t.name = "equal", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("isNumeric", { "number | BigNumber | Fraction | boolean": function numberBigNumberFractionBoolean() {
							return !0;
						}, "Complex | Unit | string": function ComplexUnitString() {
							return !1;
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a;
				}var i = r(1);r(2);t.name = "isNumeric", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("isZero", { number: function number(e) {
							return 0 === e;
						}, BigNumber: function BigNumber(e) {
							return e.isZero();
						}, Complex: function Complex(e) {
							return 0 === e.re && 0 === e.im;
						}, Fraction: function Fraction(e) {
							return 1 === e.d && 0 === e.n;
						}, Unit: function Unit(e) {
							return a(e.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a;
				}var i = r(1);r(2);t.name = "isZero", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					function i() {
						if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
					}return i.prototype.type = "Matrix", i.prototype.isMatrix = !0, i.storage = function (e) {
						if (!o(e)) throw new TypeError("format must be a string value");var t = i._storage[e];if (!t) throw new SyntaxError("Unsupported matrix storage format: " + e);return t;
					}, i._storage = {}, i.prototype.storage = function () {
						throw new Error("Cannot invoke storage on a Matrix interface");
					}, i.prototype.datatype = function () {
						throw new Error("Cannot invoke datatype on a Matrix interface");
					}, i.prototype.create = function (e, t) {
						throw new Error("Cannot invoke create on a Matrix interface");
					}, i.prototype.subset = function (e, t, r) {
						throw new Error("Cannot invoke subset on a Matrix interface");
					}, i.prototype.get = function (e) {
						throw new Error("Cannot invoke get on a Matrix interface");
					}, i.prototype.set = function (e, t, r) {
						throw new Error("Cannot invoke set on a Matrix interface");
					}, i.prototype.resize = function (e, t) {
						throw new Error("Cannot invoke resize on a Matrix interface");
					}, i.prototype.reshape = function (e, t) {
						throw new Error("Cannot invoke reshape on a Matrix interface");
					}, i.prototype.clone = function () {
						throw new Error("Cannot invoke clone on a Matrix interface");
					}, i.prototype.size = function () {
						throw new Error("Cannot invoke size on a Matrix interface");
					}, i.prototype.map = function (e, t) {
						throw new Error("Cannot invoke map on a Matrix interface");
					}, i.prototype.forEach = function (e) {
						throw new Error("Cannot invoke forEach on a Matrix interface");
					}, i.prototype.toArray = function () {
						throw new Error("Cannot invoke toArray on a Matrix interface");
					}, i.prototype.valueOf = function () {
						throw new Error("Cannot invoke valueOf on a Matrix interface");
					}, i.prototype.format = function (e) {
						throw new Error("Cannot invoke format on a Matrix interface");
					}, i.prototype.toString = function () {
						throw new Error("Cannot invoke toString on a Matrix interface");
					}, i;
				}var i = r(25),
				    a = i.string,
				    o = a.isString;t.name = "Matrix", t.path = "type", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(10)),
					    s = e.SparseMatrix,
					    u = function u(e, t, r) {
						var n = e._values,
						    u = e._index,
						    c = e._ptr,
						    f = e._size,
						    l = e._datatype,
						    p = t._values,
						    h = t._index,
						    m = t._ptr,
						    d = t._size,
						    g = t._datatype;if (f.length !== d.length) throw new i(f.length, d.length);if (f[0] !== d[0] || f[1] !== d[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + d + ")");var v,
						    y = f[0],
						    x = f[1],
						    w = o,
						    b = 0,
						    N = r;"string" == typeof l && l === g && (v = l, w = a.find(o, [v, v]), b = a.convert(0, v), N = a.find(r, [v, v]));var E,
						    M,
						    A,
						    O,
						    T,
						    _ = n && p ? [] : void 0,
						    S = [],
						    C = [],
						    z = new s({ values: _, index: S, ptr: C, size: [y, x], datatype: v }),
						    k = n && p ? [] : void 0,
						    B = n && p ? [] : void 0,
						    I = [],
						    P = [];for (M = 0; M < x; M++) {
							C[M] = S.length;var R = M + 1;for (O = c[M], T = c[M + 1], A = O; A < T; A++) {
								E = u[A], S.push(E), I[E] = R, k && (k[E] = n[A]);
							}for (O = m[M], T = m[M + 1], A = O; A < T; A++) {
								if (E = h[A], I[E] === R) {
									if (k) {
										var U = N(k[E], p[A]);w(U, b) ? I[E] = null : k[E] = U;
									}
								} else S.push(E), P[E] = R, B && (B[E] = p[A]);
							}if (k && B) for (A = C[M]; A < S.length;) {
								E = S[A], I[E] === R ? (_[A] = k[E], A++) : P[E] === R ? (_[A] = B[E], A++) : S.splice(A, 1);
							}
						}return C[x] = S.length, z;
					};return u;
				}var i = r(9);t.name = "algorithm04", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(10)),
					    s = e.SparseMatrix,
					    u = function u(e, t, r) {
						var n = e._values,
						    u = e._index,
						    c = e._ptr,
						    f = e._size,
						    l = e._datatype,
						    p = t._values,
						    h = t._index,
						    m = t._ptr,
						    d = t._size,
						    g = t._datatype;if (f.length !== d.length) throw new i(f.length, d.length);if (f[0] !== d[0] || f[1] !== d[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + d + ")");if (!n || !p) throw new Error("Cannot perform operation on Pattern Sparse Matrices");var v,
						    y = f[0],
						    x = f[1],
						    w = o,
						    b = 0,
						    N = r;"string" == typeof l && l === g && (v = l, w = a.find(o, [v, v]), b = a.convert(0, v), N = a.find(r, [v, v]));for (var E, M, A, O, T = [], _ = [], S = [], C = new s({ values: T, index: _, ptr: S, size: [y, x], datatype: v }), z = [], k = [], B = 0; B < x; B++) {
							S[B] = _.length;var I = B + 1;for (M = c[B], A = c[B + 1], E = M; E < A; E++) {
								O = u[E], k[O] = I, z[O] = n[E], _.push(O);
							}for (M = m[B], A = m[B + 1], E = M; E < A; E++) {
								O = h[E], k[O] === I && (z[O] = N(z[O], p[E]));
							}for (E = S[B]; E < _.length;) {
								O = _[E];var P = z[O];w(P, b) ? _.splice(E, 1) : (T.push(P), E++);
							}
						}return S[x] = _.length, C;
					};return u;
				}var i = r(9);t.name = "algorithm08", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("number", { "": function _() {
							return 0;
						}, number: function number(e) {
							return e;
						}, string: function string(e) {
							var t = Number(e);if (isNaN(t)) throw new SyntaxError('String "' + e + '" is no valid number');return t;
						}, BigNumber: function BigNumber(e) {
							return e.toNumber();
						}, Fraction: function Fraction(e) {
							return e.valueOf();
						}, Unit: function Unit(e) {
							throw new Error("Second argument with valueless unit expected");
						}, "Unit, string | Unit": function UnitStringUnit(e, t) {
							return e.toNumber(t);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 0: "0", 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)" }, a;
				}var i = r(1);t.name = "number", t.factory = n;
			}, function (e, t) {
				e.exports = function (e) {
					if (e.isFinite() && !e.isInteger()) throw new Error("Integer expected in function bitNot");var t = e.constructor,
					    r = t.precision;t.config({ precision: 1e9 });var e = e.plus(new t(1));return e.s = -e.s || null, t.config({ precision: r }), e;
				};
			}, function (e, t, r) {
				function n(e) {
					for (var t = e.d, r = t[0] + "", n = 1; n < t.length; ++n) {
						for (var i = t[n] + "", a = 7 - i.length; a--;) {
							i = "0" + i;
						}r += i;
					}var o;for (o = r.length - 1; "0" == r.charAt(o); --o) {}var s = e.e,
					    u = r.slice(0, o + 1 || 1),
					    c = u.length;if (s > 0) if (++s > c) for (s -= c; s--; u += "0") {} else s < c && (u = u.slice(0, s) + "." + u.slice(s));for (var f = [0], n = 0; n < u.length;) {
						for (var l = f.length; l--; f[l] *= 10) {}f[0] += u.charAt(n++) << 0;for (var o = 0; o < f.length; ++o) {
							f[o] > 1 && (null == f[o + 1] && (f[o + 1] = 0), f[o + 1] += f[o] >> 1, f[o] &= 1);
						}
					}return f.reverse();
				}var i = r(79);e.exports = function (e, t, r) {
					var a,
					    o,
					    s = e.constructor,
					    u = +(e.s < 0),
					    c = +(t.s < 0);if (u) {
						a = n(i(e));for (var f = 0; f < a.length; ++f) {
							a[f] ^= 1;
						}
					} else a = n(e);if (c) {
						o = n(i(t));for (var f = 0; f < o.length; ++f) {
							o[f] ^= 1;
						}
					} else o = n(t);var l, p, h;a.length <= o.length ? (l = a, p = o, h = u) : (l = o, p = a, h = c);var m = l.length,
					    d = p.length,
					    g = 1 ^ r(u, c),
					    v = new s(1 ^ g),
					    y = new s(1),
					    x = new s(2),
					    w = s.precision;for (s.config({ precision: 1e9 }); m > 0;) {
						r(l[--m], p[--d]) == g && (v = v.plus(y)), y = y.times(x);
					}for (; d > 0;) {
						r(h, p[--d]) == g && (v = v.plus(y)), y = y.times(x);
					}return s.config({ precision: w }), 0 == g && (v.s = -v.s), v;
				};
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o, s) {
					function u() {
						if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");this.scope = {};
					}var c = n(r(30));return u.prototype.type = "Parser", u.prototype.isParser = !0, u.prototype.parse = function (e) {
						throw new Error("Parser.parse is deprecated. Use math.parse instead.");
					}, u.prototype.compile = function (e) {
						throw new Error("Parser.compile is deprecated. Use math.compile instead.");
					}, u.prototype.eval = function (e) {
						return c(e).compile().eval(this.scope);
					}, u.prototype.get = function (e) {
						return e in this.scope ? a.getSafeProperty(this.scope, e) : void 0;
					}, u.prototype.getAll = function () {
						return i({}, this.scope);
					}, u.prototype.set = function (e, t) {
						return a.setSafeProperty(this.scope, e, t);
					}, u.prototype.remove = function (e) {
						delete this.scope[e];
					}, u.prototype.clear = function () {
						for (var e in this.scope) {
							this.scope.hasOwnProperty(e) && delete this.scope[e];
						}
					}, u;
				}var i = r(6).extend,
				    a = r(21);t.name = "Parser", t.path = "expression", t.factory = n, t.math = !0;
			}, function (e, t) {
				e.exports = { name: "e", category: "Constants", syntax: ["e"], description: "Euler's number, the base of the natural logarithm. Approximately equal to 2.71828", examples: ["e", "e ^ 2", "exp(2)", "log(e)"], seealso: ["exp"] };
			}, function (e, t) {
				e.exports = { name: "pi", category: "Constants", syntax: ["pi"], description: "The number pi is a mathematical constant that is the ratio of a circle's circumference to its diameter, and is approximately equal to 3.14159", examples: ["pi", "sin(pi/2)"], seealso: ["tau"] };
			}, function (e, t, r) {
				function n(e, t, n, i) {
					var a = {};return a.bignumber = r(163), a.boolean = r(164), a.complex = r(165), a.createUnit = r(166), a.fraction = r(167), a.index = r(168), a.matrix = r(169), a.number = r(170), a.sparse = r(171), a.splitUnit = r(172), a.string = r(173), a.unit = r(174), a.e = r(82), a.E = r(82), a.false = r(156), a.i = r(157), a.Infinity = r(148), a.LN2 = r(150), a.LN10 = r(149), a.LOG2E = r(152), a.LOG10E = r(151), a.NaN = r(153), a.null = r(158), a.pi = r(83), a.PI = r(83), a.phi = r(159), a.SQRT1_2 = r(154), a.SQRT2 = r(155), a.tau = r(160), a.true = r(161), a.version = r(162), a.speedOfLight = { description: "Speed of light in vacuum", examples: ["speedOfLight"] }, a.gravitationConstant = { description: "Newtonian constant of gravitation", examples: ["gravitationConstant"] }, a.planckConstant = { description: "Planck constant", examples: ["planckConstant"] }, a.reducedPlanckConstant = { description: "Reduced Planck constant", examples: ["reducedPlanckConstant"] }, a.magneticConstant = { description: "Magnetic constant (vacuum permeability)", examples: ["magneticConstant"] }, a.electricConstant = { description: "Electric constant (vacuum permeability)", examples: ["electricConstant"] }, a.vacuumImpedance = { description: "Characteristic impedance of vacuum", examples: ["vacuumImpedance"] }, a.coulomb = { description: "Coulomb's constant", examples: ["coulomb"] }, a.elementaryCharge = { description: "Elementary charge", examples: ["elementaryCharge"] }, a.bohrMagneton = { description: "Borh magneton", examples: ["bohrMagneton"] }, a.conductanceQuantum = { description: "Conductance quantum", examples: ["conductanceQuantum"] }, a.inverseConductanceQuantum = { description: "Inverse conductance quantum", examples: ["inverseConductanceQuantum"] }, a.magneticFluxQuantum = { description: "Magnetic flux quantum", examples: ["magneticFluxQuantum"] }, a.nuclearMagneton = { description: "Nuclear magneton", examples: ["nuclearMagneton"] }, a.klitzing = { description: "Von Klitzing constant", examples: ["klitzing"] }, a.bohrRadius = { description: "Borh radius", examples: ["bohrRadius"] }, a.classicalElectronRadius = { description: "Classical electron radius", examples: ["classicalElectronRadius"] }, a.electronMass = { description: "Electron mass", examples: ["electronMass"] }, a.fermiCoupling = { description: "Fermi coupling constant", examples: ["fermiCoupling"] }, a.fineStructure = { description: "Fine-structure constant", examples: ["fineStructure"] }, a.hartreeEnergy = { description: "Hartree energy", examples: ["hartreeEnergy"] }, a.protonMass = { description: "Proton mass", examples: ["protonMass"] }, a.deuteronMass = { description: "Deuteron Mass", examples: ["deuteronMass"] }, a.neutronMass = { description: "Neutron mass", examples: ["neutronMass"] }, a.quantumOfCirculation = { description: "Quantum of circulation", examples: ["quantumOfCirculation"] }, a.rydberg = { description: "Rydberg constant", examples: ["rydberg"] }, a.thomsonCrossSection = { description: "Thomson cross section", examples: ["thomsonCrossSection"] }, a.weakMixingAngle = { description: "Weak mixing angle", examples: ["weakMixingAngle"] }, a.efimovFactor = { description: "Efimov factor", examples: ["efimovFactor"] }, a.atomicMass = { description: "Atomic mass constant", examples: ["atomicMass"] }, a.avogadro = { description: "Avogadro's number", examples: ["avogadro"] }, a.boltzmann = { description: "Boltzmann constant", examples: ["boltzmann"] }, a.faraday = { description: "Faraday constant", examples: ["faraday"] }, a.firstRadiation = { description: "First radiation constant", examples: ["firstRadiation"] }, a.loschmidt = { description: "Loschmidt constant at T=273.15 K and p=101.325 kPa", examples: ["loschmidt"] }, a.gasConstant = { description: "Gas constant", examples: ["gasConstant"] }, a.molarPlanckConstant = { description: "Molar Planck constant", examples: ["molarPlanckConstant"] }, a.molarVolume = { description: "Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa", examples: ["molarVolume"] }, a.sackurTetrode = { description: "Sackur-Tetrode constant at T=1 K and p=101.325 kPa", examples: ["sackurTetrode"] }, a.secondRadiation = { description: "Second radiation constant", examples: ["secondRadiation"] }, a.stefanBoltzmann = { description: "Stefan-Boltzmann constant", examples: ["stefanBoltzmann"] }, a.wienDisplacement = { description: "Wien displacement law constant", examples: ["wienDisplacement"] }, a.molarMass = { description: "Molar mass constant", examples: ["molarMass"] }, a.molarMassC12 = { description: "Molar mass constant of carbon-12", examples: ["molarMassC12"] }, a.gravity = { description: "Standard acceleration of gravity (standard acceleration of free-fall on Earth)", examples: ["gravity"] }, a.planckLength = { description: "Planck length", examples: ["planckLength"] }, a.planckMass = { description: "Planck mass", examples: ["planckMass"] }, a.planckTime = { description: "Planck time", examples: ["planckTime"] }, a.planckCharge = { description: "Planck charge", examples: ["planckCharge"] }, a.planckTemperature = { description: "Planck temperature", examples: ["planckTemperature"] }, a.derivative = r(178), a.lsolve = r(179), a.lup = r(180), a.lusolve = r(181), a.simplify = r(183), a.slu = r(184), a.usolve = r(185), a.qr = r(182), a.abs = r(186), a.add = r(187), a.cbrt = r(188), a.ceil = r(189), a.cube = r(190), a.divide = r(191), a.dotDivide = r(192), a.dotMultiply = r(193), a.dotPow = r(194), a.exp = r(195), a.fix = r(196), a.floor = r(197), a.gcd = r(198), a.hypot = r(199), a.lcm = r(200), a.log = r(201), a.log10 = r(202), a.mod = r(203), a.multiply = r(204), a.norm = r(205), a.nthRoot = r(206), a.pow = r(207), a.round = r(208), a.sign = r(209), a.sqrt = r(210), a.square = r(211), a.subtract = r(212), a.unaryMinus = r(213), a.unaryPlus = r(214), a.xgcd = r(215), a.bitAnd = r(216), a.bitNot = r(217), a.bitOr = r(218), a.bitXor = r(219), a.leftShift = r(220), a.rightArithShift = r(221), a.rightLogShift = r(222), a.bellNumbers = r(223), a.catalan = r(224), a.composition = r(225), a.stirlingS2 = r(226), a.config = r(175), a.import = r(176), a.typed = r(177), a.arg = r(227), a.conj = r(228), a.re = r(230), a.im = r(229), a.eval = r(231), a.help = r(232), a.distance = r(233), a.intersect = r(234), a.and = r(235), a.not = r(236), a.or = r(237), a.xor = r(238), a.concat = r(239), a.cross = r(240), a.det = r(241), a.diag = r(242), a.dot = r(243), a.eye = r(244), a.filter = r(245), a.flatten = r(246), a.forEach = r(247), a.inv = r(248), a.kron = r(249), a.map = r(250), a.ones = r(251), a.partitionSelect = r(252), a.range = r(253), a.resize = r(255), a.reshape = r(254), a.size = r(256), a.sort = r(257), a.squeeze = r(258), a.subset = r(259), a.trace = r(260), a.transpose = r(261), a.zeros = r(262), a.combinations = r(263), a.factorial = r(264), a.gamma = r(265), a.kldivergence = r(266), a.multinomial = r(267), a.permutations = r(268), a.pickRandom = r(269), a.random = r(270), a.randomInt = r(271), a.compare = r(272), a.deepEqual = r(273), a.equal = r(274), a.larger = r(275), a.largerEq = r(276), a.smaller = r(277), a.smallerEq = r(278), a.unequal = r(279), a.erf = r(280), a.mad = r(281), a.max = r(282), a.mean = r(283), a.median = r(284), a.min = r(285), a.mode = r(286), a.prod = r(287), a.quantileSeq = r(288), a.std = r(289), a.sum = r(290), a.var = r(291), a.acos = r(292), a.acosh = r(293), a.acot = r(294), a.acoth = r(295), a.acsc = r(296), a.acsch = r(297), a.asec = r(298), a.asech = r(299), a.asin = r(300), a.asinh = r(301), a.atan = r(302), a.atanh = r(304), a.atan2 = r(303), a.cos = r(305), a.cosh = r(306), a.cot = r(307), a.coth = r(308), a.csc = r(309), a.csch = r(310), a.sec = r(311), a.sech = r(312), a.sin = r(313), a.sinh = r(314), a.tan = r(315), a.tanh = r(316), a.to = r(317), a.clone = r(318), a.format = r(319), a.isNaN = r(321), a.isInteger = r(320), a.isNegative = r(322), a.isNumeric = r(323), a.isPositive = r(324), a.isPrime = r(325), a.isZero = r(326), a.typeof = r(327), a;
				}t.name = "docs", t.path = "expression", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i, a) {
					var o = n(r(81));return i("parser", { "": function _() {
							return new o(a);
						} });
				}t.name = "parser", t.factory = n, t.math = !0;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(e, t) {
						if (!(this instanceof s)) throw new SyntaxError("Constructor must be called with the new operator");if (!e || !e.isNode) throw new TypeError('Node expected for parameter "object"');if (!t || !t.isIndexNode) throw new TypeError('IndexNode expected for parameter "index"');this.object = e || null, this.index = t, Object.defineProperty(this, "name", { get: function () {
								return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "";
							}.bind(this), set: function set() {
								throw new Error("Cannot assign a new name, name is read-only");
							} });
					}function u(e, t, r) {
						t.access = h, t.getSafeProperty = a;var n = l(e.object, t, r),
						    o = l(e.index, t, r);if (e.index.isObjectProperty()) {
							var s = i(e.index.getObjectProperty());return "getSafeProperty(" + n + ", " + s + ")";
						}return e.index.needsSize() ? "(function () {  var object = " + n + ";  var size = math.size(object).valueOf();  return access(object, " + o + ");})()" : "access(" + n + ", " + o + ")";
					}function c(e) {
						return !(e.isAccessorNode || e.isArrayNode || e.isConstantNode || e.isFunctionNode || e.isObjectNode || e.isParenthesisNode || e.isSymbolNode);
					}var f = n(r(5)).register,
					    l = n(r(5)).compile,
					    p = n(r(13)),
					    h = n(r(93));return s.prototype = new p(), s.prototype.type = "AccessorNode", s.prototype.isAccessorNode = !0, f(s.prototype.type, u), s.prototype.forEach = function (e) {
						e(this.object, "object", this), e(this.index, "index", this);
					}, s.prototype.map = function (e) {
						return new s(this._ifNode(e(this.object, "object", this)), this._ifNode(e(this.index, "index", this)));
					}, s.prototype.clone = function () {
						return new s(this.object, this.index);
					}, s.prototype._toString = function (e) {
						var t = this.object.toString(e);return c(this.object) && (t = "(" + t + ")"), t + this.index.toString(e);
					}, s.prototype._toTex = function (e) {
						var t = this.object.toTex(e);return c(this.object) && (t = "\\left(" + t + "\\right)"), t + this.index.toTex(e);
					}, s;
				}var i = r(12).stringify,
				    a = r(21).getSafeProperty;t.name = "AccessorNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, s) {
					function u(e, t, r) {
						if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");if (this.object = e, this.index = r ? t : null, this.value = r ? r : t, !e || !e.isSymbolNode && !e.isAccessorNode) throw new TypeError('SymbolNode or AccessorNode expected as "object"');if (e && e.isSymbolNode && "end" === e.name) throw new Error('Cannot assign to symbol "end"');if (this.index && !this.index.isIndexNode) throw new TypeError('IndexNode expected as "index"');if (!this.value || !this.value.isNode) throw new TypeError('Node expected as "value"');Object.defineProperty(this, "name", { get: function () {
								return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "";
							}.bind(this), set: function set() {
								throw new Error("Cannot assign a new name, name is read-only");
							} });
					}function c(e, t, r) {
						t.assign = m, t.access = d, t.getSafeProperty = a, t.setSafeProperty = o;var n,
						    s = p(e.object, t, r),
						    u = e.index ? p(e.index, t, r) : null,
						    c = p(e.value, t, r),
						    f = i(e.object.name);if (e.index) {
							if (e.index.isObjectProperty()) {
								var l = i(e.index.getObjectProperty());return "setSafeProperty(" + s + ", " + l + ", " + c + ")";
							}if (e.object.isSymbolNode) return n = e.index.needsSize() ? "var size = math.size(object).valueOf();" : "", "(function () {  var object = " + s + ";  var value = " + c + ";  " + n + "  setSafeProperty(scope, " + f + ", assign(object, " + u + ", value));  return value;})()";n = e.index.needsSize() ? "var size = math.size(object).valueOf();" : "";var h = p(e.object.object, t, r);if (e.object.index.isObjectProperty()) {
								var g = i(e.object.index.getObjectProperty());return "(function () {  var parent = " + h + ";  var object = getSafeProperty(parent, " + g + ");  var value = " + c + ";" + n + "  setSafeProperty(parent, " + g + ", assign(object, " + u + ", value));  return value;})()";
							}var v = e.object.index.needsSize() ? "var size = math.size(parent).valueOf();" : "",
							    y = p(e.object.index, t, r);return "(function () {  var parent = " + h + ";  " + v + "  var parentIndex = " + y + ";  var object = access(parent, parentIndex);  var value = " + c + ";  " + n + "  assign(parent, parentIndex, assign(object, " + u + ", value));  return value;})()";
						}if (!e.object.isSymbolNode) throw new TypeError("SymbolNode expected as object");return "setSafeProperty(scope, " + f + ", " + c + ")";
					}function f(e, t) {
						t || (t = "keep");var r = g.getPrecedence(e, t),
						    n = g.getPrecedence(e.value, t);return "all" === t || null !== n && n <= r;
					}var l = n(r(5)).register,
					    p = n(r(5)).compile,
					    h = n(r(13)),
					    m = (n(r(65)), n(r(0)), n(r(336))),
					    d = n(r(93)),
					    g = (r(64), r(47));return u.prototype = new h(), u.prototype.type = "AssignmentNode", u.prototype.isAssignmentNode = !0, l(u.prototype.type, c), u.prototype.forEach = function (e) {
						e(this.object, "object", this), this.index && e(this.index, "index", this), e(this.value, "value", this);
					}, u.prototype.map = function (e) {
						var t = this._ifNode(e(this.object, "object", this)),
						    r = this.index ? this._ifNode(e(this.index, "index", this)) : null,
						    n = this._ifNode(e(this.value, "value", this));return new u(t, r, n);
					}, u.prototype.clone = function () {
						return new u(this.object, this.index, this.value);
					}, u.prototype._toString = function (e) {
						var t = this.object.toString(e),
						    r = this.index ? this.index.toString(e) : "",
						    n = this.value.toString(e);return f(this, e && e.parenthesis) && (n = "(" + n + ")"), t + r + " = " + n;
					}, u.prototype._toTex = function (e) {
						var t = this.object.toTex(e),
						    r = this.index ? this.index.toTex(e) : "",
						    n = this.value.toTex(e);return f(this, e && e.parenthesis) && (n = "\\left(" + n + "\\right)"), t + r + ":=" + n;
					}, u;
				}var i = (r(3), r(12).stringify),
				    a = r(21).getSafeProperty,
				    o = r(21).setSafeProperty;t.name = "AssignmentNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e) {
						if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (!Array.isArray(e)) throw new Error("Array expected");this.blocks = e.map(function (e) {
							var t = e && e.node,
							    r = !e || void 0 === e.visible || e.visible;if (!t || !t.isNode) throw new TypeError('Property "node" must be a Node');if ("boolean" != typeof r) throw new TypeError('Property "visible" must be a boolean');return { node: t, visible: r };
						});
					}function o(e, t, r) {
						t.ResultSet = f;var n = e.blocks.map(function (e) {
							var n = u(e.node, t, r);return e.visible ? "results.push(" + n + ");" : n + ";";
						});return "(function () {var results = [];" + n.join("") + "return new ResultSet(results);})()";
					}var s = n(r(5)).register,
					    u = n(r(5)).compile,
					    c = n(r(13)),
					    f = n(r(135));return a.prototype = new c(), a.prototype.type = "BlockNode", a.prototype.isBlockNode = !0, s(a.prototype.type, o), a.prototype.forEach = function (e) {
						for (var t = 0; t < this.blocks.length; t++) {
							e(this.blocks[t].node, "blocks[" + t + "].node", this);
						}
					}, a.prototype.map = function (e) {
						for (var t = [], r = 0; r < this.blocks.length; r++) {
							var n = this.blocks[r],
							    i = this._ifNode(e(n.node, "blocks[" + r + "].node", this));t[r] = { node: i, visible: n.visible };
						}return new a(t);
					}, a.prototype.clone = function () {
						var e = this.blocks.map(function (e) {
							return { node: e.node, visible: e.visible };
						});return new a(e);
					}, a.prototype._toString = function (e) {
						return this.blocks.map(function (t) {
							return t.node.toString(e) + (t.visible ? "" : ";");
						}).join("\n");
					}, a.prototype._toTex = function (e) {
						return this.blocks.map(function (t) {
							return t.node.toTex(e) + (t.visible ? "" : ";");
						}).join("\\;\\;\n");
					}, a;
				}t.name = "BlockNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e, t, r) {
						if (!(this instanceof o)) throw new SyntaxError("Constructor must be called with the new operator");if (!e || !e.isNode) throw new TypeError("Parameter condition must be a Node");if (!t || !t.isNode) throw new TypeError("Parameter trueExpr must be a Node");if (!r || !r.isNode) throw new TypeError("Parameter falseExpr must be a Node");this.condition = e, this.trueExpr = t, this.falseExpr = r;
					}function s(e, t, r) {
						return t.testCondition = function (e) {
							if ("number" == typeof e || "boolean" == typeof e || "string" == typeof e) return !!e;if (e) {
								if (e.isBigNumber === !0) return !e.isZero();if (e.isComplex === !0) return !(!e.re && !e.im);if (e.isUnit === !0) return !!e.value;
							}if (null === e || void 0 === e) return !1;throw new TypeError('Unsupported type of condition "' + t.math.typeof(e) + '"');
						}, "testCondition(" + c(e.condition, t, r) + ") ? ( " + c(e.trueExpr, t, r) + ") : ( " + c(e.falseExpr, t, r) + ")";
					}var u = n(r(5)).register,
					    c = n(r(5)).compile,
					    f = n(r(13));return o.prototype = new f(), o.prototype.type = "ConditionalNode", o.prototype.isConditionalNode = !0, u(o.prototype.type, s), o.prototype.forEach = function (e) {
						e(this.condition, "condition", this), e(this.trueExpr, "trueExpr", this), e(this.falseExpr, "falseExpr", this);
					}, o.prototype.map = function (e) {
						return new o(this._ifNode(e(this.condition, "condition", this)), this._ifNode(e(this.trueExpr, "trueExpr", this)), this._ifNode(e(this.falseExpr, "falseExpr", this)));
					}, o.prototype.clone = function () {
						return new o(this.condition, this.trueExpr, this.falseExpr);
					}, o.prototype._toString = function (e) {
						var t = e && e.parenthesis ? e.parenthesis : "keep",
						    r = i.getPrecedence(this, t),
						    n = this.condition.toString(e),
						    a = i.getPrecedence(this.condition, t);("all" === t || "OperatorNode" === this.condition.type || null !== a && a <= r) && (n = "(" + n + ")");var o = this.trueExpr.toString(e),
						    s = i.getPrecedence(this.trueExpr, t);("all" === t || "OperatorNode" === this.trueExpr.type || null !== s && s <= r) && (o = "(" + o + ")");var u = this.falseExpr.toString(e),
						    c = i.getPrecedence(this.falseExpr, t);return ("all" === t || "OperatorNode" === this.falseExpr.type || null !== c && c <= r) && (u = "(" + u + ")"), n + " ? " + o + " : " + u;
					}, o.prototype._toTex = function (e) {
						return "\\begin{cases} {" + this.trueExpr.toTex(e) + "}, &\\quad{\\text{if }\\;" + this.condition.toTex(e) + "}\\\\{" + this.falseExpr.toTex(e) + "}, &\\quad{\\text{otherwise}}\\end{cases}";
					}, o;
				}var i = (r(3), r(47));t.name = "ConditionalNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, c) {
					function f(e, t, r) {
						if (!(this instanceof f)) throw new SyntaxError("Constructor must be called with the new operator");if ("string" != typeof e) throw new TypeError('String expected for parameter "name"');if (!Array.isArray(t)) throw new TypeError('Array containing strings or objects expected for parameter "params"');if (!r || !r.isNode) throw new TypeError('Node expected for parameter "expr"');if (e in i) throw new Error('Illegal function name, "' + e + '" is a reserved keyword');this.name = e, this.params = t.map(function (e) {
							return e && e.name || e;
						}), this.types = t.map(function (e) {
							return e && e.type || "any";
						}), this.expr = r;
					}function l(e, t, r) {
						t.typed = c, t.setSafeProperty = u;var n = Object.create(r);e.params.forEach(function (e) {
							n[e] = !0;
						});var i = m(e.expr, t, n),
						    o = a(e.name);return "setSafeProperty(scope, " + o + ",   (function () {    var fn = typed(" + o + ", {      " + a(e.types.join(",")) + ": function (" + e.params.join(",") + ") {        return " + i + "      }    });    fn.syntax = " + a(e.name + "(" + e.params.join(", ") + ")") + ";    return fn;  })())";
					}function p(e, t) {
						var r = s.getPrecedence(e, t),
						    n = s.getPrecedence(e.expr, t);return "all" === t || null !== n && n <= r;
					}var h = n(r(5)).register,
					    m = n(r(5)).compile,
					    d = n(r(13));return f.prototype = new d(), f.prototype.type = "FunctionAssignmentNode", f.prototype.isFunctionAssignmentNode = !0, h(f.prototype.type, l), f.prototype.forEach = function (e) {
						e(this.expr, "expr", this);
					}, f.prototype.map = function (e) {
						var t = this._ifNode(e(this.expr, "expr", this));return new f(this.name, this.params.slice(0), t);
					}, f.prototype.clone = function () {
						return new f(this.name, this.params.slice(0), this.expr);
					}, f.prototype._toString = function (e) {
						var t = e && e.parenthesis ? e.parenthesis : "keep",
						    r = this.expr.toString(e);return p(this, t) && (r = "(" + r + ")"), this.name + "(" + this.params.join(", ") + ") = " + r;
					}, f.prototype._toTex = function (e) {
						var t = e && e.parenthesis ? e.parenthesis : "keep",
						    r = this.expr.toTex(e);return p(this, t) && (r = "\\left(" + r + "\\right)"), "\\mathrm{" + this.name + "}\\left(" + this.params.map(o.toSymbol).join(",") + "\\right):=" + r;
					}, f;
				}var i = r(64),
				    a = r(12).stringify,
				    o = r(3),
				    s = r(47),
				    u = r(21).setSafeProperty;t.name = "FunctionAssignmentNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e, t) {
						if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (this.dimensions = e, this.dotNotation = t || !1, !l(e) || !e.every(function (e) {
							return e && e.isNode;
						})) throw new TypeError('Array containing Nodes expected for parameter "dimensions"');if (this.dotNotation && !this.isObjectProperty()) throw new Error("dotNotation only applicable for object properties");var r = function r() {
							throw new Error("Property `IndexNode.object` is deprecated, use `IndexNode.fn` instead");
						};Object.defineProperty(this, "object", { get: r, set: r });
					}function o(e, t, r) {
						var n = Object.create(r);t.range = function (e, t, r) {
							return new f(e && e.isBigNumber === !0 ? e.toNumber() : e, t && t.isBigNumber === !0 ? t.toNumber() : t, r && r.isBigNumber === !0 ? r.toNumber() : r);
						};var i = e.dimensions.map(function (e, r) {
							return e && e.isRangeNode ? e.needsEnd() ? (n.end = !0, "(function () {var end = size[" + r + "]; return range(" + u(e.start, t, n) + ", " + u(e.end, t, n) + ", " + (e.step ? u(e.step, t, n) : "1") + "); })()") : "range(" + u(e.start, t, n) + ", " + u(e.end, t, n) + ", " + (e.step ? u(e.step, t, n) : "1") + ")" : e.isSymbolNode && "end" === e.name ? (n.end = !0, "(function () {var end = size[" + r + "]; return " + u(e, t, n) + "; })()") : u(e, t, n);
						});return "math.index(" + i.join(", ") + ")";
					}var s = n(r(5)).register,
					    u = n(r(5)).compile,
					    c = n(r(13)),
					    f = (n(r(66)), n(r(27)), n(r(133))),
					    l = Array.isArray;return a.prototype = new c(), a.prototype.type = "IndexNode", a.prototype.isIndexNode = !0, s(a.prototype.type, o), a.prototype.forEach = function (e) {
						for (var t = 0; t < this.dimensions.length; t++) {
							e(this.dimensions[t], "dimensions[" + t + "]", this);
						}
					}, a.prototype.map = function (e) {
						for (var t = [], r = 0; r < this.dimensions.length; r++) {
							t[r] = this._ifNode(e(this.dimensions[r], "dimensions[" + r + "]", this));
						}return new a(t);
					}, a.prototype.clone = function () {
						return new a(this.dimensions.slice(0));
					}, a.prototype.isObjectProperty = function () {
						return 1 === this.dimensions.length && this.dimensions[0].isConstantNode && "string" === this.dimensions[0].valueType;
					}, a.prototype.getObjectProperty = function () {
						return this.isObjectProperty() ? this.dimensions[0].value : null;
					}, a.prototype._toString = function (e) {
						return this.dotNotation ? "." + this.getObjectProperty() : "[" + this.dimensions.join(", ") + "]";
					}, a.prototype._toTex = function (e) {
						var t = this.dimensions.map(function (t) {
							return t.toTex(e);
						});return this.dotNotation ? "." + this.getObjectProperty() : "_{" + t.join(",") + "}";
					}, a.prototype.needsSize = function () {
						return this.dimensions.some(function (e) {
							return e.isRangeNode && e.needsEnd() || e.isSymbolNode && "end" === e.name;
						});
					}, a;
				}t.name = "IndexNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e) {
						if (!(this instanceof o)) throw new SyntaxError("Constructor must be called with the new operator");if (this.properties = e || {}, e && ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) || Object.keys(e).some(function (t) {
							return !e[t] || !e[t].isNode;
						}))) throw new TypeError("Object containing Nodes expected");
					}function s(e, t, r) {
						var n = [];for (var a in e.properties) {
							Object.hasOwnProperty.call(e.properties, a) && n.push(i(a) + ": " + c(e.properties[a], t, r));
						}return "{" + n.join(", ") + "}";
					}var u = n(r(5)).register,
					    c = n(r(5)).compile,
					    f = n(r(13));return o.prototype = new f(), o.prototype.type = "ObjectNode", o.prototype.isObjectNode = !0, u(o.prototype.type, s), o.prototype.forEach = function (e) {
						for (var t in this.properties) {
							this.properties.hasOwnProperty(t) && e(this.properties[t], "properties[" + i(t) + "]", this);
						}
					}, o.prototype.map = function (e) {
						var t = {};for (var r in this.properties) {
							this.properties.hasOwnProperty(r) && (t[r] = this._ifNode(e(this.properties[r], "properties[" + i(r) + "]", this)));
						}return new o(t);
					}, o.prototype.clone = function () {
						var e = {};for (var t in this.properties) {
							this.properties.hasOwnProperty(t) && (e[t] = this.properties[t]);
						}return new o(e);
					}, o.prototype._toString = function (e) {
						var t = [];for (var r in this.properties) {
							this.properties.hasOwnProperty(r) && t.push(i(r) + ": " + this.properties[r].toString(e));
						}return "{" + t.join(", ") + "}";
					}, o.prototype._toTex = function (e) {
						var t = [];for (var r in this.properties) {
							this.properties.hasOwnProperty(r) && t.push("\\mathbf{" + r + ":} & " + this.properties[r].toTex(e) + "\\\\");
						}return "\\left\\{\\begin{array}{ll}" + t.join("\n") + "\\end{array}\\right\\}";
					}, o;
				}var i = r(12).stringify;t.name = "ObjectNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(55)),
					    u = n(r(0));return function (e, t) {
						try {
							if (Array.isArray(e)) return u(e).subset(t).valueOf();if (e && "function" == typeof e.subset) return e.subset(t);if ("string" == typeof e) return s(e, t);if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
								if (!t.isObjectProperty()) throw new TypeError("Cannot apply a numeric index as object property");return a(e, t.getObjectProperty());
							}throw new TypeError("Cannot apply index: unsupported type of object");
						} catch (e) {
							throw i(e);
						}
					};
				}var i = r(31).transform,
				    a = r(21).getSafeProperty;t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var o = n(r(0)),
					    s = n(r(26)),
					    u = n(r(19)),
					    c = n(r(18)),
					    f = n(r(22)),
					    l = n(r(20)),
					    p = n(r(28)),
					    h = n(r(10)),
					    m = n(r(32)),
					    d = e.SparseMatrix,
					    g = e.DenseMatrix,
					    v = e.Spa,
					    y = i("lup", { DenseMatrix: function DenseMatrix(e) {
							return x(e);
						}, SparseMatrix: function SparseMatrix(e) {
							return w(e);
						}, Array: function Array(e) {
							var t = o(e),
							    r = x(t);return { L: r.L.valueOf(), U: r.U.valueOf(), p: r.p };
						} }),
					    x = function x(e) {
						var t,
						    r,
						    n,
						    i = e._size[0],
						    o = e._size[1],
						    m = Math.min(i, o),
						    d = a.clone(e._data),
						    v = [],
						    y = [i, m],
						    x = [],
						    w = [m, o],
						    b = [];for (t = 0; t < i; t++) {
							b[t] = t;
						}for (r = 0; r < o; r++) {
							if (r > 0) for (t = 0; t < i; t++) {
								var N = Math.min(t, r),
								    E = 0;for (n = 0; n < N; n++) {
									E = u(E, f(d[t][n], d[n][r]));
								}d[t][r] = l(d[t][r], E);
							}var M = r,
							    A = 0,
							    O = 0;for (t = r; t < i; t++) {
								var T = d[t][r],
								    _ = s(T);p(_, A) && (M = t, A = _, O = T);
							}if (r !== M && (b[r] = [b[M], b[M] = b[r]][0], g._swapRows(r, M, d)), r < i) for (t = r + 1; t < i; t++) {
								var S = d[t][r];h(S, 0) || (d[t][r] = c(d[t][r], O));
							}
						}for (r = 0; r < o; r++) {
							for (t = 0; t < i; t++) {
								0 === r && (t < o && (x[t] = []), v[t] = []), t < r ? (t < o && (x[t][r] = d[t][r]), r < i && (v[t][r] = 0)) : t !== r ? (t < o && (x[t][r] = 0), r < i && (v[t][r] = d[t][r])) : (t < o && (x[t][r] = d[t][r]), r < i && (v[t][r] = 1));
							}
						}var C = new g({ data: v, size: y }),
						    z = new g({ data: x, size: w }),
						    k = [];for (t = 0, m = b.length; t < m; t++) {
							k[b[t]] = t;
						}return { L: C, U: z, p: k, toString: function toString() {
								return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p;
							} };
					},
					    w = function w(e) {
						var t,
						    r,
						    n,
						    i = e._size[0],
						    a = e._size[1],
						    o = Math.min(i, a),
						    u = e._values,
						    l = e._index,
						    g = e._ptr,
						    y = [],
						    x = [],
						    w = [],
						    b = [i, o],
						    N = [],
						    E = [],
						    M = [],
						    A = [o, a],
						    O = [],
						    T = [];for (t = 0; t < i; t++) {
							O[t] = t, T[t] = t;
						}var _ = function _(e, t) {
							var r = T[e],
							    n = T[t];O[r] = t, O[n] = e, T[e] = n, T[t] = r;
						};for (r = 0; r < a; r++) {
							var S = new v();r < i && (w.push(y.length), y.push(1), x.push(r)), M.push(N.length);var C = g[r],
							    z = g[r + 1];for (n = C; n < z; n++) {
								t = l[n], S.set(O[t], u[n]);
							}r > 0 && S.forEach(0, r - 1, function (e, t) {
								d._forEachRow(e, y, x, w, function (r, n) {
									r > e && S.accumulate(r, m(f(n, t)));
								});
							});var k = r,
							    B = S.get(r),
							    I = s(B);S.forEach(r + 1, i - 1, function (e, t) {
								var r = s(t);p(r, I) && (k = e, I = r, B = t);
							}), r !== k && (d._swapRows(r, k, b[1], y, x, w), d._swapRows(r, k, A[1], N, E, M), S.swap(r, k), _(r, k)), S.forEach(0, i - 1, function (e, t) {
								e <= r ? (N.push(t), E.push(e)) : (t = c(t, B), h(t, 0) || (y.push(t), x.push(e)));
							});
						}return M.push(N.length), w.push(y.length), { L: new d({ values: y, index: x, ptr: w, size: b }), U: new d({ values: N, index: E, ptr: M, size: A }), p: O, toString: function toString() {
								return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p;
							} };
					};return y;
				}var i = r(25),
				    a = i.object;t.name = "lup", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(365)),
					    s = n(r(360)),
					    u = i("slu", { "SparseMatrix, number, number": function SparseMatrixNumberNumber(e, t, r) {
							if (!o(t) || t < 0 || t > 3) throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");if (r < 0 || r > 1) throw new Error("Partial pivoting threshold must be a number from 0 to 1");var n = a(t, e, !1),
							    i = s(e, n, r);return { L: i.L, U: i.U, p: i.pinv, q: n.q, toString: function toString() {
									return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\np: " + this.p.toString() + (this.q ? "\nq: " + this.q.toString() : "") + "\n";
								} };
						} });return u;
				}var i = r(25),
				    a = i.number,
				    o = a.isInteger;t.name = "slu", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e) {
						return e.transform(function (e, t, r) {
							return e.isParenthesisNode ? e.content : e;
						});
					}function o(e) {
						for (var t = [], r = 0; r < e.length; r++) {
							var n,
							    i = e[r],
							    o = typeof i === "undefined" ? "undefined" : _typeof(i);switch (o) {case "string":
									var u = i.split("->");if (2 !== u.length) throw SyntaxError("Could not parse rule: " + i);i = { l: u[0], r: u[1] };case "object":
									if (n = { l: a(m(i.l)), r: a(m(i.r)) }, i.context && (n.evaluate = i.context), i.evaluate && (n.evaluate = m(i.evaluate)), n.l.isOperatorNode && E(n.l)) {
										var c = T(n.l),
										    f = s();n.expanded = {}, n.expanded.l = c([n.l.clone(), f]), M(n.expanded.l), A(n.expanded.l), n.expanded.r = c([n.r, f]);
									}break;case "function":
									n = i;break;default:
									throw TypeError("Unsupported type of rule: " + o);}t.push(n);
						}return t;
					}function s() {
						return new x("_p" + S++);
					}function u(e, t) {
						var r,
						    n,
						    i = [],
						    a = T(e);if (N(e, t)) for (var o = 0; o < e.args.length; o++) {
							n = e.args.slice(0), n.splice(o, 1), r = 1 === n.length ? n[0] : a(n), i.push(a([e.args[o], r]));
						} else n = e.args.slice(1), r = 1 === n.length ? n[0] : a(n), i.push(a([e.args[0], r]));return i;
					}function c(e, t) {
						var r = { placeholders: {} };if (!e.placeholders && !t.placeholders) return r;if (!e.placeholders) return t;if (!t.placeholders) return e;for (var n in e.placeholders) {
							if (r.placeholders[n] = e.placeholders[n], t.placeholders.hasOwnProperty(n) && !h(e.placeholders[n], t.placeholders[n])) return null;
						}for (var n in t.placeholders) {
							r.placeholders[n] = t.placeholders[n];
						}return r;
					}function f(e, t) {
						var r = [];if (0 === e.length || 0 === t.length) return r;for (var n, i = 0; i < e.length; i++) {
							for (var a = 0; a < t.length; a++) {
								n = c(e[i], t[a]), n && r.push(n);
							}
						}return r;
					}function l(e) {
						if (0 === e.length) return e;for (var t = e.reduce(f), r = [], n = {}, i = 0; i < t.length; i++) {
							var a = JSON.stringify(t[i]);n[a] || (n[a] = !0, r.push(t[i]));
						}return r;
					}function p(e, t, r) {
						var n = [{ placeholders: {} }];if (e instanceof v && t instanceof v || e instanceof g && t instanceof g) {
							if (e instanceof v) {
								if (e.op !== t.op || e.fn !== t.fn) return [];
							} else if (e instanceof g && e.name !== t.name) return [];if ((1 !== t.args.length || 1 !== e.args.length) && E(t) && !r) {
								if (t.args.length >= 2 && 2 === e.args.length) {
									for (var i = u(t, e.context), a = [], o = 0; o < i.length; o++) {
										var s = p(e, i[o], !0);a = a.concat(s);
									}return a;
								}if (e.args.length > 2) throw Error("Unexpected non-binary associative function: " + e.toString());return [];
							}for (var c = [], o = 0; o < e.args.length; o++) {
								var f = p(e.args[o], t.args[o]);if (0 === f.length) return [];c.push(f);
							}n = l(c);
						} else if (e instanceof x) {
							if (0 === e.name.length) throw new Error("Symbol in rule has 0 length...!?");if ("n" == e.name[0] || "_p" == e.name.substring(0, 2)) n[0].placeholders[e.name] = t;else if ("v" == e.name[0]) {
								if (t.isConstantNode) return [];n[0].placeholders[e.name] = t;
							} else if ("C" == e.name[0]) {
								if (t instanceof d) return [];n[0].placeholders[e.name] = t;
							} else {
								if ("c" != e.name[0]) throw new Error("Invalid symbol in rule: " + e.name);if (!(t instanceof d)) return [];n[0].placeholders[e.name] = t;
							}
						} else {
							if (!(e instanceof d)) return [];if (e.value !== t.value) return [];
						}return n;
					}function h(e, t) {
						if (e instanceof d && t instanceof d) {
							if (e.value !== t.value) return !1;
						} else if (e instanceof x && t instanceof x) {
							if (e.name !== t.name) return !1;
						} else {
							if (!(e instanceof v && t instanceof v || e instanceof g && t instanceof g)) return !1;if (e instanceof v) {
								if (e.op !== t.op || e.fn !== t.fn) return !1;
							} else if (e instanceof g && e.name !== t.name) return !1;if (e.args.length !== t.args.length) return !1;for (var r = 0; r < e.args.length; r++) {
								if (!h(e.args[r], t.args[r])) return !1;
							}
						}return !0;
					}var m = n(r(30)),
					    d = n(r(45)),
					    g = n(r(46)),
					    v = n(r(52)),
					    y = n(r(53)),
					    x = n(r(27)),
					    w = (n(r(13)), n(r(351))),
					    b = n(r(97)),
					    N = b.isCommutative,
					    E = b.isAssociative,
					    M = b.flatten,
					    A = b.unflattenr,
					    O = b.unflattenl,
					    T = b.createMakeNodeFunction,
					    _ = i("simplify", { string: function string(e) {
							return _(m(e), _.rules);
						}, "string, Array": function stringArray(e, t) {
							return _(m(e), t);
						}, Node: function Node(e) {
							return _(e, _.rules);
						}, "Node, Array": function NodeArray(e, t) {
							t = o(t);for (var r = a(e), n = r.toString({ parenthesis: "all" }), i = null; i != n;) {
								S = 0, i = n;for (var s = 0; s < t.length; s++) {
									"function" == typeof t[s] ? r = t[s](r) : (M(r), r = C(r, t[s])), O(r);
								}n = r.toString({ parenthesis: "all" });
							}return r;
						} });_.rules = [{ l: "n+0", r: "n" }, { l: "n^0", r: "1" }, { l: "0*n", r: "0" }, { l: "n/n", r: "1" }, { l: "n^1", r: "n" }, { l: "+n1", r: "n1" }, { l: "n--n1", r: "n+n1" }, { l: "log(e)", r: "1" }, { l: "n-n1", r: "n+-n1" }, { l: "-(c*C)", r: "(-c) * C" }, { l: "-C", r: "(-1) * C" }, { l: "n/n1^n2", r: "n*n1^-n2" }, { l: "n/n1", r: "n*n1^-1" }, { l: "n*n", r: "n^2" }, { l: "n * n^n1", r: "n^(n1+1)" }, { l: "n^n1 * n^n2", r: "n^(n1+n2)" }, { l: "n+n", r: "2*n" }, { l: "n+-n", r: "0" }, { l: "n1*n2 + n2", r: "(n1+1)*n2" }, { l: "n1*n3 + n2*n3", r: "(n1+n2)*n3" }, w, { l: "(-n)*n1", r: "-(n*n1)" }, { l: "c+C", r: "C+c", context: { add: { commutative: !1 } } }, { l: "C*c", r: "c*C", context: { multiply: { commutative: !1 } } }, { l: "(-1) * n", r: "-n" }, { l: "n+-n1", r: "n-n1" }, { l: "n*(n1^-1)", r: "n/n1" }, { l: "n*n1^-n2", r: "n/n1^n2" }, { l: "n1^-1", r: "1/n1" }, { l: "n*(n1/n2)", r: "(n*n1)/n2" }, { l: "n-(n1+n2)", r: "n-n1-n2" }, { l: "1*n", r: "n" }];var S = 0,
					    C = i("applyRule", { "Node, Object": function NodeObject(e, t) {
							var r = e;if (r instanceof v || r instanceof g) {
								if (r.args) for (var n = 0; n < r.args.length; n++) {
									r.args[n] = C(r.args[n], t);
								}
							} else r instanceof y && r.content && (r.content = C(r.content, t));var i = t.r,
							    a = p(t.l, r)[0];return !a && t.expanded && (i = t.expanded.r, a = p(t.expanded.l, r)[0]), a && (r = i.clone(), r = r.transform(function (e, t, r) {
								if (e.isSymbolNode && a.placeholders.hasOwnProperty(e.name)) {
									var n = a.placeholders[e.name].clone();return n;
								}return e;
							})), r;
						} });return _;
				}t.name = "simplify", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n, i) {
					function a(e, t) {
						if (!e.args || e.args.length <= 1) return !0;var r = e.fn.toString();return t && t.hasOwnProperty(r) && t[r].hasOwnProperty("commutative") ? t[r].commutative : d[r] || !1;
					}function o(e, t) {
						if (!e.args || e.args.length <= 1) return !0;var r = e.fn.toString();return t && t.hasOwnProperty(r) && t[r].hasOwnProperty("associative") ? t[r].associative : g[r] || !1;
					}function s(e) {
						if (!e.args || 0 === e.args.length) return e;e.args = u(e);for (var t = 0; t < e.args.length; t++) {
							s(e.args[t]);
						}
					}function u(e) {
						var t,
						    r = [],
						    n = function n(e) {
							for (var i = 0; i < e.args.length; i++) {
								var a = e.args[i];a.isOperatorNode && t === a.op ? n(a) : r.push(a);
							}
						};return e.isOperatorNode && o(e) ? (t = e.op, n(e), r) : e.args;
					}function c(e) {
						if (e.args && 0 !== e.args.length) {
							for (var t = l(e), r = e.args.length, n = 0; n < r; n++) {
								c(e.args[n]);
							}if (r > 2 && o(e)) {
								for (var i = e.args.pop(); e.args.length > 0;) {
									i = t([e.args.pop(), i]);
								}e.args = i.args;
							}
						}
					}function f(e) {
						if (e.args && 0 !== e.args.length) {
							for (var t = l(e), r = e.args.length, n = 0; n < r; n++) {
								f(e.args[n]);
							}if (r > 2 && o(e)) {
								for (var i = e.args.shift(); e.args.length > 0;) {
									i = t([i, e.args.shift()]);
								}e.args = i.args;
							}
						}
					}function l(e) {
						return e.isOperatorNode ? function (t) {
							try {
								return new h(e.op, e.fn, t);
							} catch (e) {
								return console.error(e), [];
							}
						} : function (t) {
							return new p(new m(e.name), t);
						};
					}var p = i.expression.node.FunctionNode,
					    h = i.expression.node.OperatorNode,
					    m = i.expression.node.SymbolNode,
					    d = { add: !0, multiply: !0 },
					    g = { add: !0, multiply: !0 };return { createMakeNodeFunction: l, isCommutative: a, isAssociative: o, flatten: s, allChildren: u, unflattenr: c, unflattenl: f };
				}t.factory = n, t.math = !0;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(0)),
					    o = n(r(18)),
					    s = n(r(22)),
					    u = n(r(20)),
					    c = n(r(10)),
					    f = n(r(67)),
					    l = e.DenseMatrix,
					    p = i("lsolve", { "SparseMatrix, Array | Matrix": function SparseMatrixArrayMatrix(e, t) {
							return m(e, t);
						}, "DenseMatrix, Array | Matrix": function DenseMatrixArrayMatrix(e, t) {
							return h(e, t);
						}, "Array, Array | Matrix": function ArrayArrayMatrix(e, t) {
							var r = a(e),
							    n = h(r, t);return n.valueOf();
						} }),
					    h = function h(e, t) {
						t = f(e, t, !0);for (var r = t._data, n = e._size[0], i = e._size[1], a = [], p = e._data, h = 0; h < i; h++) {
							var m,
							    d = r[h][0] || 0;if (c(d, 0)) m = 0;else {
								var g = p[h][h];if (c(g, 0)) throw new Error("Linear system cannot be solved since matrix is singular");m = o(d, g);for (var v = h + 1; v < n; v++) {
									r[v] = [u(r[v][0] || 0, s(m, p[v][h]))];
								}
							}a[h] = [m];
						}return new l({ data: a, size: [n, 1] });
					},
					    m = function m(e, t) {
						t = f(e, t, !0);for (var r, n, i = t._data, a = e._size[0], p = e._size[1], h = e._values, m = e._index, d = e._ptr, g = [], v = 0; v < p; v++) {
							var y = i[v][0] || 0;if (c(y, 0)) g[v] = [0];else {
								var x = 0,
								    w = [],
								    b = [],
								    N = d[v + 1];for (n = d[v]; n < N; n++) {
									r = m[n], r === v ? x = h[n] : r > v && (w.push(h[n]), b.push(r));
								}if (c(x, 0)) throw new Error("Linear system cannot be solved since matrix is singular");var E = o(y, x);for (n = 0, N = b.length; n < N; n++) {
									r = b[n], i[r] = [u(i[r][0] || 0, s(E, w[n]))];
								}g[v] = [E];
							}
						}return new l({ data: g, size: [a, 1] });
					};return p;
				}t.name = "lsolve", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(0)),
					    o = n(r(18)),
					    s = n(r(22)),
					    u = n(r(20)),
					    c = n(r(10)),
					    f = n(r(67)),
					    l = e.DenseMatrix,
					    p = i("usolve", { "SparseMatrix, Array | Matrix": function SparseMatrixArrayMatrix(e, t) {
							return m(e, t);
						}, "DenseMatrix, Array | Matrix": function DenseMatrixArrayMatrix(e, t) {
							return h(e, t);
						}, "Array, Array | Matrix": function ArrayArrayMatrix(e, t) {
							var r = a(e),
							    n = h(r, t);return n.valueOf();
						} }),
					    h = function h(e, t) {
						t = f(e, t, !0);for (var r = t._data, n = e._size[0], i = e._size[1], a = [], p = e._data, h = i - 1; h >= 0; h--) {
							var m,
							    d = r[h][0] || 0;if (c(d, 0)) m = 0;else {
								var g = p[h][h];if (c(g, 0)) throw new Error("Linear system cannot be solved since matrix is singular");m = o(d, g);for (var v = h - 1; v >= 0; v--) {
									r[v] = [u(r[v][0] || 0, s(m, p[v][h]))];
								}
							}a[h] = [m];
						}return new l({ data: a, size: [n, 1] });
					},
					    m = function m(e, t) {
						t = f(e, t, !0);for (var r, n, i = t._data, a = e._size[0], p = e._size[1], h = e._values, m = e._index, d = e._ptr, g = [], v = p - 1; v >= 0; v--) {
							var y = i[v][0] || 0;if (c(y, 0)) g[v] = [0];else {
								var x = 0,
								    w = [],
								    b = [],
								    N = d[v],
								    E = d[v + 1];for (n = E - 1; n >= N; n--) {
									r = m[n], r === v ? x = h[n] : r < v && (w.push(h[n]), b.push(r));
								}if (c(x, 0)) throw new Error("Linear system cannot be solved since matrix is singular");var M = o(y, x);for (n = 0, E = b.length; n < E; n++) {
									r = b[n], i[r] = [u(i[r][0], s(M, w[n]))];
								}g[v] = [M];
							}
						}return new l({ data: g, size: [a, 1] });
					};return p;
				}t.name = "usolve", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					var i = n(r(68)),
					    a = function a(e, t) {
						e[t] = i(e[t]);
					};return a;
				}t.name = "cs_mark", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n() {
					var e = function e(_e3, t) {
						return _e3[t] < 0;
					};return e;
				}t.name = "cs_marked", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n() {
					var e = function e(_e4, t, r, n, i, a, o) {
						var s = 0;for (r[o] = _e4; s >= 0;) {
							var u = r[o + s],
							    c = r[n + u];c == -1 ? (s--, a[t++] = u) : (r[n + u] = r[i + c], ++s, r[o + s] = c);
						}return t;
					};return e;
				}t.name = "cs_tdfs", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(0)),
					    o = n(r(18)),
					    s = r(3),
					    u = n(r(23)),
					    c = n(r(14)),
					    f = n(r(24)),
					    l = n(r(15)),
					    p = n(r(16)),
					    h = n(r(8)),
					    m = n(r(4)),
					    d = i("dotDivide", { "any, any": o, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = f(e, t, o, !1);break;default:
											r = u(t, e, o, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = c(e, t, o, !1);break;default:
											r = h(e, t, o);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return d(a(e), a(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return d(a(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return d(e, a(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = l(e, t, o, !1);break;default:
									r = m(e, t, o, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = p(t, e, o, !0);break;default:
									r = m(t, e, o, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return m(a(e), t, o, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return m(a(t), e, o, !0).valueOf();
						} });return d.toTex = { 2: "\\left(${args[0]}" + s.operators.dotDivide + "${args[1]}\\right)" }, d;
				}t.name = "dotDivide", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("fix", { number: function number(e) {
							return e > 0 ? Math.floor(e) : Math.ceil(e);
						}, Complex: function Complex(t) {
							return new e.Complex(t.re > 0 ? Math.floor(t.re) : Math.ceil(t.re), t.im > 0 ? Math.floor(t.im) : Math.ceil(t.im));
						}, BigNumber: function BigNumber(e) {
							return e.isNegative() ? e.ceil() : e.floor();
						}, Fraction: function Fraction(e) {
							return e.s < 0 ? e.ceil() : e.floor();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a, !0);
						} });return a.toTex = { 1: "\\mathrm{${name}}\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "fix", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(18)),
					    s = a("log", { number: function number(r) {
							return r >= 0 || t.predictable ? Math.log(r) : new e.Complex(r, 0).log();
						}, Complex: function Complex(e) {
							return e.log();
						}, BigNumber: function BigNumber(r) {
							return !r.isNegative() || t.predictable ? r.ln() : new e.Complex(r.toNumber(), 0).log();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, s);
						}, "any, any": function anyAny(e, t) {
							return o(s(e), s(t));
						} });return s.toTex = { 1: "\\ln\\left(${args[0]}\\right)", 2: "\\log_{${args[1]}}\\left(${args[0]}\\right)" }, s;
				}var i = r(1);t.name = "log", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("sign", { number: i.sign, Complex: function Complex(e) {
							return e.sign();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(t.cmp(0));
						}, Fraction: function Fraction(t) {
							return new e.Fraction(t.s, 1);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return a(e, o, !0);
						}, Unit: function Unit(e) {
							return o(e.value);
						} });return o.toTex = { 1: "\\mathrm{${name}}\\left(${args[0]}\\right)" }, o;
				}var i = r(2),
				    a = r(1);t.name = "sign", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(17)),
					    o = n(r(20)),
					    s = n(r(11)),
					    u = n(r(38)),
					    c = n(r(39)),
					    f = n(r(58)),
					    l = n(r(57)),
					    p = n(r(50)),
					    h = n(r(41)),
					    m = n(r(28)),
					    d = i("stirlingS2", { "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(e, t) {
							if (!h(e) || p(e) || !h(t) || p(t)) throw new TypeError("Non-negative integer value expected in function stirlingS2");if (m(t, e)) throw new TypeError("k must be less than or equal to n in function stirlingS2");for (var r = f(t), n = 0, i = 0; i <= t; i++) {
								var d = c(-1, o(t, i)),
								    g = l(t, i),
								    v = c(i, e);n = a(n, s(s(g, v), d));
							}return u(n, r);
						} });return d.toTex = { 2: "\\mathrm{S}\\left(${args}\\right)" }, d;
				}t.name = "stirlingS2", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("conj", { number: function number(e) {
							return e;
						}, BigNumber: function BigNumber(e) {
							return e;
						}, Complex: function Complex(e) {
							return e.conjugate();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\left(${args[0]}\\right)^*" }, a;
				}var i = r(1);t.name = "conj", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = r(3),
					    s = a("not", { number: function number(e) {
							return !e;
						}, Complex: function Complex(e) {
							return 0 === e.re && 0 === e.im;
						}, BigNumber: function BigNumber(e) {
							return e.isZero() || e.isNaN();
						}, Unit: function Unit(e) {
							return s(e.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, s);
						} });return s.toTex = { 1: o.operators.not + "\\left(${args[0]}\\right)" }, s;
				}var i = r(1);t.name = "not", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, f) {
					var l = n(r(0)),
					    p = f("concat", { "...Array | Matrix | number | BigNumber": function ArrayMatrixNumberBigNumber(e) {
							var t,
							    r,
							    n = e.length,
							    f = -1,
							    p = !1,
							    h = [];for (t = 0; t < n; t++) {
								var m = e[t];if (m && m.isMatrix === !0 && (p = !0), "number" == typeof m || m && m.isBigNumber === !0) {
									if (t !== n - 1) throw new Error("Dimension must be specified as last argument");if (r = f, f = m.valueOf(), !o(f)) throw new TypeError("Integer number expected for dimension");if (f < 0 || t > 0 && f > r) throw new u(f, r + 1);
								} else {
									var d = a(m).valueOf(),
									    g = s.size(d);if (h[t] = d, r = f, f = g.length - 1, t > 0 && f != r) throw new c(r + 1, f + 1);
								}
							}if (0 == h.length) throw new SyntaxError("At least one matrix expected");for (var v = h.shift(); h.length;) {
								v = i(v, h.shift(), f, 0);
							}return p ? l(v) : v;
						}, "...string": function string(e) {
							return e.join("");
						} });return p.toTex = void 0, p;
				}function i(e, t, r, n) {
					if (n < r) {
						if (e.length != t.length) throw new c(e.length, t.length);for (var a = [], o = 0; o < e.length; o++) {
							a[o] = i(e[o], t[o], r, n + 1);
						}return a;
					}return e.concat(t);
				}var a = r(6).clone,
				    o = r(2).isInteger,
				    s = r(7),
				    u = r(44),
				    c = r(9);t.name = "concat", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function s(e, t, r) {
						if (1 == t) return a.clone(e[0][0]);if (2 == t) return f(l(e[0][0], e[1][1]), l(e[1][0], e[0][1]));for (var n = function n(e) {
							var t,
							    r,
							    n = new Array(e.length),
							    i = 0;for (t = 1; t < e.length; t++) {
								i = c(i, e[t][t]);
							}for (t = 0; t < e.length; t++) {
								for (n[t] = new Array(e.length), n[t][t] = p(i), r = 0; r < t; r++) {
									n[t][r] = 0;
								}for (r = t + 1; r < e.length; r++) {
									n[t][r] = e[t][r];
								}t + 1 < e.length && (i = f(i, e[t + 1][t + 1]));
							}return n;
						}, i = e, o = 0; o < t - 1; o++) {
							i = l(n(i), e);
						}return t % 2 == 0 ? p(i[0][0]) : i[0][0];
					}var u = n(r(0)),
					    c = n(r(17)),
					    f = n(r(20)),
					    l = n(r(11)),
					    p = n(r(32)),
					    h = i("det", { any: function any(e) {
							return a.clone(e);
						}, "Array | Matrix": function ArrayMatrix(e) {
							var t;switch (e && e.isMatrix === !0 ? t = e.size() : Array.isArray(e) ? (e = u(e), t = e.size()) : t = [], t.length) {case 0:
									return a.clone(e);case 1:
									if (1 == t[0]) return a.clone(e.valueOf()[0]);throw new RangeError("Matrix must be square (size: " + o.format(t) + ")");case 2:
									var r = t[0],
									    n = t[1];if (r == n) return s(e.clone().valueOf(), r, n);throw new RangeError("Matrix must be square (size: " + o.format(t) + ")");default:
									throw new RangeError("Matrix must be two dimensional (size: " + o.format(t) + ")");}
						} });return h.toTex = { 1: "\\det\\left(${args[0]}\\right)" }, h;
				}var i = r(25),
				    a = i.object,
				    o = i.string;t.name = "det", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(0)),
					    u = o("filter", { "Array, function": i, "Array, RegExp": a, "Matrix, function": function MatrixFunction(e, t) {
							return s(i(e.toArray(), t));
						}, "Matrix, RegExp": function MatrixRegExp(e, t) {
							return s(a(e.toArray(), t));
						} });return u.toTex = void 0, u;
				}function i(e, t) {
					if (1 !== o(e).length) throw new Error("Only one dimensional matrices supported");var r = s(t);return e.filter(function (e, n, i) {
						return 1 === r ? t(e) : 2 === r ? t(e, [n]) : t(e, [n], i);
					});
				}function a(e, t) {
					if (1 !== o(e).length) throw new Error("Only one dimensional matrices supported");return e.filter(function (e) {
						return t.test(e);
					});
				}var o = r(7).size,
				    s = r(37).maxArgumentCount;t.name = "filter", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("forEach", { "Array, function": i, "Matrix, function": function MatrixFunction(e, t) {
							return e.forEach(t);
						} });return a.toTex = void 0, a;
				}function i(e, t) {
					var r = a(t),
					    n = function n(i, a) {
						Array.isArray(i) ? i.forEach(function (e, t) {
							n(e, a.concat(t));
						}) : 1 === r ? t(i) : 2 === r ? t(i, a) : t(i, a, e);
					};n(e, []);
				}var a = r(37).maxArgumentCount;t.name = "forEach", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e, t, r) {
						var n, i, a, o, s;if (1 == t) {
							if (o = e[0][0], 0 == o) throw Error("Cannot calculate inverse, determinant is zero");return [[u(1, o)]];
						}if (2 == t) {
							var m = p(e);if (0 == m) throw Error("Cannot calculate inverse, determinant is zero");return [[u(e[1][1], m), u(l(e[0][1]), m)], [u(l(e[1][0]), m), u(e[0][0], m)]];
						}var d = e.concat();for (n = 0; n < t; n++) {
							d[n] = d[n].concat();
						}for (var g = h(t).valueOf(), v = 0; v < r; v++) {
							for (n = v; n < t && 0 == d[n][v];) {
								n++;
							}if (n == t || 0 == d[n][v]) throw Error("Cannot calculate inverse, determinant is zero");n != v && (s = d[v], d[v] = d[n], d[n] = s, s = g[v], g[v] = g[n], g[n] = s);var y = d[v],
							    x = g[v];for (n = 0; n < t; n++) {
								var w = d[n],
								    b = g[n];if (n != v) {
									if (0 != w[v]) {
										for (a = u(l(w[v]), y[v]), i = v; i < r; i++) {
											w[i] = c(w[i], f(a, y[i]));
										}for (i = 0; i < r; i++) {
											b[i] = c(b[i], f(a, x[i]));
										}
									}
								} else {
									for (a = y[v], i = v; i < r; i++) {
										w[i] = u(w[i], a);
									}for (i = 0; i < r; i++) {
										b[i] = u(b[i], a);
									}
								}
							}
						}return g;
					}var s = n(r(0)),
					    u = n(r(18)),
					    c = n(r(19)),
					    f = n(r(11)),
					    l = n(r(32)),
					    p = n(r(111)),
					    h = n(r(54)),
					    m = a("inv", { "Array | Matrix": function ArrayMatrix(e) {
							var t = e.isMatrix === !0 ? e.size() : i.array.size(e);switch (t.length) {case 1:
									if (1 == t[0]) return e.isMatrix === !0 ? s([u(1, e.valueOf()[0])]) : [u(1, e[0])];throw new RangeError("Matrix must be square (size: " + i.string.format(t) + ")");case 2:
									var r = t[0],
									    n = t[1];if (r == n) return e.isMatrix === !0 ? s(o(e.valueOf(), r, n), e.storage()) : o(e, r, n);throw new RangeError("Matrix must be square (size: " + i.string.format(t) + ")");default:
									throw new RangeError("Matrix must be two dimensional (size: " + i.string.format(t) + ")");}
						}, any: function any(e) {
							return u(1, e);
						} });return m.toTex = { 1: "\\left(${args[0]}\\right)^{-1}" }, m;
				}var i = r(25);t.name = "inv", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e) {
						return "Array" === t.matrix ? e : p(e);
					}function o(r, n) {
						var i = l(r);if (!i) throw new SyntaxError('String "' + r + '" is no valid range');var o;return "BigNumber" === t.number ? (o = n ? f : c, a(o(new e.BigNumber(i.start), new e.BigNumber(i.end), new e.BigNumber(i.step)))) : (o = n ? u : s, a(o(i.start, i.end, i.step)));
					}function s(e, t, r) {
						var n = [],
						    i = e;if (r > 0) for (; i < t;) {
							n.push(i), i += r;
						} else if (r < 0) for (; i > t;) {
							n.push(i), i += r;
						}return n;
					}function u(e, t, r) {
						var n = [],
						    i = e;if (r > 0) for (; i <= t;) {
							n.push(i), i += r;
						} else if (r < 0) for (; i >= t;) {
							n.push(i), i += r;
						}return n;
					}function c(e, t, r) {
						var n = [],
						    i = e;if (r.gt(h)) for (; i.lt(t);) {
							n.push(i), i = i.plus(r);
						} else if (r.lt(h)) for (; i.gt(t);) {
							n.push(i), i = i.plus(r);
						}return n;
					}function f(e, t, r) {
						var n = [],
						    i = e;if (r.gt(h)) for (; i.lte(t);) {
							n.push(i), i = i.plus(r);
						} else if (r.lt(h)) for (; i.gte(t);) {
							n.push(i), i = i.plus(r);
						}return n;
					}function l(e) {
						var t = e.split(":"),
						    r = t.map(function (e) {
							return Number(e);
						}),
						    n = r.some(function (e) {
							return isNaN(e);
						});if (n) return null;switch (r.length) {case 2:
								return { start: r[0], end: r[1], step: 1 };case 3:
								return { start: r[0], end: r[2], step: r[1] };default:
								return null;}
					}var p = n(r(0)),
					    h = new e.BigNumber(0),
					    m = new e.BigNumber(1),
					    d = i("range", { string: o, "string, boolean": o, "number, number": function numberNumber(e, t) {
							return a(s(e, t, 1));
						}, "number, number, number": function numberNumberNumber(e, t, r) {
							return a(s(e, t, r));
						}, "number, number, boolean": function numberNumberBoolean(e, t, r) {
							return a(r ? u(e, t, 1) : s(e, t, 1));
						}, "number, number, number, boolean": function numberNumberNumberBoolean(e, t, r, n) {
							return a(n ? u(e, t, r) : s(e, t, r));
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
							return a(c(e, t, m));
						}, "BigNumber, BigNumber, BigNumber": function BigNumberBigNumberBigNumber(e, t, r) {
							return a(c(e, t, r));
						}, "BigNumber, BigNumber, boolean": function BigNumberBigNumberBoolean(e, t, r) {
							return a(r ? f(e, t, m) : c(e, t, m));
						}, "BigNumber, BigNumber, BigNumber, boolean": function BigNumberBigNumberBigNumberBoolean(e, t, r, n) {
							return a(n ? f(e, t, r) : c(e, t, r));
						} });return d.toTex = void 0, d;
				}t.name = "range", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(0)),
					    u = n(r(17)),
					    c = o("trace", { Array: function Array(e) {
							return c(s(e));
						}, Matrix: function Matrix(e) {
							var t;switch (e.storage()) {case "dense":
									t = f(e);break;case "sparse":
									t = l(e);}return t;
						}, any: i }),
					    f = function f(e) {
						var t = e._size,
						    r = e._data;switch (t.length) {case 1:
								if (1 == t[0]) return i(r[0]);throw new RangeError("Matrix must be square (size: " + a(t) + ")");case 2:
								var n = t[0],
								    o = t[1];if (n === o) {
									for (var s = 0, c = 0; c < n; c++) {
										s = u(s, r[c][c]);
									}return s;
								}throw new RangeError("Matrix must be square (size: " + a(t) + ")");default:
								throw new RangeError("Matrix must be two dimensional (size: " + a(t) + ")");}
					},
					    l = function l(e) {
						var t = e._values,
						    r = e._index,
						    n = e._ptr,
						    i = e._size,
						    o = i[0],
						    s = i[1];if (o === s) {
							var c = 0;if (t.length > 0) for (var f = 0; f < s; f++) {
								for (var l = n[f], p = n[f + 1], h = l; h < p; h++) {
									var m = r[h];if (m === f) {
										c = u(c, t[h]);break;
									}if (m > f) break;
								}
							}return c;
						}throw new RangeError("Matrix must be square (size: " + a(i) + ")");
					};return c.toTex = { 1: "\\mathrm{tr}\\left(${args[0]}\\right)" }, c;
				}var i = r(6).clone,
				    a = r(12).format;t.name = "trace", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, u) {
					function c(r) {
						if (r.isZero()) return new e.BigNumber(1);for (var n = t.precision + (0 | Math.log(r.toNumber())), i = e.BigNumber.clone({ precision: n }), a = new i(r), o = r.toNumber() - 1; o > 1;) {
							a = a.times(o), o--;
						}return new e.BigNumber(a.toPrecision(e.BigNumber.precision));
					}var f = n(r(11)),
					    l = n(r(39)),
					    p = u("gamma", { number: function number(e) {
							var t, r;if (a(e)) {
								if (e <= 0) return isFinite(e) ? 1 / 0 : NaN;if (e > 171) return 1 / 0;for (var n = e - 2, i = e - 1; n > 1;) {
									i *= n, n--;
								}return 0 == i && (i = 1), i;
							}if (e < .5) return Math.PI / (Math.sin(Math.PI * e) * p(1 - e));if (e >= 171.35) return 1 / 0;if (e > 85) {
								var u = e * e,
								    c = u * e,
								    f = c * e,
								    l = f * e;return Math.sqrt(2 * Math.PI / e) * Math.pow(e / Math.E, e) * (1 + 1 / (12 * e) + 1 / (288 * u) - 139 / (51840 * c) - 571 / (2488320 * f) + 163879 / (209018880 * l) + 5246819 / (75246796800 * l * e));
							}--e, r = s[0];for (var h = 1; h < s.length; ++h) {
								r += s[h] / (e + h);
							}return t = e + o + .5, Math.sqrt(2 * Math.PI) * Math.pow(t, e + .5) * Math.exp(-t) * r;
						}, Complex: function Complex(t) {
							var r, n;if (0 == t.im) return p(t.re);t = new e.Complex(t.re - 1, t.im), n = new e.Complex(s[0], 0);for (var i = 1; i < s.length; ++i) {
								var a = t.re + i,
								    u = a * a + t.im * t.im;0 != u ? (n.re += s[i] * a / u, n.im += -(s[i] * t.im) / u) : n.re = s[i] < 0 ? -(1 / 0) : 1 / 0;
							}r = new e.Complex(t.re + o + .5, t.im);var c = Math.sqrt(2 * Math.PI);t.re += .5;var h = l(r, t);0 == h.im ? h.re *= c : 0 == h.re ? h.im *= c : (h.re *= c, h.im *= c);var m = Math.exp(-r.re);return r.re = m * Math.cos(-r.im), r.im = m * Math.sin(-r.im), f(f(h, r), n);
						}, BigNumber: function BigNumber(t) {
							if (t.isInteger()) return t.isNegative() || t.isZero() ? new e.BigNumber(1 / 0) : c(t.minus(1));if (!t.isFinite()) return new e.BigNumber(t.isNegative() ? NaN : 1 / 0);throw new Error("Integer BigNumber expected");
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, p);
						} });return p.toTex = { 1: "\\Gamma\\left(${args[0]}\\right)" }, p;
				}var i = r(1),
				    a = r(2).isInteger,
				    o = 4.7421875,
				    s = [.9999999999999971, 57.15623566586292, -59.59796035547549, 14.136097974741746, -.4919138160976202, 3399464998481189e-20, 4652362892704858e-20, -9837447530487956e-20, .0001580887032249125, -.00021026444172410488, .00021743961811521265, -.0001643181065367639, 8441822398385275e-20, -26190838401581408e-21, 36899182659531625e-22];t.name = "gamma", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(0)),
					    u = n(r(14)),
					    c = n(r(24)),
					    f = n(r(16)),
					    l = n(r(8)),
					    p = n(r(4)),
					    h = r(3),
					    m = o("largerEq", { "boolean, boolean": function booleanBoolean(e, t) {
							return e >= t;
						}, "number, number": function numberNumber(e, r) {
							return e >= r || i(e, r, t.epsilon);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
							return e.gte(r) || a(e, r, t.epsilon);
						}, "Fraction, Fraction": function FractionFraction(e, t) {
							return e.compare(t) !== -1;
						}, "Complex, Complex": function ComplexComplex() {
							throw new TypeError("No ordering relation is defined for complex numbers");
						}, "Unit, Unit": function UnitUnit(e, t) {
							if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return m(e.value, t.value);
						}, "string, string": function stringString(e, t) {
							return e >= t;
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = c(e, t, m);break;default:
											r = u(t, e, m, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = u(e, t, m, !1);break;default:
											r = l(e, t, m);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return m(s(e), s(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return m(s(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return m(e, s(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = f(e, t, m, !1);break;default:
									r = p(e, t, m, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = f(t, e, m, !0);break;default:
									r = p(t, e, m, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return p(s(e), t, m, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return p(s(t), e, m, !0).valueOf();
						} });return m.toTex = { 2: "\\left(${args[0]}" + h.operators.largerEq + "${args[1]}\\right)" }, m;
				}var i = r(2).nearlyEqual,
				    a = r(35);t.name = "largerEq", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(0)),
					    u = n(r(14)),
					    c = n(r(24)),
					    f = n(r(16)),
					    l = n(r(8)),
					    p = n(r(4)),
					    h = r(3),
					    m = o("unequal", { "any, any": function anyAny(e, t) {
							return null === e ? null !== t : null === t ? null !== e : void 0 === e ? void 0 !== t : void 0 === t ? void 0 !== e : d(e, t);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = c(e, t, d);break;default:
											r = u(t, e, d, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = u(e, t, d, !1);break;default:
											r = l(e, t, d);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return m(s(e), s(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return m(s(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return m(e, s(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = f(e, t, d, !1);break;default:
									r = p(e, t, d, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = f(t, e, d, !0);break;default:
									r = p(t, e, d, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return p(s(e), t, d, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return p(s(t), e, d, !0).valueOf();
						} }),
					    d = o("_unequal", { "boolean, boolean": function booleanBoolean(e, t) {
							return e !== t;
						}, "number, number": function numberNumber(e, r) {
							return !i(e, r, t.epsilon);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
							return !a(e, r, t.epsilon);
						}, "Fraction, Fraction": function FractionFraction(e, t) {
							return !e.equals(t);
						}, "Complex, Complex": function ComplexComplex(e, t) {
							return !e.equals(t);
						}, "Unit, Unit": function UnitUnit(e, t) {
							if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return m(e.value, t.value);
						}, "string, string": function stringString(e, t) {
							return e !== t;
						} });return m.toTex = { 2: "\\left(${args[0]}" + h.operators.unequal + "${args[1]}\\right)" }, m;
				}var i = r(2).nearlyEqual,
				    a = r(35);t.name = "unequal", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, s) {
					function u(e, t) {
						return f(e, t) ? e : t;
					}function c(e) {
						var t = void 0;if (i(e, function (e) {
							(void 0 === t || f(e, t)) && (t = e);
						}), void 0 === t) throw new Error("Cannot calculate max of an empty array");return t;
					}var f = n(r(28)),
					    l = s("max", { "Array | Matrix": c, "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(e, t) {
							return a(e, t.valueOf(), u);
						}, "...": function _(e) {
							if (o(e)) throw new TypeError("Scalar values expected in function max");return c(e);
						} });return l.toTex = "\\max\\left(${args}\\right)", l;
				}var i = r(36),
				    a = r(62),
				    o = r(61);t.name = "max", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, u) {
					function c(e, t) {
						var r = o(e, t, l),
						    n = Array.isArray(e) ? i(e) : e.size();return p(r, n[t]);
					}function f(e) {
						var t = 0,
						    r = 0;if (a(e, function (e) {
							t = l(t, e), r++;
						}), 0 === r) throw new Error("Cannot calculate mean of an empty array");return p(t, r);
					}var l = n(r(17)),
					    p = n(r(38)),
					    h = u("mean", { "Array | Matrix": f, "Array | Matrix, number | BigNumber": c, "...": function _(e) {
							if (s(e)) throw new TypeError("Scalar values expected in function mean");return f(e);
						} });return h.toTex = void 0, h;
				}var i = r(7).size,
				    a = r(36),
				    o = r(62),
				    s = r(61);t.name = "mean", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(e) {
						e = i(e.valueOf());var t = e.length;if (0 == t) throw new Error("Cannot calculate median of an empty array");if (t % 2 == 0) {
							for (var r = t / 2 - 1, n = l(e, r + 1), a = e[r], o = 0; o < r; ++o) {
								f(e[o], a) > 0 && (a = e[o]);
							}return m(a, n);
						}var s = l(e, (t - 1) / 2);return h(s);
					}var u = n(r(19)),
					    c = n(r(18)),
					    f = n(r(49)),
					    l = n(r(70)),
					    p = o("median", { "Array | Matrix": s, "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(e, t) {
							throw new Error("median(A, dim) is not yet supported");
						}, "...": function _(e) {
							if (a(e)) throw new TypeError("Scalar values expected in function median");return s(e);
						} }),
					    h = o({ "number | BigNumber | Unit": function numberBigNumberUnit(e) {
							return e;
						} }),
					    m = o({ "number | BigNumber | Unit, number | BigNumber | Unit": function numberBigNumberUnitNumberBigNumberUnit(e, t) {
							return c(u(e, t), 2);
						} });return p.toTex = void 0, p;
				}var i = r(7).flatten,
				    a = (r(62), r(61));t.name = "median", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, s) {
					function u(e, t) {
						return f(e, t) ? e : t;
					}function c(e) {
						var t = void 0;if (i(e, function (e) {
							(void 0 === t || f(e, t)) && (t = e);
						}), void 0 === t) throw new Error("Cannot calculate min of an empty array");return t;
					}var f = n(r(40)),
					    l = s("min", { "Array | Matrix": c, "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(e, t) {
							return a(e, t.valueOf(), u);
						}, "...": function _(e) {
							if (o(e)) throw new TypeError("Scalar values expected in function min");return c(e);
						} });return l.toTex = "\\min\\left(${args}\\right)", l;
				}var i = r(36),
				    a = r(62),
				    o = r(61);t.name = "min", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(r) {
						var n = void 0;if (i(r, function (e) {
							n = void 0 === n ? e : s(n, e);
						}), void 0 === n) switch (t.number) {case "number":
								return 0;case "BigNumber":
								return new e.BigNumber(0);case "Fraction":
								return new e.Fraction(0);default:
								return 0;}return n;
					}var s = n(r(19)),
					    u = a("sum", { "Array | Matrix": function ArrayMatrix(e) {
							return o(e);
						}, "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber() {
							throw new Error("sum(A, dim) is not yet supported");
						}, "...": function _(e) {
							return o(e);
						} });return u.toTex = void 0, u;
				}var i = r(36);t.name = "sum", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(t, r) {
						var n = 0,
						    i = 0;if (0 == t.length) throw new SyntaxError("Function var requires one or more parameters (0 provided)");if (a(t, function (e) {
							n = u(n, e), i++;
						}), 0 === i) throw new Error("Cannot calculate var of an empty array");var o = l(n, i);switch (n = 0, a(t, function (e) {
							var t = c(e, o);n = u(n, f(t, t));
						}), r) {case "uncorrected":
								return l(n, i);case "biased":
								return l(n, i + 1);case "unbiased":
								var s = n && n.isBigNumber === !0 ? new e.BigNumber(0) : 0;return 1 == i ? s : l(n, i - 1);default:
								throw new Error('Unknown normalization "' + r + '". Choose "unbiased" (default), "uncorrected", or "biased".');}
					}var u = n(r(19)),
					    c = n(r(20)),
					    f = n(r(22)),
					    l = n(r(18)),
					    p = o("variance", { "Array | Matrix": function ArrayMatrix(e) {
							return s(e, i);
						}, "Array | Matrix, string": s, "...": function _(e) {
							return s(e, i);
						} });return p.toTex = "\\mathrm{Var}\\left(${args}\\right)", p;
				}var i = "unbiased",
				    a = r(36);t.name = "var", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("format", { any: i.format, "any, Object | function | number": i.format });return a.toTex = void 0, a;
				}var i = r(12);t.name = "format", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("acosh", { number: function number(r) {
							return r >= 1 || t.predictable ? a(r) : r <= -1 ? new e.Complex(Math.log(Math.sqrt(r * r - 1) - r), Math.PI) : new e.Complex(r, 0).acosh();
						}, Complex: function Complex(e) {
							return e.acosh();
						}, BigNumber: function BigNumber(e) {
							return e.acosh();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, o);
						} });return o.toTex = { 1: "\\cosh^{-1}\\left(${args[0]}\\right)" }, o;
				}var i = r(1),
				    a = Math.acosh || function (e) {
					return Math.log(Math.sqrt(e * e - 1) + e);
				};t.name = "acosh", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("clone", { any: i.clone });return a.toTex = void 0, a;
				}var i = r(6);t.name = "clone", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("_typeof", { any: function any(e) {
							var t = i.type(e);if ("Object" === t) {
								if (e.isBigNumber === !0) return "BigNumber";if (e.isComplex === !0) return "Complex";if (e.isFraction === !0) return "Fraction";if (e.isMatrix === !0) return "Matrix";if (e.isUnit === !0) return "Unit";if (e.isIndex === !0) return "Index";if (e.isRange === !0) return "Range";if (e.isChain === !0) return "Chain";if (e.isHelp === !0) return "Help";
							}return t;
						} });return a.toTex = void 0, a;
				}var i = r(63);t.name = "typeof", t.factory = n;
			}, function (e, t, r) {
				function n(e, t, r, n, s) {
					return i.prototype.type = "Complex", i.prototype.isComplex = !0, i.prototype.toJSON = function () {
						return { mathjs: "Complex", re: this.re, im: this.im };
					}, i.prototype.toPolar = function () {
						return { r: this.abs(), phi: this.arg() };
					}, i.prototype.format = function (e) {
						var t = "",
						    r = this.im,
						    n = this.re,
						    i = a(this.re, e),
						    s = a(this.im, e),
						    u = o(e) ? e : e ? e.precision : null;if (null !== u) {
							var c = Math.pow(10, -u);Math.abs(n / r) < c && (n = 0), Math.abs(r / n) < c && (r = 0);
						}return t = 0 == r ? i : 0 == n ? 1 == r ? "i" : r == -1 ? "-i" : s + "i" : r < 0 ? r == -1 ? i + " - i" : i + " - " + (/[\d-.]/.test(s.charAt(0)) ? s.substring(1) : s) + "i" : 1 == r ? i + " + i" : i + " + " + s + "i";
					}, i.fromPolar = function (e) {
						switch (arguments.length) {case 1:
								var t = arguments[0];if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) return i(t);throw new TypeError("Input has to be an object with r and phi keys.");case 2:
								var r = arguments[0],
								    n = arguments[1];if (o(r)) {
									if (n && n.isUnit && n.hasBase("ANGLE") && (n = n.toNumber("rad")), o(n)) return new i({ r: r, phi: n });throw new TypeError("Phi is not a number nor an angle unit.");
								}throw new TypeError("Radius r is not a number.");default:
								throw new SyntaxError("Wrong number of arguments in function fromPolar");}
					}, i.prototype.valueOf = i.prototype.toString, i.fromJSON = function (e) {
						return new i(e);
					}, i.EPSILON = t.epsilon, s.on("config", function (e, t) {
						e.epsilon !== t.epsilon && (i.EPSILON = e.epsilon);
					}), i;
				}var i = r(511),
				    a = r(2).format,
				    o = r(2).isNumber;t.name = "Complex", t.path = "type", t.factory = n, t.math = !0;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("fraction", { number: function number(t) {
							if (!isFinite(t) || isNaN(t)) throw new Error(t + " cannot be represented as a fraction");return new e.Fraction(t);
						}, string: function string(t) {
							return new e.Fraction(t);
						}, "number, number": function numberNumber(t, r) {
							return new e.Fraction(t, r);
						}, BigNumber: function BigNumber(t) {
							return new e.Fraction(t.toString());
						}, Fraction: function Fraction(e) {
							return e;
						}, Object: function Object(t) {
							return new e.Fraction(t);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a;
				}var i = r(1);t.name = "fraction", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, c) {
					function d(e, t) {
						if (!(this instanceof d)) throw new SyntaxError("Constructor must be called with the new operator");if (t && !h(t)) throw new Error("Invalid datatype: " + t);if (e && e.isMatrix === !0) "DenseMatrix" === e.type ? (this._data = u.clone(e._data), this._size = u.clone(e._size), this._datatype = t || e._datatype) : (this._data = e.toArray(), this._size = e.size(), this._datatype = t || e._datatype);else if (e && f(e.data) && f(e.size)) this._data = e.data, this._size = e.size, this._datatype = t || e.datatype;else if (f(e)) this._data = b(e), this._size = s.size(this._data), s.validate(this._data, this._size), this._datatype = t;else {
							if (e) throw new TypeError("Unsupported type of data (" + i.types.type(e) + ")");this._data = [], this._size = [0], this._datatype = t;
						}
					}function g(e, t) {
						if (!t || t.isIndex !== !0) throw new TypeError("Invalid index");var r = t.isScalar();if (r) return e.get(t.min());var n = t.size();if (n.length != e._size.length) throw new a(n.length, e._size.length);for (var i = t.min(), o = t.max(), s = 0, u = e._size.length; s < u; s++) {
							m(i[s], e._size[s]), m(o[s], e._size[s]);
						}return new d(v(e._data, t, n.length, 0), e._datatype);
					}function v(e, t, r, n) {
						var i = n === r - 1,
						    a = t.dimension(n);return i ? a.map(function (t) {
							return m(t, e.length), e[t];
						}).valueOf() : a.map(function (i) {
							m(i, e.length);var a = e[i];return v(a, t, r, n + 1);
						}).valueOf();
					}function y(e, t, r, n) {
						if (!t || t.isIndex !== !0) throw new TypeError("Invalid index");var i,
						    o = t.size(),
						    c = t.isScalar();if (r && r.isMatrix === !0 ? (i = r.size(), r = r.valueOf()) : i = s.size(r), c) {
							if (0 !== i.length) throw new TypeError("Scalar expected");e.set(t.min(), r, n);
						} else {
							if (o.length < e._size.length) throw new a(o.length, e._size.length, "<");if (i.length < o.length) {
								for (var f = 0, l = 0; 1 === o[f] && 1 === i[f];) {
									f++;
								}for (; 1 === o[f];) {
									l++, f++;
								}r = s.unsqueeze(r, o.length, l, i);
							}if (!u.deepEqual(o, i)) throw new a(o, i, ">");var p = t.max().map(function (e) {
								return e + 1;
							});w(e, p, n);var h = o.length,
							    m = 0;x(e._data, t, r, h, m);
						}return e;
					}function x(e, t, r, n, i) {
						var a = i === n - 1,
						    o = t.dimension(i);a ? o.forEach(function (t, n) {
							m(t), e[t] = r[n[0]];
						}) : o.forEach(function (a, o) {
							m(a), x(e[a], t, r[o[0]], n, i + 1);
						});
					}function w(e, t, r) {
						for (var n = e._size.slice(0), i = !1; n.length < t.length;) {
							n.push(0), i = !0;
						}for (var a = 0, o = t.length; a < o; a++) {
							t[a] > n[a] && (n[a] = t[a], i = !0);
						}i && E(e, n, r);
					}function b(e) {
						for (var t = 0, r = e.length; t < r; t++) {
							var n = e[t];f(n) ? e[t] = b(n) : n && n.isMatrix === !0 && (e[t] = b(n.valueOf()));
						}return e;
					}var N = n(r(75));d.prototype = new N(), d.prototype.type = "DenseMatrix", d.prototype.isDenseMatrix = !0, d.prototype.storage = function () {
						return "dense";
					}, d.prototype.datatype = function () {
						return this._datatype;
					}, d.prototype.create = function (e, t) {
						return new d(e, t);
					}, d.prototype.subset = function (e, t, r) {
						switch (arguments.length) {case 1:
								return g(this, e);case 2:case 3:
								return y(this, e, t, r);default:
								throw new SyntaxError("Wrong number of arguments");}
					}, d.prototype.get = function (e) {
						if (!f(e)) throw new TypeError("Array expected");if (e.length != this._size.length) throw new a(e.length, this._size.length);for (var t = 0; t < e.length; t++) {
							m(e[t], this._size[t]);
						}for (var r = this._data, n = 0, i = e.length; n < i; n++) {
							var o = e[n];m(o, r.length), r = r[o];
						}return r;
					}, d.prototype.set = function (e, t, r) {
						if (!f(e)) throw new TypeError("Array expected");if (e.length < this._size.length) throw new a(e.length, this._size.length, "<");var n,
						    i,
						    o,
						    s = e.map(function (e) {
							return e + 1;
						});w(this, s, r);var u = this._data;for (n = 0, i = e.length - 1; n < i; n++) {
							o = e[n], m(o, u.length), u = u[o];
						}return o = e[e.length - 1], m(o, u.length), u[o] = t, this;
					}, d.prototype.resize = function (e, t, r) {
						if (!f(e)) throw new TypeError("Array expected");var n = r ? this.clone() : this;return E(n, e, t);
					};var E = function E(e, t, r) {
						if (0 === t.length) {
							for (var n = e._data; f(n);) {
								n = n[0];
							}return n;
						}return e._size = t.slice(0), e._data = s.resize(e._data, e._size, r), e;
					};return d.prototype.reshape = function (e, t) {
						var r = t ? this.clone() : this;return r._data = s.reshape(r._data, e), r._size = e.slice(0), r;
					}, d.prototype.clone = function () {
						var e = new d({ data: u.clone(this._data), size: u.clone(this._size), datatype: this._datatype });return e;
					}, d.prototype.size = function () {
						return this._size.slice(0);
					}, d.prototype.map = function (e) {
						var t = this,
						    r = function r(n, i) {
							return f(n) ? n.map(function (e, t) {
								return r(e, i.concat(t));
							}) : e(n, i, t);
						};return new d({ data: r(this._data, []), size: u.clone(this._size), datatype: this._datatype });
					}, d.prototype.forEach = function (e) {
						var t = this,
						    r = function r(n, i) {
							f(n) ? n.forEach(function (e, t) {
								r(e, i.concat(t));
							}) : e(n, i, t);
						};r(this._data, []);
					}, d.prototype.toArray = function () {
						return u.clone(this._data);
					}, d.prototype.valueOf = function () {
						return this._data;
					}, d.prototype.format = function (e) {
						return o.format(this._data, e);
					}, d.prototype.toString = function () {
						return o.format(this._data);
					}, d.prototype.toJSON = function () {
						return { mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
					}, d.prototype.diagonal = function (e) {
						if (e) {
							if (e.isBigNumber === !0 && (e = e.toNumber()), !l(e) || !p(e)) throw new TypeError("The parameter k must be an integer number");
						} else e = 0;for (var t = e > 0 ? e : 0, r = e < 0 ? -e : 0, n = this._size[0], i = this._size[1], a = Math.min(n - r, i - t), o = [], s = 0; s < a; s++) {
							o[s] = this._data[s + r][s + t];
						}return new d({ data: o, size: [a], datatype: this._datatype });
					}, d.diagonal = function (t, r, n, i, a) {
						if (!f(t)) throw new TypeError("Array expected, size parameter");if (2 !== t.length) throw new Error("Only two dimensions matrix are supported");if (t = t.map(function (e) {
							if (e && e.isBigNumber === !0 && (e = e.toNumber()), !l(e) || !p(e) || e < 1) throw new Error("Size values must be positive integers");return e;
						}), n) {
							if (n && n.isBigNumber === !0 && (n = n.toNumber()), !l(n) || !p(n)) throw new TypeError("The parameter k must be an integer number");
						} else n = 0;i && h(a) && (i = c.convert(i, a));var o,
						    u = n > 0 ? n : 0,
						    m = n < 0 ? -n : 0,
						    g = t[0],
						    v = t[1],
						    y = Math.min(g - m, v - u);if (f(r)) {
							if (r.length !== y) throw new Error("Invalid value array length");o = function o(e) {
								return r[e];
							};
						} else if (r && r.isMatrix === !0) {
							var x = r.size();if (1 !== x.length || x[0] !== y) throw new Error("Invalid matrix length");o = function o(e) {
								return r.get([e]);
							};
						} else o = function o() {
							return r;
						};i || (i = o(0) && o(0).isBigNumber === !0 ? new e.BigNumber(0) : 0);var w = [];if (t.length > 0) {
							w = s.resize(w, t, i);for (var b = 0; b < y; b++) {
								w[b + m][b + u] = o(b);
							}
						}return new d({ data: w, size: [g, v] });
					}, d.fromJSON = function (e) {
						return new d(e);
					}, d.prototype.swapRows = function (e, t) {
						if (!(l(e) && p(e) && l(t) && p(t))) throw new Error("Row index must be positive integers");if (2 !== this._size.length) throw new Error("Only two dimensional matrix is supported");return m(e, this._size[0]), m(t, this._size[0]), d._swapRows(e, t, this._data), this;
					}, d._swapRows = function (e, t, r) {
						var n = r[e];r[e] = r[t], r[t] = n;
					}, e.Matrix._storage.dense = d, e.Matrix._storage.default = d, d;
				}var i = r(25),
				    a = r(9),
				    o = (r(21).getSafeProperty, r(21).setSafeProperty, i.string),
				    s = i.array,
				    u = i.object,
				    c = i.number,
				    f = Array.isArray,
				    l = c.isNumber,
				    p = c.isInteger,
				    h = o.isString,
				    m = s.validateIndex;t.name = "DenseMatrix", t.path = "type", t.factory = n, t.lazy = !1;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					function a(e, t, r) {
						if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (null != e) if (e.isBigNumber === !0) e = e.toNumber();else if ("number" != typeof e) throw new TypeError("Parameter start must be a number");if (null != t) if (t.isBigNumber === !0) t = t.toNumber();else if ("number" != typeof t) throw new TypeError("Parameter end must be a number");if (null != r) if (r.isBigNumber === !0) r = r.toNumber();else if ("number" != typeof r) throw new TypeError("Parameter step must be a number");this.start = null != e ? parseFloat(e) : 0, this.end = null != t ? parseFloat(t) : 0, this.step = null != r ? parseFloat(r) : 1;
					}return a.prototype.type = "Range", a.prototype.isRange = !0, a.parse = function (e) {
						if ("string" != typeof e) return null;var t = e.split(":"),
						    r = t.map(function (e) {
							return parseFloat(e);
						}),
						    n = r.some(function (e) {
							return isNaN(e);
						});if (n) return null;switch (r.length) {case 2:
								return new a(r[0], r[1]);case 3:
								return new a(r[0], r[2], r[1]);default:
								return null;}
					}, a.prototype.clone = function () {
						return new a(this.start, this.end, this.step);
					}, a.prototype.size = function () {
						var e = 0,
						    t = this.start,
						    r = this.step,
						    n = this.end,
						    a = n - t;return i.sign(r) == i.sign(a) ? e = Math.ceil(a / r) : 0 == a && (e = 0), isNaN(e) && (e = 0), [e];
					}, a.prototype.min = function () {
						var e = this.size()[0];return e > 0 ? this.step > 0 ? this.start : this.start + (e - 1) * this.step : void 0;
					}, a.prototype.max = function () {
						var e = this.size()[0];return e > 0 ? this.step > 0 ? this.start + (e - 1) * this.step : this.start : void 0;
					}, a.prototype.forEach = function (e) {
						var t = this.start,
						    r = this.step,
						    n = this.end,
						    i = 0;if (r > 0) for (; t < n;) {
							e(t, [i], this), t += r, i++;
						} else if (r < 0) for (; t > n;) {
							e(t, [i], this), t += r, i++;
						}
					}, a.prototype.map = function (e) {
						var t = [];return this.forEach(function (r, n, i) {
							t[n[0]] = e(r, n, i);
						}), t;
					}, a.prototype.toArray = function () {
						var e = [];return this.forEach(function (t, r) {
							e[r[0]] = t;
						}), e;
					}, a.prototype.valueOf = function () {
						return this.toArray();
					}, a.prototype.format = function (e) {
						var t = i.format(this.start, e);return 1 != this.step && (t += ":" + i.format(this.step, e)), t += ":" + i.format(this.end, e);
					}, a.prototype.toString = function () {
						return this.format();
					}, a.prototype.toJSON = function () {
						return { mathjs: "Range", start: this.start, end: this.end, step: this.step };
					}, a.fromJSON = function (e) {
						return new a(e.start, e.end, e.step);
					}, a;
				}var i = r(2);t.name = "Range", t.path = "type", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(10)),
					    s = e.SparseMatrix,
					    u = function u(e, t, r) {
						var n = e._values,
						    u = e._index,
						    c = e._ptr,
						    f = e._size,
						    l = e._datatype,
						    p = t._values,
						    h = t._index,
						    m = t._ptr,
						    d = t._size,
						    g = t._datatype;if (f.length !== d.length) throw new i(f.length, d.length);if (f[0] !== d[0] || f[1] !== d[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + d + ")");var v,
						    y = f[0],
						    x = f[1],
						    w = o,
						    b = 0,
						    N = r;"string" == typeof l && l === g && (v = l, w = a.find(o, [v, v]), b = a.convert(0, v), N = a.find(r, [v, v]));var E,
						    M,
						    A,
						    O,
						    T,
						    _ = n && p ? [] : void 0,
						    S = [],
						    C = [],
						    z = new s({ values: _, index: S, ptr: C, size: [y, x], datatype: v }),
						    k = _ ? [] : void 0,
						    B = [];for (M = 0; M < x; M++) {
							C[M] = S.length;var I = M + 1;if (k) for (O = m[M], T = m[M + 1], A = O; A < T; A++) {
								E = h[A], B[E] = I, k[E] = p[A];
							}for (O = c[M], T = c[M + 1], A = O; A < T; A++) {
								if (E = u[A], k) {
									var P = B[E] === I ? k[E] : b,
									    R = N(n[A], P);w(R, b) || (S.push(E), _.push(R));
								} else S.push(E);
							}
						}return C[x] = S.length, z;
					};return u;
				}var i = r(9);t.name = "algorithm09", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					function i(e) {
						if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");this.entries = e || [];
					}return i.prototype.type = "ResultSet", i.prototype.isResultSet = !0, i.prototype.valueOf = function () {
						return this.entries;
					}, i.prototype.toString = function () {
						return "[" + this.entries.join(", ") + "]";
					}, i.prototype.toJSON = function () {
						return { mathjs: "ResultSet", entries: this.entries };
					}, i.fromJSON = function (e) {
						return new i(e.entries);
					}, i;
				}t.name = "ResultSet", t.path = "type", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, s, u) {
					function c(e, t) {
						if (!(this instanceof c)) throw new Error("Constructor must be called with the new operator");if (void 0 !== e && !S(e) && !e.isComplex) throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");if (void 0 != t && ("string" != typeof t || "" == t)) throw new TypeError("Second parameter in Unit constructor must be a string");if (void 0 != t) {
							var r = c.parse(t);this.units = r.units, this.dimensions = r.dimensions;
						} else {
							this.units = [{ unit: $, prefix: q.NONE, power: 0 }], this.dimensions = [];for (var n = 0; n < L.length; n++) {
								this.dimensions[n] = 0;
							}
						}this.value = void 0 != e ? this._normalize(e) : null, this.fixPrefix = !1, this.isUnitListSimplified = !0;
					}function f() {
						for (; " " == R || "\t" == R;) {
							h();
						}
					}function l(e) {
						return e >= "0" && e <= "9" || "." == e;
					}function p(e) {
						return e >= "0" && e <= "9";
					}function h() {
						P++, R = I.charAt(P);
					}function m(e) {
						P = e, R = I.charAt(P);
					}function d() {
						var e,
						    t = "";if (e = P, "+" == R ? h() : "-" == R && (t += R, h()), !l(R)) return m(e), null;if ("." == R) {
							if (t += R, h(), !p(R)) return m(e), null;
						} else {
							for (; p(R);) {
								t += R, h();
							}"." == R && (t += R, h());
						}for (; p(R);) {
							t += R, h();
						}if ("E" == R || "e" == R) {
							var r = "",
							    n = P;if (r += R, h(), "+" != R && "-" != R || (r += R, h()), !p(R)) return m(n), t;for (t += r; p(R);) {
								t += R, h();
							}
						}return t;
					}function g() {
						for (var e = "", t = I.charCodeAt(P); t >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 97 && t <= 122;) {
							e += R, h(), t = I.charCodeAt(P);
						}return t = e.charCodeAt(0), t >= 65 && t <= 90 || t >= 97 && t <= 122 ? e || null : null;
					}function v(e) {
						return R === e ? (h(), e) : null;
					}function y(e) {
						if (G.hasOwnProperty(e)) {
							var t = G[e],
							    r = t.prefixes[""];return { unit: t, prefix: r };
						}for (var n in G) {
							if (G.hasOwnProperty(n) && i(e, n)) {
								var t = G[n],
								    a = e.length - n.length,
								    o = e.substring(0, a),
								    r = t.prefixes[o];if (void 0 !== r) return { unit: t, prefix: r };
							}
						}return null;
					}function x(t) {
						if ("BigNumber" === t.number) {
							var r = o.pi(e.BigNumber);G.rad.value = new e.BigNumber(1), G.deg.value = r.div(180), G.grad.value = r.div(200), G.cycle.value = r.times(2), G.arcsec.value = r.div(648e3), G.arcmin.value = r.div(10800);
						} else G.rad.value = 1, G.deg.value = Math.PI / 180, G.grad.value = Math.PI / 200, G.cycle.value = 2 * Math.PI, G.arcsec.value = Math.PI / 648e3, G.arcmin.value = Math.PI / 10800;
					}function w(e) {
						for (var t = 0; t < e.length; t++) {
							var r = e.charAt(t),
							    n = function n(e) {
								return (/^[a-zA-Z]$/.test(e)
								);
							},
							    i = function i(e) {
								return e >= "0" && e <= "9";
							};if (0 === t && !n(r)) throw new Error('Invalid unit name (must begin with alpha character): "' + e + '"');if (t > 0 && !n(r) && !i(r)) throw new Error('Invalid unit name (only alphanumeric characters are allowed): "' + e + '"');
						}
					}var b = n(r(19)),
					    N = n(r(20)),
					    E = n(r(22)),
					    M = n(r(18)),
					    A = n(r(39)),
					    O = n(r(26)),
					    T = n(r(104)),
					    _ = n(r(72)),
					    S = n(r(73)),
					    C = n(r(126)),
					    z = n(r(129)),
					    k = n(r(78)),
					    B = n(r(130));c.prototype.type = "Unit", c.prototype.isUnit = !0;var I, P, R;c.parse = function (r, n) {
						if (n = n || {}, I = r, P = -1, R = "", "string" != typeof I) throw new TypeError("Invalid argument in Unit.parse, string expected");var i = new c();i.units = [], h(), f();var a = d(),
						    o = null;a && (o = "BigNumber" === t.number ? new e.BigNumber(a) : "Fraction" === t.number ? new e.Fraction(a) : parseFloat(a)), f();for (var s = 1, u = !1, l = [], p = 1;;) {
							for (f(); "(" === R;) {
								l.push(s), p *= s, s = 1, h(), f();
							}if (!R) break;var m = R,
							    x = g();if (null == x) throw new SyntaxError('Unexpected "' + m + '" in "' + I + '" at index ' + P.toString());var w = y(x);if (null == w) throw new SyntaxError('Unit "' + x + '" not found.');var b = s * p;if (f(), v("^")) {
								f();var N = d();if (null == N) throw new SyntaxError('In "' + r + '", "^" must be followed by a floating-point number');b *= N;
							}i.units.push({ unit: w.unit, prefix: w.prefix, power: b });for (var E = 0; E < L.length; E++) {
								i.dimensions[E] += (w.unit.dimensions[E] || 0) * b;
							}for (f(); ")" === R;) {
								if (0 === l.length) throw new SyntaxError('Unmatched ")" in "' + I + '" at index ' + P.toString());p /= l.pop(), h(), f();
							}if (u = !1, v("*") ? (s = 1, u = !0) : v("/") ? (s = -1, u = !0) : s = 1, w.unit.base) {
								var M = w.unit.base.key;V.auto[M] = { unit: w.unit, prefix: w.prefix };
							}
						}if (f(), R) throw new SyntaxError('Could not parse: "' + r + '"');if (u) throw new SyntaxError('Trailing characters: "' + r + '"');if (0 !== l.length) throw new SyntaxError('Unmatched "(" in "' + I + '"');if (0 == i.units.length && !n.allowNoUnits) throw new SyntaxError('"' + r + '" contains no units');return i.value = void 0 != o ? i._normalize(o) : null, i;
					}, c.prototype.clone = function () {
						var e = new c();e.fixPrefix = this.fixPrefix, e.isUnitListSimplified = this.isUnitListSimplified, e.value = a(this.value), e.dimensions = this.dimensions.slice(0), e.units = [];for (var t = 0; t < this.units.length; t++) {
							e.units[t] = {};for (var r in this.units[t]) {
								this.units[t].hasOwnProperty(r) && (e.units[t][r] = this.units[t][r]);
							}
						}return e;
					}, c.prototype._isDerived = function () {
						return 0 !== this.units.length && (this.units.length > 1 || Math.abs(this.units[0].power - 1) > 1e-15);
					}, c.prototype._normalize = function (e) {
						var t, r, n, i, a;if (null == e || 0 === this.units.length) return e;if (this._isDerived()) {
							var o = e;a = c._getNumberConverter(z(e));for (var s = 0; s < this.units.length; s++) {
								t = a(this.units[s].unit.value), i = a(this.units[s].prefix.value), n = a(this.units[s].power), o = E(o, A(E(t, i), n));
							}return o;
						}return a = c._getNumberConverter(z(e)), t = a(this.units[0].unit.value), r = a(this.units[0].unit.offset), i = a(this.units[0].prefix.value), E(b(e, r), E(t, i));
					}, c.prototype._denormalize = function (e, t) {
						var r, n, i, a, o;if (null == e || 0 === this.units.length) return e;if (this._isDerived()) {
							var s = e;o = c._getNumberConverter(z(e));for (var u = 0; u < this.units.length; u++) {
								r = o(this.units[u].unit.value), a = o(this.units[u].prefix.value), i = o(this.units[u].power), s = M(s, A(E(r, a), i));
							}return s;
						}return o = c._getNumberConverter(z(e)), r = o(this.units[0].unit.value), a = o(this.units[0].prefix.value), n = o(this.units[0].unit.offset), void 0 == t ? N(M(M(e, r), a), n) : N(M(M(e, r), t), n);
					}, c.isValuelessUnit = function (e) {
						return null != y(e);
					}, c.prototype.hasBase = function (e) {
						if ("string" == typeof e && (e = F[e]), !e) return !1;for (var t = 0; t < L.length; t++) {
							if (Math.abs((this.dimensions[t] || 0) - (e.dimensions[t] || 0)) > 1e-12) return !1;
						}return !0;
					}, c.prototype.equalBase = function (e) {
						for (var t = 0; t < L.length; t++) {
							if (Math.abs((this.dimensions[t] || 0) - (e.dimensions[t] || 0)) > 1e-12) return !1;
						}return !0;
					}, c.prototype.equals = function (e) {
						return this.equalBase(e) && _(this.value, e.value);
					}, c.prototype.multiply = function (e) {
						for (var t = this.clone(), r = 0; r < L.length; r++) {
							t.dimensions[r] = (this.dimensions[r] || 0) + (e.dimensions[r] || 0);
						}for (var r = 0; r < e.units.length; r++) {
							var n = {};for (var i in e.units[r]) {
								n[i] = e.units[r][i];
							}t.units.push(n);
						}if (null != this.value || null != e.value) {
							var a = null == this.value ? this._normalize(1) : this.value,
							    o = null == e.value ? e._normalize(1) : e.value;t.value = E(a, o);
						} else t.value = null;return t.isUnitListSimplified = !1, U(t);
					}, c.prototype.divide = function (e) {
						for (var t = this.clone(), r = 0; r < L.length; r++) {
							t.dimensions[r] = (this.dimensions[r] || 0) - (e.dimensions[r] || 0);
						}for (var r = 0; r < e.units.length; r++) {
							var n = {};for (var i in e.units[r]) {
								n[i] = e.units[r][i];
							}n.power = -n.power, t.units.push(n);
						}if (null != this.value || null != e.value) {
							var a = null == this.value ? this._normalize(1) : this.value,
							    o = null == e.value ? e._normalize(1) : e.value;t.value = M(a, o);
						} else t.value = null;return t.isUnitListSimplified = !1, U(t);
					}, c.prototype.pow = function (e) {
						for (var t = this.clone(), r = 0; r < L.length; r++) {
							t.dimensions[r] = (this.dimensions[r] || 0) * e;
						}for (var r = 0; r < t.units.length; r++) {
							t.units[r].power *= e;
						}return null != t.value ? t.value = A(t.value, e) : t.value = null, t.isUnitListSimplified = !1, U(t);
					};var U = function U(e) {
						return e.equalBase(F.NONE) && null !== e.value && !t.predictable ? e.value : e;
					};c.prototype.abs = function () {
						var e = this.clone();e.value = O(e.value);for (var t in e.units) {
							"VA" !== e.units[t].unit.name && "VAR" !== e.units[t].unit.name || (e.units[t].unit = G.W);
						}return e;
					}, c.prototype.to = function (e) {
						var t,
						    r = null == this.value ? this._normalize(1) : this.value;if ("string" == typeof e) {
							if (t = c.parse(e), !this.equalBase(t)) throw new Error("Units do not match");if (null !== t.value) throw new Error("Cannot convert to a unit with a value");return t.value = a(r), t.fixPrefix = !0, t.isUnitListSimplified = !0, t;
						}if (e && e.isUnit) {
							if (!this.equalBase(e)) throw new Error("Units do not match");if (null !== e.value) throw new Error("Cannot convert to a unit with a value");return t = e.clone(), t.value = a(r), t.fixPrefix = !0, t.isUnitListSimplified = !0, t;
						}throw new Error("String or Unit expected as parameter");
					}, c.prototype.toNumber = function (e) {
						return k(this.toNumeric(e));
					}, c.prototype.toNumeric = function (e) {
						var t = this;return e && (t = this.to(e)), t._isDerived() ? t._denormalize(t.value) : t._denormalize(t.value, t.units[0].prefix.value);
					}, c.prototype.toString = function () {
						return this.format();
					}, c.prototype.toJSON = function () {
						return { mathjs: "Unit", value: this._denormalize(this.value), unit: this.formatUnits(), fixPrefix: this.fixPrefix };
					}, c.fromJSON = function (e) {
						var t = new c(e.value, e.unit);return t.fixPrefix = e.fixPrefix || !1, t;
					}, c.prototype.valueOf = c.prototype.toString, c.prototype.simplifyUnitListLazy = function () {
						if (!this.isUnitListSimplified && null != this.value) {
							var e,
							    t = [];for (var r in Z) {
								if (this.hasBase(F[r])) {
									e = r;break;
								}
							}if ("NONE" === e) this.units = [];else {
								var n;e && Z.hasOwnProperty(e) && (n = Z[e]);if (n) this.units = [{ unit: n.unit, prefix: n.prefix, power: 1 }];else {
									for (var i = !1, a = 0; a < L.length; a++) {
										var o = L[a];Math.abs(this.dimensions[a] || 0) > 1e-12 && (Z.hasOwnProperty(o) ? t.push({ unit: Z[o].unit, prefix: Z[o].prefix, power: this.dimensions[a] || 0 }) : i = !0);
									}t.length < this.units.length && !i && (this.units = t);
								}
							}this.isUnitListSimplified = !0;
						}
					}, c.prototype.toSI = function () {
						for (var e = this.clone(), t = [], r = 0; r < L.length; r++) {
							var n = L[r];if (Math.abs(e.dimensions[r] || 0) > 1e-12) {
								if (!V.si.hasOwnProperty(n)) throw new Error("Cannot express custom unit " + n + " in SI units");t.push({ unit: V.si[n].unit, prefix: V.si[n].prefix, power: e.dimensions[r] || 0 });
							}
						}return e.units = t, e.isUnitListSimplified = !0, e;
					}, c.prototype.formatUnits = function () {
						this.simplifyUnitListLazy();for (var e = "", t = "", r = 0, n = 0, i = 0; i < this.units.length; i++) {
							this.units[i].power > 0 ? (r++, e += " " + this.units[i].prefix.name + this.units[i].unit.name, Math.abs(this.units[i].power - 1) > 1e-15 && (e += "^" + this.units[i].power)) : this.units[i].power < 0 && n++;
						}if (n > 0) for (var i = 0; i < this.units.length; i++) {
							this.units[i].power < 0 && (r > 0 ? (t += " " + this.units[i].prefix.name + this.units[i].unit.name, Math.abs(this.units[i].power + 1) > 1e-15 && (t += "^" + -this.units[i].power)) : (t += " " + this.units[i].prefix.name + this.units[i].unit.name, t += "^" + this.units[i].power));
						}e = e.substr(1), t = t.substr(1), r > 1 && n > 0 && (e = "(" + e + ")"), n > 1 && r > 0 && (t = "(" + t + ")");var a = e;return r > 0 && n > 0 && (a += " / "), a += t;
					}, c.prototype.format = function (e) {
						this.simplifyUnitListLazy();var t = !1,
						    r = !0;"undefined" != typeof this.value && null !== this.value && this.value.isComplex && (t = Math.abs(this.value.re) < 1e-14, r = Math.abs(this.value.im) < 1e-14);for (var n in this.units) {
							this.units[n].unit && ("VA" === this.units[n].unit.name && t ? this.units[n].unit = G.VAR : "VAR" !== this.units[n].unit.name || t || (this.units[n].unit = G.VA));
						}1 !== this.units.length || this.fixPrefix || Math.abs(this.units[0].power - Math.round(this.units[0].power)) < 1e-14 && (this.units[0].prefix = this._bestPrefix());var i = this._denormalize(this.value),
						    a = null !== this.value ? C(i, e || {}) : "",
						    o = this.formatUnits();return this.value && this.value.isComplex && (a = "(" + a + ")"), o.length > 0 && a.length > 0 && (a += " "), a += o;
					}, c.prototype._bestPrefix = function () {
						if (1 !== this.units.length) throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");if (Math.abs(this.units[0].power - Math.round(this.units[0].power)) >= 1e-14) throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");var e = O(this.value),
						    t = O(this.units[0].unit.value),
						    r = this.units[0].prefix;if (0 === e) return r;var n = this.units[0].power,
						    i = Math.log(e / Math.pow(r.value * t, n)) / Math.LN10 - 1.2;if (i > -2.200001 && i < 1.800001) return r;i = Math.abs(i);var a = this.units[0].unit.prefixes;for (var o in a) {
							if (a.hasOwnProperty(o)) {
								var s = a[o];if (s.scientific) {
									var u = Math.abs(Math.log(e / Math.pow(s.value * t, n)) / Math.LN10 - 1.2);(u < i || u === i && s.name.length < r.name.length) && (r = s, i = u);
								}
							}
						}return r;
					}, c.prototype.splitUnit = function (e) {
						for (var t = this.clone(), r = [], n = 0; n < e.length && (t = t.to(e[n]), n != e.length - 1); n++) {
							var i = T(t.toNumeric()),
							    a = new c(i, e[n].toString());r.push(a), t = N(t, a);
						}return r.push(t), r;
					};var q = { NONE: { "": { name: "", value: 1, scientific: !0 } }, SHORT: { "": { name: "", value: 1, scientific: !0 }, da: { name: "da", value: 10, scientific: !1 }, h: { name: "h", value: 100, scientific: !1 }, k: { name: "k", value: 1e3, scientific: !0 }, M: { name: "M", value: 1e6, scientific: !0 }, G: { name: "G", value: 1e9, scientific: !0 }, T: { name: "T", value: 1e12, scientific: !0 }, P: { name: "P", value: 1e15, scientific: !0 }, E: { name: "E", value: 1e18, scientific: !0 }, Z: { name: "Z", value: 1e21, scientific: !0 }, Y: { name: "Y", value: 1e24, scientific: !0 }, d: { name: "d", value: .1, scientific: !1 }, c: { name: "c", value: .01, scientific: !1 }, m: { name: "m", value: .001, scientific: !0 }, u: { name: "u", value: 1e-6, scientific: !0 }, n: { name: "n", value: 1e-9, scientific: !0 }, p: { name: "p", value: 1e-12, scientific: !0 }, f: { name: "f", value: 1e-15, scientific: !0 }, a: { name: "a", value: 1e-18, scientific: !0 }, z: { name: "z", value: 1e-21, scientific: !0 }, y: { name: "y", value: 1e-24, scientific: !0 } }, LONG: { "": { name: "", value: 1, scientific: !0 }, deca: { name: "deca", value: 10, scientific: !1 }, hecto: { name: "hecto", value: 100, scientific: !1 }, kilo: { name: "kilo", value: 1e3, scientific: !0 }, mega: { name: "mega", value: 1e6, scientific: !0 }, giga: { name: "giga", value: 1e9, scientific: !0 }, tera: { name: "tera", value: 1e12, scientific: !0 }, peta: { name: "peta", value: 1e15, scientific: !0 }, exa: { name: "exa", value: 1e18, scientific: !0 }, zetta: { name: "zetta", value: 1e21, scientific: !0 }, yotta: { name: "yotta", value: 1e24, scientific: !0 }, deci: { name: "deci", value: .1, scientific: !1 }, centi: { name: "centi", value: .01, scientific: !1 }, milli: { name: "milli", value: .001, scientific: !0 }, micro: { name: "micro", value: 1e-6, scientific: !0 }, nano: { name: "nano", value: 1e-9, scientific: !0 }, pico: { name: "pico", value: 1e-12, scientific: !0 }, femto: { name: "femto", value: 1e-15, scientific: !0 }, atto: { name: "atto", value: 1e-18, scientific: !0 }, zepto: { name: "zepto", value: 1e-21, scientific: !0 }, yocto: { name: "yocto", value: 1e-24, scientific: !0 } }, SQUARED: { "": { name: "", value: 1, scientific: !0 }, da: { name: "da", value: 100, scientific: !1 }, h: { name: "h", value: 1e4, scientific: !1 }, k: { name: "k", value: 1e6, scientific: !0 }, M: { name: "M", value: 1e12, scientific: !0 }, G: { name: "G", value: 1e18, scientific: !0 }, T: { name: "T", value: 1e24, scientific: !0 }, P: { name: "P", value: 1e30, scientific: !0 }, E: { name: "E", value: 1e36, scientific: !0 }, Z: { name: "Z", value: 1e42, scientific: !0 }, Y: { name: "Y", value: 1e48, scientific: !0 }, d: { name: "d", value: .01, scientific: !1 }, c: { name: "c", value: 1e-4, scientific: !1 }, m: { name: "m", value: 1e-6, scientific: !0 }, u: { name: "u", value: 1e-12, scientific: !0 }, n: { name: "n", value: 1e-18, scientific: !0 }, p: { name: "p", value: 1e-24, scientific: !0 }, f: { name: "f", value: 1e-30, scientific: !0 }, a: { name: "a", value: 1e-36, scientific: !0 }, z: { name: "z", value: 1e-42, scientific: !0 }, y: { name: "y", value: 1e-48, scientific: !0 } }, CUBIC: { "": { name: "", value: 1, scientific: !0 }, da: { name: "da", value: 1e3, scientific: !1 }, h: { name: "h", value: 1e6, scientific: !1 }, k: { name: "k", value: 1e9, scientific: !0 }, M: { name: "M", value: 1e18, scientific: !0 }, G: { name: "G", value: 1e27, scientific: !0 }, T: { name: "T", value: 1e36, scientific: !0 }, P: { name: "P", value: 1e45, scientific: !0 }, E: { name: "E", value: 1e54, scientific: !0 }, Z: { name: "Z", value: 1e63, scientific: !0 }, Y: { name: "Y", value: 1e72, scientific: !0 }, d: { name: "d", value: .001, scientific: !1 }, c: { name: "c", value: 1e-6, scientific: !1 }, m: { name: "m", value: 1e-9, scientific: !0 }, u: { name: "u", value: 1e-18, scientific: !0 }, n: { name: "n", value: 1e-27, scientific: !0 }, p: { name: "p", value: 1e-36, scientific: !0 }, f: { name: "f", value: 1e-45, scientific: !0 }, a: { name: "a", value: 1e-54, scientific: !0 }, z: { name: "z", value: 1e-63, scientific: !0 }, y: { name: "y", value: 1e-72, scientific: !0 } }, BINARY_SHORT: { "": { name: "", value: 1, scientific: !0 }, k: { name: "k", value: 1e3, scientific: !0 }, M: { name: "M", value: 1e6, scientific: !0 }, G: { name: "G", value: 1e9, scientific: !0 }, T: { name: "T", value: 1e12, scientific: !0 }, P: { name: "P", value: 1e15, scientific: !0 }, E: { name: "E", value: 1e18, scientific: !0 }, Z: { name: "Z", value: 1e21, scientific: !0 }, Y: { name: "Y", value: 1e24, scientific: !0 }, Ki: { name: "Ki", value: 1024, scientific: !0 }, Mi: { name: "Mi", value: Math.pow(1024, 2), scientific: !0 }, Gi: { name: "Gi", value: Math.pow(1024, 3), scientific: !0 }, Ti: { name: "Ti", value: Math.pow(1024, 4), scientific: !0 }, Pi: { name: "Pi", value: Math.pow(1024, 5), scientific: !0 }, Ei: { name: "Ei", value: Math.pow(1024, 6), scientific: !0 }, Zi: { name: "Zi", value: Math.pow(1024, 7), scientific: !0 }, Yi: { name: "Yi", value: Math.pow(1024, 8), scientific: !0 } }, BINARY_LONG: { "": { name: "", value: 1, scientific: !0 }, kilo: { name: "kilo", value: 1e3, scientific: !0 }, mega: { name: "mega", value: 1e6, scientific: !0 }, giga: { name: "giga", value: 1e9, scientific: !0 }, tera: { name: "tera", value: 1e12, scientific: !0 }, peta: { name: "peta", value: 1e15, scientific: !0 }, exa: { name: "exa", value: 1e18, scientific: !0 }, zetta: { name: "zetta", value: 1e21, scientific: !0 }, yotta: { name: "yotta", value: 1e24, scientific: !0 }, kibi: { name: "kibi", value: 1024, scientific: !0 }, mebi: { name: "mebi", value: Math.pow(1024, 2), scientific: !0 }, gibi: { name: "gibi", value: Math.pow(1024, 3), scientific: !0 }, tebi: { name: "tebi", value: Math.pow(1024, 4), scientific: !0 }, pebi: { name: "pebi", value: Math.pow(1024, 5), scientific: !0 }, exi: { name: "exi", value: Math.pow(1024, 6), scientific: !0 }, zebi: { name: "zebi", value: Math.pow(1024, 7), scientific: !0 }, yobi: { name: "yobi", value: Math.pow(1024, 8), scientific: !0 } }, BTU: { "": { name: "", value: 1, scientific: !0 }, MM: { name: "MM", value: 1e6, scientific: !0
							} } };q.SHORTLONG = {};for (var j in q.SHORT) {
						q.SHORT.hasOwnProperty(j) && (q.SHORTLONG[j] = q.SHORT[j]);
					}for (var j in q.LONG) {
						q.LONG.hasOwnProperty(j) && (q.SHORTLONG[j] = q.LONG[j]);
					}var L = ["MASS", "LENGTH", "TIME", "CURRENT", "TEMPERATURE", "LUMINOUS_INTENSITY", "AMOUNT_OF_SUBSTANCE", "ANGLE", "BIT"],
					    F = { NONE: { dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 0] }, MASS: { dimensions: [1, 0, 0, 0, 0, 0, 0, 0, 0] }, LENGTH: { dimensions: [0, 1, 0, 0, 0, 0, 0, 0, 0] }, TIME: { dimensions: [0, 0, 1, 0, 0, 0, 0, 0, 0] }, CURRENT: { dimensions: [0, 0, 0, 1, 0, 0, 0, 0, 0] }, TEMPERATURE: { dimensions: [0, 0, 0, 0, 1, 0, 0, 0, 0] }, LUMINOUS_INTENSITY: { dimensions: [0, 0, 0, 0, 0, 1, 0, 0, 0] }, AMOUNT_OF_SUBSTANCE: { dimensions: [0, 0, 0, 0, 0, 0, 1, 0, 0] }, FORCE: { dimensions: [1, 1, -2, 0, 0, 0, 0, 0, 0] }, SURFACE: { dimensions: [0, 2, 0, 0, 0, 0, 0, 0, 0] }, VOLUME: { dimensions: [0, 3, 0, 0, 0, 0, 0, 0, 0] }, ENERGY: { dimensions: [1, 2, -2, 0, 0, 0, 0, 0, 0] }, POWER: { dimensions: [1, 2, -3, 0, 0, 0, 0, 0, 0] }, PRESSURE: { dimensions: [1, -1, -2, 0, 0, 0, 0, 0, 0] }, ELECTRIC_CHARGE: { dimensions: [0, 0, 1, 1, 0, 0, 0, 0, 0] }, ELECTRIC_CAPACITANCE: { dimensions: [-1, -2, 4, 2, 0, 0, 0, 0, 0] }, ELECTRIC_POTENTIAL: { dimensions: [1, 2, -3, -1, 0, 0, 0, 0, 0] }, ELECTRIC_RESISTANCE: { dimensions: [1, 2, -3, -2, 0, 0, 0, 0, 0] }, ELECTRIC_INDUCTANCE: { dimensions: [1, 2, -2, -2, 0, 0, 0, 0, 0] }, ELECTRIC_CONDUCTANCE: { dimensions: [-1, -2, 3, 2, 0, 0, 0, 0, 0] }, MAGNETIC_FLUX: { dimensions: [1, 2, -2, -1, 0, 0, 0, 0, 0] }, MAGNETIC_FLUX_DENSITY: { dimensions: [1, 0, -2, -1, 0, 0, 0, 0, 0] }, FREQUENCY: { dimensions: [0, 0, -1, 0, 0, 0, 0, 0, 0] }, ANGLE: { dimensions: [0, 0, 0, 0, 0, 0, 0, 1, 0] }, BIT: { dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 1] } };for (var j in F) {
						F[j].key = j;
					}var D = {},
					    $ = { name: "", base: D, value: 1, offset: 0, dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
					    G = { meter: { name: "meter", base: F.LENGTH, prefixes: q.LONG, value: 1, offset: 0 }, inch: { name: "inch", base: F.LENGTH, prefixes: q.NONE, value: .0254, offset: 0 }, foot: { name: "foot", base: F.LENGTH, prefixes: q.NONE, value: .3048, offset: 0 }, yard: { name: "yard", base: F.LENGTH, prefixes: q.NONE, value: .9144, offset: 0 }, mile: { name: "mile", base: F.LENGTH, prefixes: q.NONE, value: 1609.344, offset: 0 }, link: { name: "link", base: F.LENGTH, prefixes: q.NONE, value: .201168, offset: 0 }, rod: { name: "rod", base: F.LENGTH, prefixes: q.NONE, value: 5.02921, offset: 0 }, chain: { name: "chain", base: F.LENGTH, prefixes: q.NONE, value: 20.1168, offset: 0 }, angstrom: { name: "angstrom", base: F.LENGTH, prefixes: q.NONE, value: 1e-10, offset: 0 }, m: { name: "m", base: F.LENGTH, prefixes: q.SHORT, value: 1, offset: 0 }, in: { name: "in", base: F.LENGTH, prefixes: q.NONE, value: .0254, offset: 0 }, ft: { name: "ft", base: F.LENGTH, prefixes: q.NONE, value: .3048, offset: 0 }, yd: { name: "yd", base: F.LENGTH, prefixes: q.NONE, value: .9144, offset: 0 }, mi: { name: "mi", base: F.LENGTH, prefixes: q.NONE, value: 1609.344, offset: 0 }, li: { name: "li", base: F.LENGTH, prefixes: q.NONE, value: .201168, offset: 0 }, rd: { name: "rd", base: F.LENGTH, prefixes: q.NONE, value: 5.02921, offset: 0 }, ch: { name: "ch", base: F.LENGTH, prefixes: q.NONE, value: 20.1168, offset: 0 }, mil: { name: "mil", base: F.LENGTH, prefixes: q.NONE, value: 254e-7, offset: 0 }, m2: { name: "m2", base: F.SURFACE, prefixes: q.SQUARED, value: 1, offset: 0 }, sqin: { name: "sqin", base: F.SURFACE, prefixes: q.NONE, value: 64516e-8, offset: 0 }, sqft: { name: "sqft", base: F.SURFACE, prefixes: q.NONE, value: .09290304, offset: 0 }, sqyd: { name: "sqyd", base: F.SURFACE, prefixes: q.NONE, value: .83612736, offset: 0 }, sqmi: { name: "sqmi", base: F.SURFACE, prefixes: q.NONE, value: 2589988.110336, offset: 0 }, sqrd: { name: "sqrd", base: F.SURFACE, prefixes: q.NONE, value: 25.29295, offset: 0 }, sqch: { name: "sqch", base: F.SURFACE, prefixes: q.NONE, value: 404.6873, offset: 0 }, sqmil: { name: "sqmil", base: F.SURFACE, prefixes: q.NONE, value: 6.4516e-10, offset: 0 }, acre: { name: "acre", base: F.SURFACE, prefixes: q.NONE, value: 4046.86, offset: 0 }, hectare: { name: "hectare", base: F.SURFACE, prefixes: q.NONE, value: 1e4, offset: 0 }, m3: { name: "m3", base: F.VOLUME, prefixes: q.CUBIC, value: 1, offset: 0 }, L: { name: "L", base: F.VOLUME, prefixes: q.SHORT, value: .001, offset: 0 }, l: { name: "l", base: F.VOLUME, prefixes: q.SHORT, value: .001, offset: 0 }, litre: { name: "litre", base: F.VOLUME, prefixes: q.LONG, value: .001, offset: 0 }, cuin: { name: "cuin", base: F.VOLUME, prefixes: q.NONE, value: 16387064e-12, offset: 0 }, cuft: { name: "cuft", base: F.VOLUME, prefixes: q.NONE, value: .028316846592, offset: 0 }, cuyd: { name: "cuyd", base: F.VOLUME, prefixes: q.NONE, value: .764554857984, offset: 0 }, teaspoon: { name: "teaspoon", base: F.VOLUME, prefixes: q.NONE, value: 5e-6, offset: 0 }, tablespoon: { name: "tablespoon", base: F.VOLUME, prefixes: q.NONE, value: 15e-6, offset: 0 }, drop: { name: "drop", base: F.VOLUME, prefixes: q.NONE, value: 5e-8, offset: 0 }, gtt: { name: "gtt", base: F.VOLUME, prefixes: q.NONE, value: 5e-8, offset: 0 }, minim: { name: "minim", base: F.VOLUME, prefixes: q.NONE, value: 6.161152e-8, offset: 0 }, fluiddram: { name: "fluiddram", base: F.VOLUME, prefixes: q.NONE, value: 36966911e-13, offset: 0 }, fluidounce: { name: "fluidounce", base: F.VOLUME, prefixes: q.NONE, value: 2957353e-11, offset: 0 }, gill: { name: "gill", base: F.VOLUME, prefixes: q.NONE, value: .0001182941, offset: 0 }, cc: { name: "cc", base: F.VOLUME, prefixes: q.NONE, value: 1e-6, offset: 0 }, cup: { name: "cup", base: F.VOLUME, prefixes: q.NONE, value: .0002365882, offset: 0 }, pint: { name: "pint", base: F.VOLUME, prefixes: q.NONE, value: .0004731765, offset: 0 }, quart: { name: "quart", base: F.VOLUME, prefixes: q.NONE, value: .0009463529, offset: 0 }, gallon: { name: "gallon", base: F.VOLUME, prefixes: q.NONE, value: .003785412, offset: 0 }, beerbarrel: { name: "beerbarrel", base: F.VOLUME, prefixes: q.NONE, value: .1173478, offset: 0 }, oilbarrel: { name: "oilbarrel", base: F.VOLUME, prefixes: q.NONE, value: .1589873, offset: 0 }, hogshead: { name: "hogshead", base: F.VOLUME, prefixes: q.NONE, value: .238481, offset: 0 }, fldr: { name: "fldr", base: F.VOLUME, prefixes: q.NONE, value: 36966911e-13, offset: 0 }, floz: { name: "floz", base: F.VOLUME, prefixes: q.NONE, value: 2957353e-11, offset: 0 }, gi: { name: "gi", base: F.VOLUME, prefixes: q.NONE, value: .0001182941, offset: 0 }, cp: { name: "cp", base: F.VOLUME, prefixes: q.NONE, value: .0002365882, offset: 0 }, pt: { name: "pt", base: F.VOLUME, prefixes: q.NONE, value: .0004731765, offset: 0 }, qt: { name: "qt", base: F.VOLUME, prefixes: q.NONE, value: .0009463529, offset: 0 }, gal: { name: "gal", base: F.VOLUME, prefixes: q.NONE, value: .003785412, offset: 0 }, bbl: { name: "bbl", base: F.VOLUME, prefixes: q.NONE, value: .1173478, offset: 0 }, obl: { name: "obl", base: F.VOLUME, prefixes: q.NONE, value: .1589873, offset: 0 }, g: { name: "g", base: F.MASS, prefixes: q.SHORT, value: .001, offset: 0 }, gram: { name: "gram", base: F.MASS, prefixes: q.LONG, value: .001, offset: 0 }, ton: { name: "ton", base: F.MASS, prefixes: q.SHORT, value: 907.18474, offset: 0 }, tonne: { name: "tonne", base: F.MASS, prefixes: q.SHORT, value: 1e3, offset: 0 }, grain: { name: "grain", base: F.MASS, prefixes: q.NONE, value: 6479891e-11, offset: 0 }, dram: { name: "dram", base: F.MASS, prefixes: q.NONE, value: .0017718451953125, offset: 0 }, ounce: { name: "ounce", base: F.MASS, prefixes: q.NONE, value: .028349523125, offset: 0 }, poundmass: { name: "poundmass", base: F.MASS, prefixes: q.NONE, value: .45359237, offset: 0 }, hundredweight: { name: "hundredweight", base: F.MASS, prefixes: q.NONE, value: 45.359237, offset: 0 }, stick: { name: "stick", base: F.MASS, prefixes: q.NONE, value: .115, offset: 0 }, stone: { name: "stone", base: F.MASS, prefixes: q.NONE, value: 6.35029318, offset: 0 }, gr: { name: "gr", base: F.MASS, prefixes: q.NONE, value: 6479891e-11, offset: 0 }, dr: { name: "dr", base: F.MASS, prefixes: q.NONE, value: .0017718451953125, offset: 0 }, oz: { name: "oz", base: F.MASS, prefixes: q.NONE, value: .028349523125, offset: 0 }, lbm: { name: "lbm", base: F.MASS, prefixes: q.NONE, value: .45359237, offset: 0 }, cwt: { name: "cwt", base: F.MASS, prefixes: q.NONE, value: 45.359237, offset: 0 }, s: { name: "s", base: F.TIME, prefixes: q.SHORT, value: 1, offset: 0 }, min: { name: "min", base: F.TIME, prefixes: q.NONE, value: 60, offset: 0 }, h: { name: "h", base: F.TIME, prefixes: q.NONE, value: 3600, offset: 0 }, second: { name: "second", base: F.TIME, prefixes: q.LONG, value: 1, offset: 0 }, sec: { name: "sec", base: F.TIME, prefixes: q.LONG, value: 1, offset: 0 }, minute: { name: "minute", base: F.TIME, prefixes: q.NONE, value: 60, offset: 0 }, hour: { name: "hour", base: F.TIME, prefixes: q.NONE, value: 3600, offset: 0 }, day: { name: "day", base: F.TIME, prefixes: q.NONE, value: 86400, offset: 0 }, week: { name: "week", base: F.TIME, prefixes: q.NONE, value: 604800, offset: 0 }, month: { name: "month", base: F.TIME, prefixes: q.NONE, value: 2629800, offset: 0 }, year: { name: "year", base: F.TIME, prefixes: q.NONE, value: 31557600, offset: 0 }, decade: { name: "year", base: F.TIME, prefixes: q.NONE, value: 315576e3, offset: 0 }, century: { name: "century", base: F.TIME, prefixes: q.NONE, value: 315576e4, offset: 0 }, millennium: { name: "millennium", base: F.TIME, prefixes: q.NONE, value: 315576e5, offset: 0 }, hertz: { name: "Hertz", base: F.FREQUENCY, prefixes: q.LONG, value: 1, offset: 0, reciprocal: !0 }, Hz: { name: "Hz", base: F.FREQUENCY, prefixes: q.SHORT, value: 1, offset: 0, reciprocal: !0 }, rad: { name: "rad", base: F.ANGLE, prefixes: q.LONG, value: 1, offset: 0 }, deg: { name: "deg", base: F.ANGLE, prefixes: q.LONG, value: null, offset: 0 }, grad: { name: "grad", base: F.ANGLE, prefixes: q.LONG, value: null, offset: 0 }, cycle: { name: "cycle", base: F.ANGLE, prefixes: q.NONE, value: null, offset: 0 }, arcsec: { name: "arcsec", base: F.ANGLE, prefixes: q.NONE, value: null, offset: 0 }, arcmin: { name: "arcmin", base: F.ANGLE, prefixes: q.NONE, value: null, offset: 0 }, A: { name: "A", base: F.CURRENT, prefixes: q.SHORT, value: 1, offset: 0 }, ampere: { name: "ampere", base: F.CURRENT, prefixes: q.LONG, value: 1, offset: 0 }, K: { name: "K", base: F.TEMPERATURE, prefixes: q.NONE, value: 1, offset: 0 }, degC: { name: "degC", base: F.TEMPERATURE, prefixes: q.NONE, value: 1, offset: 273.15 }, degF: { name: "degF", base: F.TEMPERATURE, prefixes: q.NONE, value: 1 / 1.8, offset: 459.67 }, degR: { name: "degR", base: F.TEMPERATURE, prefixes: q.NONE, value: 1 / 1.8, offset: 0 }, kelvin: { name: "kelvin", base: F.TEMPERATURE, prefixes: q.NONE, value: 1, offset: 0 }, celsius: { name: "celsius", base: F.TEMPERATURE, prefixes: q.NONE, value: 1, offset: 273.15 }, fahrenheit: { name: "fahrenheit", base: F.TEMPERATURE, prefixes: q.NONE, value: 1 / 1.8, offset: 459.67 }, rankine: { name: "rankine", base: F.TEMPERATURE, prefixes: q.NONE, value: 1 / 1.8, offset: 0 }, mol: { name: "mol", base: F.AMOUNT_OF_SUBSTANCE, prefixes: q.SHORT, value: 1, offset: 0 }, mole: { name: "mole", base: F.AMOUNT_OF_SUBSTANCE, prefixes: q.LONG, value: 1, offset: 0 }, cd: { name: "cd", base: F.LUMINOUS_INTENSITY, prefixes: q.NONE, value: 1, offset: 0 }, candela: { name: "candela", base: F.LUMINOUS_INTENSITY, prefixes: q.NONE, value: 1, offset: 0 }, N: { name: "N", base: F.FORCE, prefixes: q.SHORT, value: 1, offset: 0 }, newton: { name: "newton", base: F.FORCE, prefixes: q.LONG, value: 1, offset: 0 }, dyn: { name: "dyn", base: F.FORCE, prefixes: q.SHORT, value: 1e-5, offset: 0 }, dyne: { name: "dyne", base: F.FORCE, prefixes: q.LONG, value: 1e-5, offset: 0 }, lbf: { name: "lbf", base: F.FORCE, prefixes: q.NONE, value: 4.4482216152605, offset: 0 }, poundforce: { name: "poundforce", base: F.FORCE, prefixes: q.NONE, value: 4.4482216152605, offset: 0 }, kip: { name: "kip", base: F.FORCE, prefixes: q.LONG, value: 4448.2216, offset: 0 }, J: { name: "J", base: F.ENERGY, prefixes: q.SHORT, value: 1, offset: 0 }, joule: { name: "joule", base: F.ENERGY, prefixes: q.SHORT, value: 1, offset: 0 }, erg: { name: "erg", base: F.ENERGY, prefixes: q.NONE, value: 1e-5, offset: 0 }, Wh: { name: "Wh", base: F.ENERGY, prefixes: q.SHORT, value: 3600, offset: 0 }, BTU: { name: "BTU", base: F.ENERGY, prefixes: q.BTU, value: 1055.05585262, offset: 0 }, eV: { name: "eV", base: F.ENERGY, prefixes: q.SHORT, value: 1.602176565e-19, offset: 0 }, electronvolt: { name: "electronvolt", base: F.ENERGY, prefixes: q.LONG, value: 1.602176565e-19, offset: 0 }, W: { name: "W", base: F.POWER, prefixes: q.SHORT, value: 1, offset: 0 }, watt: { name: "W", base: F.POWER, prefixes: q.LONG, value: 1, offset: 0 }, hp: { name: "hp", base: F.POWER, prefixes: q.NONE, value: 745.6998715386, offset: 0 }, VAR: { name: "VAR", base: F.POWER, prefixes: q.SHORT, value: B.I, offset: 0 }, VA: { name: "VA", base: F.POWER, prefixes: q.SHORT, value: 1, offset: 0 }, Pa: { name: "Pa", base: F.PRESSURE, prefixes: q.SHORT, value: 1, offset: 0 }, psi: { name: "psi", base: F.PRESSURE, prefixes: q.NONE, value: 6894.75729276459, offset: 0 }, atm: { name: "atm", base: F.PRESSURE, prefixes: q.NONE, value: 101325, offset: 0 }, bar: { name: "bar", base: F.PRESSURE, prefixes: q.NONE, value: 1e5, offset: 0 }, torr: { name: "torr", base: F.PRESSURE, prefixes: q.NONE, value: 133.322, offset: 0 }, mmHg: { name: "mmHg", base: F.PRESSURE, prefixes: q.NONE, value: 133.322, offset: 0 }, mmH2O: { name: "mmH2O", base: F.PRESSURE, prefixes: q.NONE, value: 9.80665, offset: 0 }, cmH2O: { name: "cmH2O", base: F.PRESSURE, prefixes: q.NONE, value: 98.0665, offset: 0 }, coulomb: { name: "coulomb", base: F.ELECTRIC_CHARGE, prefixes: q.LONG, value: 1, offset: 0 }, C: { name: "C", base: F.ELECTRIC_CHARGE, prefixes: q.SHORT, value: 1, offset: 0 }, farad: { name: "farad", base: F.ELECTRIC_CAPACITANCE, prefixes: q.LONG, value: 1, offset: 0 }, F: { name: "F", base: F.ELECTRIC_CAPACITANCE, prefixes: q.SHORT, value: 1, offset: 0 }, volt: { name: "volt", base: F.ELECTRIC_POTENTIAL, prefixes: q.LONG, value: 1, offset: 0 }, V: { name: "V", base: F.ELECTRIC_POTENTIAL, prefixes: q.SHORT, value: 1, offset: 0 }, ohm: { name: "ohm", base: F.ELECTRIC_RESISTANCE, prefixes: q.SHORTLONG, value: 1, offset: 0 }, henry: { name: "henry", base: F.ELECTRIC_INDUCTANCE, prefixes: q.LONG, value: 1, offset: 0 }, H: { name: "H", base: F.ELECTRIC_INDUCTANCE, prefixes: q.SHORT, value: 1, offset: 0 }, siemens: { name: "siemens", base: F.ELECTRIC_CONDUCTANCE, prefixes: q.LONG, value: 1, offset: 0 }, S: { name: "S", base: F.ELECTRIC_CONDUCTANCE, prefixes: q.SHORT, value: 1, offset: 0 }, weber: { name: "weber", base: F.MAGNETIC_FLUX, prefixes: q.LONG, value: 1, offset: 0 }, Wb: { name: "Wb", base: F.MAGNETIC_FLUX, prefixes: q.SHORT, value: 1, offset: 0 }, tesla: { name: "tesla", base: F.MAGNETIC_FLUX_DENSITY, prefixes: q.LONG, value: 1, offset: 0 }, T: { name: "T", base: F.MAGNETIC_FLUX_DENSITY, prefixes: q.SHORT, value: 1, offset: 0 }, b: { name: "b", base: F.BIT, prefixes: q.BINARY_SHORT, value: 1, offset: 0 }, bits: { name: "bits", base: F.BIT, prefixes: q.BINARY_LONG, value: 1, offset: 0 }, B: { name: "B", base: F.BIT, prefixes: q.BINARY_SHORT, value: 8, offset: 0 }, bytes: { name: "bytes", base: F.BIT, prefixes: q.BINARY_LONG, value: 8, offset: 0 } },
					    H = { meters: "meter", inches: "inch", feet: "foot", yards: "yard", miles: "mile", links: "link", rods: "rod", chains: "chain", angstroms: "angstrom", lt: "l", litres: "litre", liter: "litre", liters: "litre", teaspoons: "teaspoon", tablespoons: "tablespoon", minims: "minim", fluiddrams: "fluiddram", fluidounces: "fluidounce", gills: "gill", cups: "cup", pints: "pint", quarts: "quart", gallons: "gallon", beerbarrels: "beerbarrel", oilbarrels: "oilbarrel", hogsheads: "hogshead", gtts: "gtt", grams: "gram", tons: "ton", tonnes: "tonne", grains: "grain", drams: "dram", ounces: "ounce", poundmasses: "poundmass", hundredweights: "hundredweight", sticks: "stick", lb: "lbm", lbs: "lbm", kips: "kip", acres: "acre", hectares: "hectare", sqfeet: "sqft", sqyard: "sqyd", sqmile: "sqmi", sqmiles: "sqmi", mmhg: "mmHg", mmh2o: "mmH2O", cmh2o: "cmH2O", seconds: "second", secs: "second", minutes: "minute", mins: "minute", hours: "hour", hr: "hour", hrs: "hour", days: "day", weeks: "week", months: "month", years: "year", hertz: "hertz", radians: "rad", degree: "deg", degrees: "deg", gradian: "grad", gradians: "grad", cycles: "cycle", arcsecond: "arcsec", arcseconds: "arcsec", arcminute: "arcmin", arcminutes: "arcmin", BTUs: "BTU", watts: "watt", joules: "joule", amperes: "ampere", coulombs: "coulomb", volts: "volt", ohms: "ohm", farads: "farad", webers: "weber", teslas: "tesla", electronvolts: "electronvolt", moles: "mole" };x(t), u.on("config", function (e, t) {
						e.number !== t.number && x(e);
					});var V = { si: { NONE: { unit: $, prefix: q.NONE[""] }, LENGTH: { unit: G.m, prefix: q.SHORT[""] }, MASS: { unit: G.g, prefix: q.SHORT.k }, TIME: { unit: G.s, prefix: q.SHORT[""] }, CURRENT: { unit: G.A, prefix: q.SHORT[""] }, TEMPERATURE: { unit: G.K, prefix: q.SHORT[""] }, LUMINOUS_INTENSITY: { unit: G.cd, prefix: q.SHORT[""] }, AMOUNT_OF_SUBSTANCE: { unit: G.mol, prefix: q.SHORT[""] }, ANGLE: { unit: G.rad, prefix: q.SHORT[""] }, BIT: { unit: G.bit, prefix: q.SHORT[""] }, FORCE: { unit: G.N, prefix: q.SHORT[""] }, ENERGY: { unit: G.J, prefix: q.SHORT[""] }, POWER: { unit: G.W, prefix: q.SHORT[""] }, PRESSURE: { unit: G.Pa, prefix: q.SHORT[""] }, ELECTRIC_CHARGE: { unit: G.C, prefix: q.SHORT[""] }, ELECTRIC_CAPACITANCE: { unit: G.F, prefix: q.SHORT[""] }, ELECTRIC_POTENTIAL: { unit: G.V, prefix: q.SHORT[""] }, ELECTRIC_RESISTANCE: { unit: G.ohm, prefix: q.SHORT[""] }, ELECTRIC_INDUCTANCE: { unit: G.H, prefix: q.SHORT[""] }, ELECTRIC_CONDUCTANCE: { unit: G.S, prefix: q.SHORT[""] }, MAGNETIC_FLUX: { unit: G.Wb, prefix: q.SHORT[""] }, MAGNETIC_FLUX_DENSITY: { unit: G.T, prefix: q.SHORT[""] }, FREQUENCY: { unit: G.Hz, prefix: q.SHORT[""] } } };V.cgs = JSON.parse(JSON.stringify(V.si)), V.cgs.LENGTH = { unit: G.m, prefix: q.SHORT.c }, V.cgs.MASS = { unit: G.g, prefix: q.SHORT[""] }, V.cgs.FORCE = { unit: G.dyn, prefix: q.SHORT[""] }, V.cgs.ENERGY = { unit: G.erg, prefix: q.NONE[""] }, V.us = JSON.parse(JSON.stringify(V.si)), V.us.LENGTH = { unit: G.ft, prefix: q.NONE[""] }, V.us.MASS = { unit: G.lbm, prefix: q.NONE[""] }, V.us.TEMPERATURE = { unit: G.degF, prefix: q.NONE[""] }, V.us.FORCE = { unit: G.lbf, prefix: q.NONE[""] }, V.us.ENERGY = { unit: G.BTU, prefix: q.BTU[""] }, V.us.POWER = { unit: G.hp, prefix: q.NONE[""] }, V.us.PRESSURE = { unit: G.psi, prefix: q.NONE[""] }, V.auto = JSON.parse(JSON.stringify(V.si));var Z = V.auto;c.setUnitSystem = function (e) {
						if (!V.hasOwnProperty(e)) throw new Error("Unit system " + e + " does not exist. Choices are: " + Object.keys(V).join(", "));Z = V[e];
					}, c.getUnitSystem = function () {
						for (var e in V) {
							if (V[e] === Z) return e;
						}
					}, c.typeConverters = { BigNumber: function BigNumber(t) {
							return new e.BigNumber(t + "");
						}, Fraction: function Fraction(t) {
							return new e.Fraction(t);
						}, Complex: function Complex(e) {
							return e;
						}, number: function number(e) {
							return e;
						} }, c._getNumberConverter = function (e) {
						if (!c.typeConverters[e]) throw new TypeError('Unsupported type "' + e + '"');return c.typeConverters[e];
					};for (var j in G) {
						var W = G[j];W.dimensions = W.base.dimensions;
					}for (var Y in H) {
						if (H.hasOwnProperty(Y)) {
							var W = G[H[Y]],
							    X = {};for (var j in W) {
								W.hasOwnProperty(j) && (X[j] = W[j]);
							}X.name = Y, G[Y] = X;
						}
					}return c.createUnit = function (e, t) {
						if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e))) throw new TypeError("createUnit expects first parameter to be of type 'Object'");if (t && t.override) for (var r in e) {
							if (e.hasOwnProperty(r) && c.deleteUnit(r), e[r].aliases) for (var n = 0; n < e[r].aliases.length; n++) {
								c.deleteUnit(e[r].aliases[n]);
							}
						}var i;for (var r in e) {
							e.hasOwnProperty(r) && (i = c.createUnitSingle(r, e[r]));
						}return i;
					}, c.createUnitSingle = function (e, t, r) {
						if ("undefined" != typeof t && null !== t || (t = {}), "string" != typeof e) throw new TypeError("createUnitSingle expects first parameter to be of type 'string'");if (G.hasOwnProperty(e)) throw new Error('Cannot create unit "' + e + '": a unit with that name already exists');w(e);var n,
						    i,
						    a = null,
						    o = [],
						    s = 0;if (t && "Unit" === t.type) a = t.clone();else if ("string" == typeof t) "" !== t && (n = t);else {
							if ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t))) throw new TypeError('Cannot create unit "' + e + '" from "' + t.toString() + '": expecting "string" or "Unit" or "Object"');n = t.definition, i = t.prefixes, s = t.offset, o = t.aliases;
						}if (o) for (var u = 0; u < o.length; u++) {
							if (G.hasOwnProperty(o[u])) throw new Error('Cannot create alias "' + o[u] + '": a unit with that name already exists');
						}if (n && "string" == typeof n && !a) try {
							a = c.parse(n, { allowNoUnits: !0 });
						} catch (t) {
							throw t.message = 'Could not create unit "' + e + '" from "' + n + '": ' + t.message, t;
						} else n && "Unit" === n.type && (a = n.clone());o = o || [], s = s || 0, i = i && i.toUpperCase ? q[i.toUpperCase()] || q.NONE : q.NONE;var f = {};if (a) {
							f = { name: e, value: a.value, dimensions: a.dimensions.slice(0), prefixes: i, offset: s };var l = !1;for (var u in F) {
								if (F.hasOwnProperty(u)) {
									for (var p = !0, h = 0; h < L.length; h++) {
										if (Math.abs((f.dimensions[h] || 0) - (F[u].dimensions[h] || 0)) > 1e-12) {
											p = !1;break;
										}
									}if (p) {
										l = !0;break;
									}
								}
							}if (!l) {
								var m = e + "_STUFF",
								    d = { dimensions: a.dimensions.slice(0) };d.key = m, F[m] = d, Z[m] = { unit: f, prefix: q.NONE[""] }, f.base = m;
							}
						} else {
							var m = e + "_STUFF";if (L.indexOf(m) >= 0) throw new Error('Cannot create new base unit "' + e + '": a base unit with that name already exists (and cannot be overridden)');L.push(m);for (var g in F) {
								F.hasOwnProperty(g) && (F[g].dimensions[L.length - 1] = 0);
							}for (var d = { dimensions: [] }, u = 0; u < L.length; u++) {
								d.dimensions[u] = 0;
							}d.dimensions[L.length - 1] = 1, d.key = m, F[m] = d, f = { name: e, value: 1, dimensions: F[m].dimensions.slice(0), prefixes: i, offset: s, base: m }, Z[m] = { unit: f, prefix: q.NONE[""] };
						}c.UNITS[e] = f;for (var u = 0; u < o.length; u++) {
							var v = o[u],
							    y = {};for (var x in f) {
								f.hasOwnProperty(x) && (y[x] = f[x]);
							}y.name = v, c.UNITS[v] = y;
						}return new c(null, e);
					}, c.deleteUnit = function (e) {
						delete c.UNITS[e];
					}, c.PREFIXES = q, c.BASE_UNITS = F, c.UNITS = G, c.UNIT_SYSTEMS = V, c;
				}var i = r(12).endsWith,
				    a = r(6).clone,
				    o = r(137);t.name = "Unit", t.path = "type", t.factory = n, t.math = !0;
			}, function (e, t, r) {
				function n(e) {
					return e[0].precision;
				}var i = r(37).memoize;t.e = i(function (e) {
					return new e(1).exp();
				}, n), t.phi = i(function (e) {
					return new e(1).plus(new e(5).sqrt()).div(2);
				}, n), t.pi = i(function (e) {
					return e.acos(-1);
				}, n), t.tau = i(function (e) {
					return t.pi(e).times(2);
				}, n);
			}, function (e, t, r) {
				var n = r(515);t.mixin = function (e) {
					var t = new n();return e.on = t.on.bind(t), e.off = t.off.bind(t), e.once = t.once.bind(t), e.emit = t.emit.bind(t), e;
				};
			}, function (e, t, r) {
				e.exports = r(142);
			}, function (e, t, r) {
				e.exports = [r(486), r(141), r(333), r(405), r(473), r(146)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, o, u, c) {
					c.on("config", function (r, i) {
						r.number !== i.number && n(e, t, o, u, c);
					}), i(c, "true", !0), i(c, "false", !1), i(c, "null", null), i(c, "uninitialized", r(7).UNINITIALIZED), "BigNumber" === t.number ? (i(c, "Infinity", new e.BigNumber(1 / 0)), i(c, "NaN", new e.BigNumber(NaN)), a(c, "pi", function () {
						return s.pi(e.BigNumber);
					}), a(c, "tau", function () {
						return s.tau(e.BigNumber);
					}), a(c, "e", function () {
						return s.e(e.BigNumber);
					}), a(c, "phi", function () {
						return s.phi(e.BigNumber);
					}), a(c, "E", function () {
						return c.e;
					}), a(c, "LN2", function () {
						return new e.BigNumber(2).ln();
					}), a(c, "LN10", function () {
						return new e.BigNumber(10).ln();
					}), a(c, "LOG2E", function () {
						return new e.BigNumber(1).div(new e.BigNumber(2).ln());
					}), a(c, "LOG10E", function () {
						return new e.BigNumber(1).div(new e.BigNumber(10).ln());
					}), a(c, "PI", function () {
						return c.pi;
					}), a(c, "SQRT1_2", function () {
						return new e.BigNumber("0.5").sqrt();
					}), a(c, "SQRT2", function () {
						return new e.BigNumber(2).sqrt();
					})) : (i(c, "Infinity", 1 / 0), i(c, "NaN", NaN), i(c, "pi", Math.PI), i(c, "tau", 2 * Math.PI), i(c, "e", Math.E), i(c, "phi", 1.618033988749895), i(c, "E", c.e), i(c, "LN2", Math.LN2), i(c, "LN10", Math.LN10), i(c, "LOG2E", Math.LOG2E), i(c, "LOG10E", Math.LOG10E), i(c, "PI", c.pi), i(c, "SQRT1_2", Math.SQRT1_2), i(c, "SQRT2", Math.SQRT2)), i(c, "i", e.Complex.I), i(c, "version", r(510));
				}function i(e, t, r) {
					e[t] = r, e.expression.mathWithTransform[t] = r;
				}function a(e, t, r) {
					o.lazy(e, t, r), o.lazy(e.expression.mathWithTransform, t, r);
				}var o = r(6),
				    s = r(137);t.factory = n, t.lazy = !1, t.math = !0;
			}, function (e, t, r) {
				var n = r(6).isFactory,
				    i = r(145),
				    a = r(138),
				    o = r(144),
				    s = r(143);t.create = function (e) {
					function t(e) {
						if (!n(e)) throw new Error("Factory object with properties `type`, `name`, and `factory` expected");var i,
						    a = r.indexOf(e);return a === -1 ? (i = e.math === !0 ? e.factory(c.type, f, t, c.typed, c) : e.factory(c.type, f, t, c.typed), r.push(e), u.push(i)) : i = u[a], i;
					}if ("function" != typeof Object.create) throw new Error("ES5 not supported by this JavaScript engine. Please load the es5-shim and es5-sham library for compatibility.");var r = [],
					    u = [],
					    c = a.mixin({});c.type = {}, c.expression = { transform: {}, mathWithTransform: {} }, c.typed = i.create(c.type);var f = { epsilon: 1e-12, matrix: "Matrix", number: "number", precision: 64, predictable: !1, randomSeed: null };return c.import = t(o), c.config = t(s), c.expression.mathWithTransform.config = c.config, e && c.config(e), c;
				};
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n, i) {
					function a(e) {
						if (e) {
							var r = s.map(t, s.clone);o(e, "matrix", u), o(e, "number", c), s.deepExtend(t, e);var n = s.map(t, s.clone),
							    a = s.map(e, s.clone);return i.emit("config", n, r, a), n;
						}return s.map(t, s.clone);
					}var u = ["Matrix", "Array"],
					    c = ["number", "BigNumber", "Fraction"];return a.MATRIX = u, a.NUMBER = c, a;
				}function i(e, t) {
					return e.indexOf(t) !== -1;
				}function a(e, t) {
					return e.map(function (e) {
						return e.toLowerCase();
					}).indexOf(t.toLowerCase());
				}function o(e, t, r) {
					if (void 0 !== e[t] && !i(r, e[t])) {
						var n = a(r, e[t]);n !== -1 ? (console.warn('Warning: Wrong casing for configuration option "' + t + '", should be "' + r[n] + '" instead of "' + e[t] + '".'), e[t] = r[n]) : console.warn('Warning: Unknown value "' + e[t] + '" for configuration option "' + t + '". Available options: ' + r.map(JSON.stringify).join(", ") + ".");
					}
				}var s = r(6);t.name = "config", t.math = !0, t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n, u) {
					function c(e, t) {
						var r = arguments.length;if (1 !== r && 2 !== r) throw new s("import", r, 1, 2);if (t || (t = {}), a(e)) h(e, t);else if (Array.isArray(e)) e.forEach(function (e) {
							c(e, t);
						});else if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
							for (var n in e) {
								if (e.hasOwnProperty(n)) {
									var i = e[n];m(i) ? f(n, i, t) : a(e) ? h(e, t) : c(i, t);
								}
							}
						} else if (!t.silent) throw new TypeError("Factory, Object, or Array expected");
					}function f(e, t, r) {
						if (r.wrap && "function" == typeof t && (t = p(t)), d(u[e]) && d(t)) return t = r.override ? n(e, t.signatures) : n(u[e], t), u[e] = t, l(e, t), void u.emit("import", e, function () {
							return t;
						});if (void 0 === u[e] || r.override) return u[e] = t, l(e, t), void u.emit("import", e, function () {
							return t;
						});if (!r.silent) throw new Error('Cannot import "' + e + '": already exists');
					}function l(e, t) {
						t && "function" == typeof t.transform ? (u.expression.transform[e] = t.transform, g[e] || (u.expression.mathWithTransform[e] = t.transform)) : (delete u.expression.transform[e], g[e] || (u.expression.mathWithTransform[e] = t));
					}function p(e) {
						var t = function t() {
							for (var t = [], r = 0, n = arguments.length; r < n; r++) {
								var i = arguments[r];t[r] = i && i.valueOf();
							}return e.apply(u, t);
						};return e.transform && (t.transform = e.transform), t;
					}function h(e, t) {
						if ("string" == typeof e.name) {
							var a = e.name,
							    s = a in u.expression.transform,
							    c = e.path ? o(u, e.path) : u,
							    f = c.hasOwnProperty(a) ? c[a] : void 0,
							    l = function l() {
								var i = r(e);if (i && "function" == typeof i.transform) throw new Error('Transforms cannot be attached to factory functions. Please create a separate function for it with exports.path="expression.transform"');if (d(f) && d(i)) return t.override || (i = n(f, i)), i;if (void 0 === f || t.override) return i;if (!t.silent) throw new Error('Cannot import "' + a + '": already exists');
							};e.lazy !== !1 ? (i(c, a, l), s || g[a] || i(u.expression.mathWithTransform, a, l)) : (c[a] = l(), s || g[a] || (u.expression.mathWithTransform[a] = l())), u.emit("import", a, l, e.path);
						} else r(e);
					}function m(e) {
						return "function" == typeof e || "number" == typeof e || "string" == typeof e || "boolean" == typeof e || null === e || e && e.isUnit === !0 || e && e.isComplex === !0 || e && e.isBigNumber === !0 || e && e.isFraction === !0 || e && e.isMatrix === !0 || e && Array.isArray(e) === !0;
					}function d(e) {
						return "function" == typeof e && "object" == _typeof(e.signatures);
					}var g = { expression: !0, type: !0, error: !0, json: !0 };return c;
				}var i = r(6).lazy,
				    a = r(6).isFactory,
				    o = r(6).traverse,
				    s = r(43);t.math = !0, t.name = "import", t.factory = n, t.lazy = !0;
			}, function (e, t, r) {
				var n = r(516),
				    i = r(2).digits,
				    _a3 = function a() {
					return _a3 = n.create, n;
				};t.create = function (e) {
					var t = _a3();return t.types = [{ name: "number", test: function test(e) {
							return "number" == typeof e;
						} }, { name: "Complex", test: function test(e) {
							return e && e.isComplex;
						} }, { name: "BigNumber", test: function test(e) {
							return e && e.isBigNumber;
						} }, { name: "Fraction", test: function test(e) {
							return e && e.isFraction;
						} }, { name: "Unit", test: function test(e) {
							return e && e.isUnit;
						} }, { name: "string", test: function test(e) {
							return "string" == typeof e;
						} }, { name: "Array", test: Array.isArray }, { name: "Matrix", test: function test(e) {
							return e && e.isMatrix;
						} }, { name: "DenseMatrix", test: function test(e) {
							return e && e.isDenseMatrix;
						} }, { name: "SparseMatrix", test: function test(e) {
							return e && e.isSparseMatrix;
						} }, { name: "Range", test: function test(e) {
							return e && e.isRange;
						} }, { name: "Index", test: function test(e) {
							return e && e.isIndex;
						} }, { name: "boolean", test: function test(e) {
							return "boolean" == typeof e;
						} }, { name: "ResultSet", test: function test(e) {
							return e && e.isResultSet;
						} }, { name: "Help", test: function test(e) {
							return e && e.isHelp;
						} }, { name: "function", test: function test(e) {
							return "function" == typeof e;
						} }, { name: "Date", test: function test(e) {
							return e instanceof Date;
						} }, { name: "RegExp", test: function test(e) {
							return e instanceof RegExp;
						} }, { name: "Object", test: function test(e) {
							return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
						} }, { name: "null", test: function test(e) {
							return null === e;
						} }, { name: "undefined", test: function test(e) {
							return void 0 === e;
						} }, { name: "OperatorNode", test: function test(e) {
							return e && e.isOperatorNode;
						} }, { name: "ConstantNode", test: function test(e) {
							return e && e.isConstantNode;
						} }, { name: "SymbolNode", test: function test(e) {
							return e && e.isSymbolNode;
						} }, { name: "ParenthesisNode", test: function test(e) {
							return e && e.isParenthesisNode;
						} }, { name: "FunctionNode", test: function test(e) {
							return e && e.isFunctionNode;
						} }, { name: "FunctionAssignmentNode", test: function test(e) {
							return e && e.isFunctionAssignmentNode;
						} }, { name: "ArrayNode", test: function test(e) {
							return e && e.isArrayNode;
						} }, { name: "AssignmentNode", test: function test(e) {
							return e && e.isAssignmentNode;
						} }, { name: "BlockNode", test: function test(e) {
							return e && e.isBlockNode;
						} }, { name: "ConditionalNode", test: function test(e) {
							return e && e.isConditionalNode;
						} }, { name: "IndexNode", test: function test(e) {
							return e && e.isIndexNode;
						} }, { name: "RangeNode", test: function test(e) {
							return e && e.isRangeNode;
						} }, { name: "UpdateNode", test: function test(e) {
							return e && e.isUpdateNode;
						} }, { name: "Node", test: function test(e) {
							return e && e.isNode;
						} }], t.conversions = [{ from: "number", to: "BigNumber", convert: function convert(t) {
							if (i(t) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + t + "). Use function bignumber(x) to convert to BigNumber.");return new e.BigNumber(t);
						} }, { from: "number", to: "Complex", convert: function convert(t) {
							return new e.Complex(t, 0);
						} }, { from: "number", to: "string", convert: function convert(e) {
							return e + "";
						} }, { from: "BigNumber", to: "Complex", convert: function convert(t) {
							return new e.Complex(t.toNumber(), 0);
						} }, { from: "Fraction", to: "BigNumber", convert: function convert(e) {
							throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
						} }, { from: "Fraction", to: "Complex", convert: function convert(t) {
							return new e.Complex(t.valueOf(), 0);
						} }, { from: "number", to: "Fraction", convert: function convert(t) {
							if (i(t) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to Fraction (value: " + t + "). Use function fraction(x) to convert to Fraction.");return new e.Fraction(t);
						} }, { from: "string", to: "number", convert: function convert(e) {
							var t = Number(e);if (isNaN(t)) throw new Error('Cannot convert "' + e + '" to a number');return t;
						} }, { from: "string", to: "BigNumber", convert: function convert(t) {
							try {
								return new e.BigNumber(t);
							} catch (e) {
								throw new Error('Cannot convert "' + t + '" to BigNumber');
							}
						} }, { from: "string", to: "Fraction", convert: function convert(t) {
							try {
								return new e.Fraction(t);
							} catch (e) {
								throw new Error('Cannot convert "' + t + '" to Fraction');
							}
						} }, { from: "string", to: "Complex", convert: function convert(t) {
							try {
								return new e.Complex(t);
							} catch (e) {
								throw new Error('Cannot convert "' + t + '" to Complex');
							}
						} }, { from: "boolean", to: "number", convert: function convert(e) {
							return +e;
						} }, { from: "boolean", to: "BigNumber", convert: function convert(t) {
							return new e.BigNumber(+t);
						} }, { from: "boolean", to: "Fraction", convert: function convert(t) {
							return new e.Fraction(+t);
						} }, { from: "boolean", to: "string", convert: function convert(e) {
							return +e;
						} }, { from: "null", to: "number", convert: function convert() {
							return 0;
						} }, { from: "null", to: "string", convert: function convert() {
							return "null";
						} }, { from: "null", to: "BigNumber", convert: function convert() {
							return new e.BigNumber(0);
						} }, { from: "null", to: "Fraction", convert: function convert() {
							return new e.Fraction(0);
						} }, { from: "Array", to: "Matrix", convert: function convert(t) {
							return new e.DenseMatrix(t);
						} }, { from: "Matrix", to: "Array", convert: function convert(e) {
							return e.valueOf();
						} }], t;
				};
			}, function (e, t, r) {
				"use strict";
				var n = r(43),
				    i = r(9),
				    a = r(44);e.exports = [{ name: "ArgumentsError", path: "error", factory: function factory() {
						return n;
					} }, { name: "DimensionError", path: "error", factory: function factory() {
						return i;
					} }, { name: "IndexError", path: "error", factory: function factory() {
						return a;
					} }];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(e) {
						if (!(this instanceof s)) throw new SyntaxError("Constructor must be called with the new operator");if (!e) throw new Error('Argument "doc" missing');this.doc = e;
					}var u = n(r(85))();return s.prototype.type = "Help", s.prototype.isHelp = !0, s.prototype.toString = function () {
						var e = this.doc || {},
						    t = "\n";if (e.name && (t += "Name: " + e.name + "\n\n"), e.category && (t += "Category: " + e.category + "\n\n"), e.description && (t += "Description:\n    " + e.description + "\n\n"), e.syntax && (t += "Syntax:\n    " + e.syntax.join("\n    ") + "\n\n"), e.examples) {
							t += "Examples:\n";for (var r = 0; r < e.examples.length; r++) {
								var n = e.examples[r];t += "    " + n + "\n";var i;try {
									i = u.eval(n);
								} catch (e) {
									i = e;
								}i && !i.isHelp && (t += "        " + a.format(i, { precision: 14 }) + "\n");
							}t += "\n";
						}return e.seealso && (t += "See also: " + e.seealso.join(", ") + "\n"), t;
					}, s.prototype.toJSON = function () {
						var e = i.clone(this.doc);return e.mathjs = "Help", e;
					}, s.fromJSON = function (e) {
						var t = {};for (var r in e) {
							"mathjs" !== r && (t[r] = e[r]);
						}return new s(t);
					}, s.prototype.valueOf = s.prototype.toString, s;
				}var i = r(6),
				    a = r(12);t.name = "Help", t.path = "type", t.factory = n;
			}, function (e, t) {
				e.exports = { name: "Infinity", category: "Constants", syntax: ["Infinity"], description: "Infinity, a number which is larger than the maximum number that can be handled by a floating point number.", examples: ["Infinity", "1 / 0"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "LN10", category: "Constants", syntax: ["LN10"], description: "Returns the natural logarithm of 10, approximately equal to 2.302", examples: ["LN10", "log(10)"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "LN2", category: "Constants", syntax: ["LN2"], description: "Returns the natural logarithm of 2, approximately equal to 0.693", examples: ["LN2", "log(2)"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "LOG10E", category: "Constants", syntax: ["LOG10E"], description: "Returns the base-10 logarithm of E, approximately equal to 0.434", examples: ["LOG10E", "log(e, 10)"], seealso: []
				};
			}, function (e, t) {
				e.exports = { name: "LOG2E", category: "Constants", syntax: ["LOG2E"], description: "Returns the base-2 logarithm of E, approximately equal to 1.442", examples: ["LOG2E", "log(e, 2)"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "NaN", category: "Constants", syntax: ["NaN"], description: "Not a number", examples: ["NaN", "0 / 0"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "SQRT1_2", category: "Constants", syntax: ["SQRT1_2"], description: "Returns the square root of 1/2, approximately equal to 0.707", examples: ["SQRT1_2", "sqrt(1/2)"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "SQRT2", category: "Constants", syntax: ["SQRT2"], description: "Returns the square root of 2, approximately equal to 1.414", examples: ["SQRT2", "sqrt(2)"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "false", category: "Constants", syntax: ["false"], description: "Boolean value false", examples: ["false"], seealso: ["true"] };
			}, function (e, t) {
				e.exports = { name: "i", category: "Constants", syntax: ["i"], description: "Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.", examples: ["i", "i * i", "sqrt(-1)"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "null", category: "Constants", syntax: ["null"], description: "Value null", examples: ["null"], seealso: ["true", "false"] };
			}, function (e, t) {
				e.exports = { name: "phi", category: "Constants", syntax: ["phi"], description: "Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...", examples: ["tau"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "tau", category: "Constants", syntax: ["tau"], description: "Tau is the ratio constant of a circle's circumference to radius, equal to 2 * pi, approximately 6.2832.", examples: ["tau", "2 * pi"], seealso: ["pi"] };
			}, function (e, t) {
				e.exports = { name: "true", category: "Constants", syntax: ["true"], description: "Boolean value true", examples: ["true"], seealso: ["false"] };
			}, function (e, t) {
				e.exports = { name: "version", category: "Constants", syntax: ["version"], description: "A string with the version number of math.js", examples: ["version"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "bignumber", category: "Construction", syntax: ["bignumber(x)"], description: "Create a big number from a number or string.", examples: ["0.1 + 0.2", "bignumber(0.1) + bignumber(0.2)", 'bignumber("7.2")', 'bignumber("7.2e500")', "bignumber([0.1, 0.2, 0.3])"], seealso: ["boolean", "complex", "fraction", "index", "matrix", "string", "unit"] };
			}, function (e, t) {
				e.exports = { name: "boolean", category: "Construction", syntax: ["x", "boolean(x)"], description: "Convert a string or number into a boolean.", examples: ["boolean(0)", "boolean(1)", "boolean(3)", 'boolean("true")', 'boolean("false")', "boolean([1, 0, 1, 1])"], seealso: ["bignumber", "complex", "index", "matrix", "number", "string", "unit"] };
			}, function (e, t) {
				e.exports = { name: "complex", category: "Construction", syntax: ["complex()", "complex(re, im)", "complex(string)"], description: "Create a complex number.", examples: ["complex()", "complex(2, 3)", 'complex("7 - 2i")'], seealso: ["bignumber", "boolean", "index", "matrix", "number", "string", "unit"] };
			}, function (e, t) {
				e.exports = { name: "createUnit", category: "Construction", syntax: ["createUnit(definitions)", "createUnit(name, definition)"], description: "Create a user-defined unit and register it with the Unit type.", examples: ['createUnit("foo")', 'createUnit("knot", {definition: "0.514444444 m/s", aliases: ["knots", "kt", "kts"]})', 'createUnit("mph", "1 mile/hour")'], seealso: ["unit", "splitUnit"] };
			}, function (e, t) {
				e.exports = { name: "fraction", category: "Construction", syntax: ["fraction(num)", "fraction(num,den)"], description: "Create a fraction from a number or from a numerator and denominator.", examples: ["fraction(0.125)", "fraction(1, 3) + fraction(2, 5)"], seealso: ["bignumber", "boolean", "complex", "index", "matrix", "string", "unit"] };
			}, function (e, t) {
				e.exports = { name: "index", category: "Construction", syntax: ["[start]", "[start:end]", "[start:step:end]", "[start1, start 2, ...]", "[start1:end1, start2:end2, ...]", "[start1:step1:end1, start2:step2:end2, ...]"], description: "Create an index to get or replace a subset of a matrix", examples: ["[]", "[1, 2, 3]", "A = [1, 2, 3; 4, 5, 6]", "A[1, :]", "A[1, 2] = 50", "A[0:2, 0:2] = ones(2, 2)"], seealso: ["bignumber", "boolean", "complex", "matrix,", "number", "range", "string", "unit"] };
			}, function (e, t) {
				e.exports = { name: "matrix", category: "Construction", syntax: ["[]", "[a1, b1, ...; a2, b2, ...]", "matrix()", 'matrix("dense")', "matrix([...])"], description: "Create a matrix.", examples: ["[]", "[1, 2, 3]", "[1, 2, 3; 4, 5, 6]", "matrix()", "matrix([3, 4])", 'matrix([3, 4; 5, 6], "sparse")', 'matrix([3, 4; 5, 6], "sparse", "number")'], seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "sparse"] };
			}, function (e, t) {
				e.exports = { name: "number", category: "Construction", syntax: ["x", "number(x)"], description: "Create a number or convert a string or boolean into a number.", examples: ["2", "2e3", "4.05", "number(2)", 'number("7.2")', "number(true)", "number([true, false, true, true])", 'number("52cm", "m")'], seealso: ["bignumber", "boolean", "complex", "fraction", "index", "matrix", "string", "unit"] };
			}, function (e, t) {
				e.exports = { name: "sparse", category: "Construction", syntax: ["sparse()", "sparse([a1, b1, ...; a1, b2, ...])", 'sparse([a1, b1, ...; a1, b2, ...], "number")'], description: "Create a sparse matrix.", examples: ["sparse()", "sparse([3, 4; 5, 6])", 'sparse([3, 0; 5, 0], "number")'], seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "matrix"] };
			}, function (e, t) {
				e.exports = { name: "splitUnit", category: "Construction", syntax: ["splitUnit(unit: Unit, parts: Unit[])"], description: "Split a unit in an array of units whose sum is equal to the original unit.", examples: ['splitUnit(1 m, ["feet", "inch"])'], seealso: ["unit", "createUnit"] };
			}, function (e, t) {
				e.exports = { name: "string", category: "Construction", syntax: ['"text"', "string(x)"], description: "Create a string or convert a value to a string", examples: ['"Hello World!"', "string(4.2)", "string(3 + 2i)"], seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "unit"] };
			}, function (e, t) {
				e.exports = { name: "unit", category: "Construction", syntax: ["value unit", "unit(value, unit)", "unit(string)"], description: "Create a unit.", examples: ["5.5 mm", "3 inch", 'unit(7.1, "kilogram")', 'unit("23 deg")'], seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "string"] };
			}, function (e, t) {
				e.exports = { name: "config", category: "Core", syntax: ["config()", "config(options)"], description: "Get configuration or change configuration.", examples: ["config()", "1/3 + 1/4", 'config({number: "Fraction"})', "1/3 + 1/4"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "import", category: "Core", syntax: ["import(functions)", "import(functions, options)"], description: "Import functions or constants from an object.", examples: ["import({myFn: f(x)=x^2, myConstant: 32 })", "myFn(2)", "myConstant"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "typed", category: "Core", syntax: ["typed(signatures)", "typed(name, signatures)"], description: "Create a typed function.", examples: ['double = typed({ "number, number": f(x)=x+x })', "double(2)", 'double("hello")'], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "derivative", category: "Algebra", syntax: ["derivative(expr)", "derivative(expr, {simplify: boolean})"], description: "Takes the derivative of an expression expressed in parser Nodes. The derivative will be taken over the supplied variable in the second parameter. If there are multiple variables in the expression, it will return a partial derivative.", examples: ['derivative("2x^3", "x")', 'derivative("2x^3", "x", {simplify: false})', 'derivative("2x^2 + 3x + 4", "x")', 'derivative("sin(2x)", "x")', 'f = parse("x^2 + x")', 'x = parse("x")', "df = derivative(f, x)", "df.eval({x: 3})"], seealso: ["simplify", "parse", "eval"] };
			}, function (e, t) {
				e.exports = { name: "lsolve", category: "Algebra", syntax: ["x=lsolve(L, b)"], description: "Solves the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.", examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lsolve(a, b)"], seealso: ["lup", "lusolve", "usolve", "matrix", "sparse"] };
			}, function (e, t) {
				e.exports = { name: "lup", category: "Algebra", syntax: ["lup(m)"], description: "Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U", examples: ["lup([[2, 1], [1, 4]])", "lup(matrix([[2, 1], [1, 4]]))", "lup(sparse([[2, 1], [1, 4]]))"], seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "slu", "qr"] };
			}, function (e, t) {
				e.exports = { name: "lusolve", category: "Algebra", syntax: ["x=lusolve(A, b)", "x=lusolve(lu, b)"], description: "Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.", examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lusolve(a, b)"], seealso: ["lup", "slu", "lsolve", "usolve", "matrix", "sparse"] };
			}, function (e, t) {
				e.exports = { name: "qr", category: "Algebra", syntax: ["qr(A)"], description: "Calculates the Matrix QR decomposition. Matrix `A` is decomposed in two matrices (`Q`, `R`) where `Q` is an orthogonal matrix and `R` is an upper triangular matrix.", examples: ["qr([[1, -1,  4], [1,  4, -2], [1,  4,  2], [1,  -1, 0]])"], seealso: ["lup", "slu", "matrix"] };
			}, function (e, t) {
				e.exports = { name: "simplify", category: "Algebra", syntax: ["simplify(expr)", "simplify(expr, rules)"], description: "Simplify an expression tree.", examples: ['simplify("3 + 2 / 4")', 'simplify("2x + x")', 'f = parse("x * (x + 2 + x)")', "simplified = simplify(f)", "simplified.eval({x: 2})"], seealso: ["derivative", "parse", "eval"] };
			}, function (e, t) {
				e.exports = { name: "slu", category: "Algebra", syntax: ["slu(A, order, threshold)"], description: "Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U", examples: ["slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)"], seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "lup", "qr"] };
			}, function (e, t) {
				e.exports = { name: "usolve", category: "Algebra", syntax: ["x=usolve(U, b)"], description: "Solves the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.", examples: ["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"], seealso: ["lup", "lusolve", "lsolve", "matrix", "sparse"] };
			}, function (e, t) {
				e.exports = { name: "abs", category: "Arithmetic", syntax: ["abs(x)"], description: "Compute the absolute value.", examples: ["abs(3.5)", "abs(-4.2)"], seealso: ["sign"] };
			}, function (e, t) {
				e.exports = { name: "add", category: "Operators", syntax: ["x + y", "add(x, y)"], description: "Add two values.", examples: ["a = 2.1 + 3.6", "a - 3.6", "3 + 2i", "3 cm + 2 inch", '"2.3" + "4"'], seealso: ["subtract"] };
			}, function (e, t) {
				e.exports = { name: "cbrt", category: "Arithmetic", syntax: ["cbrt(x)", "cbrt(x, allRoots)"], description: "Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned", examples: ["cbrt(64)", "cube(4)", "cbrt(-8)", "cbrt(2 + 3i)", "cbrt(8i)", "cbrt(8i, true)", "cbrt(27 m^3)"], seealso: ["square", "sqrt", "cube", "multiply"] };
			}, function (e, t) {
				e.exports = { name: "ceil", category: "Arithmetic", syntax: ["ceil(x)"], description: "Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.", examples: ["ceil(3.2)", "ceil(3.8)", "ceil(-4.2)"], seealso: ["floor", "fix", "round"] };
			}, function (e, t) {
				e.exports = { name: "cube", category: "Arithmetic", syntax: ["cube(x)"], description: "Compute the cube of a value. The cube of x is x * x * x.", examples: ["cube(2)", "2^3", "2 * 2 * 2"], seealso: ["multiply", "square", "pow"] };
			}, function (e, t) {
				e.exports = { name: "divide", category: "Operators", syntax: ["x / y", "divide(x, y)"], description: "Divide two values.", examples: ["a = 2 / 3", "a * 3", "4.5 / 2", "3 + 4 / 2", "(3 + 4) / 2", "18 km / 4.5"], seealso: ["multiply"] };
			}, function (e, t) {
				e.exports = { name: "dotDivide", category: "Operators", syntax: ["x ./ y", "dotDivide(x, y)"], description: "Divide two values element wise.", examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a ./ b"], seealso: ["multiply", "dotMultiply", "divide"] };
			}, function (e, t) {
				e.exports = { name: "dotMultiply", category: "Operators", syntax: ["x .* y", "dotMultiply(x, y)"], description: "Multiply two values element wise.", examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a .* b"], seealso: ["multiply", "divide", "dotDivide"] };
			}, function (e, t) {
				e.exports = { name: "dotpow", category: "Operators", syntax: ["x .^ y", "dotpow(x, y)"], description: "Calculates the power of x to y element wise.", examples: ["a = [1, 2, 3; 4, 5, 6]", "a .^ 2"], seealso: ["pow"] };
			}, function (e, t) {
				e.exports = { name: "exp", category: "Arithmetic", syntax: ["exp(x)"], description: "Calculate the exponent of a value.", examples: ["exp(1.3)", "e ^ 1.3", "log(exp(1.3))", "x = 2.4", "(exp(i*x) == cos(x) + i*sin(x))   # Euler's formula"], seealso: ["pow", "log"] };
			}, function (e, t) {
				e.exports = { name: "fix", category: "Arithmetic", syntax: ["fix(x)"], description: "Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.", examples: ["fix(3.2)", "fix(3.8)", "fix(-4.2)", "fix(-4.8)"], seealso: ["ceil", "floor", "round"] };
			}, function (e, t) {
				e.exports = { name: "floor", category: "Arithmetic", syntax: ["floor(x)"], description: "Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.", examples: ["floor(3.2)", "floor(3.8)", "floor(-4.2)"], seealso: ["ceil", "fix", "round"] };
			}, function (e, t) {
				e.exports = { name: "gcd", category: "Arithmetic", syntax: ["gcd(a, b)", "gcd(a, b, c, ...)"], description: "Compute the greatest common divisor.", examples: ["gcd(8, 12)", "gcd(-4, 6)", "gcd(25, 15, -10)"], seealso: ["lcm", "xgcd"] };
			}, function (e, t) {
				e.exports = { name: "hypot", category: "Arithmetic", syntax: ["hypot(a, b, c, ...)", "hypot([a, b, c, ...])"], description: "Calculate the hypotenusa of a list with values. ", examples: ["hypot(3, 4)", "sqrt(3^2 + 4^2)", "hypot(-2)", "hypot([3, 4, 5])"], seealso: ["abs", "norm"] };
			}, function (e, t) {
				e.exports = { name: "lcm", category: "Arithmetic", syntax: ["lcm(x, y)"], description: "Compute the least common multiple.", examples: ["lcm(4, 6)", "lcm(6, 21)", "lcm(6, 21, 5)"], seealso: ["gcd"] };
			}, function (e, t) {
				e.exports = { name: "log", category: "Arithmetic", syntax: ["log(x)", "log(x, base)"], description: "Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).", examples: ["log(3.5)", "a = log(2.4)", "exp(a)", "10 ^ 4", "log(10000, 10)", "log(10000) / log(10)", "b = log(1024, 2)", "2 ^ b"], seealso: ["exp", "log10"] };
			}, function (e, t) {
				e.exports = { name: "log10", category: "Arithmetic", syntax: ["log10(x)"], description: "Compute the 10-base logarithm of a value.", examples: ["log10(0.00001)", "log10(10000)", "10 ^ 4", "log(10000) / log(10)", "log(10000, 10)"], seealso: ["exp", "log"] };
			}, function (e, t) {
				e.exports = { name: "mod", category: "Operators", syntax: ["x % y", "x mod y", "mod(x, y)"], description: "Calculates the modulus, the remainder of an integer division.", examples: ["7 % 3", "11 % 2", "10 mod 4", "function isOdd(x) = x % 2", "isOdd(2)", "isOdd(3)"], seealso: ["divide"] };
			}, function (e, t) {
				e.exports = { name: "multiply", category: "Operators", syntax: ["x * y", "multiply(x, y)"], description: "multiply two values.", examples: ["a = 2.1 * 3.4", "a / 3.4", "2 * 3 + 4", "2 * (3 + 4)", "3 * 2.1 km"], seealso: ["divide"] };
			}, function (e, t) {
				e.exports = { name: "norm", category: "Arithmetic", syntax: ["norm(x)", "norm(x, p)"], description: "Calculate the norm of a number, vector or matrix.", examples: ["abs(-3.5)", "norm(-3.5)", "norm(3 - 4i))", "norm([1, 2, -3], Infinity)", "norm([1, 2, -3], -Infinity)", "norm([3, 4], 2)", "norm([[1, 2], [3, 4]], 1)", "norm([[1, 2], [3, 4]], 'inf')", "norm([[1, 2], [3, 4]], 'fro')"] };
			}, function (e, t) {
				e.exports = { name: "nthRoot", category: "Arithmetic", syntax: ["nthRoot(a)", "nthRoot(a, root)"], description: 'Calculate the nth root of a value. The principal nth root of a positive real number A, is the positive real solution of the equation "x^root = A".', examples: ["4 ^ 3", "nthRoot(64, 3)", "nthRoot(9, 2)", "sqrt(9)"], seealso: ["sqrt", "pow"] };
			}, function (e, t) {
				e.exports = { name: "pow", category: "Operators", syntax: ["x ^ y", "pow(x, y)"], description: "Calculates the power of x to y, x^y.", examples: ["2^3 = 8", "2*2*2", "1 + e ^ (pi * i)"], seealso: ["multiply"] };
			}, function (e, t) {
				e.exports = { name: "round", category: "Arithmetic", syntax: ["round(x)", "round(x, n)"], description: "round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.", examples: ["round(3.2)", "round(3.8)", "round(-4.2)", "round(-4.8)", "round(pi, 3)", "round(123.45678, 2)"], seealso: ["ceil", "floor", "fix"] };
			}, function (e, t) {
				e.exports = { name: "sign", category: "Arithmetic", syntax: ["sign(x)"], description: "Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.", examples: ["sign(3.5)", "sign(-4.2)", "sign(0)"], seealso: ["abs"] };
			}, function (e, t) {
				e.exports = { name: "sqrt", category: "Arithmetic", syntax: ["sqrt(x)"], description: "Compute the square root value. If x = y * y, then y is the square root of x.", examples: ["sqrt(25)", "5 * 5", "sqrt(-1)"], seealso: ["square", "multiply"] };
			}, function (e, t) {
				e.exports = { name: "square", category: "Arithmetic", syntax: ["square(x)"], description: "Compute the square of a value. The square of x is x * x.", examples: ["square(3)", "sqrt(9)", "3^2", "3 * 3"], seealso: ["multiply", "pow", "sqrt", "cube"] };
			}, function (e, t) {
				e.exports = { name: "subtract", category: "Operators", syntax: ["x - y", "subtract(x, y)"], description: "subtract two values.", examples: ["a = 5.3 - 2", "a + 2", "2/3 - 1/6", "2 * 3 - 3", "2.1 km - 500m"], seealso: ["add"] };
			}, function (e, t) {
				e.exports = { name: "unaryMinus", category: "Operators", syntax: ["-x", "unaryMinus(x)"], description: "Inverse the sign of a value. Converts booleans and strings to numbers.", examples: ["-4.5", "-(-5.6)", '-"22"'], seealso: ["add", "subtract", "unaryPlus"] };
			}, function (e, t) {
				e.exports = { name: "unaryPlus", category: "Operators", syntax: ["+x", "unaryPlus(x)"], description: "Converts booleans and strings to numbers.", examples: ["+true", '+"2"'], seealso: ["add", "subtract", "unaryMinus"] };
			}, function (e, t) {
				e.exports = { name: "xgcd", category: "Arithmetic", syntax: ["xgcd(a, b)"], description: "Calculate the extended greatest common divisor for two values", examples: ["xgcd(8, 12)", "gcd(8, 12)", "xgcd(36163, 21199)"], seealso: ["gcd", "lcm"] };
			}, function (e, t) {
				e.exports = { name: "bitAnd", category: "Bitwise", syntax: ["x & y", "bitAnd(x, y)"], description: "Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0", examples: ["5 & 3", "bitAnd(53, 131)", "[1, 12, 31] & 42"], seealso: ["bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"] };
			}, function (e, t) {
				e.exports = { name: "bitNot", category: "Bitwise", syntax: ["~x", "bitNot(x)"], description: "Bitwise NOT operation. Performs a logical negation on each bit of the given value. Bits that are 0 become 1, and those that are 1 become 0.", examples: ["~1", "~2", "bitNot([2, -3, 4])"], seealso: ["bitAnd", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"] };
			}, function (e, t) {
				e.exports = { name: "bitOr", category: "Bitwise", syntax: ["x | y", "bitOr(x, y)"], description: "Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.", examples: ["5 | 3", "bitOr([1, 2, 3], 4)"], seealso: ["bitAnd", "bitNot", "bitXor", "leftShift", "rightArithShift", "rightLogShift"] };
			}, function (e, t) {
				e.exports = { name: "bitXor", category: "Bitwise", syntax: ["bitXor(x, y)"], description: "Bitwise XOR operation, exclusive OR. Performs the logical exclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.", examples: ["bitOr(1, 2)", "bitXor([2, 3, 4], 4)"], seealso: ["bitAnd", "bitNot", "bitOr", "leftShift", "rightArithShift", "rightLogShift"] };
			}, function (e, t) {
				e.exports = { name: "leftShift", category: "Bitwise", syntax: ["x << y", "leftShift(x, y)"], description: "Bitwise left logical shift of a value x by y number of bits.", examples: ["4 << 1", "8 >> 1"], seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "rightArithShift", "rightLogShift"] };
			}, function (e, t) {
				e.exports = { name: "rightArithShift", category: "Bitwise", syntax: ["x >> y", "leftShift(x, y)"], description: "Bitwise right arithmetic shift of a value x by y number of bits.", examples: ["8 >> 1", "4 << 1", "-12 >> 2"], seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightLogShift"] };
			}, function (e, t) {
				e.exports = { name: "rightLogShift", category: "Bitwise", syntax: ["x >> y", "leftShift(x, y)"], description: "Bitwise right logical shift of a value x by y number of bits.", examples: ["8 >>> 1", "4 << 1", "-12 >>> 2"], seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift"] };
			}, function (e, t) {
				e.exports = { name: "bellNumbers", category: "Combinatorics", syntax: ["bellNumbers(n)"], description: "The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S. `bellNumbers` only takes integer arguments. The following condition must be enforced: n >= 0.", examples: ["bellNumbers(3)", "bellNumbers(8)"], seealso: ["stirlingS2"] };
			}, function (e, t) {
				e.exports = { name: "catalan", category: "Combinatorics", syntax: ["catalan(n)"], description: "The Catalan Numbers enumerate combinatorial structures of many different types. catalan only takes integer arguments. The following condition must be enforced: n >= 0.", examples: ["catalan(3)", "catalan(8)"], seealso: ["bellNumbers"] };
			}, function (e, t) {
				e.exports = { name: "composition", category: "Combinatorics", syntax: ["composition(n, k)"], description: "The composition counts of n into k parts. composition only takes integer arguments. The following condition must be enforced: k <= n.", examples: ["composition(5, 3)"], seealso: ["combinations"] };
			}, function (e, t) {
				e.exports = { name: "stirlingS2", category: "Combinatorics", syntax: ["stirlingS2(n, k)"], description: "he Stirling numbers of the second kind, counts the number of ways to partition a set of n labelled objects into k nonempty unlabelled subsets. `stirlingS2` only takes integer arguments. The following condition must be enforced: k <= n. If n = k or k = 1, then s(n,k) = 1.", examples: ["stirlingS2(5, 3)"], seealso: ["bellNumbers"] };
			}, function (e, t) {
				e.exports = { name: "arg", category: "Complex", syntax: ["arg(x)"], description: "Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).", examples: ["arg(2 + 2i)", "atan2(3, 2)", "arg(2 + 3i)"], seealso: ["re", "im", "conj", "abs"] };
			}, function (e, t) {
				e.exports = { name: "conj", category: "Complex", syntax: ["conj(x)"], description: "Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.", examples: ["conj(2 + 3i)", "conj(2 - 3i)", "conj(-5.2i)"], seealso: ["re", "im", "abs", "arg"] };
			}, function (e, t) {
				e.exports = { name: "im", category: "Complex", syntax: ["im(x)"], description: "Get the imaginary part of a complex number.", examples: ["im(2 + 3i)", "re(2 + 3i)", "im(-5.2i)", "im(2.4)"], seealso: ["re", "conj", "abs", "arg"] };
			}, function (e, t) {
				e.exports = { name: "re", category: "Complex", syntax: ["re(x)"], description: "Get the real part of a complex number.", examples: ["re(2 + 3i)", "im(2 + 3i)", "re(-5.2i)", "re(2.4)"], seealso: ["im", "conj", "abs", "arg"] };
			}, function (e, t) {
				e.exports = { name: "eval", category: "Expression", syntax: ["eval(expression)", "eval([expr1, expr2, expr3, ...])"], description: "Evaluate an expression or an array with expressions.", examples: ['eval("2 + 3")', 'eval("sqrt(" + 4 + ")")'], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "help", category: "Expression", syntax: ["help(object)", "help(string)"], description: "Display documentation on a function or data type.", examples: ["help(sqrt)", 'help("complex")'], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "distance", category: "Geometry", syntax: ["distance([x1, y1], [x2, y2])", "distance([[x1, y1], [x2, y2])"], description: "Calculates the Euclidean distance between two points.", examples: ["distance([0,0], [4,4])", "distance([[0,0], [4,4]])"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "intersect", category: "Geometry", syntax: ["intersect(expr1, expr2, expr3, expr4)", "intersect(expr1, expr2, expr3)"], description: "Computes the intersection point of lines and/or planes.", examples: ["intersect([0, 0], [10, 10], [10, 0], [0, 10])", "intersect([1, 0, 1],  [4, -2, 2], [1, 1, 1, 6])"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "and", category: "Logical", syntax: ["x and y", "and(x, y)"], description: "Logical and. Test whether two values are both defined with a nonzero/nonempty value.", examples: ["true and false", "true and true", "2 and 4"], seealso: ["not", "or", "xor"] };
			}, function (e, t) {
				e.exports = { name: "not", category: "Logical", syntax: ["not x", "not(x)"], description: "Logical not. Flips the boolean value of given argument.", examples: ["not true", "not false", "not 2", "not 0"], seealso: ["and", "or", "xor"] };
			}, function (e, t) {
				e.exports = { name: "or", category: "Logical", syntax: ["x or y", "or(x, y)"], description: "Logical or. Test if at least one value is defined with a nonzero/nonempty value.", examples: ["true or false", "false or false", "0 or 4"], seealso: ["not", "and", "xor"] };
			}, function (e, t) {
				e.exports = { name: "xor", category: "Logical", syntax: ["x or y", "or(x, y)"], description: "Logical exclusive or, xor. Test whether one and only one value is defined with a nonzero/nonempty value.", examples: ["true xor false", "false xor false", "true xor true", "0 or 4"], seealso: ["not", "and", "or"] };
			}, function (e, t) {
				e.exports = { name: "concat", category: "Matrix", syntax: ["concat(A, B, C, ...)", "concat(A, B, C, ..., dim)"], description: "Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.", examples: ["A = [1, 2; 5, 6]", "B = [3, 4; 7, 8]", "concat(A, B)", "concat(A, B, 1)", "concat(A, B, 2)"], seealso: ["det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "cross", category: "Matrix", syntax: ["cross(A, B)"], description: "Calculate the cross product for two vectors in three dimensional space.", examples: ["cross([1, 1, 0],  [0, 1, 1])", "cross([3, -3, 1], [4, 9, 2])", "cross([2, 3, 4],  [5, 6, 7])"], seealso: ["multiply", "dot"] };
			}, function (e, t) {
				e.exports = { name: "det", category: "Matrix", syntax: ["det(x)"], description: "Calculate the determinant of a matrix", examples: ["det([1, 2; 3, 4])", "det([-2, 2, 3; -1, 1, 3; 2, 0, -1])"], seealso: ["concat", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "diag", category: "Matrix", syntax: ["diag(x)", "diag(x, k)"], description: "Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.", examples: ["diag(1:3)", "diag(1:3, 1)", "a = [1, 2, 3; 4, 5, 6; 7, 8, 9]", "diag(a)"], seealso: ["concat", "det", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "dot", category: "Matrix", syntax: ["dot(A, B)"], description: "Calculate the dot product of two vectors. The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn", examples: ["dot([2, 4, 1], [2, 2, 3])", "[2, 4, 1] * [2, 2, 3]"], seealso: ["multiply", "cross"] };
			}, function (e, t) {
				e.exports = { name: "eye", category: "Matrix", syntax: ["eye(n)", "eye(m, n)", "eye([m, n])", "eye"], description: "Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.", examples: ["eye(3)", "eye(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "eye(size(a))"], seealso: ["concat", "det", "diag", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "filter", category: "Matrix", syntax: ["filter(x, test)"], description: "Filter items in a matrix.", examples: ["isPositive(x) = x > 0", "filter([6, -2, -1, 4, 3], isPositive)", "filter([6, -2, 0, 1, 0], x != 0)"], seealso: ["sort", "map", "forEach"] };
			}, function (e, t) {
				e.exports = { name: "flatten", category: "Matrix", syntax: ["flatten(x)"], description: "Flatten a multi dimensional matrix into a single dimensional matrix.", examples: ["a = [1, 2, 3; 4, 5, 6]", "size(a)", "b = flatten(a)", "size(b)"], seealso: ["concat", "resize", "size", "squeeze"] };
			}, function (e, t) {
				e.exports = { name: "forEach", category: "Matrix", syntax: ["forEach(x, callback)"], description: "Iterates over all elements of a matrix/array, and executes the given callback function.", examples: ["forEach([1, 2, 3], function(val) { console.log(val) })"], seealso: ["map", "sort", "filter"] };
			}, function (e, t) {
				e.exports = { name: "inv", category: "Matrix", syntax: ["inv(x)"], description: "Calculate the inverse of a matrix", examples: ["inv([1, 2; 3, 4])", "inv(4)", "1 / 4"], seealso: ["concat", "det", "diag", "eye", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "kron", category: "Matrix", syntax: ["math.kron(x, y)"], description: "Calculates the kronecker product of 2 matrices or vectors.", examples: ["kron([[1, 0], [0, 1]], [[1, 2], [3, 4]])", "kron([1,1], [2,3,4])"], seealso: ["multiply", "dot", "cross"] };
			}, function (e, t) {
				e.exports = { name: "map", category: "Matrix", syntax: ["map(x, callback)"], description: "Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.", examples: ["map([1, 2, 3], function(val) { return value * value })"], seealso: ["filter", "forEach"] };
			}, function (e, t) {
				e.exports = { name: "ones", category: "Matrix", syntax: ["ones(m)", "ones(m, n)", "ones(m, n, p, ...)", "ones([m])", "ones([m, n])", "ones([m, n, p, ...])", "ones"], description: "Create a matrix containing ones.", examples: ["ones(3)", "ones(3, 5)", "ones([2,3]) * 4.5", "a = [1, 2, 3; 4, 5, 6]", "ones(size(a))"], seealso: ["concat", "det", "diag", "eye", "inv", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "partitionSelect", category: "Matrix", syntax: ["partitionSelect(x, k)", "partitionSelect(x, k, compare)"], description: "Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.", examples: ["partitionSelect([5, 10, 1], 2)", 'partitionSelect(["C", "B", "A", "D"], 1)'], seealso: ["sort"] };
			}, function (e, t) {
				e.exports = { name: "range", category: "Type", syntax: ["start:end", "start:step:end", "range(start, end)", "range(start, end, step)", "range(string)"], description: "Create a range. Lower bound of the range is included, upper bound is excluded.", examples: ["1:5", "3:-1:-3", "range(3, 7)", "range(0, 12, 2)", 'range("4:10")', "a = [1, 2, 3, 4; 5, 6, 7, 8]", "a[1:2, 1:2]"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "reshape", category: "Matrix", syntax: ["reshape(x, sizes)"], description: "Reshape a multi dimensional array to fit the specified dimensions.", examples: ["reshape([1, 2, 3, 4, 5, 6], [2, 3])", "reshape([[1, 2], [3, 4]], [1, 4])", "reshape([[1, 2], [3, 4]], [4])"], seealso: ["size", "squeeze", "resize"] };
			}, function (e, t) {
				e.exports = { name: "resize", category: "Matrix", syntax: ["resize(x, size)", "resize(x, size, defaultValue)"], description: "Resize a matrix.", examples: ["resize([1,2,3,4,5], [3])", "resize([1,2,3], [5])", "resize([1,2,3], [5], -1)", "resize(2, [2, 3])", 'resize("hello", [8], "!")'],
					seealso: ["size", "subset", "squeeze", "reshape"] };
			}, function (e, t) {
				e.exports = { name: "size", category: "Matrix", syntax: ["size(x)"], description: "Calculate the size of a matrix.", examples: ["size(2.3)", 'size("hello world")', "a = [1, 2; 3, 4; 5, 6]", "size(a)", "size(1:6)"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "squeeze", "subset", "trace", "transpose", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "sort", category: "Matrix", syntax: ["sort(x)", "sort(x, compare)"], description: 'Sort the items in a matrix. Compare can be a string "asc" or "desc", or a custom sort function.', examples: ["sort([5, 10, 1])", 'sort(["C", "B", "A", "D"])', "sortByLength(a, b) = size(a)[1] - size(b)[1]", 'sort(["Langdon", "Tom", "Sara"], sortByLength)'], seealso: ["map", "filter", "forEach"] };
			}, function (e, t) {
				e.exports = { name: "squeeze", category: "Matrix", syntax: ["squeeze(x)"], description: "Remove inner and outer singleton dimensions from a matrix.", examples: ["a = zeros(3,2,1)", "size(squeeze(a))", "b = zeros(1,1,3)", "size(squeeze(b))"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "subset", "trace", "transpose", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "subset", category: "Matrix", syntax: ["value(index)", "value(index) = replacement", "subset(value, [index])", "subset(value, [index], replacement)"], description: "Get or set a subset of a matrix or string. Indexes are one-based. Both the ranges lower-bound and upper-bound are included.", examples: ["d = [1, 2; 3, 4]", "e = []", "e[1, 1:2] = [5, 6]", "e[2, :] = [7, 8]", "f = d * e", "f[2, 1]", "f[:, 1]"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "trace", "transpose", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "trace", category: "Matrix", syntax: ["trace(A)"], description: "Calculate the trace of a matrix: the sum of the elements on the main diagonal of a square matrix.", examples: ["A = [1, 2, 3; -1, 2, 3; 2, 0, 3]", "trace(A)"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "transpose", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "transpose", category: "Matrix", syntax: ["x'", "transpose(x)"], description: "Transpose a matrix", examples: ["a = [1, 2, 3; 4, 5, 6]", "a'", "transpose(a)"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "zeros"] };
			}, function (e, t) {
				e.exports = { name: "zeros", category: "Matrix", syntax: ["zeros(m)", "zeros(m, n)", "zeros(m, n, p, ...)", "zeros([m])", "zeros([m, n])", "zeros([m, n, p, ...])", "zeros"], description: "Create a matrix containing zeros.", examples: ["zeros(3)", "zeros(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "zeros(size(a))"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose"] };
			}, function (e, t) {
				e.exports = { name: "combinations", category: "Probability", syntax: ["combinations(n, k)"], description: "Compute the number of combinations of n items taken k at a time", examples: ["combinations(7, 5)"], seealso: ["permutations", "factorial"] };
			}, function (e, t) {
				e.exports = { name: "factorial", category: "Probability", syntax: ["kldivergence(x, y)"], description: "Compute the factorial of a value", examples: ["5!", "5 * 4 * 3 * 2 * 1", "3!"], seealso: ["combinations", "permutations", "gamma"] };
			}, function (e, t) {
				e.exports = { name: "gamma", category: "Probability", syntax: ["gamma(n)"], description: "Compute the gamma function. For small values, the Lanczos approximation is used, and for large values the extended Stirling approximation.", examples: ["gamma(4)", "3!", "gamma(1/2)", "sqrt(pi)"], seealso: ["factorial"] };
			}, function (e, t) {
				e.exports = { name: "kldivergence", category: "Probability", syntax: ["n!", "factorial(n)"], description: "Calculate the Kullback-Leibler (KL) divergence  between two distributions.", examples: ["math.kldivergence([0.7,0.5,0.4], [0.2,0.9,0.5])"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "multinomial", category: "Probability", syntax: ["multinomial(A)"], description: "Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities. multinomial takes one array of integers as an argument. The following condition must be enforced: every ai <= 0.", examples: ["multinomial([1, 2, 1])"], seealso: ["combinations", "factorial"] };
			}, function (e, t) {
				e.exports = { name: "permutations", category: "Probability", syntax: ["permutations(n)", "permutations(n, k)"], description: "Compute the number of permutations of n items taken k at a time", examples: ["permutations(5)", "permutations(5, 3)"], seealso: ["combinations", "factorial"] };
			}, function (e, t) {
				e.exports = { name: "pickRandom", category: "Probability", syntax: ["pickRandom(array)", "pickRandom(array, number)", "pickRandom(array, weights)", "pickRandom(array, number, weights)", "pickRandom(array, weights, number)"], description: "Pick a random entry from a given array.", examples: ["pickRandom(0:10)", "pickRandom([1, 3, 1, 6])", "pickRandom([1, 3, 1, 6], 2)", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], 2, [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1], 2)"], seealso: ["random", "randomInt"] };
			}, function (e, t) {
				e.exports = { name: "random", category: "Probability", syntax: ["random()", "random(max)", "random(min, max)", "random(size)", "random(size, max)", "random(size, min, max)"], description: "Return a random number.", examples: ["random()", "random(10, 20)", "random([2, 3])"], seealso: ["pickRandom", "randomInt"] };
			}, function (e, t) {
				e.exports = { name: "randInt", category: "Probability", syntax: ["randInt(max)", "randInt(min, max)", "randInt(size)", "randInt(size, max)", "randInt(size, min, max)"], description: "Return a random integer number", examples: ["randInt(10, 20)", "randInt([2, 3], 10)"], seealso: ["pickRandom", "random"] };
			}, function (e, t) {
				e.exports = { name: "compare", category: "Relational", syntax: ["compare(x, y)"], description: "Compare two values. Returns 1 if x is larger than y, -1 if x is smaller than y, and 0 if x and y are equal.", examples: ["compare(2, 3)", "compare(3, 2)", "compare(2, 2)", "compare(5cm, 40mm)", "compare(2, [1, 2, 3])"], seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq"] };
			}, function (e, t) {
				e.exports = { name: "deepEqual", category: "Relational", syntax: ["deepEqual(x, y)"], description: "Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.", examples: ["[1,3,4] == [1,3,4]", "[1,3,4] == [1,3]"], seealso: ["equal", "unequal", "smaller", "larger", "smallerEq", "largerEq", "compare"] };
			}, function (e, t) {
				e.exports = { name: "equal", category: "Relational", syntax: ["x == y", "equal(x, y)"], description: "Check equality of two values. Returns true if the values are equal, and false if not.", examples: ["2+2 == 3", "2+2 == 4", "a = 3.2", "b = 6-2.8", "a == b", "50cm == 0.5m"], seealso: ["unequal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual"] };
			}, function (e, t) {
				e.exports = { name: "larger", category: "Relational", syntax: ["x > y", "larger(x, y)"], description: "Check if value x is larger than y. Returns true if x is larger than y, and false if not.", examples: ["2 > 3", "5 > 2*2", "a = 3.3", "b = 6-2.8", "(a > b)", "(b < a)", "5 cm > 2 inch"], seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compare"] };
			}, function (e, t) {
				e.exports = { name: "largerEq", category: "Relational", syntax: ["x >= y", "largerEq(x, y)"], description: "Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.", examples: ["2 > 1+1", "2 >= 1+1", "a = 3.2", "b = 6-2.8", "(a > b)"], seealso: ["equal", "unequal", "smallerEq", "smaller", "largerEq", "compare"] };
			}, function (e, t) {
				e.exports = { name: "smaller", category: "Relational", syntax: ["x < y", "smaller(x, y)"], description: "Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.", examples: ["2 < 3", "5 < 2*2", "a = 3.3", "b = 6-2.8", "(a < b)", "5 cm < 2 inch"], seealso: ["equal", "unequal", "larger", "smallerEq", "largerEq", "compare"] };
			}, function (e, t) {
				e.exports = { name: "smallerEq", category: "Relational", syntax: ["x <= y", "smallerEq(x, y)"], description: "Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.", examples: ["2 < 1+1", "2 <= 1+1", "a = 3.2", "b = 6-2.8", "(a < b)"], seealso: ["equal", "unequal", "larger", "smaller", "largerEq", "compare"] };
			}, function (e, t) {
				e.exports = { name: "unequal", category: "Relational", syntax: ["x != y", "unequal(x, y)"], description: "Check unequality of two values. Returns true if the values are unequal, and false if they are equal.", examples: ["2+2 != 3", "2+2 != 4", "a = 3.2", "b = 6-2.8", "a != b", "50cm != 0.5m", "5 cm != 2 inch"], seealso: ["equal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual"] };
			}, function (e, t) {
				e.exports = { name: "erf", category: "Special", syntax: ["erf(x)"], description: "Compute the erf function of a value using a rational Chebyshev approximations for different intervals of x", examples: ["erf(0.2)", "erf(-0.5)", "erf(4)"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "mad", category: "Statistics", syntax: ["mad(a, b, c, ...)", "mad(A)"], description: "Compute the median absolute deviation of a matrix or a list with values. The median absolute deviation is defined as the median of the absolute deviations from the median.", examples: ["mad(10, 20, 30)", "mad([1, 2, 3])", "mad(10, 20, 30)"], seealso: ["mean", "median", "std", "abs"] };
			}, function (e, t) {
				e.exports = { name: "max", category: "Statistics", syntax: ["max(a, b, c, ...)", "max(A)", "max(A, dim)"], description: "Compute the maximum value of a list of values.", examples: ["max(2, 3, 4, 1)", "max([2, 3, 4, 1])", "max([2, 5; 4, 3])", "max([2, 5; 4, 3], 1)", "max([2, 5; 4, 3], 2)", "max(2.7, 7.1, -4.5, 2.0, 4.1)", "min(2.7, 7.1, -4.5, 2.0, 4.1)"], seealso: ["mean", "median", "min", "prod", "std", "sum", "var"] };
			}, function (e, t) {
				e.exports = { name: "mean", category: "Statistics", syntax: ["mean(a, b, c, ...)", "mean(A)", "mean(A, dim)"], description: "Compute the arithmetic mean of a list of values.", examples: ["mean(2, 3, 4, 1)", "mean([2, 3, 4, 1])", "mean([2, 5; 4, 3])", "mean([2, 5; 4, 3], 1)", "mean([2, 5; 4, 3], 2)", "mean([1.0, 2.7, 3.2, 4.0])"], seealso: ["max", "median", "min", "prod", "std", "sum", "var"] };
			}, function (e, t) {
				e.exports = { name: "median", category: "Statistics", syntax: ["median(a, b, c, ...)", "median(A)"], description: "Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.", examples: ["median(5, 2, 7)", "median([3, -1, 5, 7])"], seealso: ["max", "mean", "min", "prod", "std", "sum", "var", "quantileSeq"] };
			}, function (e, t) {
				e.exports = { name: "min", category: "Statistics", syntax: ["min(a, b, c, ...)", "min(A)", "min(A, dim)"], description: "Compute the minimum value of a list of values.", examples: ["min(2, 3, 4, 1)", "min([2, 3, 4, 1])", "min([2, 5; 4, 3])", "min([2, 5; 4, 3], 1)", "min([2, 5; 4, 3], 2)", "min(2.7, 7.1, -4.5, 2.0, 4.1)", "max(2.7, 7.1, -4.5, 2.0, 4.1)"], seealso: ["max", "mean", "median", "prod", "std", "sum", "var"] };
			}, function (e, t) {
				e.exports = { name: "mode", category: "Statistics", syntax: ["mode(a, b, c, ...)", "mode(A)", "mode(A, a, b, B, c, ...)"], description: "Computes the mode of all values as an array. In case mode being more than one, multiple values are returned in an array.", examples: ["mode(5, 2, 7)", "mode([3, -1, 5, 7])"], seealso: ["max", "mean", "min", "median", "prod", "std", "sum", "var"] };
			}, function (e, t) {
				e.exports = { name: "prod", category: "Statistics", syntax: ["prod(a, b, c, ...)", "prod(A)"], description: "Compute the product of all values.", examples: ["prod(2, 3, 4)", "prod([2, 3, 4])", "prod([2, 5; 4, 3])"], seealso: ["max", "mean", "min", "median", "min", "std", "sum", "var"] };
			}, function (e, t) {
				e.exports = { name: "quantileSeq", category: "Statistics", syntax: ["quantileSeq(A, prob[, sorted])", "quantileSeq(A, [prob1, prob2, ...][, sorted])", "quantileSeq(A, N[, sorted])"], description: "Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.", examples: ["quantileSeq([3, -1, 5, 7], 0.5)", "quantileSeq([3, -1, 5, 7], [1/3, 2/3])", "quantileSeq([3, -1, 5, 7], 2)", "quantileSeq([-1, 3, 5, 7], 0.5, true)"], seealso: ["mean", "median", "min", "max", "prod", "std", "sum", "var"] };
			}, function (e, t) {
				e.exports = { name: "std", category: "Statistics", syntax: ["std(a, b, c, ...)", "std(A)", "std(A, normalization)"], description: 'Compute the standard deviation of all values, defined as std(A) = sqrt(var(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".', examples: ["std(2, 4, 6)", "std([2, 4, 6, 8])", 'std([2, 4, 6, 8], "uncorrected")', 'std([2, 4, 6, 8], "biased")', "std([1, 2, 3; 4, 5, 6])"], seealso: ["max", "mean", "min", "median", "min", "prod", "sum", "var"] };
			}, function (e, t) {
				e.exports = { name: "sum", category: "Statistics", syntax: ["sum(a, b, c, ...)", "sum(A)"], description: "Compute the sum of all values.", examples: ["sum(2, 3, 4, 1)", "sum([2, 3, 4, 1])", "sum([2, 5; 4, 3])"], seealso: ["max", "mean", "median", "min", "prod", "std", "sum", "var"] };
			}, function (e, t) {
				e.exports = { name: "var", category: "Statistics", syntax: ["var(a, b, c, ...)", "var(A)", "var(A, normalization)"], description: 'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".', examples: ["var(2, 4, 6)", "var([2, 4, 6, 8])", 'var([2, 4, 6, 8], "uncorrected")', 'var([2, 4, 6, 8], "biased")', "var([1, 2, 3; 4, 5, 6])"], seealso: ["max", "mean", "min", "median", "min", "prod", "std", "sum"] };
			}, function (e, t) {
				e.exports = { name: "acos", category: "Trigonometry", syntax: ["acos(x)"], description: "Compute the inverse cosine of a value in radians.", examples: ["acos(0.5)", "acos(cos(2.3))"], seealso: ["cos", "atan", "asin"] };
			}, function (e, t) {
				e.exports = { name: "acosh", category: "Trigonometry", syntax: ["acosh(x)"], description: "Calculate the hyperbolic arccos of a value, defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.", examples: ["acosh(1.5)"], seealso: ["cosh", "asinh", "atanh"] };
			}, function (e, t) {
				e.exports = { name: "acot", category: "Trigonometry", syntax: ["acot(x)"], description: "Calculate the inverse cotangent of a value.", examples: ["acot(0.5)", "acot(cot(0.5))", "acot(2)"], seealso: ["cot", "atan"] };
			}, function (e, t) {
				e.exports = { name: "acoth", category: "Trigonometry", syntax: ["acoth(x)"], description: "Calculate the hyperbolic arccotangent of a value, defined as `acoth(x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.", examples: ["acoth(0.5)"], seealso: ["acsch", "asech"] };
			}, function (e, t) {
				e.exports = { name: "acsc", category: "Trigonometry", syntax: ["acsc(x)"], description: "Calculate the inverse cotangent of a value.", examples: ["acsc(0.5)", "acsc(csc(0.5))", "acsc(2)"], seealso: ["csc", "asin", "asec"] };
			}, function (e, t) {
				e.exports = { name: "acsch", category: "Trigonometry", syntax: ["acsch(x)"], description: "Calculate the hyperbolic arccosecant of a value, defined as `acsch(x) = ln(1/x + sqrt(1/x^2 + 1))`.", examples: ["acsch(0.5)"], seealso: ["asech", "acoth"] };
			}, function (e, t) {
				e.exports = { name: "asec", category: "Trigonometry", syntax: ["asec(x)"], description: "Calculate the inverse secant of a value.", examples: ["asec(0.5)", "asec(sec(0.5))", "asec(2)"], seealso: ["acos", "acot", "acsc"] };
			}, function (e, t) {
				e.exports = { name: "asech", category: "Trigonometry", syntax: ["asech(x)"], description: "Calculate the inverse secant of a value.", examples: ["asech(0.5)"], seealso: ["acsch", "acoth"] };
			}, function (e, t) {
				e.exports = { name: "asin", category: "Trigonometry", syntax: ["asin(x)"], description: "Compute the inverse sine of a value in radians.", examples: ["asin(0.5)", "asin(sin(2.3))"], seealso: ["sin", "acos", "atan"] };
			}, function (e, t) {
				e.exports = { name: "asinh", category: "Trigonometry", syntax: ["asinh(x)"], description: "Calculate the hyperbolic arcsine of a value, defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.", examples: ["asinh(0.5)"], seealso: ["acosh", "atanh"] };
			}, function (e, t) {
				e.exports = { name: "atan", category: "Trigonometry", syntax: ["atan(x)"], description: "Compute the inverse tangent of a value in radians.", examples: ["atan(0.5)", "atan(tan(2.3))"], seealso: ["tan", "acos", "asin"] };
			}, function (e, t) {
				e.exports = { name: "atan2", category: "Trigonometry", syntax: ["atan2(y, x)"], description: "Computes the principal value of the arc tangent of y/x in radians.", examples: ["atan2(2, 2) / pi", "angle = 60 deg in rad", "x = cos(angle)", "y = sin(angle)", "atan2(y, x)"], seealso: ["sin", "cos", "tan"] };
			}, function (e, t) {
				e.exports = { name: "atanh", category: "Trigonometry", syntax: ["atanh(x)"], description: "Calculate the hyperbolic arctangent of a value, defined as `atanh(x) = ln((1 + x)/(1 - x)) / 2`.", examples: ["atanh(0.5)"], seealso: ["acosh", "asinh"] };
			}, function (e, t) {
				e.exports = { name: "cos", category: "Trigonometry", syntax: ["cos(x)"], description: "Compute the cosine of x in radians.", examples: ["cos(2)", "cos(pi / 4) ^ 2", "cos(180 deg)", "cos(60 deg)", "sin(0.2)^2 + cos(0.2)^2"], seealso: ["acos", "sin", "tan"] };
			}, function (e, t) {
				e.exports = { name: "cosh", category: "Trigonometry", syntax: ["cosh(x)"], description: "Compute the hyperbolic cosine of x in radians.", examples: ["cosh(0.5)"], seealso: ["sinh", "tanh", "coth"] };
			}, function (e, t) {
				e.exports = { name: "cot", category: "Trigonometry", syntax: ["cot(x)"], description: "Compute the cotangent of x in radians. Defined as 1/tan(x)", examples: ["cot(2)", "1 / tan(2)"], seealso: ["sec", "csc", "tan"] };
			}, function (e, t) {
				e.exports = { name: "coth", category: "Trigonometry", syntax: ["coth(x)"], description: "Compute the hyperbolic cotangent of x in radians.", examples: ["coth(2)", "1 / tanh(2)"], seealso: ["sech", "csch", "tanh"] };
			}, function (e, t) {
				e.exports = { name: "csc", category: "Trigonometry", syntax: ["csc(x)"], description: "Compute the cosecant of x in radians. Defined as 1/sin(x)", examples: ["csc(2)", "1 / sin(2)"], seealso: ["sec", "cot", "sin"] };
			}, function (e, t) {
				e.exports = { name: "csch", category: "Trigonometry", syntax: ["csch(x)"], description: "Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)", examples: ["csch(2)", "1 / sinh(2)"], seealso: ["sech", "coth", "sinh"] };
			}, function (e, t) {
				e.exports = { name: "sec", category: "Trigonometry", syntax: ["sec(x)"], description: "Compute the secant of x in radians. Defined as 1/cos(x)", examples: ["sec(2)", "1 / cos(2)"], seealso: ["cot", "csc", "cos"] };
			}, function (e, t) {
				e.exports = { name: "sech", category: "Trigonometry", syntax: ["sech(x)"], description: "Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)", examples: ["sech(2)", "1 / cosh(2)"], seealso: ["coth", "csch", "cosh"] };
			}, function (e, t) {
				e.exports = { name: "sin", category: "Trigonometry", syntax: ["sin(x)"], description: "Compute the sine of x in radians.", examples: ["sin(2)", "sin(pi / 4) ^ 2", "sin(90 deg)", "sin(30 deg)", "sin(0.2)^2 + cos(0.2)^2"], seealso: ["asin", "cos", "tan"] };
			}, function (e, t) {
				e.exports = { name: "sinh", category: "Trigonometry", syntax: ["sinh(x)"], description: "Compute the hyperbolic sine of x in radians.", examples: ["sinh(0.5)"], seealso: ["cosh", "tanh"] };
			}, function (e, t) {
				e.exports = { name: "tan", category: "Trigonometry", syntax: ["tan(x)"], description: "Compute the tangent of x in radians.", examples: ["tan(0.5)", "sin(0.5) / cos(0.5)", "tan(pi / 4)", "tan(45 deg)"], seealso: ["atan", "sin", "cos"] };
			}, function (e, t) {
				e.exports = { name: "tanh", category: "Trigonometry", syntax: ["tanh(x)"], description: "Compute the hyperbolic tangent of x in radians.", examples: ["tanh(0.5)", "sinh(0.5) / cosh(0.5)"], seealso: ["sinh", "cosh"] };
			}, function (e, t) {
				e.exports = { name: "to", category: "Units", syntax: ["x to unit", "to(x, unit)"], description: "Change the unit of a value.", examples: ["5 inch to cm", "3.2kg to g", "16 bytes in bits"], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "clone", category: "Utils", syntax: ["clone(x)"], description: "Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices", examples: ["clone(3.5)", "clone(2 - 4i)", "clone(45 deg)", "clone([1, 2; 3, 4])", 'clone("hello world")'], seealso: [] };
			}, function (e, t) {
				e.exports = { name: "format", category: "Utils", syntax: ["format(value)", "format(value, precision)"], description: "Format a value of any type as string.", examples: ["format(2.3)", "format(3 - 4i)", "format([])", "format(pi, 3)"], seealso: ["print"] };
			}, function (e, t) {
				e.exports = { name: "isInteger", category: "Utils", syntax: ["isInteger(x)"], description: "Test whether a value is an integer number.", examples: ["isInteger(2)", "isInteger(3.5)", "isInteger([3, 0.5, -2])"], seealso: ["isNegative", "isNumeric", "isPositive", "isZero"] };
			}, function (e, t) {
				e.exports = { name: "isNaN", category: "Utils", syntax: ["isNaN(x)"], description: "Test whether a value is NaN (not a number)", examples: ["isNaN(2)", "isNaN(0 / 0)", "isNaN(NaN)", "isNaN(Infinity)"], seealso: ["isNegative", "isNumeric", "isPositive", "isZero"] };
			}, function (e, t) {
				e.exports = { name: "isNegative", category: "Utils", syntax: ["isNegative(x)"], description: "Test whether a value is negative: smaller than zero.", examples: ["isNegative(2)", "isNegative(0)", "isNegative(-4)", "isNegative([3, 0.5, -2])"], seealso: ["isInteger", "isNumeric", "isPositive", "isZero"] };
			}, function (e, t) {
				e.exports = { name: "isNumeric", category: "Utils", syntax: ["isNumeric(x)"], description: "Test whether a value is a numeric value. Returns true when the input is a number, BigNumber, Fraction, or boolean.", examples: ["isNumeric(2)", "isNumeric(0)", "isNumeric(bignumber(500))", "isNumeric(fraction(0.125))", 'isNumeric("3")', "isNumeric(2 + 3i)", 'isNumeric([2.3, "foo", false])'], seealso: ["isInteger", "isZero", "isNegative", "isPositive", "isNaN"] };
			}, function (e, t) {
				e.exports = { name: "isPositive", category: "Utils", syntax: ["isPositive(x)"], description: "Test whether a value is positive: larger than zero.", examples: ["isPositive(2)", "isPositive(0)", "isPositive(-4)", "isPositive([3, 0.5, -2])"], seealso: ["isInteger", "isNumeric", "isNegative", "isZero"] };
			}, function (e, t) {
				e.exports = { name: "isPrime", category: "Utils", syntax: ["isPrime(x)"], description: "Test whether a value is prime: has no divisors other than itself and one.", examples: ["isPrime(3)", "isPrime(-2)", "isPrime([2, 17, 100])"], seealso: ["isInteger", "isNumeric", "isNegative", "isZero"] };
			}, function (e, t) {
				e.exports = { name: "isZero", category: "Utils", syntax: ["isZero(x)"], description: "Test whether a value is zero.", examples: ["isZero(2)", "isZero(0)", "isZero(-4)", "isZero([3, 0, -2, 0])"], seealso: ["isInteger", "isNumeric", "isNegative", "isPositive"] };
			}, function (e, t) {
				e.exports = { name: "typeof", category: "Utils", syntax: ["typeof(x)"], description: "Get the type of a variable.", examples: ["typeof(3.5)", "typeof(2 - 4i)", "typeof(45 deg)", 'typeof("hello world")'], seealso: [] };
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(30));return a("compile", { string: function string(e) {
							return o(e).compile();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, function (e) {
								return o(e).compile();
							});
						} });
				}var i = r(1);t.name = "compile", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(30));return a("compile", { string: function string(e) {
							var t = {};return o(e).compile().eval(t);
						}, "string, Object": function stringObject(e, t) {
							return o(e).compile().eval(t);
						}, "Array | Matrix": function ArrayMatrix(e) {
							var t = {};return i(e, function (e) {
								return o(e).compile().eval(t);
							});
						}, "Array | Matrix, Object": function ArrayMatrixObject(e, t) {
							return i(e, function (e) {
								return o(e).compile().eval(t);
							});
						} });
				}var i = r(1);t.name = "eval", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i, a) {
					var o = n(r(84));return i("help", { any: function any(t) {
							var r,
							    n = t;if ("string" != typeof t) for (r in a) {
								if (a.hasOwnProperty(r) && t === a[r]) {
									n = r;break;
								}
							}var i = o[n];if (!i) throw new Error('No documentation found on "' + n + '"');return new e.Help(i);
						} });
				}t.math = !0, t.name = "help", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(328), r(329), r(330), r(332), r(85)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(30));return i("parse", { "string | Array | Matrix": a, "string | Array | Matrix, Object": a });
				}t.name = "parse", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(84), r(331), r(335), r(340), r(147), r(30), r(81)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					function i() {
						throw new Error("UpdateNode is deprecated. Use AssignmentNode instead.");
					}return i;
				}t.name = "UpdateNode", t.path = "expression.node", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(86), r(65), r(87), r(88), r(89), r(45), r(91), r(90), r(46), r(13), r(92), r(52), r(53), r(66), r(27), r(334)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(55)),
					    u = n(r(0));return function (e, t, r) {
						try {
							if (Array.isArray(e)) return u(e).subset(t, r).valueOf();if (e && "function" == typeof e.subset) return e.subset(t, r);if ("string" == typeof e) return s(e, t, r);if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
								if (!t.isObjectProperty()) throw TypeError("Cannot apply a numeric index as object property");return a(e, t.getObjectProperty(), r), e;
							}throw new TypeError("Cannot apply index: unsupported type of object");
						} catch (e) {
							throw i(e);
						}
					};
				}var i = r(31).transform,
				    a = r(21).setSafeProperty;t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(110));return a("concat", { "...any": function any(e) {
							var t = e.length - 1,
							    r = e[t];"number" == typeof r ? e[t] = r - 1 : r && r.isBigNumber === !0 && (e[t] = r.minus(1));try {
								return o.apply(null, e);
							} catch (e) {
								throw i(e);
							}
						} });
				}var i = r(31).transform;t.name = "concat", t.path = "expression.transform", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e, t, r) {
						var n, i;if (e[0] && (n = e[0].compile().eval(r)), e[1]) if (e[1] && e[1].isSymbolNode) i = e[1].compile().eval(r);else {
							var a = r || {},
							    s = e[1].filter(function (e) {
								return e && e.isSymbolNode && !(e.name in t) && !(e.name in a);
							})[0],
							    u = Object.create(a),
							    c = e[1].compile();if (!s) throw new Error("No undefined variable found in filter equation");var f = s.name;i = function i(e) {
								return u[f] = e, c.eval(u);
							};
						}return o(n, i);
					}var o = n(r(112));n(r(27));return a.rawArgs = !0, a;
				}t.name = "filter", t.path = "expression.transform", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					n(r(113));return a("forEach", { "Array | Matrix, function": function ArrayMatrixFunction(e, t) {
							var r = i(t),
							    n = function n(i, a) {
								Array.isArray(i) ? i.forEach(function (e, t) {
									n(e, a.concat(t + 1));
								}) : 1 === r ? t(i) : 2 === r ? t(i, a) : t(i, a, e);
							};n(e.valueOf(), []);
						} });
				}var i = r(37).maxArgumentCount;t.name = "forEach", t.path = "expression.transform", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(337), r(338), r(339), r(341), r(342), r(343), r(344), r(345), r(346), r(347)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r) {
					return function () {
						for (var t = [], r = 0, n = arguments.length; r < n; r++) {
							var i = arguments[r];if (i && i.isRange === !0) i.start--, i.end -= i.step > 0 ? 0 : 2;else if (i && i.isSet === !0) i = i.map(function (e) {
								return e - 1;
							});else if (i && (i.isArray === !0 || i.isMatrix)) i = i.map(function (e) {
								return e - 1;
							});else if ("number" == typeof i) i--;else if (i && i.isBigNumber === !0) i = i.toNumber() - 1;else if ("string" != typeof i) throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");t[r] = i;
						}var a = new e.Index();return e.Index.apply(a, t), a;
					};
				}t.name = "index", t.path = "expression.transform", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = (n(r(69)), n(r(0)));return a("max", { "Array, function": function ArrayFunction(e, t) {
							return i(e, t, e);
						}, "Matrix, function": function MatrixFunction(e, t) {
							return o(i(e.valueOf(), t, e));
						} });
				}function i(e, t, r) {
					function n(e, a) {
						return Array.isArray(e) ? e.map(function (e, t) {
							return n(e, a.concat(t + 1));
						}) : 1 === i ? t(e) : 2 === i ? t(e, a) : t(e, a, r);
					}var i = a(t);return n(e, []);
				}var a = r(37).maxArgumentCount;t.name = "map", t.path = "expression.transform", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(120));return o("max", { "...any": function any(e) {
							if (2 == e.length && a(e[0])) {
								var t = e[1];"number" == typeof t ? e[1] = t - 1 : t && t.isBigNumber === !0 && (e[1] = t.minus(1));
							}try {
								return s.apply(null, e);
							} catch (e) {
								throw i(e);
							}
						} });
				}var i = r(31).transform,
				    a = r(42);t.name = "max", t.path = "expression.transform", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(121));return o("mean", { "...any": function any(e) {
							if (2 == e.length && a(e[0])) {
								var t = e[1];"number" == typeof t ? e[1] = t - 1 : t && t.isBigNumber === !0 && (e[1] = t.minus(1));
							}try {
								return s.apply(null, e);
							} catch (e) {
								throw i(e);
							}
						} });
				}var i = r(31).transform,
				    a = r(42);t.name = "mean", t.path = "expression.transform", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(123));return o("min", { "...any": function any(e) {
							if (2 == e.length && a(e[0])) {
								var t = e[1];"number" == typeof t ? e[1] = t - 1 : t && t.isBigNumber === !0 && (e[1] = t.minus(1));
							}try {
								return s.apply(null, e);
							} catch (e) {
								throw i(e);
							}
						} });
				}var i = r(31).transform,
				    a = r(42);t.name = "min", t.path = "expression.transform", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(115));return i("range", { "...any": function any(e) {
							var t = e.length - 1,
							    r = e[t];return "boolean" != typeof r && e.push(!0), a.apply(null, e);
						} });
				}t.name = "range", t.path = "expression.transform", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(55));return a("subset", { "...any": function any(e) {
							try {
								return o.apply(null, e);
							} catch (e) {
								throw i(e);
							}
						} });
				}var i = r(31).transform;t.name = "subset", t.path = "expression.transform", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(0)),
					    o = n(r(33)),
					    s = n(r(54)),
					    u = (n(r(128)), n(r(74))),
					    c = (n(r(51)), n(r(119))),
					    f = (n(r(26)), n(r(106))),
					    l = n(r(48)),
					    p = n(r(108)),
					    h = n(r(32)),
					    m = n(r(19)),
					    d = n(r(18)),
					    g = n(r(22)),
					    v = n(r(20)),
					    y = i("qr", { DenseMatrix: function DenseMatrix(e) {
							return x(e);
						}, SparseMatrix: function SparseMatrix(e) {
							return w(e);
						}, Array: function Array(e) {
							var t = a(e),
							    r = x(t);return { Q: r.Q.valueOf(), R: r.R.valueOf() };
						} }),
					    x = function x(e) {
						var t,
						    r,
						    n,
						    i = e._size[0],
						    a = e._size[1],
						    y = s([i], "dense"),
						    x = y._data,
						    w = e.clone(),
						    b = w._data,
						    N = o([i], "");for (n = 0; n < Math.min(a, i); ++n) {
							var E = b[n][n],
							    M = h(f(E)),
							    A = p(M),
							    O = 0;for (t = n; t < i; t++) {
								O = m(O, g(b[t][n], p(b[t][n])));
							}var T = g(M, l(O));if (!u(T)) {
								var _ = v(E, T);for (N[n] = 1, t = n + 1; t < i; t++) {
									N[t] = d(b[t][n], _);
								}var S,
								    C = h(p(d(_, T)));for (r = n; r < a; r++) {
									for (S = 0, t = n; t < i; t++) {
										S = m(S, g(p(N[t]), b[t][r]));
									}for (S = g(S, C), t = n; t < i; t++) {
										b[t][r] = g(v(b[t][r], g(N[t], S)), A);
									}
								}for (t = 0; t < i; t++) {
									for (S = 0, r = n; r < i; r++) {
										S = m(S, g(x[t][r], N[r]));
									}for (S = g(S, C), r = n; r < i; ++r) {
										x[t][r] = d(v(x[t][r], g(S, p(N[r]))), A);
									}
								}
							}
						}for (t = 0; t < i; ++t) {
							for (r = 0; r < t && r < a; ++r) {
								if (c(0, d(b[t][r], 1e5))) throw new Error("math.qr(): unknown error - R is not lower triangular (element (" + t + ", " + r + ")  = " + b[t][r] + ")");b[t][r] = g(b[t][r], 0);
							}
						}return { Q: y, R: w, toString: function toString() {
								return "Q: " + this.Q.toString() + "\nR: " + this.R.toString();
							} };
					},
					    w = function w(e) {
						throw new Error("qr not implemented for sparse matrices yet");
					};return y;
				}t.name = "qr", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e) {
						if ("log" != e.name && "nthRoot" != e.name || 2 != e.args.length) {
							for (var t = 0; t < e.args.length; ++t) {
								e.args[t] = new u(0);
							}throw e.compile().eval(), new Error("Expected TypeError, but none found");
						}
					}var o = n(r(30)),
					    s = n(r(96)),
					    u = n(r(45)),
					    c = n(r(46)),
					    f = n(r(52)),
					    l = n(r(53)),
					    p = (n(r(27)), i("derivative", { "Node, SymbolNode, Object": function NodeSymbolNodeObject(e, t, r) {
							var n = {};m(n, e, t.name);var i = d(e, n);return r.simplify ? s(i) : i;
						}, "Node, SymbolNode": function NodeSymbolNode(e, t) {
							return p(e, t, { simplify: !0 });
						}, "string, SymbolNode": function stringSymbolNode(e, t) {
							return p(o(e), t);
						}, "string, SymbolNode, Object": function stringSymbolNodeObject(e, t, r) {
							return p(o(e), t, r);
						}, "string, string": function stringString(e, t) {
							return p(o(e), o(t));
						}, "string, string, Object": function stringStringObject(e, t, r) {
							return p(o(e), o(t), r);
						}, "Node, string": function NodeString(e, t) {
							return p(e, o(t));
						}, "Node, string, Object": function NodeStringObject(e, t, r) {
							return p(e, o(t), r);
						} }));p._simplify = !0, p.toTex = function (e) {
						return h.apply(null, e.args);
					};var h = i("_derivTex", { "Node, SymbolNode": function NodeSymbolNode(e, t) {
							return h(e.toString(), t.toString(), 1);
						}, "Node, SymbolNode, ConstantNode": function NodeSymbolNodeConstantNode(e, t, r) {
							return h(e.toString(), t.name, r.value);
						}, "string, string, number": function stringStringNumber(e, t, r) {
							var n;return n = 1 === r ? "{d\\over d" + t + "}" : "{d^{" + r + "}\\over d" + t + "^{" + r + "}}", n + "\\left[" + e + "\\right]";
						} }),
					    m = i("constTag", { "Object, ConstantNode, string": function ObjectConstantNodeString(e, t) {
							return e[t] = !0;
						}, "Object, SymbolNode, string": function ObjectSymbolNodeString(e, t, r) {
							return t.name != r && (e[t] = !0);
						}, "Object, ParenthesisNode, string": function ObjectParenthesisNodeString(e, t, r) {
							return m(e, t.content, r);
						}, "Object, FunctionAssignmentNode, string": function ObjectFunctionAssignmentNodeString(e, t, r) {
							return t.params.indexOf(r) == -1 ? e[t] = !0 : m(e, t.expr, r);
						}, "Object, FunctionNode | OperatorNode, string": function ObjectFunctionNodeOperatorNodeString(e, t, r) {
							if (0 != t.args.length) {
								for (var n = m(e, t.args[0], r), i = 1; i < t.args.length; ++i) {
									n = m(e, t.args[i], r) && n;
								}if (n) return e[t] = !0;
							}return !1;
						} }),
					    d = i("_derivative", { "ConstantNode, Object": function ConstantNodeObject(e) {
							return new u("0", e.valueType);
						}, "SymbolNode, Object": function SymbolNodeObject(e, r) {
							return void 0 !== r[e] ? new u("0", t.number) : new u("1", t.number);
						}, "ParenthesisNode, Object": function ParenthesisNodeObject(e, t) {
							return new l(d(e.content, t));
						}, "FunctionAssignmentNode, Object": function FunctionAssignmentNodeObject(e, r) {
							return void 0 !== r[e] ? new u("0", t.number) : d(e.expr, r);
						}, "FunctionNode, Object": function FunctionNodeObject(e, r) {
							if (1 != e.args.length && a(e), void 0 !== r[e]) return new u("0", t.number);var n,
							    i,
							    o = e.args[0],
							    s = !1,
							    l = !1;switch (e.name) {case "cbrt":
									s = !0, i = new f("*", "multiply", [new u("3", t.number), new f("^", "pow", [o, new f("/", "divide", [new u("2", t.number), new u("3", t.number)])])]);
									break;case "sqrt":case "nthRoot":
									if (1 == e.args.length) {
										s = !0, i = new f("*", "multiply", [new u("2", t.number), new c("sqrt", [o])]);break;
									}return n = new f("/", "divide", [new u("1", t.number), e.args[1]]), r[n] = r[e.args[1]], d(new f("^", "pow", [o, n]), r);case "log10":
									n = new u("10", t.number);case "log":
									if (n || 1 != e.args.length) {
										if (!n && void 0 === r[e.args[1]]) return d(new f("/", "divide", [new c("log", [o]), new c("log", [e.args[1]])]), r);i = new f("*", "multiply", [o.clone(), new c("log", [n || e.args[1]])]);
									} else i = o.clone();s = !0;break;case "exp":
									i = new c("exp", [o.clone()]);break;case "sin":
									i = new c("cos", [o.clone()]);break;case "cos":
									i = new f("-", "unaryMinus", [new c("sin", [o.clone()])]);break;case "tan":
									i = new f("^", "pow", [new c("sec", [o.clone()]), new u("2", t.number)]);break;case "sec":
									i = new f("*", "multiply", [e, new c("tan", [o.clone()])]);break;case "csc":
									l = !0, i = new f("*", "multiply", [e, new c("cot", [o.clone()])]);break;case "cot":
									l = !0, i = new f("^", "pow", [new c("csc", [o.clone()]), new u("2", t.number)]);break;case "asin":
									s = !0, i = new c("sqrt", [new f("-", "subtract", [new u("1", t.number), new f("^", "pow", [o.clone(), new u("2", t.number)])])]);break;case "acos":
									s = !0, l = !0, i = new c("sqrt", [new f("-", "subtract", [new u("1", t.number), new f("^", "pow", [o.clone(), new u("2", t.number)])])]);break;case "atan":
									s = !0, i = new f("+", "add", [new f("^", "pow", [o.clone(), new u("2", t.number)]), new u("1", t.number)]);break;case "asec":
									s = !0, i = new f("*", "multiply", [new c("abs", [o.clone()]), new c("sqrt", [new f("-", "subtract", [new f("^", "pow", [o.clone(), new u("2", t.number)]), new u("1", t.number)])])]);break;case "acsc":
									s = !0, l = !0, i = new f("*", "multiply", [new c("abs", [o.clone()]), new c("sqrt", [new f("-", "subtract", [new f("^", "pow", [o.clone(), new u("2", t.number)]), new u("1", t.number)])])]);break;case "acot":
									s = !0, l = !0, i = new f("+", "add", [new f("^", "pow", [o.clone(), new u("2", t.number)]), new u("1", t.number)]);break;case "sinh":
									i = new c("cosh", [o.clone()]);break;case "cosh":
									i = new c("sinh", [o.clone()]);break;case "tanh":
									i = new f("^", "pow", [new c("sech", [o.clone()]), new u("2", t.number)]);break;case "sech":
									l = !0, i = new f("*", "multiply", [e, new c("tanh", [o.clone()])]);break;case "csch":
									l = !0, i = new f("*", "multiply", [e, new c("coth", [o.clone()])]);break;case "coth":
									l = !0, i = new f("^", "pow", [new c("csch", [o.clone()]), new u("2", t.number)]);break;case "asinh":
									s = !0, i = new c("sqrt", [new f("+", "add", [new f("^", "pow", [o.clone(), new u("2", t.number)]), new u("1", t.number)])]);break;case "acosh":
									s = !0, i = new c("sqrt", [new f("-", "subtract", [new f("^", "pow", [o.clone(), new u("2", t.number)]), new u("1", t.number)])]);break;case "atanh":
									s = !0, i = new f("-", "subtract", [new u("1", t.number), new f("^", "pow", [o.clone(), new u("2", t.number)])]);break;case "asech":
									s = !0, l = !0, i = new f("*", "multiply", [o.clone(), new c("sqrt", [new f("-", "subtract", [new u("1", t.number), new f("^", "pow", [o.clone(), new u("2", t.number)])])])]);break;case "acsch":
									s = !0, l = !0, i = new f("*", "multiply", [new c("abs", [o.clone()]), new c("sqrt", [new f("+", "add", [new f("^", "pow", [o.clone(), new u("2", t.number)]), new u("1", t.number)])])]);break;case "acoth":
									s = !0, l = !0, i = new f("-", "subtract", [new u("1", t.number), new f("^", "pow", [o.clone(), new u("2", t.number)])]);break;case "gamma":default:
									throw new Error('Function "' + e.name + '" not supported by derivative');}var p, h;s ? (p = "/", h = "divide") : (p = "*", h = "multiply");var m = d(o, r);return l && (m = new f("-", "unaryMinus", [m])), new f(p, h, [m, i]);
						}, "OperatorNode, Object": function OperatorNodeObject(e, r) {
							if (void 0 !== r[e]) return new u("0", t.number);var n = e.args[0],
							    i = e.args[1];switch (e.op) {case "+":case "-":
									return 1 == e.args.length ? new f(e.op, e.fn, [d(n, r)]) : new f(e.op, e.fn, [d(n, r), d(i, r)]);case "*":
									if (void 0 !== r[n] || void 0 !== r[i]) {
										var a = void 0 !== r[n] ? [n.clone(), d(i, r)] : [i.clone(), d(n, r)];return new f("*", "multiply", a);
									}return new f("+", "add", [new f("*", "multiply", [d(n, r), i.clone()]), new f("*", "multiply", [n.clone(), d(i, r)])]);case "/":
									return void 0 !== r[i] ? new f("/", "divide", [d(n, r), i]) : void 0 !== r[n] ? new f("*", "multiply", [new f("-", "unaryMinus", [n]), new f("/", "divide", [d(i, r), new f("^", "pow", [i.clone(), new u("2", t.number)])])]) : new f("/", "divide", [new f("-", "subtract", [new f("*", "multiply", [d(n, r), i.clone()]), new f("*", "multiply", [n.clone(), d(i, r)])]), new f("^", "pow", [i.clone(), new u("2", t.number)])]);case "^":
									if (void 0 !== r[n]) return !n.isConstantNode || "0" != n.value && "1" != n.value ? new f("*", "multiply", [e, new f("*", "multiply", [new c("log", [n.clone()]), d(i.clone(), r)])]) : new u("0", t.number);if (void 0 !== r[i]) {
										if (i.isConstantNode) {
											var o = i.value;if ("0" == o) return new u("0", t.number);if ("1" == o) return d(n, r);
										}var s = new f("^", "pow", [n.clone(), new f("-", "subtract", [i, new u("1", t.number)])]);return new f("*", "multiply", [i.clone(), new f("*", "multiply", [d(n, r), s])]);
									}return new f("*", "multiply", [new f("^", "pow", [n.clone(), i.clone()]), new f("+", "add", [new f("*", "multiply", [d(n, r), new f("/", "divide", [i.clone(), n.clone()])]), new f("*", "multiply", [d(i, r), new c("log", [n.clone()])])])]);case "%":case "mod":default:
									throw new Error('Operator "' + e.op + '" not supported by derivative');}
						} });return p;
				}t.name = "derivative", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(349), r(96), r(348), r(94), r(95), r(98), r(352), r(99)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a, o) {
					function s(e) {
						var t = p(e);return t.isNode ? t : w(t);
					}function u(e, t) {
						try {
							return b(o[e].apply(null, t));
						} catch (r) {
							return t = t.map(function (e) {
								return e.valueOf();
							}), b(o[e].apply(null, t));
						}
					}function c(e) {
						return e < 0 ? new x("-", "unaryMinus", [new y(-e)]) : new y(e);
					}function f(e) {
						var t,
						    r = e.s * e.n;return t = r < 0 ? new x("-", "unaryMinus", [new y(-r)]) : new y(r), 1 === e.d ? t : new x("/", "divide", [t, new y(e.d)]);
					}function l(e, t, r) {
						return t.reduce(function (t, n) {
							if (t.isNode || n.isNode) t.isNode ? n.isNode || (n = w(n)) : t = w(t);else {
								try {
									return u(e, [t, n]);
								} catch (e) {}t = w(t), n = w(n);
							}return r([t, n]);
						});
					}function p(e) {
						switch (e.type) {case "SymbolNode":
								return e;case "ConstantNode":
								return b(e.value);case "FunctionNode":
								if (o[e.name] && o[e.name].rawArgs) return e;case "OperatorNode":
								var t,
								    r,
								    n = e.fn.toString(),
								    i = v(e);if (1 === e.args.length) t = [p(e.args[0])], r = t[0].isNode ? i(t) : u(n, t);else if (d(e)) {
									if (t = g(e), t = t.map(p), m(n)) {
										for (var a = [], s = [], c = 0; c < t.length; c++) {
											t[c].isNode ? s.push(t[c]) : a.push(t[c]);
										}a.length > 1 ? (r = l(n, a, i), s.unshift(r), r = l(n, s, i)) : r = l(n, t, i);
									} else r = l(n, t, i);
								} else t = e.args.map(p), r = l(n, t, i);return r;case "ParenthesisNode":
								return p(e.content);case "AccessorNode":case "ArrayNode":case "AssignmentNode":case "BlockNode":case "FunctionAssignmentNode":case "IndexNode":case "ObjectNode":case "RangeNode":case "UpdateNode":case "ConditionalNode":default:
								throw "Unimplemented node type in simplifyConstant: " + e.type;}
					}var h = n(r(97)),
					    m = h.isCommutative,
					    d = h.isAssociative,
					    g = h.allChildren,
					    v = h.createMakeNodeFunction,
					    y = o.expression.node.ConstantNode,
					    x = o.expression.node.OperatorNode,
					    w = a({ Fraction: f, number: c, BigNumber: function BigNumber(e) {
							return c(e._toNumber());
						}, Complex: function Complex(e) {
							throw "Cannot convert Complex number to Node";
						} }),
					    b = a({ Fraction: function Fraction(e) {
							return e;
						}, BigNumber: function BigNumber(e) {
							return e.decimalPlaces() <= 15 ? o.fraction(e.toNumber()) : e.toNumber();
						}, number: function number(e) {
							return i(e) <= 15 ? o.fraction(e) : e;
						}, Complex: function Complex(e) {
							return 0 !== e.im ? e : i(e.re) <= 15 ? o.fraction(e.re) : e.re;
						} });return s;
				}var i = r(2).digits;t.math = !0, t.name = "simplifyConstant", t.path = "algebra.simplify", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(0)),
					    s = n(r(94)),
					    u = n(r(95)),
					    c = n(r(358)),
					    f = n(r(67)),
					    l = n(r(99)),
					    p = n(r(98)),
					    h = a("lusolve", { "Array, Array | Matrix": function ArrayArrayMatrix(e, t) {
							e = o(e);var r = s(e),
							    n = d(r.L, r.U, r.p, null, t);return n.valueOf();
						}, "DenseMatrix, Array | Matrix": function DenseMatrixArrayMatrix(e, t) {
							var r = s(e);return d(r.L, r.U, r.p, null, t);
						}, "SparseMatrix, Array | Matrix": function SparseMatrixArrayMatrix(e, t) {
							var r = s(e);return d(r.L, r.U, r.p, null, t);
						}, "SparseMatrix, Array | Matrix, number, number": function SparseMatrixArrayMatrixNumberNumber(e, t, r, n) {
							var i = u(e, r, n);return d(i.L, i.U, i.p, i.q, t);
						}, "Object, Array | Matrix": function ObjectArrayMatrix(e, t) {
							return d(e.L, e.U, e.p, e.q, t);
						} }),
					    m = function m(e) {
						if (e && e.isMatrix === !0) return e;if (i(e)) return o(e);throw new TypeError("Invalid Matrix LU decomposition");
					},
					    d = function d(e, t, r, n, i) {
						e = m(e), t = m(t), i = f(e, i, !1), r && (i._data = c(r, i._data));var a = p(e, i),
						    o = l(t, a);return n && (o._data = c(n, o._data)), o;
					};return h;
				}var i = Array.isArray;t.name = "lusolve", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					var i = n(r(68)),
					    a = n(r(357)),
					    o = n(r(102)),
					    s = n(r(17)),
					    u = n(r(11)),
					    c = n(r(56)),
					    f = function f(e, t) {
						if (!t || e <= 0 || e > 3) return null;var r = t._size,
						    n = r[0],
						    s = r[1],
						    u = 0,
						    c = Math.max(16, 10 * Math.sqrt(s));c = Math.min(s - 2, c);var f = l(e, t, n, s, c);a(f, d, null);for (var g, v, y, x, w, b, N, E, M, A, O, T, _, S, C, z, k = f._index, B = f._ptr, I = B[s], P = [], R = [], U = 0, q = s + 1, j = 2 * (s + 1), L = 3 * (s + 1), F = 4 * (s + 1), D = 5 * (s + 1), $ = 6 * (s + 1), G = 7 * (s + 1), H = P, V = p(s, B, R, U, L, H, j, G, q, $, F, D), Z = h(s, B, R, D, F, $, c, q, L, H, j), W = 0; Z < s;) {
							for (y = -1; W < s && (y = R[L + W]) == -1; W++) {}R[j + y] != -1 && (H[R[j + y]] = -1), R[L + W] = R[j + y];var Y = R[F + y],
							    X = R[q + y];Z += X;var J = 0;R[q + y] = -X;var Q = B[y],
							    K = 0 === Y ? Q : I,
							    ee = K;for (x = 1; x <= Y + 1; x++) {
								for (x > Y ? (b = y, N = Q, E = R[U + y] - Y) : (b = k[Q++], N = B[b], E = R[U + b]), w = 1; w <= E; w++) {
									g = k[N++], (M = R[q + g]) <= 0 || (J += M, R[q + g] = -M, k[ee++] = g, R[j + g] != -1 && (H[R[j + g]] = H[g]), H[g] != -1 ? R[j + H[g]] = R[j + g] : R[L + R[D + g]] = R[j + g]);
								}b != y && (B[b] = i(y), R[$ + b] = 0);
							}for (0 !== Y && (I = ee), R[D + y] = J, B[y] = K, R[U + y] = ee - K, R[F + y] = -2, V = m(V, u, R, $, s), A = K; A < ee; A++) {
								if (g = k[A], !((O = R[F + g]) <= 0)) {
									M = -R[q + g];var te = V - M;for (Q = B[g], T = B[g] + O - 1; Q <= T; Q++) {
										b = k[Q], R[$ + b] >= V ? R[$ + b] -= M : 0 !== R[$ + b] && (R[$ + b] = R[D + b] + te);
									}
								}
							}for (A = K; A < ee; A++) {
								for (g = k[A], T = B[g], _ = T + R[F + g] - 1, S = T, C = 0, z = 0, Q = T; Q <= _; Q++) {
									if (b = k[Q], 0 !== R[$ + b]) {
										var re = R[$ + b] - V;re > 0 ? (z += re, k[S++] = b, C += b) : (B[b] = i(y), R[$ + b] = 0);
									}
								}R[F + g] = S - T + 1;var ne = S,
								    ie = T + R[U + g];for (Q = _ + 1; Q < ie; Q++) {
									v = k[Q];var ae = R[q + v];ae <= 0 || (z += ae, k[S++] = v, C += v);
								}0 === z ? (B[g] = i(y), M = -R[q + g], J -= M, X += M, Z += M, R[q + g] = 0, R[F + g] = -1) : (R[D + g] = Math.min(R[D + g], z), k[S] = k[ne], k[ne] = k[T], k[T] = y, R[U + g] = S - T + 1, C = (C < 0 ? -C : C) % s, R[j + g] = R[G + C], R[G + C] = g, H[g] = C);
							}for (R[D + y] = J, u = Math.max(u, J), V = m(V + u, u, R, $, s), A = K; A < ee; A++) {
								if (g = k[A], !(R[q + g] >= 0)) for (C = H[g], g = R[G + C], R[G + C] = -1; g != -1 && R[j + g] != -1; g = R[j + g], V++) {
									for (E = R[U + g], O = R[F + g], Q = B[g] + 1; Q <= B[g] + E - 1; Q++) {
										R[$ + k[Q]] = V;
									}var oe = g;for (v = R[j + g]; v != -1;) {
										var se = R[U + v] === E && R[F + v] === O;for (Q = B[v] + 1; se && Q <= B[v] + E - 1; Q++) {
											R[$ + k[Q]] != V && (se = 0);
										}se ? (B[v] = i(g), R[q + g] += R[q + v], R[q + v] = 0, R[F + v] = -1, v = R[j + v], R[j + oe] = v) : (oe = v, v = R[j + v]);
									}
								}
							}for (Q = K, A = K; A < ee; A++) {
								g = k[A], (M = -R[q + g]) <= 0 || (R[q + g] = M, z = R[D + g] + J - M, z = Math.min(z, s - Z - M), R[L + z] != -1 && (H[R[L + z]] = g), R[j + g] = R[L + z], H[g] = -1, R[L + z] = g, W = Math.min(W, z), R[D + g] = z, k[Q++] = g);
							}R[q + y] = X, 0 === (R[U + y] = Q - K) && (B[y] = -1, R[$ + y] = 0), 0 !== Y && (I = Q);
						}for (g = 0; g < s; g++) {
							B[g] = i(B[g]);
						}for (v = 0; v <= s; v++) {
							R[L + v] = -1;
						}for (v = s; v >= 0; v--) {
							R[q + v] > 0 || (R[j + v] = R[L + B[v]], R[L + B[v]] = v);
						}for (b = s; b >= 0; b--) {
							R[q + b] <= 0 || B[b] != -1 && (R[j + b] = R[L + B[b]], R[L + B[b]] = b);
						}for (y = 0, g = 0; g <= s; g++) {
							B[g] == -1 && (y = o(g, y, R, L, j, P, $));
						}return P.splice(P.length - 1, 1), P;
					},
					    l = function l(e, t, r, n, i) {
						var a = c(t);if (1 === e && n === r) return s(t, a);if (2 == e) {
							for (var o = a._index, f = a._ptr, l = 0, p = 0; p < r; p++) {
								var h = f[p];if (f[p] = l, !(f[p + 1] - h > i)) for (var m = f[p + 1]; h < m; h++) {
									o[l++] = o[h];
								}
							}return f[r] = l, t = c(a), u(a, t);
						}return u(a, t);
					},
					    p = function p(e, t, r, n, i, a, o, s, u, c, f, l) {
						for (var p = 0; p < e; p++) {
							r[n + p] = t[p + 1] - t[p];
						}r[n + e] = 0;for (var h = 0; h <= e; h++) {
							r[i + h] = -1, a[h] = -1, r[o + h] = -1, r[s + h] = -1, r[u + h] = 1, r[c + h] = 1, r[f + h] = 0, r[l + h] = r[n + h];
						}var d = m(0, 0, r, c, e);return r[f + e] = -2, t[e] = -1, r[c + e] = 0, d;
					},
					    h = function h(e, t, r, n, a, o, s, u, c, f, l) {
						for (var p = 0, h = 0; h < e; h++) {
							var m = r[n + h];if (0 === m) r[a + h] = -2, p++, t[h] = -1, r[o + h] = 0;else if (m > s) r[u + h] = 0, r[a + h] = -1, p++, t[h] = i(e), r[u + e]++;else {
								var d = r[c + m];d != -1 && (f[d] = h), r[l + h] = r[c + m], r[c + m] = h;
							}
						}return p;
					},
					    m = function m(e, t, r, n, i) {
						if (e < 2 || e + t < 0) {
							for (var a = 0; a < i; a++) {
								0 !== r[n + a] && (r[n + a] = 1);
							}e = 2;
						}return e;
					},
					    d = function d(e, t) {
						return e != t;
					};return f;
				}t.name = "cs_amd", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					var i = n(r(56)),
					    a = n(r(359)),
					    o = function o(e, t, r, n) {
						if (!e || !t || !r) return null;var o,
						    s,
						    u,
						    c,
						    f,
						    l,
						    p,
						    h = e._size,
						    m = h[0],
						    d = h[1],
						    g = 4 * d + (n ? d + m + 1 : 0),
						    v = [],
						    y = 0,
						    x = d,
						    w = 2 * d,
						    b = 3 * d,
						    N = 4 * d,
						    E = 5 * d + 1;for (u = 0; u < g; u++) {
							v[u] = -1;
						}var M = [],
						    A = i(e),
						    O = A._index,
						    T = A._ptr;for (u = 0; u < d; u++) {
							for (s = r[u], M[s] = v[b + s] == -1 ? 1 : 0; s != -1 && v[b + s] == -1; s = t[s]) {
								v[b + s] = u;
							}
						}if (n) {
							for (u = 0; u < d; u++) {
								v[r[u]] = u;
							}for (o = 0; o < m; o++) {
								for (u = d, l = T[o], p = T[o + 1], f = l; f < p; f++) {
									u = Math.min(u, v[O[f]]);
								}v[E + o] = v[N + u], v[N + u] = o;
							}
						}for (o = 0; o < d; o++) {
							v[y + o] = o;
						}for (u = 0; u < d; u++) {
							for (s = r[u], t[s] != -1 && M[t[s]]--, c = n ? v[N + u] : s; c != -1; c = n ? v[E + c] : -1) {
								for (f = T[c]; f < T[c + 1]; f++) {
									o = O[f];var _ = a(o, s, v, b, x, w, y);_.jleaf >= 1 && M[s]++, 2 == _.jleaf && M[_.q]--;
								}
							}t[s] != -1 && (v[y + s] = t[s]);
						}for (s = 0; s < d; s++) {
							t[s] != -1 && (M[t[s]] += M[s]);
						}return M;
					};return o;
				}t.name = "cs_counts", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					var i = n(r(101)),
					    a = n(r(100)),
					    o = n(r(366)),
					    s = function s(e, t, r, n, _s) {
						var u,
						    c,
						    f,
						    l = t._index,
						    p = t._ptr,
						    h = t._size,
						    m = h[1],
						    d = 0;for (n[0] = e; d >= 0;) {
							e = n[d];var g = _s ? _s[e] : e;i(p, e) || (a(p, e), n[m + d] = g < 0 ? 0 : o(p[g]));var v = 1;for (c = n[m + d], f = g < 0 ? 0 : o(p[g + 1]); c < f; c++) {
								if (u = l[c], !i(p, u)) {
									n[m + d] = c, n[++d] = u, v = 0;break;
								}
							}v && (d--, n[--r] = e);
						}return r;
					};return s;
				}t.name = "cs_dfs", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n() {
					var e = function e(_e5, t) {
						if (!_e5) return null;var r,
						    n,
						    i = _e5._index,
						    a = _e5._ptr,
						    o = _e5._size,
						    s = o[0],
						    u = o[1],
						    c = [],
						    f = [],
						    l = 0,
						    p = u;if (t) for (r = 0; r < s; r++) {
							f[p + r] = -1;
						}for (var h = 0; h < u; h++) {
							c[h] = -1, f[l + h] = -1;for (var m = a[h], d = a[h + 1], g = m; g < d; g++) {
								var v = i[g];for (r = t ? f[p + v] : v; r != -1 && r < h; r = n) {
									n = f[l + r], f[l + r] = h, n == -1 && (c[r] = h);
								}t && (f[p + v] = h);
							}
						}return c;
					};return e;
				}t.name = "cs_etree", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n() {
					var e = function e(_e6, t, r) {
						for (var n = _e6._values, i = _e6._index, a = _e6._ptr, o = _e6._size, s = o[1], u = 0, c = 0; c < s; c++) {
							var f = a[c];for (a[c] = u; f < a[c + 1]; f++) {
								t(i[f], c, n ? n[f] : 1, r) && (i[u] = i[f], n && (n[u] = n[f]), u++);
							}
						}return a[s] = u, i.splice(u, i.length - u), n && n.splice(u, n.length - u), u;
					};return e;
				}t.name = "cs_fkeep", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n() {
					var e = function e(_e7, t, r) {
						var n,
						    r = t.length,
						    i = [];if (_e7) for (n = 0; n < r; n++) {
							i[_e7[n]] = t[n];
						} else for (n = 0; n < r; n++) {
							i[n] = t[n];
						}return i;
					};return e;
				}t.name = "cs_ipvec", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n() {
					var e = function e(_e8, t, r, n, i, a, o) {
						var s,
						    u,
						    c,
						    f,
						    l = 0;if (_e8 <= t || r[n + t] <= r[i + _e8]) return -1;if (r[i + _e8] = r[n + t], c = r[a + _e8], r[a + _e8] = t, c === -1) l = 1, f = _e8;else {
							for (l = 2, f = c; f != r[o + f]; f = r[o + f]) {}for (s = c; s != f; s = u) {
								u = r[o + s], r[o + s] = f;
							}
						}return { jleaf: l, q: f };
					};return e;
				}t.name = "cs_leaf", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					var i = n(r(26)),
					    a = n(r(18)),
					    o = n(r(11)),
					    s = n(r(28)),
					    u = n(r(118)),
					    c = n(r(364)),
					    f = e.SparseMatrix,
					    l = function l(e, t, r) {
						if (!e) return null;var n,
						    l = e._size,
						    p = l[1],
						    h = 100,
						    m = 100;t && (n = t.q, h = t.lnz || h, m = t.unz || m);var d,
						    g,
						    v = [],
						    y = [],
						    x = [],
						    w = new f({ values: v, index: y, ptr: x, size: [p, p] }),
						    b = [],
						    N = [],
						    E = [],
						    M = new f({ values: b, index: N, ptr: E, size: [p, p] }),
						    A = [],
						    O = [],
						    T = [];for (d = 0; d < p; d++) {
							O[d] = 0, A[d] = -1, x[d + 1] = 0;
						}h = 0, m = 0;for (var _ = 0; _ < p; _++) {
							x[_] = h, E[_] = m;var S = n ? n[_] : _,
							    C = c(w, e, S, T, O, A, 1),
							    z = -1,
							    k = -1;for (g = C; g < p; g++) {
								if (d = T[g], A[d] < 0) {
									var B = i(O[d]);s(B, k) && (k = B, z = d);
								} else N[m] = A[d], b[m++] = O[d];
							}if (z == -1 || k <= 0) return null;A[S] < 0 && u(i(O[S]), o(k, r)) && (z = S);var I = O[z];for (N[m] = _, b[m++] = I, A[z] = _, y[h] = z, v[h++] = 1, g = C; g < p; g++) {
								d = T[g], A[d] < 0 && (y[h] = d, v[h++] = a(O[d], I)), O[d] = 0;
							}
						}for (x[p] = h, E[p] = m, g = 0; g < h; g++) {
							y[g] = A[y[g]];
						}return v.splice(h, v.length - h), y.splice(h, y.length - h), b.splice(m, b.length - m), N.splice(m, N.length - m), { L: w, U: M, pinv: A };
					};return l;
				}t.name = "cs_lu", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e) {
					var t = e.SparseMatrix,
					    r = function r(e, _r3, n, i) {
						for (var a = e._values, o = e._index, s = e._ptr, u = e._size, c = e._datatype, f = u[0], l = u[1], p = i && e._values ? [] : null, h = [], m = [], d = 0, g = 0; g < l; g++) {
							m[g] = d;for (var v = n ? n[g] : g, y = s[v], x = s[v + 1], w = y; w < x; w++) {
								var b = _r3 ? _r3[o[w]] : o[w];h[d] = b, p && (p[d] = a[w]), d++;
							}
						}return m[l] = d, new t({ values: p, index: h, ptr: m, size: [f, l], datatype: c });
					};return r;
				}t.name = "cs_permute", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					var i = n(r(102)),
					    a = function a(e, t) {
						if (!e) return null;var r,
						    n = 0,
						    a = [],
						    o = [],
						    s = 0,
						    u = t,
						    c = 2 * t;for (r = 0; r < t; r++) {
							o[s + r] = -1;
						}for (r = t - 1; r >= 0; r--) {
							e[r] != -1 && (o[u + r] = o[s + e[r]], o[s + e[r]] = r);
						}for (r = 0; r < t; r++) {
							e[r] == -1 && (n = i(r, n, o, s, u, a, c));
						}return a;
					};return a;
				}t.name = "cs_post", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					var i = n(r(355)),
					    a = n(r(101)),
					    o = n(r(100)),
					    s = function s(e, t, r, n, _s2) {
						var u,
						    c,
						    f,
						    l = e._ptr,
						    p = e._size,
						    h = t._index,
						    m = t._ptr,
						    d = p[1],
						    g = d;for (c = m[r], f = m[r + 1], u = c; u < f; u++) {
							var v = h[u];a(l, v) || (g = i(v, e, g, n, _s2));
						}for (u = g; u < d; u++) {
							o(l, n[u]);
						}return g;
					};return s;
				}t.name = "cs_reach", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					var i = n(r(18)),
					    a = n(r(11)),
					    o = n(r(20)),
					    s = n(r(363)),
					    u = function u(e, t, r, n, _u, c, f) {
						var l,
						    p,
						    h,
						    m,
						    d = e._values,
						    g = e._index,
						    v = e._ptr,
						    y = e._size,
						    x = y[1],
						    w = t._values,
						    b = t._index,
						    N = t._ptr,
						    E = s(e, t, r, n, c);for (l = E; l < x; l++) {
							_u[n[l]] = 0;
						}for (p = N[r], h = N[r + 1], l = p; l < h; l++) {
							_u[b[l]] = w[l];
						}for (var M = E; M < x; M++) {
							var A = n[M],
							    O = c ? c[A] : A;if (!(O < 0)) for (p = v[O], h = v[O + 1], _u[A] = i(_u[A], d[f ? p : h - 1]), l = f ? p + 1 : p, m = f ? h : h - 1; l < m; l++) {
								var T = g[l];_u[T] = o(_u[T], a(d[l], _u[A]));
							}
						}return E;
					};return u;
				}t.name = "cs_spsolve", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					var i = n(r(353)),
					    a = n(r(361)),
					    o = n(r(356)),
					    s = n(r(362)),
					    u = n(r(354)),
					    c = function c(e, t, r) {
						var n,
						    c = t._ptr,
						    l = t._size,
						    p = l[1],
						    h = {};if (h.q = i(e, t), e && !h.q) return null;if (r) {
							var m = e ? a(t, null, h.q, 0) : t;h.parent = o(m, 1);var d = s(h.parent, p);if (h.cp = u(m, h.parent, d, 1), m && h.parent && h.cp && f(m, h)) for (h.unz = 0, n = 0; n < p; n++) {
								h.unz += h.cp[n];
							}
						} else h.unz = 4 * c[p] + p, h.lnz = h.unz;return h;
					},
					    f = function f(e, t) {
						var r = e._ptr,
						    n = e._index,
						    i = e._size,
						    a = i[0],
						    o = i[1];t.pinv = [], t.leftmost = [];var s,
						    u,
						    c,
						    f,
						    l,
						    p = t.parent,
						    h = t.pinv,
						    m = t.leftmost,
						    d = [],
						    g = 0,
						    v = a,
						    y = a + o,
						    x = a + 2 * o;for (u = 0; u < o; u++) {
							d[v + u] = -1, d[y + u] = -1, d[x + u] = 0;
						}for (s = 0; s < a; s++) {
							m[s] = -1;
						}for (u = o - 1; u >= 0; u--) {
							for (f = r[u], l = r[u + 1], c = f; c < l; c++) {
								m[n[c]] = u;
							}
						}for (s = a - 1; s >= 0; s--) {
							h[s] = -1, u = m[s], u != -1 && (0 === d[x + u]++ && (d[y + u] = s), d[g + s] = d[v + u], d[v + u] = s);
						}for (t.lnz = 0, t.m2 = a, u = 0; u < o; u++) {
							if (s = d[v + u], t.lnz++, s < 0 && (s = t.m2++), h[s] = u, !(--x[u] <= 0)) {
								t.lnz += d[x + u];var w = p[u];w != -1 && (0 === d[x + w] && (d[y + w] = d[y + u]), d[g + d[y + u]] = d[v + w], d[v + w] = d[g + s], d[x + w] += d[x + u]);
							}
						}for (s = 0; s < a; s++) {
							h[s] < 0 && (h[s] = u++);
						}return !0;
					};return c;
				}t.name = "cs_sqr", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					var i = n(r(68)),
					    a = function a(e) {
						return e < 0 ? i(e) : e;
					};return a;
				}t.name = "cs_unflip", t.path = "sparse", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(r, n) {
						var i = r.arg() / 3,
						    o = r.abs(),
						    s = new e.Complex(a(o), 0).mul(new e.Complex(0, i).exp());if (n) {
							var u = [s, new e.Complex(a(o), 0).mul(new e.Complex(0, i + 2 * Math.PI / 3).exp()), new e.Complex(a(o), 0).mul(new e.Complex(0, i - 2 * Math.PI / 3).exp())];return "Array" === t.matrix ? u : l(u);
						}return s;
					}function u(t) {
						if (t.value && t.value.isComplex) {
							var r = t.clone();return r.value = 1, r = r.pow(1 / 3), r.value = s(t.value), r;
						}var n = f(t.value);n && (t.value = c(t.value));var i;i = t.value && t.value.isBigNumber ? new e.BigNumber(1).div(3) : t.value && t.value.isFraction ? new e.Fraction(1, 3) : 1 / 3;var r = t.pow(i);return n && (r.value = c(r.value)), r;
					}var c = n(r(32)),
					    f = n(r(50)),
					    l = n(r(0)),
					    p = o("cbrt", { number: a, Complex: s, "Complex, boolean": s, BigNumber: function BigNumber(e) {
							return e.cbrt();
						}, Unit: u, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, p, !0);
						} });return p.toTex = { 1: "\\sqrt[3]{${args[0]}}" }, p;
				}var i = r(1),
				    a = Math.cbrt || function (e) {
					if (0 === e) return e;var t,
					    r = e < 0;return r && (e = -e), isFinite(e) ? (t = Math.exp(Math.log(e) / 3), t = (e / (t * t) + 2 * t) / 3) : t = e, r ? -t : t;
				};t.name = "cbrt", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("ceil", { number: Math.ceil, Complex: function Complex(e) {
							return e.ceil();
						}, BigNumber: function BigNumber(e) {
							return e.ceil();
						}, Fraction: function Fraction(e) {
							return e.ceil();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a, !0);
						} });return a.toTex = { 1: "\\left\\lceil${args[0]}\\right\\rceil" }, a;
				}var i = r(1);t.name = "ceil", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("cube", { number: function number(e) {
							return e * e * e;
						}, Complex: function Complex(e) {
							return e.mul(e).mul(e);
						}, BigNumber: function BigNumber(e) {
							return e.times(e).times(e);
						}, Fraction: function Fraction(e) {
							return e.pow(3);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a, !0);
						}, Unit: function Unit(e) {
							return e.pow(3);
						} });return a.toTex = { 1: "\\left(${args[0]}\\right)^3" }, a;
				}var i = r(1);t.name = "cube", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(0)),
					    o = n(r(22)),
					    s = r(3),
					    u = n(r(23)),
					    c = n(r(134)),
					    f = n(r(15)),
					    l = n(r(8)),
					    p = n(r(4)),
					    h = i("dotMultiply", { "any, any": o, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = c(e, t, o, !1);break;default:
											r = u(t, e, o, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = u(e, t, o, !1);break;default:
											r = l(e, t, o);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return h(a(e), a(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return h(a(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return h(e, a(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = f(e, t, o, !1);break;default:
									r = p(e, t, o, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = f(t, e, o, !0);break;default:
									r = p(t, e, o, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return p(a(e), t, o, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return p(a(t), e, o, !0).valueOf();
						} });return h.toTex = { 2: "\\left(${args[0]}" + s.operators.dotMultiply + "${args[1]}\\right)" }, h;
				}t.name = "dotMultiply", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(0)),
					    o = n(r(39)),
					    s = r(3),
					    u = n(r(14)),
					    c = n(r(24)),
					    f = n(r(15)),
					    l = n(r(16)),
					    p = n(r(8)),
					    h = n(r(4)),
					    m = i("dotPow", { "any, any": o, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = c(e, t, o, !1);break;default:
											r = u(t, e, o, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = u(e, t, o, !1);break;default:
											r = p(e, t, o);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return m(a(e), a(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return m(a(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return m(e, a(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = f(e, t, m, !1);break;default:
									r = h(e, t, m, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = l(t, e, m, !0);break;default:
									r = h(t, e, m, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return h(a(e), t, m, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return h(a(t), e, m, !0).valueOf();
						} });return m.toTex = { 2: "\\left(${args[0]}" + s.operators.dotPow + "${args[1]}\\right)" }, m;
				}t.name = "dotPow", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("exp", { number: Math.exp, Complex: function Complex(e) {
							return e.exp();
						}, BigNumber: function BigNumber(e) {
							return e.exp();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\exp\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "exp", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("floor", { number: Math.floor, Complex: function Complex(e) {
							return e.floor();
						}, BigNumber: function BigNumber(e) {
							return e.floor();
						}, Fraction: function Fraction(e) {
							return e.floor();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a, !0);
						} });return a.toTex = { 1: "\\left\\lfloor${args[0]}\\right\\rfloor" }, a;
				}var i = r(1);t.name = "floor", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(t, r) {
						if (!t.isInt() || !r.isInt()) throw new Error("Parameters in function gcd must be integer numbers");for (var n = new e.BigNumber(0); !r.isZero();) {
							var i = t.mod(r);t = r, r = i;
						}return t.lt(n) ? t.neg() : t;
					}var s = n(r(0)),
					    u = n(r(29)),
					    c = n(r(76)),
					    f = n(r(34)),
					    l = n(r(8)),
					    p = n(r(4)),
					    h = a("gcd", { "number, number": i, "BigNumber, BigNumber": o, "Fraction, Fraction": function FractionFraction(e, t) {
							return e.gcd(t);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = c(e, t, h);break;default:
											r = u(t, e, h, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = u(e, t, h, !1);break;default:
											r = l(e, t, h);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return h(s(e), s(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return h(s(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return h(e, s(t));
						}, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = f(e, t, h, !1);break;default:
									r = p(e, t, h, !1);}return r;
						}, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = f(t, e, h, !0);break;default:
									r = p(t, e, h, !0);}return r;
						}, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
							return p(s(e), t, h, !1).valueOf();
						}, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
							return p(s(t), e, h, !0).valueOf();
						}, "Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber": function ArrayMatrixNumberBigNumberArrayMatrixNumberBigNumberArrayMatrixNumberBigNumber(e, t, r) {
							for (var n = h(e, t), i = 0; i < r.length; i++) {
								n = h(n, r[i]);
							}return n;
						} });return h.toTex = "\\gcd\\left(${args}\\right)", h;
				}function i(e, t) {
					if (!a(e) || !a(t)) throw new Error("Parameters in function gcd must be integer numbers");for (var r; 0 != t;) {
						r = e % t, e = t, t = r;
					}return e < 0 ? -e : e;
				}var a = r(2).isInteger;t.name = "gcd", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e) {
						for (var t = 0, r = 0, n = 0; n < e.length; n++) {
							var i = s(e[n]);p(r, i) ? (t = f(t, f(c(r, i), c(r, i))), t = u(t, 1), r = i) : t = u(t, h(i) ? f(c(i, r), c(i, r)) : i);
						}return f(r, l(t));
					}var s = n(r(26)),
					    u = n(r(19)),
					    c = n(r(18)),
					    f = n(r(22)),
					    l = n(r(48)),
					    p = n(r(40)),
					    h = n(r(51)),
					    m = a("hypot", { "... number | BigNumber": o, Array: function Array(e) {
							return m.apply(m, i(e));
						}, Matrix: function Matrix(e) {
							return m.apply(m, i(e.toArray()));
						} });return m.toTex = "\\hypot\\left(${args}\\right)", m;
				}var i = r(7).flatten;t.name = "hypot", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(26), r(17), r(19), r(367), r(368), r(369), r(38), r(103), r(370), r(371), r(372), r(104), r(373), r(374), r(375), r(377), r(105), r(378), r(379), r(11), r(380), r(381), r(39), r(382), r(106), r(48), r(383), r(20), r(32), r(384), r(385)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(t, r) {
						if (!t.isInt() || !r.isInt()) throw new Error("Parameters in function lcm must be integer numbers");if (t.isZero() || r.isZero()) return new e.BigNumber(0);for (var n = t.times(r); !r.isZero();) {
							var i = r;r = t.mod(i), t = i;
						}return n.div(t).abs();
					}var s = n(r(0)),
					    u = n(r(23)),
					    c = n(r(60)),
					    f = n(r(15)),
					    l = n(r(8)),
					    p = n(r(4)),
					    h = a("lcm", { "number, number": i, "BigNumber, BigNumber": o, "Fraction, Fraction": function FractionFraction(e, t) {
							return e.lcm(t);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = c(e, t, h);break;default:
											r = u(t, e, h, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = u(e, t, h, !1);break;default:
											r = l(e, t, h);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return h(s(e), s(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return h(s(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return h(e, s(t));
						}, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = f(e, t, h, !1);break;default:
									r = p(e, t, h, !1);}return r;
						}, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = f(t, e, h, !0);break;default:
									r = p(t, e, h, !0);}return r;
						}, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
							return p(s(e), t, h, !1).valueOf();
						}, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
							return p(s(t), e, h, !0).valueOf();
						}, "Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber": function ArrayMatrixNumberBigNumberArrayMatrixNumberBigNumberArrayMatrixNumberBigNumber(e, t, r) {
							for (var n = h(e, t), i = 0; i < r.length; i++) {
								n = h(n, r[i]);
							}return n;
						} });return h.toTex = void 0, h;
				}function i(e, t) {
					if (!a(e) || !a(t)) throw new Error("Parameters in function lcm must be integer numbers");if (0 == e || 0 == t) return 0;for (var r, n = e * t; 0 != t;) {
						r = t, t = e % r, e = r;
					}return Math.abs(n / e);
				}var a = r(2).isInteger;t.name = "lcm", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("log10", { number: function number(r) {
							return r >= 0 || t.predictable ? a(r) : new e.Complex(r, 0).log().div(Math.LN10);
						}, Complex: function Complex(t) {
							return new e.Complex(t).log().div(Math.LN10);
						}, BigNumber: function BigNumber(r) {
							return !r.isNegative() || t.predictable ? r.log() : new e.Complex(r.toNumber(), 0).log().div(Math.LN10);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, o);
						} });return o.toTex = { 1: "\\log_{10}\\left(${args[0]}\\right)" }, o;
				}var i = r(1),
				    a = Math.log10 || function (e) {
					return Math.log(e) / Math.LN10;
				};t.name = "log10", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e, t) {
						if (t > 0) return e - t * Math.floor(e / t);if (0 === t) return e;throw new Error("Cannot calculate mod for a negative divisor");
					}var o = n(r(0)),
					    s = r(3),
					    u = n(r(23)),
					    c = n(r(14)),
					    f = n(r(59)),
					    l = n(r(15)),
					    p = n(r(16)),
					    h = n(r(8)),
					    m = n(r(4)),
					    d = i("mod", { "number, number": a, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
							return t.isZero() ? e : e.mod(t);
						}, "Fraction, Fraction": function FractionFraction(e, t) {
							return e.mod(t);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = f(e, t, d, !1);break;default:
											r = u(t, e, d, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = c(e, t, d, !1);break;default:
											r = h(e, t, d);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return d(o(e), o(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return d(o(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return d(e, o(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = l(e, t, d, !1);break;default:
									r = m(e, t, d, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = p(t, e, d, !0);break;default:
									r = m(t, e, d, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return m(o(e), t, d, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return m(o(t), e, d, !0).valueOf();
						} });return d.toTex = { 2: "\\left(${args[0]}" + s.operators.mod + "${args[1]}\\right)" }, d;
				}t.name = "mod", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e, t) {
						var r = e.size();if (1 == r.length) {
							if (t === Number.POSITIVE_INFINITY || "inf" === t) {
								var n = 0;return e.forEach(function (e) {
									var t = o(e);p(t, n) && (n = t);
								}, !0), n;
							}if (t === Number.NEGATIVE_INFINITY || "-inf" === t) {
								var i;return e.forEach(function (e) {
									var t = o(e);i && !h(t, i) || (i = t);
								}, !0), i || 0;
							}if ("fro" === t) return a(e, 2);if ("number" == typeof t && !isNaN(t)) {
								if (!l(t, 0)) {
									var m = 0;return e.forEach(function (e) {
										m = s(u(o(e), t), m);
									}, !0), u(m, 1 / t);
								}return Number.POSITIVE_INFINITY;
							}throw new Error("Unsupported parameter value");
						}if (2 == r.length) {
							if (1 === t) {
								var v = [],
								    y = 0;return e.forEach(function (e, t) {
									var r = t[1],
									    n = s(v[r] || 0, o(e));p(n, y) && (y = n), v[r] = n;
								}, !0), y;
							}if (t === Number.POSITIVE_INFINITY || "inf" === t) {
								var x = [],
								    w = 0;return e.forEach(function (e, t) {
									var r = t[0],
									    n = s(x[r] || 0, o(e));p(n, w) && (w = n), x[r] = n;
								}, !0), w;
							}if ("fro" === t) return c(d(f(g(e), e)));if (2 === t) throw new Error("Unsupported parameter value, missing implementation of matrix singular value decomposition");throw new Error("Unsupported parameter value");
						}
					}var o = n(r(26)),
					    s = n(r(17)),
					    u = n(r(39)),
					    c = n(r(48)),
					    f = n(r(11)),
					    l = n(r(10)),
					    p = n(r(28)),
					    h = n(r(40)),
					    m = n(r(0)),
					    d = n(r(116)),
					    g = n(r(56)),
					    v = i("norm", { number: Math.abs, Complex: function Complex(e) {
							return e.abs();
						}, BigNumber: function BigNumber(e) {
							return e.abs();
						}, "boolean | null": function booleanNull(e) {
							return Math.abs(e);
						}, Array: function Array(e) {
							return a(m(e), 2);
						}, Matrix: function Matrix(e) {
							return a(e, 2);
						}, "number | Complex | BigNumber | boolean | null, number | BigNumber | string": function numberComplexBigNumberBooleanNullNumberBigNumberString(e) {
							return v(e);
						}, "Array, number | BigNumber | string": function ArrayNumberBigNumberString(e, t) {
							return a(m(e), t);
						}, "Matrix, number | BigNumber | string": function MatrixNumberBigNumberString(e, t) {
							return a(e, t);
						} });return v.toTex = { 1: "\\left\\|${args[0]}\\right\\|", 2: void 0 }, v;
				}t.name = "norm", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(t, r) {
						var n = e.BigNumber.precision,
						    i = e.BigNumber.clone({ precision: n + 2 }),
						    a = new e.BigNumber(0),
						    o = new i(1),
						    s = r.isNegative();if (s && (r = r.neg()), r.isZero()) throw new Error("Root must be non-zero");if (t.isNegative() && !r.abs().mod(2).equals(1)) throw new Error("Root must be odd when a is negative.");if (t.isZero()) return s ? new i(1 / 0) : 0;if (!t.isFinite()) return s ? a : t;var u = t.abs().pow(o.div(r));return u = t.isNeg() ? u.neg() : u, new e.BigNumber((s ? o.div(u) : u).toPrecision(n));
					}var u = n(r(0)),
					    c = n(r(29)),
					    f = n(r(23)),
					    l = n(r(60)),
					    p = n(r(15)),
					    h = n(r(8)),
					    m = n(r(4)),
					    d = o("nthRoot", { number: function number(e) {
							return i(e, 2);
						}, "number, number": i, BigNumber: function BigNumber(t) {
							return s(t, new e.BigNumber(2));
						}, Complex: function Complex(e) {
							return a(e, 2);
						}, "Complex, number": a, "BigNumber, BigNumber": s, "Array | Matrix": function ArrayMatrix(e) {
							return d(e, 2);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											if (1 !== t.density()) throw new Error("Root must be non-zero");r = l(e, t, d);break;default:
											r = f(t, e, d, !0);}break;default:
									switch (t.storage()) {case "sparse":
											if (1 !== t.density()) throw new Error("Root must be non-zero");r = c(e, t, d, !1);break;default:
											r = h(e, t, d);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return d(u(e), u(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return d(u(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return d(e, u(t));
						}, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = p(e, t, d, !1);break;default:
									r = m(e, t, d, !1);}return r;
						}, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									if (1 !== t.density()) throw new Error("Root must be non-zero");r = p(t, e, d, !0);break;default:
									r = m(t, e, d, !0);}return r;
						}, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
							return d(u(e), t).valueOf();
						}, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
							return d(e, u(t)).valueOf();
						} });return d.toTex = { 2: "\\sqrt[${args[1]}]{${args[0]}}" }, d;
				}function i(e, t) {
					var r = t < 0;if (r && (t = -t), 0 === t) throw new Error("Root must be non-zero");if (e < 0 && Math.abs(t) % 2 != 1) throw new Error("Root must be odd when a is negative.");
					if (0 == e) return r ? 1 / 0 : 0;if (!isFinite(e)) return r ? 0 : e;var n = Math.pow(Math.abs(e), 1 / t);return n = e < 0 ? -n : n, r ? 1 / n : n;
				}function a(e, t) {
					if (t < 0) throw new Error("Root must be greater than zero");if (0 === t) throw new Error("Root must be non-zero");if (t % 1 !== 0) throw new Error("Root must be an integer");for (var r = e.arg(), n = e.abs(), i = [], a = Math.pow(n, 1 / t), o = 0; o < t; o++) {
						i.push({ r: a, phi: (r + 2 * Math.PI * o) / t });
					}return i;
				}t.name = "nthRoot", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var c = n(r(0)),
					    f = n(r(10)),
					    l = n(r(33)),
					    p = n(r(15)),
					    h = n(r(16)),
					    m = n(r(4)),
					    d = o("round", { number: Math.round, "number, number": function numberNumber(e, t) {
							if (!a(t)) throw new TypeError(u);if (t < 0 || t > 15) throw new Error("Number of decimals in function round must be in te range of 0-15");return i(e, t);
						}, Complex: function Complex(e) {
							return e.round();
						}, "Complex, number": function ComplexNumber(e, t) {
							if (t % 1) throw new TypeError(u);return e.round(t);
						}, "Complex, BigNumber": function ComplexBigNumber(e, t) {
							if (!t.isInteger()) throw new TypeError(u);var r = t.toNumber();return e.round(r);
						}, "number, BigNumber": function numberBigNumber(t, r) {
							if (!r.isInteger()) throw new TypeError(u);return new e.BigNumber(t).toDecimalPlaces(r.toNumber());
						}, BigNumber: function BigNumber(e) {
							return e.toDecimalPlaces(0);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
							if (!t.isInteger()) throw new TypeError(u);return e.toDecimalPlaces(t.toNumber());
						}, Fraction: function Fraction(e) {
							return e.round();
						}, "Fraction, number": function FractionNumber(e, t) {
							if (t % 1) throw new TypeError(u);return e.round(t);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return s(e, d, !0);
						}, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = p(e, t, d, !1);break;default:
									r = m(e, t, d, !1);}return r;
						}, "number | Complex | BigNumber, Matrix": function numberComplexBigNumberMatrix(e, t) {
							if (!f(e, 0)) {
								var r;switch (t.storage()) {case "sparse":
										r = h(t, e, d, !0);break;default:
										r = m(t, e, d, !0);}return r;
							}return l(t.size(), t.storage());
						}, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
							return m(c(e), t, d, !1).valueOf();
						}, "number | Complex | BigNumber, Array": function numberComplexBigNumberArray(e, t) {
							return m(c(t), e, d, !0).valueOf();
						} });return d.toTex = { 1: "\\left\\lfloor${args[0]}\\right\\rceil", 2: void 0 }, d;
				}function i(e, t) {
					return parseFloat(o(e, t));
				}var a = r(2).isInteger,
				    o = r(2).toFixed,
				    s = r(1),
				    u = "Number of decimals in function round must be an integer";t.name = "round", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("square", { number: function number(e) {
							return e * e;
						}, Complex: function Complex(e) {
							return e.mul(e);
						}, BigNumber: function BigNumber(e) {
							return e.times(e);
						}, Fraction: function Fraction(e) {
							return e.mul(e);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a, !0);
						}, Unit: function Unit(e) {
							return e.pow(2);
						} });return a.toTex = { 1: "\\left(${args[0]}\\right)^2" }, a;
				}var i = r(1);t.name = "square", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = r(3),
					    s = a("unaryPlus", { number: function number(e) {
							return e;
						}, Complex: function Complex(e) {
							return e;
						}, BigNumber: function BigNumber(e) {
							return e;
						}, Fraction: function Fraction(e) {
							return e;
						}, Unit: function Unit(e) {
							return e.clone();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, s, !0);
						}, "boolean | string | null": function booleanStringNull(r) {
							return "BigNumber" == t.number ? new e.BigNumber(+r) : +r;
						} });return s.toTex = { 1: o.operators.unaryPlus + "\\left(${args[0]}\\right)" }, s;
				}var i = r(1);t.name = "unaryPlus", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e, r) {
						var n,
						    a,
						    o,
						    s = 0,
						    c = 1,
						    f = 1,
						    l = 0;if (!i(e) || !i(r)) throw new Error("Parameters in function xgcd must be integer numbers");for (; r;) {
							a = Math.floor(e / r), o = e - a * r, n = s, s = c - a * s, c = n, n = f, f = l - a * f, l = n, e = r, r = o;
						}var p;return p = e < 0 ? [-e, -c, -l] : [e, e ? c : 0, l], "Array" === t.matrix ? p : u(p);
					}function s(r, n) {
						var i,
						    a,
						    o,
						    s = new e.BigNumber(0),
						    c = new e.BigNumber(1),
						    f = s,
						    l = c,
						    p = c,
						    h = s;if (!r.isInt() || !n.isInt()) throw new Error("Parameters in function xgcd must be integer numbers");for (; !n.isZero();) {
							a = r.div(n).floor(), o = r.mod(n), i = f, f = l.minus(a.times(f)), l = i, i = p, p = h.minus(a.times(p)), h = i, r = n, n = o;
						}var m;return m = r.lt(s) ? [r.neg(), l.neg(), h.neg()] : [r, r.isZero() ? 0 : l, h], "Array" === t.matrix ? m : u(m);
					}var u = n(r(0)),
					    c = a("xgcd", { "number, number": o, "BigNumber, BigNumber": s });return c.toTex = void 0, c;
				}var i = r(2).isInteger;t.name = "xgcd", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = r(3),
					    u = n(r(0)),
					    c = n(r(23)),
					    f = n(r(60)),
					    l = n(r(15)),
					    p = n(r(8)),
					    h = n(r(4)),
					    m = o("bitAnd", { "number, number": function numberNumber(e, t) {
							if (!i(e) || !i(t)) throw new Error("Integers expected in function bitAnd");return e & t;
						}, "BigNumber, BigNumber": a, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = f(e, t, m, !1);break;default:
											r = c(t, e, m, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = c(e, t, m, !1);break;default:
											r = p(e, t, m);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return m(u(e), u(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return m(u(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return m(e, u(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = l(e, t, m, !1);break;default:
									r = h(e, t, m, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = l(t, e, m, !0);break;default:
									r = h(t, e, m, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return h(u(e), t, m, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return h(u(t), e, m, !0).valueOf();
						} });return m.toTex = { 2: "\\left(${args[0]}" + s.operators.bitAnd + "${args[1]}\\right)" }, m;
				}var i = r(2).isInteger,
				    a = r(502);t.name = "bitAnd", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, s) {
					var u = r(3),
					    c = s("bitNot", { number: function number(e) {
							if (!o(e)) throw new Error("Integer expected in function bitNot");return ~e;
						}, BigNumber: a, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, c);
						} });return c.toTex = { 1: u.operators.bitNot + "\\left(${args[0]}\\right)" }, c;
				}var i = r(1),
				    a = r(79),
				    o = r(2).isInteger;t.name = "bitNot", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = r(3),
					    u = n(r(0)),
					    c = n(r(29)),
					    f = n(r(76)),
					    l = n(r(34)),
					    p = n(r(8)),
					    h = n(r(4)),
					    m = o("bitOr", { "number, number": function numberNumber(e, t) {
							if (!i(e) || !i(t)) throw new Error("Integers expected in function bitOr");return e | t;
						}, "BigNumber, BigNumber": a, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = f(e, t, m);break;default:
											r = c(t, e, m, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = c(e, t, m, !1);break;default:
											r = p(e, t, m);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return m(u(e), u(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return m(u(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return m(e, u(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = l(e, t, m, !1);break;default:
									r = h(e, t, m, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = l(t, e, m, !0);break;default:
									r = h(t, e, m, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return h(u(e), t, m, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return h(u(t), e, m, !0).valueOf();
						} });return m.toTex = { 2: "\\left(${args[0]}" + s.operators.bitOr + "${args[1]}\\right)" }, m;
				}var i = r(2).isInteger,
				    a = r(503);t.name = "bitOr", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = r(3),
					    u = n(r(0)),
					    c = n(r(14)),
					    f = n(r(24)),
					    l = n(r(16)),
					    p = n(r(8)),
					    h = n(r(4)),
					    m = o("bitXor", { "number, number": function numberNumber(e, t) {
							if (!i(e) || !i(t)) throw new Error("Integers expected in function bitXor");return e ^ t;
						}, "BigNumber, BigNumber": a, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = f(e, t, m);break;default:
											r = c(t, e, m, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = c(e, t, m, !1);break;default:
											r = p(e, t, m);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return m(u(e), u(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return m(u(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return m(e, u(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = l(e, t, m, !1);break;default:
									r = h(e, t, m, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = l(t, e, m, !0);break;default:
									r = h(t, e, m, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return h(u(e), t, m, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return h(u(t), e, m, !0).valueOf();
						} });return m.toTex = { 2: "\\left(${args[0]}" + s.operators.bitXor + "${args[1]}\\right)" }, m;
				}var i = r(2).isInteger,
				    a = r(504);t.name = "bitXor", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(386), r(387), r(388), r(389), r(391), r(392), r(393)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = r(3),
					    u = n(r(0)),
					    c = n(r(10)),
					    f = n(r(33)),
					    l = n(r(29)),
					    p = n(r(23)),
					    h = n(r(77)),
					    m = n(r(34)),
					    d = n(r(15)),
					    g = n(r(8)),
					    v = n(r(4)),
					    y = o("leftShift", { "number, number": function numberNumber(e, t) {
							if (!i(e) || !i(t)) throw new Error("Integers expected in function leftShift");return e << t;
						}, "BigNumber, BigNumber": a, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = h(e, t, y, !1);break;default:
											r = p(t, e, y, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = l(e, t, y, !1);break;default:
											r = g(e, t, y);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return y(u(e), u(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return y(u(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return y(e, u(t));
						}, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
							if (!c(t, 0)) {
								var r;switch (e.storage()) {case "sparse":
										r = d(e, t, y, !1);break;default:
										r = v(e, t, y, !1);}return r;
							}return e.clone();
						}, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
							if (!c(e, 0)) {
								var r;switch (t.storage()) {case "sparse":
										r = m(t, e, y, !0);break;default:
										r = v(t, e, y, !0);}return r;
							}return f(t.size(), t.storage());
						}, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
							return y(u(e), t).valueOf();
						}, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
							return y(e, u(t)).valueOf();
						} });return y.toTex = { 2: "\\left(${args[0]}" + s.operators.leftShift + "${args[1]}\\right)" }, y;
				}var i = r(2).isInteger,
				    a = r(506);t.name = "leftShift", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = r(3),
					    u = n(r(0)),
					    c = n(r(10)),
					    f = n(r(33)),
					    l = n(r(29)),
					    p = n(r(23)),
					    h = n(r(77)),
					    m = n(r(34)),
					    d = n(r(15)),
					    g = n(r(8)),
					    v = n(r(4)),
					    y = o("rightArithShift", { "number, number": function numberNumber(e, t) {
							if (!i(e) || !i(t)) throw new Error("Integers expected in function rightArithShift");return e >> t;
						}, "BigNumber, BigNumber": a, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = h(e, t, y, !1);break;default:
											r = p(t, e, y, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = l(e, t, y, !1);break;default:
											r = g(e, t, y);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return y(u(e), u(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return y(u(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return y(e, u(t));
						}, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
							if (!c(t, 0)) {
								var r;switch (e.storage()) {case "sparse":
										r = d(e, t, y, !1);break;default:
										r = v(e, t, y, !1);}return r;
							}return e.clone();
						}, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
							if (!c(e, 0)) {
								var r;switch (t.storage()) {case "sparse":
										r = m(t, e, y, !0);break;default:
										r = v(t, e, y, !0);}return r;
							}return f(t.size(), t.storage());
						}, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
							return y(u(e), t).valueOf();
						}, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
							return y(e, u(t)).valueOf();
						} });return y.toTex = { 2: "\\left(${args[0]}" + s.operators.rightArithShift + "${args[1]}\\right)" }, y;
				}var i = r(2).isInteger,
				    a = r(507);t.name = "rightArithShift", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = r(3),
					    s = n(r(0)),
					    u = n(r(10)),
					    c = n(r(33)),
					    f = n(r(29)),
					    l = n(r(23)),
					    p = n(r(77)),
					    h = n(r(34)),
					    m = n(r(15)),
					    d = n(r(8)),
					    g = n(r(4)),
					    v = a("rightLogShift", { "number, number": function numberNumber(e, t) {
							if (!i(e) || !i(t)) throw new Error("Integers expected in function rightLogShift");return e >>> t;
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = p(e, t, v, !1);break;default:
											r = l(t, e, v, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = f(e, t, v, !1);break;default:
											r = d(e, t, v);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return v(s(e), s(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return v(s(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return v(e, s(t));
						}, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
							if (!u(t, 0)) {
								var r;switch (e.storage()) {case "sparse":
										r = m(e, t, v, !1);break;default:
										r = g(e, t, v, !1);}return r;
							}return e.clone();
						}, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
							if (!u(e, 0)) {
								var r;switch (t.storage()) {case "sparse":
										r = h(t, e, v, !0);break;default:
										r = g(t, e, v, !0);}return r;
							}return c(t.size(), t.storage());
						}, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
							return v(s(e), t).valueOf();
						}, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
							return v(e, s(t)).valueOf();
						} });return v.toTex = { 2: "\\left(${args[0]}" + o.operators.rightLogShift + "${args[1]}\\right)" }, v;
				}var i = r(2).isInteger;t.name = "rightLogShift", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(17)),
					    o = n(r(107)),
					    s = n(r(50)),
					    u = n(r(41)),
					    c = i("bellNumbers", { "number | BigNumber": function numberBigNumber(e) {
							if (!u(e) || s(e)) throw new TypeError("Non-negative integer value expected in function bellNumbers");for (var t = 0, r = 0; r <= e; r++) {
								t = a(t, o(e, r));
							}return t;
						} });return c.toTex = { 1: "\\mathrm{B}_{${args[0]}}" }, c;
				}t.name = "bellNumbers", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(17)),
					    o = n(r(38)),
					    s = n(r(11)),
					    u = n(r(57)),
					    c = n(r(50)),
					    f = n(r(41)),
					    l = i("catalan", { "number | BigNumber": function numberBigNumber(e) {
							if (!f(e) || c(e)) throw new TypeError("Non-negative integer value expected in function catalan");return o(u(s(e, 2), e), a(e, 1));
						} });return l.toTex = { 1: "\\mathrm{C}_{${args[0]}}" }, l;
				}t.name = "catalan", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(57)),
					    o = n(r(19)),
					    s = n(r(51)),
					    u = n(r(41)),
					    c = n(r(28)),
					    f = i("composition", { "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(e, t) {
							if (!(u(e) && s(e) && u(t) && s(t))) throw new TypeError("Positive integer value expected in function composition");if (c(t, e)) throw new TypeError("k must be less than or equal to n in function composition");return a(o(e, -1), o(t, -1));
						} });return f.toTex = void 0, f;
				}t.name = "composition", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(394), r(396), r(107), r(395)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("arg", { number: function number(e) {
							return Math.atan2(0, e);
						}, BigNumber: function BigNumber(t) {
							return e.BigNumber.atan2(0, t);
						}, Complex: function Complex(e) {
							return e.arg();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\arg\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "arg", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("im", { number: function number(e) {
							return 0;
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(0);
						}, Complex: function Complex(e) {
							return e.im;
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\Im\\left\\lbrace${args[0]}\\right\\rbrace" }, a;
				}var i = r(1);t.name = "im", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(398), r(108), r(399), r(401)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("re", { number: function number(e) {
							return e;
						}, BigNumber: function BigNumber(e) {
							return e;
						}, Complex: function Complex(e) {
							return e.re;
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\Re\\left\\lbrace${args[0]}\\right\\rbrace" }, a;
				}var i = r(1);t.name = "re", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, s) {
					var m = (n(r(0)), s("distance", { "Array, Array, Array": function ArrayArrayArray(e, t, r) {
							if (2 == e.length && 2 == t.length && 2 == r.length) {
								if (!i(e)) throw new TypeError("Array with 2 numbers expected for first argument");if (!i(t)) throw new TypeError("Array with 2 numbers expected for second argument");if (!i(r)) throw new TypeError("Array with 2 numbers expected for third argument");var n = (r[1] - r[0]) / (t[1] - t[0]),
								    a = n * n * t[0],
								    o = -1 * (n * t[0]),
								    s = e[1];return c(e[0], e[1], a, o, s);
							}throw new TypeError("Invalid Arguments: Try again");
						}, "Object, Object, Object": function ObjectObjectObject(e, t, r) {
							if (2 == Object.keys(e).length && 2 == Object.keys(t).length && 2 == Object.keys(r).length) {
								if (!i(e)) throw new TypeError("Values of pointX and pointY should be numbers");if (!i(t)) throw new TypeError("Values of lineOnePtX and lineOnePtY should be numbers");if (!i(r)) throw new TypeError("Values of lineTwoPtX and lineTwoPtY should be numbers");if (e.hasOwnProperty("pointX") && e.hasOwnProperty("pointY") && t.hasOwnProperty("lineOnePtX") && t.hasOwnProperty("lineOnePtY") && r.hasOwnProperty("lineTwoPtX") && r.hasOwnProperty("lineTwoPtY")) {
									var n = (r.lineTwoPtY - r.lineTwoPtX) / (t.lineOnePtY - t.lineOnePtX),
									    a = n * n * t.lineOnePtX,
									    o = -1 * (n * t.lineOnePtX),
									    s = e.pointX;return c(e.pointX, e.pointY, a, o, s);
								}throw new TypeError("Key names do not match");
							}throw new TypeError("Invalid Arguments: Try again");
						}, "Array, Array": function ArrayArray(e, t) {
							if (2 == e.length && 3 == t.length) {
								if (!i(e)) throw new TypeError("Array with 2 numbers expected for first argument");if (!a(t)) throw new TypeError("Array with 3 numbers expected for second argument");return c(e[0], e[1], t[0], t[1], t[2]);
							}if (3 == e.length && 6 == t.length) {
								if (!a(e)) throw new TypeError("Array with 3 numbers expected for first argument");if (!o(t)) throw new TypeError("Array with 6 numbers expected for second argument");return f(e[0], e[1], e[2], t[0], t[1], t[2], t[3], t[4], t[5]);
							}if (2 == e.length && 2 == t.length) {
								if (!i(e)) throw new TypeError("Array with 2 numbers expected for first argument");if (!i(t)) throw new TypeError("Array with 2 numbers expected for second argument");return l(e[0], e[1], t[0], t[1]);
							}if (3 == e.length && 3 == t.length) {
								if (!a(e)) throw new TypeError("Array with 3 numbers expected for first argument");if (!a(t)) throw new TypeError("Array with 3 numbers expected for second argument");return p(e[0], e[1], e[2], t[0], t[1], t[2]);
							}throw new TypeError("Invalid Arguments: Try again");
						}, "Object, Object": function ObjectObject(e, t) {
							if (2 == Object.keys(e).length && 3 == Object.keys(t).length) {
								if (!i(e)) throw new TypeError("Values of pointX and pointY should be numbers");if (!a(t)) throw new TypeError("Values of xCoeffLine, yCoeffLine and constant should be numbers");if (e.hasOwnProperty("pointX") && e.hasOwnProperty("pointY") && t.hasOwnProperty("xCoeffLine") && t.hasOwnProperty("yCoeffLine") && t.hasOwnProperty("yCoeffLine")) return c(e.pointX, e.pointY, t.xCoeffLine, t.yCoeffLine, t.constant);throw new TypeError("Key names do not match");
							}if (3 == Object.keys(e).length && 6 == Object.keys(t).length) {
								if (!a(e)) throw new TypeError("Values of pointX, pointY and pointZ should be numbers");if (!o(t)) throw new TypeError("Values of x0, y0, z0, a, b and c should be numbers");if (e.hasOwnProperty("pointX") && e.hasOwnProperty("pointY") && t.hasOwnProperty("x0") && t.hasOwnProperty("y0") && t.hasOwnProperty("z0") && t.hasOwnProperty("a") && t.hasOwnProperty("b") && t.hasOwnProperty("c")) return f(e.pointX, e.pointY, e.pointZ, t.x0, t.y0, t.z0, t.a, t.b, t.c);throw new TypeError("Key names do not match");
							}if (2 == Object.keys(e).length && 2 == Object.keys(t).length) {
								if (!i(e)) throw new TypeError("Values of pointOneX and pointOneY should be numbers");if (!i(t)) throw new TypeError("Values of pointTwoX and pointTwoY should be numbers");if (e.hasOwnProperty("pointOneX") && e.hasOwnProperty("pointOneY") && t.hasOwnProperty("pointTwoX") && t.hasOwnProperty("pointTwoY")) return l(e.pointOneX, e.pointOneY, t.pointTwoX, t.pointTwoY);throw new TypeError("Key names do not match");
							}if (3 == Object.keys(e).length && 3 == Object.keys(t).length) {
								if (!a(e)) throw new TypeError("Values of pointOneX, pointOneY and pointOneZ should be numbers");if (!a(t)) throw new TypeError("Values of pointTwoX, pointTwoY and pointTwoZ should be numbers");if (e.hasOwnProperty("pointOneX") && e.hasOwnProperty("pointOneY") && e.hasOwnProperty("pointOneZ") && t.hasOwnProperty("pointTwoX") && t.hasOwnProperty("pointTwoY") && t.hasOwnProperty("pointTwoZ")) return p(e.pointOneX, e.pointOneY, e.pointOneZ, t.pointTwoX, t.pointTwoY, t.pointTwoZ);throw new TypeError("Key names do not match");
							}throw new TypeError("Invalid Arguments: Try again");
						}, Array: function Array(e) {
							if (!u(e)) throw new TypeError("Incorrect array format entered for pairwise distance calculation");return h(e);
						} }));return m;
				}function i(e) {
					return e.constructor !== Array && (e = s(e)), "number" == typeof e[0] && "number" == typeof e[1];
				}function a(e) {
					return e.constructor !== Array && (e = s(e)), "number" == typeof e[0] && "number" == typeof e[1] && "number" == typeof e[2];
				}function o(e) {
					return e.constructor !== Array && (e = s(e)), "number" == typeof e[0] && "number" == typeof e[1] && "number" == typeof e[2] && "number" == typeof e[3] && "number" == typeof e[4] && "number" == typeof e[5];
				}function s(e) {
					for (var t = Object.keys(e), r = [], n = 0; n < t.length; n++) {
						r.push(e[t[n]]);
					}return r;
				}function u(e) {
					if (2 == e[0].length && "number" == typeof e[0][0] && "number" == typeof e[0][1]) {
						for (var t in e) {
							if (2 != e[t].length || "number" != typeof e[t][0] || "number" != typeof e[t][1]) return !1;
						}
					} else {
						if (3 != e[0].length || "number" != typeof e[0][0] || "number" != typeof e[0][1] || "number" != typeof e[0][2]) return !1;for (var t in e) {
							if (3 != e[t].length || "number" != typeof e[t][0] || "number" != typeof e[t][1] || "number" != typeof e[t][2]) return !1;
						}
					}return !0;
				}function c(e, t, r, n, i) {
					var a = Math.abs(r * e + n * t + i),
					    o = Math.pow(r * r + n * n, .5),
					    s = a / o;return s;
				}function f(e, t, r, n, i, a, o, s, u) {
					var c = [(i - t) * u - (a - r) * s, (a - r) * o - (n - e) * u, (n - e) * s - (i - t) * o];c = Math.pow(c[0] * c[0] + c[1] * c[1] + c[2] * c[2], .5);var f = Math.pow(o * o + s * s + u * u, .5),
					    l = c / f;return l;
				}function l(e, t, r, n) {
					var i = n - t,
					    a = r - e,
					    o = i * i + a * a,
					    s = Math.pow(o, .5);return s;
				}function p(e, t, r, n, i, a) {
					var o = a - r,
					    s = i - t,
					    u = n - e,
					    c = o * o + s * s + u * u,
					    f = Math.pow(c, .5);return f;
				}function h(e) {
					for (var t = [], r = 0; r < e.length - 1; r++) {
						for (var n = r + 1; n < e.length; n++) {
							2 == e[0].length ? t.push(l(e[r][0], e[r][1], e[n][0], e[n][1])) : 3 == e[0].length && t.push(p(e[r][0], e[r][1], e[r][2], e[n][0], e[n][1], e[n][2]));
						}
					}return t;
				}t.name = "distance", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(404), r(402)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e) {
						return 2 === e.length && "number" == typeof e[0] && "number" == typeof e[1];
					}function o(e) {
						return 3 === e.length && "number" == typeof e[0] && "number" == typeof e[1] && "number" == typeof e[2];
					}function s(e) {
						return 4 === e.length && "number" == typeof e[0] && "number" == typeof e[1] && "number" == typeof e[2] && "number" == typeof e[3];
					}function u(e, r, n, i) {
						var a = e,
						    o = n,
						    s = d(a, r),
						    u = d(o, i),
						    c = s[0] * u[1] - u[0] * s[1];if (l(c) < t.epsilon) return null;var f = (u[0] * a[1] - u[1] * a[0] - u[0] * o[1] + u[1] * o[0]) / c;return p(m(s, f), a);
					}function c(e, t, r, n, i, a, o, s, u, c, f, l) {
						var p = (e - o) * (c - o) + (t - s) * (f - s) + (r - u) * (l - u),
						    h = (c - o) * (n - e) + (f - s) * (i - t) + (l - u) * (a - r),
						    m = (e - o) * (n - e) + (t - s) * (i - t) + (r - u) * (a - r),
						    d = (c - o) * (c - o) + (f - s) * (f - s) + (l - u) * (l - u),
						    g = (n - e) * (n - e) + (i - t) * (i - t) + (a - r) * (a - r),
						    v = (p * h - m * d) / (g * d - h * h),
						    y = (p + v * h) / d,
						    x = e + v * (n - e),
						    w = t + v * (i - t),
						    b = r + v * (a - r),
						    N = o + y * (c - o),
						    E = s + y * (f - s),
						    M = u + y * (l - u);return x === N && w === E && b === M ? [x, w, b] : null;
					}function f(e, t, r, n, i, a, o, s, u, c) {
						var f = (c - e * o - t * s - r * u) / (n * o + i * s + a * u - e - t - r),
						    l = e + f * (n - e),
						    p = t + f * (i - t),
						    h = r + f * (a - r);return [l, p, h];
					}var l = n(r(26)),
					    p = n(r(17)),
					    h = n(r(0)),
					    m = n(r(11)),
					    d = n(r(20)),
					    g = i("intersect", { "Array, Array, Array": function ArrayArrayArray(e, t, r) {
							if (!o(e)) throw new TypeError("Array with 3 numbers expected for first argument");if (!o(t)) throw new TypeError("Array with 3 numbers expected for second argument");if (!s(r)) throw new TypeError("Array with 4 numbers expected as third argument");return f(e[0], e[1], e[2], t[0], t[1], t[2], r[0], r[1], r[2], r[3]);
						}, "Array, Array, Array, Array": function ArrayArrayArrayArray(e, t, r, n) {
							if (2 === e.length) {
								if (!a(e)) throw new TypeError("Array with 2 numbers expected for first argument");if (!a(t)) throw new TypeError("Array with 2 numbers expected for second argument");if (!a(r)) throw new TypeError("Array with 2 numbers expected for third argument");if (!a(n)) throw new TypeError("Array with 2 numbers expected for fourth argument");return u(e, t, r, n);
							}if (3 === e.length) {
								if (!o(e)) throw new TypeError("Array with 3 numbers expected for first argument");if (!o(t)) throw new TypeError("Array with 3 numbers expected for second argument");if (!o(r)) throw new TypeError("Array with 3 numbers expected for third argument");if (!o(n)) throw new TypeError("Array with 3 numbers expected for fourth argument");return c(e[0], e[1], e[2], t[0], t[1], t[2], r[0], r[1], r[2], n[0], n[1], n[2]);
							}throw new TypeError("Arrays with two or thee dimensional points expected");
						}, "Matrix, Matrix, Matrix": function MatrixMatrixMatrix(e, t, r) {
							return h(g(e.valueOf(), t.valueOf(), r.valueOf()));
						}, "Matrix, Matrix, Matrix, Matrix": function MatrixMatrixMatrixMatrix(e, t, r, n) {
							return h(g(e.valueOf(), t.valueOf(), r.valueOf(), n.valueOf()));
						} });return g;
				}t.name = "intersect", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(350), r(376), r(390), r(397), r(400), r(403), r(407), r(414), r(422), r(431), r(434), r(435), r(441), r(461), r(468), r(470)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = r(3),
					    o = n(r(0)),
					    s = n(r(33)),
					    u = n(r(109)),
					    c = (n(r(74)), n(r(23))),
					    f = n(r(60)),
					    l = n(r(15)),
					    p = n(r(8)),
					    h = n(r(4)),
					    m = i("and", { "number, number": function numberNumber(e, t) {
							return !(!e || !t);
						}, "Complex, Complex": function ComplexComplex(e, t) {
							return !(0 === e.re && 0 === e.im || 0 === t.re && 0 === t.im);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
							return !(e.isZero() || t.isZero() || e.isNaN() || t.isNaN());
						}, "Unit, Unit": function UnitUnit(e, t) {
							return m(e.value, t.value);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = f(e, t, m, !1);break;default:
											r = c(t, e, m, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = c(e, t, m, !1);break;default:
											r = p(e, t, m);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return m(o(e), o(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return m(o(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return m(e, o(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							if (u(t)) return s(e.size(), e.storage());var r;switch (e.storage()) {case "sparse":
									r = l(e, t, m, !1);break;default:
									r = h(e, t, m, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							if (u(e)) return s(e.size(), e.storage());var r;switch (t.storage()) {case "sparse":
									r = l(t, e, m, !0);break;default:
									r = h(t, e, m, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return m(o(e), t).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return m(e, o(t)).valueOf();
						} });return m.toTex = { 2: "\\left(${args[0]}" + a.operators.and + "${args[1]}\\right)" }, m;
				}t.name = "and", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(406), r(109), r(408), r(409)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = r(3),
					    o = n(r(0)),
					    s = n(r(14)),
					    u = n(r(59)),
					    c = n(r(16)),
					    f = n(r(8)),
					    l = n(r(4)),
					    p = i("or", { "number, number": function numberNumber(e, t) {
							return !(!e && !t);
						}, "Complex, Complex": function ComplexComplex(e, t) {
							return 0 !== e.re || 0 !== e.im || 0 !== t.re || 0 !== t.im;
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
							return !e.isZero() && !e.isNaN() || !t.isZero() && !t.isNaN();
						}, "Unit, Unit": function UnitUnit(e, t) {
							return p(e.value, t.value);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = u(e, t, p);break;default:
											r = s(t, e, p, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = s(e, t, p, !1);break;default:
											r = f(e, t, p);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return p(o(e), o(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return p(o(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return p(e, o(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = c(e, t, p, !1);break;default:
									r = l(e, t, p, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = c(t, e, p, !0);break;default:
									r = l(t, e, p, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return l(o(e), t, p, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return l(o(t), e, p, !0).valueOf();
						} });return p.toTex = { 2: "\\left(${args[0]}" + a.operators.or + "${args[1]}\\right)" }, p;
				}t.name = "or", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = r(3),
					    o = n(r(0)),
					    s = n(r(14)),
					    u = n(r(24)),
					    c = n(r(16)),
					    f = n(r(8)),
					    l = n(r(4)),
					    p = i("xor", { "number, number": function numberNumber(e, t) {
							return !!(!!e ^ !!t);
						}, "Complex, Complex": function ComplexComplex(e, t) {
							return (0 !== e.re || 0 !== e.im) != (0 !== t.re || 0 !== t.im);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
							return (!e.isZero() && !e.isNaN()) != (!t.isZero() && !t.isNaN());
						}, "Unit, Unit": function UnitUnit(e, t) {
							return p(e.value, t.value);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = u(e, t, p);break;default:
											r = s(t, e, p, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = s(e, t, p, !1);break;default:
											r = f(e, t, p);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return p(o(e), o(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return p(o(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return p(e, o(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = c(e, t, p, !1);break;default:
									r = l(e, t, p, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = c(t, e, p, !0);break;default:
									r = l(t, e, p, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return l(o(e), t, p, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return l(o(t), e, p, !0).valueOf();
						} });return p.toTex = { 2: "\\left(${args[0]}" + a.operators.xor + "${args[1]}\\right)" }, p;
				}t.name = "xor", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e, t) {
						var r = Math.max(i.size(e).length, i.size(t).length);e = i.squeeze(e), t = i.squeeze(t);var n = i.size(e),
						    a = i.size(t);if (1 != n.length || 1 != a.length || 3 != n[0] || 3 != a[0]) throw new RangeError("Vectors with length 3 expected (Size A = [" + n.join(", ") + "], B = [" + a.join(", ") + "])");var o = [u(c(e[1], t[2]), c(e[2], t[1])), u(c(e[2], t[0]), c(e[0], t[2])), u(c(e[0], t[1]), c(e[1], t[0]))];return r > 1 ? [o] : o;
					}var s = n(r(0)),
					    u = n(r(20)),
					    c = n(r(11)),
					    f = a("cross", { "Matrix, Matrix": function MatrixMatrix(e, t) {
							return s(o(e.toArray(), t.toArray()));
						}, "Matrix, Array": function MatrixArray(e, t) {
							return s(o(e.toArray(), t));
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return s(o(e, t.toArray()));
						}, "Array, Array": o });return f.toTex = { 2: "\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)" }, f;
				}var i = r(7);t.name = "cross", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(e, t, r, n) {
						if (!a(t)) throw new TypeError("Second parameter in function diag must be an integer");var i = t > 0 ? t : 0,
						    o = t < 0 ? -t : 0;switch (r.length) {case 1:
								return u(e, t, n, r[0], o, i);case 2:
								return c(e, t, n, r, o, i);}throw new RangeError("Matrix for function diag must be 2 dimensional");
					}function u(t, r, n, i, a, o) {
						var s = [i + a, i + o],
						    u = e.Matrix.storage(n || "dense"),
						    c = u.diagonal(s, t, r);return null !== n ? c : c.valueOf();
					}function c(e, t, r, n, i, a) {
						if (e && e.isMatrix === !0) {
							var o = e.diagonal(t);return null !== r ? r !== o.storage() ? f(o, r) : o : o.valueOf();
						}for (var s = Math.min(n[0] - i, n[1] - a), u = [], c = 0; c < s; c++) {
							u[c] = e[c + i][c + a];
						}return null !== r ? f(u) : u;
					}var f = n(r(0)),
					    l = o("diag", { Array: function Array(e) {
							return s(e, 0, i.size(e), null);
						}, "Array, number": function ArrayNumber(e, t) {
							return s(e, t, i.size(e), null);
						}, "Array, BigNumber": function ArrayBigNumber(e, t) {
							return s(e, t.toNumber(), i.size(e), null);
						}, "Array, string": function ArrayString(e, t) {
							return s(e, 0, i.size(e), t);
						}, "Array, number, string": function ArrayNumberString(e, t, r) {
							return s(e, t, i.size(e), r);
						}, "Array, BigNumber, string": function ArrayBigNumberString(e, t, r) {
							return s(e, t.toNumber(), i.size(e), r);
						}, Matrix: function Matrix(e) {
							return s(e, 0, e.size(), e.storage());
						}, "Matrix, number": function MatrixNumber(e, t) {
							return s(e, t, e.size(), e.storage());
						}, "Matrix, BigNumber": function MatrixBigNumber(e, t) {
							return s(e, t.toNumber(), e.size(), e.storage());
						}, "Matrix, string": function MatrixString(e, t) {
							return s(e, 0, e.size(), t);
						}, "Matrix, number, string": function MatrixNumberString(e, t, r) {
							return s(e, t, e.size(), r);
						}, "Matrix, BigNumber, string": function MatrixBigNumberString(e, t, r) {
							return s(e, t.toNumber(), e.size(), r);
						} });return l.toTex = void 0, l;
				}var i = r(7),
				    a = (r(6).clone, r(2).isInteger);t.name = "diag", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e, t) {
						var r = i(e),
						    n = i(t),
						    a = r[0];if (1 !== r.length || 1 !== n.length) throw new RangeError("Vector expected");if (r[0] != n[0]) throw new RangeError("Vectors must have equal length (" + r[0] + " != " + n[0] + ")");if (0 == a) throw new RangeError("Cannot calculate the dot product of empty vectors");for (var o = 0, c = 0; c < a; c++) {
							o = s(o, u(e[c], t[c]));
						}return o;
					}var s = n(r(17)),
					    u = n(r(11)),
					    c = a("dot", { "Matrix, Matrix": function MatrixMatrix(e, t) {
							return o(e.toArray(), t.toArray());
						}, "Matrix, Array": function MatrixArray(e, t) {
							return o(e.toArray(), t);
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return o(e, t.toArray());
						}, "Array, Array": o });return c.toTex = { 2: "\\left(${args[0]}\\cdot${args[1]}\\right)" }, c;
				}var i = r(7).size;t.name = "dot", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(0)),
					    u = o("flatten", { Array: function Array(e) {
							return a(i(e));
						}, Matrix: function Matrix(e) {
							var t = a(i(e.toArray()));return s(t);
						} });return u.toTex = void 0, u;
				}var i = r(6).clone,
				    a = r(7).flatten;t.name = "flatten", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(110), r(410), r(111), r(411), r(412), r(54), r(112), r(413), r(113), r(114), r(415), r(69), r(416), r(70), r(115), r(417), r(418), r(419), r(420), r(421), r(55), r(116), r(56), r(33)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e, t) {
						if (1 === i(e).length && (e = [e]), 1 === i(t).length && (t = [t]), i(e).length > 2 || i(t).length > 2) throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(e.length) + ", y = " + JSON.stringify(t.length) + ")");var r = [],
						    n = [];return e.map(function (e) {
							return t.map(function (t) {
								return e.map(function (e) {
									return t.map(function (t) {
										return n.push(u(e, t));
									});
								}, r.push(n = []));
							});
						}, r = []) && r;
					}var s = n(r(0)),
					    u = n(r(22)),
					    c = a("kron", { "Matrix, Matrix": function MatrixMatrix(e, t) {
							return s(o(e.toArray(), t.toArray()));
						}, "Matrix, Array": function MatrixArray(e, t) {
							return s(o(e.toArray(), t));
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return s(o(e, t.toArray()));
						}, "Array, Array": o });return c;
				}var i = r(7).size;t.name = "kron", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					function s(t, r) {
						var n = u(t),
						    i = n ? new e.BigNumber(1) : 1;if (c(t), r) {
							var o = f(r);return t.length > 0 ? o.resize(t, i) : o;
						}var s = [];return t.length > 0 ? a(s, t, i) : s;
					}function u(e) {
						var t = !1;return e.forEach(function (e, r, n) {
							e && e.isBigNumber === !0 && (t = !0, n[r] = e.toNumber());
						}), t;
					}function c(e) {
						e.forEach(function (e) {
							if ("number" != typeof e || !i(e) || e < 0) throw new Error("Parameters in function ones must be positive integers");
						});
					}var f = n(r(0)),
					    l = o("ones", { "": function _() {
							return "Array" === t.matrix ? s([]) : s([], "default");
						}, "...number | BigNumber | string": function numberBigNumberString(e) {
							var r = e[e.length - 1];if ("string" == typeof r) {
								var n = e.pop();return s(e, n);
							}return "Array" === t.matrix ? s(e) : s(e, "default");
						}, Array: s, Matrix: function Matrix(e) {
							var t = e.storage();return s(e.valueOf(), t);
						}, "Array | Matrix, string": function ArrayMatrixString(e, t) {
							return s(e.valueOf(), t);
						} });return l.toTex = void 0, l;
				}var i = r(2).isInteger,
				    a = r(7).resize;t.name = "ones", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(0)),
					    u = o("reshape", { "Matrix, Array": function MatrixArray(e, t) {
							return e.reshape ? e.reshape(t) : s(a.reshape(e.valueOf(), t));
						}, "Array, Array": function ArrayArray(e, t) {
							return t.forEach(function (e) {
								if (!i(e)) throw new TypeError("Invalid size for dimension: " + e);
							}), a.reshape(e, t);
						} });return u.toTex = void 0, u;
				}var i = (r(9), r(2).isInteger),
				    a = r(7);t.name = "reshape", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, f) {
					function l(e, t, r) {
						if (void 0 !== r) {
							if ("string" != typeof r || 1 !== r.length) throw new TypeError("Single character expected as defaultValue");
						} else r = " ";if (1 !== t.length) throw new i(t.length, 1);var n = t[0];if ("number" != typeof n || !o(n)) throw new TypeError("Invalid size, must contain positive integers (size: " + s(t) + ")");if (e.length > n) return e.substring(0, n);if (e.length < n) {
							for (var a = e, u = 0, c = n - e.length; u < c; u++) {
								a += r;
							}return a;
						}return e;
					}var p = n(r(0)),
					    h = function h(e, r, n) {
						if (2 != arguments.length && 3 != arguments.length) throw new a("resize", arguments.length, 2, 3);if (r && r.isMatrix === !0 && (r = r.valueOf()), r.length && r[0] && r[0].isBigNumber === !0 && (r = r.map(function (e) {
							return e && e.isBigNumber === !0 ? e.toNumber() : e;
						})), e && e.isMatrix === !0) return e.resize(r, n, !0);if ("string" == typeof e) return l(e, r, n);var i = !Array.isArray(e) && "Array" !== t.matrix;if (0 == r.length) {
							for (; Array.isArray(e);) {
								e = e[0];
							}return u(e);
						}Array.isArray(e) || (e = [e]), e = u(e);var o = c.resize(e, r, n);return i ? p(o) : o;
					};return h.toTex = void 0, h;
				}var i = r(9),
				    a = r(43),
				    o = r(2).isInteger,
				    s = r(12).format,
				    u = r(6).clone,
				    c = r(7);t.name = "resize", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(0)),
					    s = a("size", { Matrix: function Matrix(e) {
							return o(e.size());
						}, Array: i.size, string: function string(e) {
							return "Array" === t.matrix ? [e.length] : o([e.length]);
						}, "number | Complex | BigNumber | Unit | boolean | null": function numberComplexBigNumberUnitBooleanNull(e) {
							return "Array" === t.matrix ? [] : o([]);
						} });return s.toTex = void 0, s;
				}var i = r(7);t.name = "size", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e) {
						if ("asc" === e) return f;if ("desc" === e) return l;throw new Error('String "asc" or "desc" expected');
					}function s(e) {
						if (1 !== i(e).length) throw new Error("One dimensional array expected");
					}function u(e) {
						if (1 !== e.size().length) throw new Error("One dimensional matrix expected");
					}var c = n(r(0)),
					    f = n(r(49)),
					    l = function l(e, t) {
						return -f(e, t);
					},
					    p = a("sort", { Array: function Array(e) {
							return s(e), e.sort(f);
						}, Matrix: function Matrix(e) {
							return u(e), c(e.toArray().sort(f), e.storage());
						}, "Array, function": function ArrayFunction(e, t) {
							return s(e), e.sort(t);
						}, "Matrix, function": function MatrixFunction(e, t) {
							return u(e), c(e.toArray().sort(t), e.storage());
						}, "Array, string": function ArrayString(e, t) {
							return s(e), e.sort(o(t));
						}, "Matrix, string": function MatrixString(e, t) {
							return u(e), c(e.toArray().sort(o(t)), e.storage());
						} });return p.toTex = void 0, p;
				}var i = r(7).size;t.name = "sort", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(0)),
					    u = o("squeeze", { Array: function Array(e) {
							return a.squeeze(i.clone(e));
						}, Matrix: function Matrix(e) {
							var t = a.squeeze(e.toArray());return Array.isArray(t) ? s(t) : t;
						}, any: function any(e) {
							return i.clone(e);
						} });return u.toTex = void 0, u;
				}var i = r(6),
				    a = r(7);t.name = "squeeze", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(57), r(58), r(117), r(423), r(424), r(425), r(426), r(427), r(428)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e, t) {
						var r = t.size().length,
						    n = e.size().length;if (r > 1) throw new Error("first object must be one dimensional");if (n > 1) throw new Error("second object must be one dimensional");if (r !== n) throw new Error("Length of two vectors must be equal");var i = u(e);if (0 === i) throw new Error("Sum of elements in first object must be non zero");var a = u(t);if (0 === a) throw new Error("Sum of elements in second object must be non zero");var o = s(e, u(e)),
						    h = s(t, u(t)),
						    m = u(c(o, l(f(o, h))));return p(m) ? m : Number.NaN;
					}var o = n(r(0)),
					    s = n(r(38)),
					    u = n(r(124)),
					    c = n(r(11)),
					    f = n(r(103)),
					    l = n(r(105)),
					    p = n(r(73)),
					    h = i("kldivergence", { "Array, Array": function ArrayArray(e, t) {
							return a(o(e), o(t));
						}, "Matrix, Array": function MatrixArray(e, t) {
							return a(e, o(t));
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return a(o(e), t);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							return a(e, t);
						} });return h;
				}t.name = "kldivergence", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = n(r(17)),
					    s = n(r(11)),
					    u = n(r(38)),
					    c = n(r(58)),
					    f = n(r(41)),
					    l = n(r(51));return a("multinomial", { "Array | Matrix": function ArrayMatrix(e) {
							var t = 0,
							    r = 1;return i(e, function (e) {
								if (!f(e) || !l(e)) throw new TypeError("Positive integer value expected in function multinomial");t = o(t, e), r = s(r, c(e));
							}), u(c(t), r);
						} });
				}var i = r(36);t.name = "multinomial", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(58)),
					    u = o("permutations", { "number | BigNumber": s, "number, number": function numberNumber(e, t) {
							var r, n;if (!a(e) || e < 0) throw new TypeError("Positive integer value expected in function permutations");if (!a(t) || t < 0) throw new TypeError("Positive integer value expected in function permutations");if (t > e) throw new TypeError("second argument k must be less than or equal to first argument n");for (r = 1, n = e - t + 1; n <= e; n++) {
								r *= n;
							}return r;
						}, "BigNumber, BigNumber": function BigNumberBigNumber(t, r) {
							var n, a;if (!i(t) || !i(r)) throw new TypeError("Positive integer value expected in function permutations");if (r.gt(t)) throw new TypeError("second argument k must be less than or equal to first argument n");for (n = new e.BigNumber(1), a = t.minus(r).plus(1); a.lte(t); a = a.plus(1)) {
								n = n.times(a);
							}return n;
						} });return u.toTex = void 0, u;
				}function i(e) {
					return e.isInteger() && e.gte(0);
				}var a = r(2).isInteger;t.name = "permutations", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(71)),
					    o = a("uniform").pickRandom;return o.toTex = void 0, o;
				}t.name = "pickRandom", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(71)),
					    o = a("uniform").random;return o.toTex = void 0, o;
				}t.name = "random", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(71)),
					    o = a("uniform").randomInt;return o.toTex = void 0, o;
				}t.name = "randomInt", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n, o) {
					function s(e) {
						c = null === e ? a : i(String(e));
					}function u() {
						return c();
					}var c;return s(t.randomSeed), o.on("config", function (e, t, r) {
						void 0 !== r.randomSeed && s(e.randomSeed);
					}), u;
				}var i = r(514),
				    a = i();t.factory = n, t.math = !0;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e, t) {
						if (Array.isArray(e)) {
							if (Array.isArray(t)) {
								var r = e.length;if (r !== t.length) return !1;for (var n = 0; n < r; n++) {
									if (!a(e[n], t[n])) return !1;
								}return !0;
							}return !1;
						}return !Array.isArray(t) && o(e, t);
					}var o = n(r(72)),
					    s = i("deepEqual", { "any, any": function anyAny(e, t) {
							return a(e.valueOf(), t.valueOf());
						} });return s.toTex = void 0, s;
				}t.name = "deepEqual", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(49), r(430), r(72), r(28), r(118), r(40), r(432), r(119)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, o) {
					var s = n(r(0)),
					    u = n(r(14)),
					    c = n(r(24)),
					    f = n(r(16)),
					    l = n(r(8)),
					    p = n(r(4)),
					    h = r(3),
					    m = o("smallerEq", { "boolean, boolean": function booleanBoolean(e, t) {
							return e <= t;
						}, "number, number": function numberNumber(e, r) {
							return e <= r || i(e, r, t.epsilon);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
							return e.lte(r) || a(e, r, t.epsilon);
						}, "Fraction, Fraction": function FractionFraction(e, t) {
							return 1 !== e.compare(t);
						}, "Complex, Complex": function ComplexComplex() {
							throw new TypeError("No ordering relation is defined for complex numbers");
						}, "Unit, Unit": function UnitUnit(e, t) {
							if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return m(e.value, t.value);
						}, "string, string": function stringString(e, t) {
							return e <= t;
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = c(e, t, m);break;default:
											r = u(t, e, m, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = u(e, t, m, !1);break;default:
											r = l(e, t, m);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return m(s(e), s(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return m(s(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return m(e, s(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = f(e, t, m, !1);break;default:
									r = p(e, t, m, !1);}return r;
						}, "any, Matrix": function anyMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = f(t, e, m, !0);break;default:
									r = p(t, e, m, !0);}return r;
						}, "Array, any": function ArrayAny(e, t) {
							return p(s(e), t, m, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return p(s(t), e, m, !0).valueOf();
						} });return m.toTex = { 2: "\\left(${args[0]}" + h.operators.smallerEq + "${args[1]}\\right)" }, m;
				}var i = r(2).nearlyEqual,
				    a = r(35);t.name = "smallerEq", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					function l(e) {
						var t,
						    r = e * e,
						    n = u[0][4] * r,
						    i = r;for (t = 0; t < 3; t += 1) {
							n = (n + u[0][t]) * r, i = (i + c[0][t]) * r;
						}return e * (n + u[0][3]) / (i + c[0][3]);
					}function p(e) {
						var t,
						    r = u[1][8] * e,
						    n = e;for (t = 0; t < 7; t += 1) {
							r = (r + u[1][t]) * e, n = (n + c[1][t]) * e;
						}var i = (r + u[1][7]) / (n + c[1][7]),
						    a = parseInt(16 * e) / 16,
						    o = (e - a) * (e + a);return Math.exp(-a * a) * Math.exp(-o) * i;
					}function h(e) {
						var t,
						    r = 1 / (e * e),
						    n = u[2][5] * r,
						    i = r;for (t = 0; t < 4; t += 1) {
							n = (n + u[2][t]) * r, i = (i + c[2][t]) * r;
						}var a = r * (n + u[2][4]) / (i + c[2][4]);a = (s - a) / e, r = parseInt(16 * e) / 16;var o = (e - r) * (e + r);return Math.exp(-r * r) * Math.exp(-o) * a;
					}var m = n("erf", { number: function number(e) {
							var t = Math.abs(e);return t >= f ? a(e) : t <= o ? a(e) * l(t) : t <= 4 ? a(e) * (1 - p(t)) : a(e) * (1 - h(t));
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(m(t.toNumber()));
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, m);
						} });return m.toTex = { 1: "erf\\left(${args[0]}\\right)" }, m;
				}var i = r(1),
				    a = r(2).sign,
				    o = .46875,
				    s = .5641895835477563,
				    u = [[3.1611237438705655, 113.86415415105016, 377.485237685302, 3209.3775891384694, .18577770618460315], [.5641884969886701, 8.883149794388377, 66.11919063714163, 298.6351381974001, 881.952221241769, 1712.0476126340707, 2051.0783778260716, 1230.3393547979972, 2.1531153547440383e-8], [.30532663496123236, .36034489994980445, .12578172611122926, .016083785148742275, .0006587491615298378, .016315387137302097]],
				    c = [[23.601290952344122, 244.02463793444417, 1282.6165260773723, 2844.236833439171], [15.744926110709835, 117.6939508913125, 537.1811018620099, 1621.3895745666903, 3290.7992357334597, 4362.619090143247, 3439.3676741437216, 1230.3393548037495], [2.568520192289822, 1.8729528499234604, .5279051029514285, .06051834131244132, .0023352049762686918]],
				    f = Math.pow(2, 53);t.name = "erf", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(433)];
			}, function (e, t, r) {
				e.exports = [r(436), r(120), r(121), r(122), r(123), r(437), r(438), r(439), r(440), r(124), r(125)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e) {
						if (e = i(e.valueOf()), 0 === e.length) throw new Error("Cannot calculate median absolute deviation of an empty array");var t = c(e);return c(u(e, function (e) {
							return s(f(e, t));
						}));
					}var s = n(r(26)),
					    u = n(r(69)),
					    c = n(r(122)),
					    f = n(r(20)),
					    l = a("mad", { "Array | Matrix": o, "...": function _(e) {
							return o(e);
						} });return l.toTex = void 0, l;
				}var i = r(7).flatten;t.name = "mad", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					function a(e) {
						e = i(e.valueOf());var t = e.length;if (0 == t) throw new Error("Cannot calculate mode of an empty array");var r = {},
						    n = [],
						    a = 0;for (var o in e) {
							e[o] in r || (r[e[o]] = 0), r[e[o]]++, r[e[o]] == a ? n.push(e[o]) : r[e[o]] > a && (a = r[e[o]], n = [e[o]]);
						}return n;
					}var o = n("mode", { "Array | Matrix": a, "...": function _(e) {
							return a(e);
						} });return o;
				}var i = r(7).flatten;t.name = "mode", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					function o(e) {
						var t = void 0;if (i(e, function (e) {
							t = void 0 === t ? e : s(t, e);
						}), void 0 === t) throw new Error("Cannot calculate prod of an empty array");return t;
					}var s = n(r(22)),
					    u = a("prod", { "Array | Matrix": o, "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(e, t) {
							throw new Error("prod(A, dim) is not yet supported");
						}, "...": function _(e) {
							return o(e);
						} });return u.toTex = void 0, u;
				}var i = r(36);t.name = "prod", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, u) {
					function c(t, r, n) {
						var o, u, c;if (arguments.length < 2 || arguments.length > 3) throw new SyntaxError("Function quantileSeq requires two or three parameters");if (s(t)) {
							if (n = n || !1, "boolean" == typeof n) {
								if (u = t.valueOf(), a(r)) {
									if (r < 0) throw new Error("N/prob must be non-negative");if (r <= 1) return f(u, r, n);if (r > 1) {
										if (!i(r)) throw new Error("N must be a positive integer");var l = r + 1;o = new Array(r);for (var p = 0; p < r;) {
											o[p] = f(u, ++p / l, n);
										}return o;
									}
								}if (r && r.isBigNumber) {
									if (r.isNegative()) throw new Error("N/prob must be non-negative");if (c = new r.constructor(1), r.lte(c)) return f(u, r, n);if (r.gt(c)) {
										if (!r.isInteger()) throw new Error("N must be a positive integer");var h = r.toNumber();if (h > 4294967295) throw new Error("N must be less than or equal to 2^32-1, as that is the maximum length of an Array");var l = new e.BigNumber(h + 1);o = new Array(h);for (var p = 0; p < h;) {
											o[p] = f(u, new e.BigNumber(++p).div(l), n);
										}return o;
									}
								}if (Array.isArray(r)) {
									o = new Array(r.length);for (var p = 0; p < o.length; ++p) {
										var m = r[p];if (a(m)) {
											if (m < 0 || m > 1) throw new Error("Probability must be between 0 and 1, inclusive");
										} else {
											if (!m || !m.isBigNumber) throw new TypeError("Unexpected type of argument in function quantileSeq");if (c = new m.constructor(1), m.isNegative() || m.gt(c)) throw new Error("Probability must be between 0 and 1, inclusive");
										}o[p] = f(u, m, n);
									}return o;
								}throw new TypeError("Unexpected type of argument in function quantileSeq");
							}throw new TypeError("Unexpected type of argument in function quantileSeq");
						}throw new TypeError("Unexpected type of argument in function quantileSeq");
					}function f(e, t, r) {
						var n = o(e),
						    i = n.length;if (0 === i) throw new Error("Cannot calculate quantile of an empty sequence");if (a(t)) {
							var s = t * (i - 1),
							    u = s % 1;if (0 === u) {
								var c = r ? n[s] : h(n, s);return d(c), c;
							}var f,
							    g,
							    v = Math.floor(s);if (r) f = n[v], g = n[v + 1];else {
								g = h(n, v + 1), f = n[v];for (var y = 0; y < v; ++y) {
									m(n[y], f) > 0 && (f = n[y]);
								}
							}return d(f), d(g), l(p(f, 1 - u), p(g, u));
						}var s = t.times(i - 1);if (s.isInteger()) {
							s = s.toNumber();var c = r ? n[s] : h(n, s);return d(c), c;
						}var f,
						    g,
						    v = s.floor(),
						    u = s.minus(v),
						    x = v.toNumber();if (r) f = n[x], g = n[x + 1];else {
							g = h(n, x + 1), f = n[x];for (var y = 0; y < x; ++y) {
								m(n[y], f) > 0 && (f = n[y]);
							}
						}d(f), d(g);var w = new u.constructor(1);return l(p(f, w.minus(u)), p(g, u));
					}var l = n(r(17)),
					    p = n(r(11)),
					    h = n(r(70)),
					    m = n(r(49)),
					    d = u({ "number | BigNumber | Unit": function numberBigNumberUnit(e) {
							return e;
						} });return c;
				}var i = r(2).isInteger,
				    a = r(2).isNumber,
				    o = r(7).flatten,
				    s = r(42);t.name = "quantileSeq", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a(e, t) {
						if (0 == e.length) throw new SyntaxError("Function std requires one or more parameters (0 provided)");return o(s.apply(null, arguments));
					}var o = n(r(48)),
					    s = n(r(125)),
					    u = i("std", { "Array | Matrix": a, "Array | Matrix, string": a, "...": function _(e) {
							return a(e);
						} });return u.toTex = void 0, u;
				}t.name = "std", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(126), r(442)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("print", { "string, Object": i, "string, Object, number | Object": i });return a.toTex = void 0, a;
				}function i(e, t, r) {
					return e.replace(/\$([\w\.]+)/g, function (e, n) {
						for (var i = n.split("."), s = t[i.shift()]; i.length && void 0 !== s;) {
							var u = i.shift();s = u ? s[u] : s + ".";
						}return void 0 !== s ? a(s) ? s : o(s, r) : e;
					});
				}var a = r(12).isString,
				    o = r(12).format;t.name = "print", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("acos", { number: function number(r) {
							return r >= -1 && r <= 1 || t.predictable ? Math.acos(r) : new e.Complex(r, 0).acos();
						}, Complex: function Complex(e) {
							return e.acos();
						}, BigNumber: function BigNumber(e) {
							return e.acos();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\cos^{-1}\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "acos", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("acot", { number: function number(e) {
							return Math.atan(1 / e);
						}, Complex: function Complex(e) {
							return e.acot();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t).atan();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\cot^{-1}\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "acot", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("acoth", { number: function number(r) {
							return r >= 1 || r <= -1 || t.predictable ? isFinite(r) ? (Math.log((r + 1) / r) + Math.log(r / (r - 1))) / 2 : 0 : new e.Complex(r, 0).acoth();
						}, Complex: function Complex(e) {
							return e.acoth();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t).atanh();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\coth^{-1}\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "acoth", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("acsc", { number: function number(r) {
							return r <= -1 || r >= 1 || t.predictable ? Math.asin(1 / r) : new e.Complex(r, 0).acsc();
						}, Complex: function Complex(e) {
							return e.acsc();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t).asin();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\csc^{-1}\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "acsc", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("acsch", { number: function number(e) {
							return e = 1 / e, Math.log(e + Math.sqrt(e * e + 1));
						}, Complex: function Complex(e) {
							return e.acsch();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t).asinh();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\mathrm{csch}^{-1}\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "acsch", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("asec", { number: function number(r) {
							return r <= -1 || r >= 1 || t.predictable ? Math.acos(1 / r) : new e.Complex(r, 0).asec();
						}, Complex: function Complex(e) {
							return e.asec();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t).acos();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\sec^{-1}\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "asec", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = (a.find(n(r(127)), ["Complex"]), a("asech", { number: function number(r) {
							if (r <= 1 && r >= -1 || t.predictable) {
								r = 1 / r;var n = Math.sqrt(r * r - 1);return r > 0 || t.predictable ? Math.log(n + r) : new e.Complex(Math.log(n - r), Math.PI);
							}return new e.Complex(r, 0).asech();
						}, Complex: function Complex(e) {
							return e.asech();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t).acosh();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, o);
						} }));return o.toTex = { 1: "\\mathrm{sech}^{-1}\\left(${args[0]}\\right)" }, o;
				}var i = r(1);t.name = "asech", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("asin", { number: function number(r) {
							return r >= -1 && r <= 1 || t.predictable ? Math.asin(r) : new e.Complex(r, 0).asin();
						}, Complex: function Complex(e) {
							return e.asin();
						}, BigNumber: function BigNumber(e) {
							return e.asin();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a, !0);
						} });return a.toTex = { 1: "\\sin^{-1}\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "asin", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("asinh", { number: Math.asinh || function (e) {
							return Math.log(Math.sqrt(e * e + 1) + e);
						}, Complex: function Complex(e) {
							return e.asinh();
						}, BigNumber: function BigNumber(e) {
							return e.asinh();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a, !0);
						} });return a.toTex = { 1: "\\sinh^{-1}\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "asinh", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("atan", { number: function number(e) {
							return Math.atan(e);
						}, Complex: function Complex(e) {
							return e.atan();
						}, BigNumber: function BigNumber(e) {
							return e.atan();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a, !0);
						} });return a.toTex = { 1: "\\tan^{-1}\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "atan", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = n(r(0)),
					    o = n(r(23)),
					    s = n(r(14)),
					    u = n(r(134)),
					    c = n(r(15)),
					    f = n(r(16)),
					    l = n(r(8)),
					    p = n(r(4)),
					    h = i("atan2", { "number, number": Math.atan2, "BigNumber, BigNumber": function BigNumberBigNumber(t, r) {
							return e.BigNumber.atan2(t, r);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							var r;switch (e.storage()) {case "sparse":
									switch (t.storage()) {case "sparse":
											r = u(e, t, h, !1);break;default:
											r = o(t, e, h, !0);}break;default:
									switch (t.storage()) {case "sparse":
											r = s(e, t, h, !1);break;default:
											r = l(e, t, h);}}return r;
						}, "Array, Array": function ArrayArray(e, t) {
							return h(a(e), a(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return h(a(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return h(e, a(t));
						}, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
							var r;switch (e.storage()) {case "sparse":
									r = c(e, t, h, !1);break;default:
									r = p(e, t, h, !1);}return r;
						}, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
							var r;switch (t.storage()) {case "sparse":
									r = f(t, e, h, !0);break;default:
									r = p(t, e, h, !0);}return r;
						}, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
							return p(a(e), t, h, !1).valueOf();
						}, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
							return p(a(t), e, h, !0).valueOf();
						} });return h.toTex = { 2: "\\mathrm{atan2}\\left(${args}\\right)" }, h;
				}t.name = "atan2", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("atanh", { number: function number(r) {
							return r <= 1 && r >= -1 || t.predictable ? a(r) : new e.Complex(r, 0).atanh();
						}, Complex: function Complex(e) {
							return e.atanh();
						}, BigNumber: function BigNumber(e) {
							return e.atanh();
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, o, !0);
						} });return o.toTex = { 1: "\\tanh^{-1}\\left(${args[0]}\\right)" }, o;
				}var i = r(1),
				    a = Math.atanh || function (e) {
					return Math.log((1 + e) / (1 - e)) / 2;
				};t.name = "atanh", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("cos", { number: Math.cos, Complex: function Complex(e) {
							return e.cos();
						}, BigNumber: function BigNumber(e) {
							return e.cos();
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cos is no angle");return a(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\cos\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "cos", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("cosh", { number: a, Complex: function Complex(e) {
							return e.cosh();
						}, BigNumber: function BigNumber(e) {
							return e.cosh();
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cosh is no angle");return o(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, o);
						} });return o.toTex = { 1: "\\cosh\\left(${args[0]}\\right)" }, o;
				}var i = r(1),
				    a = Math.cosh || function (e) {
					return (Math.exp(e) + Math.exp(-e)) / 2;
				};t.name = "cosh", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("cot", { number: function number(e) {
							return 1 / Math.tan(e);
						}, Complex: function Complex(e) {
							return e.cot();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t.tan());
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");return a(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\cot\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "cot", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("coth", { number: i, Complex: function Complex(e) {
							return e.coth();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t.tanh());
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function coth is no angle");return o(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return a(e, o);
						} });return o.toTex = { 1: "\\coth\\left(${args[0]}\\right)" }, o;
				}function i(e) {
					var t = Math.exp(2 * e);return (t + 1) / (t - 1);
				}var a = r(1);t.name = "coth", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("csc", { number: function number(e) {
							return 1 / Math.sin(e);
						}, Complex: function Complex(e) {
							return e.csc();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t.sin());
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function csc is no angle");return a(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\csc\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "csc", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("csch", { number: i, Complex: function Complex(e) {
							return e.csch();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t.sinh());
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function csch is no angle");return o(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return a(e, o);
						} });return o.toTex = { 1: "\\mathrm{csch}\\left(${args[0]}\\right)" }, o;
				}function i(e) {
					return 0 == e ? Number.POSITIVE_INFINITY : Math.abs(2 / (Math.exp(e) - Math.exp(-e))) * o(e);
				}var a = r(1),
				    o = r(2).sign;t.name = "csch", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(443), r(127), r(444), r(445), r(446), r(447), r(448), r(449), r(450), r(451), r(452), r(453), r(454), r(455), r(456), r(457), r(458), r(459), r(460), r(462), r(463), r(464), r(465), r(466), r(467)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("sec", { number: function number(e) {
							return 1 / Math.cos(e);
						}, Complex: function Complex(e) {
							return e.sec();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t.cos());
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sec is no angle");return a(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\sec\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "sec", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("sech", { number: i, Complex: function Complex(e) {
							return e.sech();
						}, BigNumber: function BigNumber(t) {
							return new e.BigNumber(1).div(t.cosh());
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sech is no angle");return o(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return a(e, o);
						} });return o.toTex = { 1: "\\mathrm{sech}\\left(${args[0]}\\right)" }, o;
				}function i(e) {
					return 2 / (Math.exp(e) + Math.exp(-e));
				}var a = r(1);t.name = "sech", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("sin", { number: Math.sin, Complex: function Complex(e) {
							return e.sin();
						}, BigNumber: function BigNumber(e) {
							return e.sin();
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sin is no angle");return a(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a, !0);
						} });return a.toTex = { 1: "\\sin\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "sin", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("sinh", { number: a, Complex: function Complex(e) {
							return e.sinh();
						}, BigNumber: function BigNumber(e) {
							return e.sinh();
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sinh is no angle");return o(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, o, !0);
						} });return o.toTex = { 1: "\\sinh\\left(${args[0]}\\right)" }, o;
				}var i = r(1),
				    a = Math.sinh || function (e) {
					return (Math.exp(e) - Math.exp(-e)) / 2;
				};t.name = "sinh", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("tan", { number: Math.tan, Complex: function Complex(e) {
							return e.tan();
						}, BigNumber: function BigNumber(e) {
							return e.tan();
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function tan is no angle");return a(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a, !0);
						} });return a.toTex = { 1: "\\tan\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "tan", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("tanh", { number: a, Complex: function Complex(e) {
							return e.tanh();
						}, BigNumber: function BigNumber(e) {
							return e.tanh();
						}, Unit: function Unit(t) {
							if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function tanh is no angle");return o(t.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, o, !0);
						} });return o.toTex = { 1: "\\tanh\\left(${args[0]}\\right)" }, o;
				}var i = r(1),
				    a = Math.tanh || function (e) {
					var t = Math.exp(2 * e);return (t - 1) / (t + 1);
				};t.name = "tanh", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(469)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					var a = r(3),
					    o = n(r(0)),
					    s = n(r(8)),
					    u = n(r(4)),
					    c = i("to", { "Unit, Unit | string": function UnitUnitString(e, t) {
							return e.to(t);
						}, "Matrix, Matrix": function MatrixMatrix(e, t) {
							return s(e, t, c);
						}, "Array, Array": function ArrayArray(e, t) {
							return c(o(e), o(t)).valueOf();
						}, "Array, Matrix": function ArrayMatrix(e, t) {
							return c(o(e), t);
						}, "Matrix, Array": function MatrixArray(e, t) {
							return c(e, o(t));
						}, "Matrix, any": function MatrixAny(e, t) {
							return u(e, t, c, !1);
						}, "any, Matrix": function anyMatrix(e, t) {
							return u(t, e, c, !0);
						}, "Array, any": function ArrayAny(e, t) {
							return u(o(e), t, c, !1).valueOf();
						}, "any, Array": function anyArray(e, t) {
							return u(o(t), e, c, !0).valueOf();
						} });return c.toTex = { 2: "\\left(${args[0]}" + a.operators.to + "${args[1]}\\right)" }, c;
				}t.name = "to", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(128), r(41), r(50), r(73), r(51), r(472), r(74), r(471), r(129)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("isNaN", { number: function number(e) {
							return Number.isNaN(e);
						}, BigNumber: function BigNumber(e) {
							return e.isNaN();
						}, Fraction: function Fraction(e) {
							return !1;
						}, Complex: function Complex(e) {
							return Number.isNaN(e.re) && Number.isNaN(e.im);
						}, Unit: function Unit(e) {
							return Number.isNaN(e.value);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, Number.isNaN);
						} });return a;
				}var i = r(1);r(2);t.name = "isNaN", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("isPrime", { number: function number(e) {
							if (e < 2) return !1;if (2 == e) return !0;if (e % 2 == 0) return !1;for (var t = 3; t * t <= e; t += 2) {
								if (e % t == 0) return !1;
							}return !0;
						}, BigNumber: function BigNumber(t) {
							if (t.lt(2)) return !1;if (t.equals(2)) return !0;if (t.mod(2).isZero()) return !1;for (var r = e.BigNumber(3); r.times(r).lte(t); r = r.plus(1)) {
								if (t.mod(r).isZero()) return !1;
							}return !0;
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a;
				}var i = r(1);t.name = "isPrime", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(474)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					return function (t, r) {
						var n = e[r && r.mathjs];return n && "function" == typeof n.fromJSON ? n.fromJSON(r) : r;
					};
				}t.name = "reviver", t.path = "json", t.factory = n;
			}, function (e, t, r) {
				function n(e, t, r, n, a) {
					var o = i.clone({ precision: t.precision });return o.prototype.type = "BigNumber", o.prototype.isBigNumber = !0, o.prototype.toJSON = function () {
						return { mathjs: "BigNumber", value: this.toString() };
					}, o.fromJSON = function (e) {
						return new o(e.value);
					}, a.on("config", function (e, t) {
						e.precision !== t.precision && o.config({ precision: e.precision });
					}), o;
				}var i = r(512);t.name = "BigNumber", t.path = "type", t.factory = n, t.math = !0;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("bignumber", { "": function _() {
							return new e.BigNumber(0);
						}, number: function number(t) {
							return new e.BigNumber(t + "");
						}, string: function string(t) {
							return new e.BigNumber(t);
						}, BigNumber: function BigNumber(e) {
							return e;
						}, Fraction: function Fraction(t) {
							return new e.BigNumber(t.n).div(t.d);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 0: "0", 1: "\\left(${args[0]}\\right)" }, a;
				}var i = r(1);t.name = "bignumber", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(475), r(476)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("bool", { "": function _() {
							return !1;
						}, boolean: function boolean(e) {
							return e;
						}, number: function number(e) {
							return !!e;
						}, BigNumber: function BigNumber(e) {
							return !e.isZero();
						}, string: function string(e) {
							var t = e.toLowerCase();if ("true" === t) return !0;if ("false" === t) return !1;var r = Number(e);if ("" != e && !isNaN(r)) return !!r;throw new Error('Cannot convert "' + e + '" to a boolean');
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a;
				}var i = r(1);t.name = "boolean", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n, o) {
					function s(e) {
						if (!(this instanceof s)) throw new SyntaxError("Constructor must be called with the new operator");e && e.isChain ? this.value = e.value : this.value = e;
					}function u(e, t) {
						"function" == typeof t && (s.prototype[e] = f(t));
					}function c(e, t) {
						a(s.prototype, e, function () {
							var e = t();if ("function" == typeof e) return f(e);
						});
					}function f(e) {
						return function () {
							for (var t = [this.value], r = 0; r < arguments.length; r++) {
								t[r + 1] = arguments[r];
							}return new s(e.apply(e, t));
						};
					}return s.prototype.type = "Chain", s.prototype.isChain = !0, s.prototype.done = function () {
						return this.value;
					}, s.prototype.valueOf = function () {
						return this.value;
					}, s.prototype.toString = function () {
						return i(this.value);
					}, s.createProxy = function (e, t) {
						if ("string" == typeof e) u(e, t);else for (var r in e) {
							e.hasOwnProperty(r) && u(r, e[r]);
						}
					}, s.createProxy(o), o.on("import", function (e, t, r) {
						void 0 === r && c(e, t);
					}), s;
				}var i = r(12).format,
				    a = r(6).lazy;t.name = "Chain", t.path = "type", t.factory = n, t.math = !0, t.lazy = !1;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					return n("chain", { "": function _() {
							return new e.Chain();
						}, any: function any(t) {
							return new e.Chain(t);
						} });
				}t.name = "chain", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(479), r(480)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, a) {
					var o = r(3),
					    s = a("complex", { "": function _() {
							return e.Complex.ZERO;
						}, number: function number(t) {
							return new e.Complex(t, 0);
						}, "number, number": function numberNumber(t, r) {
							return new e.Complex(t, r);
						}, "BigNumber, BigNumber": function BigNumberBigNumber(t, r) {
							return new e.Complex(t.toNumber(), r.toNumber());
						}, Complex: function Complex(e) {
							return e.clone();
						}, string: function string(t) {
							return e.Complex(t);
						}, Object: function Object(t) {
							if ("re" in t && "im" in t) return new e.Complex(t.re, t.im);if ("r" in t && "phi" in t) return new e.Complex(t);throw new Error("Expected object with either properties re and im, or properties r and phi.");
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, s);
						} });return s.toTex = { 0: "0", 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)+" + o.symbols.i + "\\cdot\\left(${args[1]}\\right)\\right)" }, s;
				}var i = r(1);t.name = "complex", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(130), r(482)];
			}, function (e, t, r) {
				function n(e, t, r, n) {
					return i;
				}var i = r(513);i.prototype.type = "Fraction", i.prototype.isFraction = !0, i.prototype.toJSON = function () {
					return { mathjs: "Fraction", n: this.s * this.n, d: this.d };
				}, i.fromJSON = function (e) {
					return new i(e);
				}, t.name = "Fraction", t.path = "type", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(484), r(131)];
			}, function (e, t, r) {
				e.exports = [r(477), r(478), r(481), r(483), r(485), r(494), r(78), r(495), r(496), r(500)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, i) {
					function a() {
						if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");this._minimum = null, this._size = 0;
					}var o = n(r(40)),
					    s = n(r(28)),
					    u = 1 / Math.log((1 + Math.sqrt(5)) / 2);a.prototype.type = "FibonacciHeap", a.prototype.isFibonacciHeap = !0, a.prototype.insert = function (e, t) {
						var r = { key: e, value: t, degree: 0 };if (this._minimum) {
							var n = this._minimum;r.left = n, r.right = n.right, n.right = r, r.right.left = r, o(e, n.key) && (this._minimum = r);
						} else r.left = r, r.right = r, this._minimum = r;return this._size++, r;
					}, a.prototype.size = function () {
						return this._size;
					}, a.prototype.clear = function () {
						this._minimum = null, this._size = 0;
					}, a.prototype.isEmpty = function () {
						return !!this._minimum;
					}, a.prototype.extractMinimum = function () {
						var e = this._minimum;if (null === e) return e;for (var t = this._minimum, r = e.degree, n = e.child; r > 0;) {
							var i = n.right;n.left.right = n.right, n.right.left = n.left, n.left = t, n.right = t.right, t.right = n, n.right.left = n, n.parent = null, n = i, r--;
						}return e.left.right = e.right, e.right.left = e.left, e == e.right ? t = null : (t = e.right, t = h(t, this._size)), this._size--, this._minimum = t, e;
					}, a.prototype.remove = function (e) {
						this._minimum = c(this._minimum, e, -1), this.extractMinimum();
					};var c = function c(e, t, r) {
						t.key = r;var n = t.parent;return n && o(t.key, n.key) && (f(e, t, n), l(e, n)), o(t.key, e.key) && (e = t), e;
					},
					    f = function f(e, t, r) {
						t.left.right = t.right, t.right.left = t.left, r.degree--, r.child == t && (r.child = t.right), 0 === r.degree && (r.child = null), t.left = e, t.right = e.right, e.right = t, t.right.left = t, t.parent = null, t.mark = !1;
					},
					    l = function l(e, t) {
						var r = t.parent;r && (t.mark ? (f(e, t, r), l(r)) : t.mark = !0);
					},
					    p = function p(e, t) {
						e.left.right = e.right, e.right.left = e.left, e.parent = t, t.child ? (e.left = t.child, e.right = t.child.right, t.child.right = e, e.right.left = e) : (t.child = e, e.right = e, e.left = e), t.degree++, e.mark = !1;
					},
					    h = function h(e, t) {
						var r = Math.floor(Math.log(t) * u) + 1,
						    n = new Array(r),
						    i = 0,
						    a = e;if (a) for (i++, a = a.right; a !== e;) {
							i++, a = a.right;
						}for (var c; i > 0;) {
							for (var f = a.degree, l = a.right;;) {
								if (c = n[f], !c) break;if (s(a.key, c.key)) {
									var h = c;c = a, a = h;
								}p(c, a), n[f] = null, f++;
							}n[f] = a, a = l, i--;
						}e = null;for (var m = 0; m < r; m++) {
							c = n[m], c && (e ? (c.left.right = c.right, c.right.left = c.left, c.left = e, c.right = e.right, e.right = c, c.right.left = c, o(c.key, e.key) && (e = c)) : e = c);
						}return e;
					};return a;
				}t.name = "FibonacciHeap", t.path = "type", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					function a(e, t) {
						if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (t && !u(t)) throw new Error("Invalid datatype: " + t);if (e && e.isMatrix === !0 || s(e)) {
							var r = new c(e, t);this._data = r._data, this._size = r._size, this._datatype = r._datatype, this._min = null, this._max = null;
						} else if (e && s(e.data) && s(e.size)) this._data = e.data, this._size = e.size, this._datatype = e.datatype, this._min = "undefined" != typeof e.min ? e.min : null, this._max = "undefined" != typeof e.max ? e.max : null;else {
							if (e) throw new TypeError("Unsupported type of data (" + i.types.type(e) + ")");this._data = [], this._size = [0], this._datatype = t, this._min = null, this._max = null;
						}
					}var c = n(r(132)),
					    f = n(r(40));return a.prototype = new c(), a.prototype.type = "ImmutableDenseMatrix", a.prototype.isImmutableDenseMatrix = !0, a.prototype.subset = function (e) {
						switch (arguments.length) {case 1:
								var t = c.prototype.subset.call(this, e);return t.isMatrix ? new a({ data: t._data, size: t._size, datatype: t._datatype }) : t;case 2:case 3:
								throw new Error("Cannot invoke set subset on an Immutable Matrix instance");default:
								throw new SyntaxError("Wrong number of arguments");}
					}, a.prototype.set = function () {
						throw new Error("Cannot invoke set on an Immutable Matrix instance");
					}, a.prototype.resize = function () {
						throw new Error("Cannot invoke resize on an Immutable Matrix instance");
					}, a.prototype.reshape = function () {
						throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
					}, a.prototype.clone = function () {
						var e = new a({ data: o.clone(this._data), size: o.clone(this._size), datatype: this._datatype });return e;
					}, a.prototype.toJSON = function () {
						return { mathjs: "ImmutableDenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
					}, a.fromJSON = function (e) {
						return new a(e);
					}, a.prototype.swapRows = function () {
						throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
					}, a.prototype.min = function () {
						if (null === this._min) {
							var e = null;this.forEach(function (t) {
								(null === e || f(t, e)) && (e = t);
							}), this._min = null !== e ? e : void 0;
						}return this._min;
					}, a.prototype.max = function () {
						if (null === this._max) {
							var e = null;this.forEach(function (t) {
								(null === e || f(e, t)) && (e = t);
							}), this._max = null !== e ? e : void 0;
						}return this._max;
					}, a;
				}var i = r(25),
				    a = i.string,
				    o = i.object,
				    s = Array.isArray,
				    u = a.isString;t.name = "ImmutableDenseMatrix", t.path = "type", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e) {
					function t(e) {
						if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");this._dimensions = [], this._isScalar = !0;for (var n = 0, i = arguments.length; n < i; n++) {
							var a = arguments[n];if (a && a.isRange === !0) this._dimensions.push(a), this._isScalar = !1;else if (a && (Array.isArray(a) || a.isMatrix === !0)) {
								var o = r(a.valueOf());this._dimensions.push(o);var s = o.size();1 === s.length && 1 === s[0] || (this._isScalar = !1);
							} else if ("number" == typeof a) this._dimensions.push(r([a]));else {
								if ("string" != typeof a) throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");this._dimensions.push(a);
							}
						}
					}function r(t) {
						for (var r = 0, n = t.length; r < n; r++) {
							if ("number" != typeof t[r] || !a(t[r])) throw new TypeError("Index parameters must be positive integer numbers");
						}return new e.ImmutableDenseMatrix(t);
					}return t.prototype.type = "Index", t.prototype.isIndex = !0, t.prototype.clone = function () {
						var e = new t();return e._dimensions = i(this._dimensions), e._isScalar = this._isScalar, e;
					}, t.create = function (e) {
						var r = new t();return t.apply(r, e), r;
					}, t.prototype.size = function () {
						for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
							var n = this._dimensions[t];e[t] = "string" == typeof n ? 1 : n.size()[0];
						}return e;
					}, t.prototype.max = function () {
						for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
							var n = this._dimensions[t];e[t] = "string" == typeof n ? n : n.max();
						}return e;
					}, t.prototype.min = function () {
						for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
							var n = this._dimensions[t];e[t] = "string" == typeof n ? n : n.min();
						}return e;
					}, t.prototype.forEach = function (e) {
						for (var t = 0, r = this._dimensions.length; t < r; t++) {
							e(this._dimensions[t], t, this);
						}
					}, t.prototype.dimension = function (e) {
						return this._dimensions[e] || null;
					}, t.prototype.isObjectProperty = function () {
						return 1 === this._dimensions.length && "string" == typeof this._dimensions[0];
					}, t.prototype.getObjectProperty = function () {
						return this.isObjectProperty() ? this._dimensions[0] : null;
					}, t.prototype.isScalar = function () {
						return this._isScalar;
					}, t.prototype.toArray = function () {
						for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
							var n = this._dimensions[t];e.push("string" == typeof n ? n : n.toArray());
						}return e;
					}, t.prototype.valueOf = t.prototype.toArray, t.prototype.toString = function () {
						for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
							var n = this._dimensions[t];"string" == typeof n ? e.push(JSON.stringify(n)) : e.push(n.toString());
						}return "[" + e.join(", ") + "]";
					}, t.prototype.toJSON = function () {
						return { mathjs: "Index", dimensions: this._dimensions };
					}, t.fromJSON = function (e) {
						return t.create(e.dimensions);
					}, t;
				}var i = r(6).clone,
				    a = r(2).isInteger;t.name = "Index", t.path = "type", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n) {
					function i() {
						if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");this._values = [], this._heap = new e.FibonacciHeap();
					}var a = n(r(17)),
					    o = n(r(10));return i.prototype.type = "Spa", i.prototype.isSpa = !0, i.prototype.set = function (e, t) {
						if (this._values[e]) this._values[e].value = t;else {
							var r = this._heap.insert(e, t);this._values[e] = r;
						}
					}, i.prototype.get = function (e) {
						var t = this._values[e];return t ? t.value : 0;
					}, i.prototype.accumulate = function (e, t) {
						var r = this._values[e];r ? r.value = a(r.value, t) : (r = this._heap.insert(e, t), this._values[e] = r);
					}, i.prototype.forEach = function (e, t, r) {
						var n = this._heap,
						    i = this._values,
						    a = [],
						    s = n.extractMinimum();for (s && a.push(s); s && s.key <= t;) {
							s.key >= e && (o(s.value, 0) || r(s.key, s.value, this)), s = n.extractMinimum(), s && a.push(s);
						}for (var u = 0; u < a.length; u++) {
							var c = a[u];s = n.insert(c.key, c.value), i[s.key] = s;
						}
					}, i.prototype.swap = function (e, t) {
						var r = this._values[e],
						    n = this._values[t];if (!r && n) r = this._heap.insert(e, n.value), this._heap.remove(n), this._values[e] = r, this._values[t] = void 0;else if (r && !n) n = this._heap.insert(t, r.value), this._heap.remove(r), this._values[t] = n, this._values[e] = void 0;else if (r && n) {
							var i = r.value;r.value = n.value, n.value = i;
						}
					}, i;
				}t.name = "Spa", t.path = "type", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, n, d) {
					function g(e, t) {
						if (!(this instanceof g)) throw new SyntaxError("Constructor must be called with the new operator");if (t && !h(t)) throw new Error("Invalid datatype: " + t);if (e && e.isMatrix === !0) x(this, e, t);else if (e && f(e.index) && f(e.ptr) && f(e.size)) this._values = e.values, this._index = e.index, this._ptr = e.ptr, this._size = e.size, this._datatype = t || e.datatype;else if (f(e)) w(this, e, t);else {
							if (e) throw new TypeError("Unsupported type of data (" + i.types.type(e) + ")");this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = t;
						}
					}var v = n(r(75)),
					    y = n(r(10)),
					    x = function x(e, t, r) {
						"SparseMatrix" === t.type ? (e._values = t._values ? s.clone(t._values) : void 0, e._index = s.clone(t._index), e._ptr = s.clone(t._ptr), e._size = s.clone(t._size), e._datatype = r || t._datatype) : w(e, t.valueOf(), r || t._datatype);
					},
					    w = function w(e, t, r) {
						e._values = [], e._index = [], e._ptr = [], e._datatype = r;var n = t.length,
						    i = 0,
						    a = y,
						    o = 0;if (h(r) && (a = d.find(y, [r, r]) || y, o = d.convert(0, r)), n > 0) {
							var s = 0;do {
								e._ptr.push(e._index.length);for (var u = 0; u < n; u++) {
									var c = t[u];if (f(c)) {
										if (0 === s && i < c.length && (i = c.length), s < c.length) {
											var l = c[s];a(l, o) || (e._values.push(l), e._index.push(u));
										}
									} else 0 === s && i < 1 && (i = 1), a(c, o) || (e._values.push(c), e._index.push(u));
								}s++;
							} while (s < i);
						}e._ptr.push(e._index.length), e._size = [n, i];
					};g.prototype = new v(), g.prototype.type = "SparseMatrix", g.prototype.isSparseMatrix = !0, g.prototype.storage = function () {
						return "sparse";
					}, g.prototype.datatype = function () {
						return this._datatype;
					}, g.prototype.create = function (e, t) {
						return new g(e, t);
					}, g.prototype.density = function () {
						var e = this._size[0],
						    t = this._size[1];return 0 !== e && 0 !== t ? this._index.length / (e * t) : 0;
					}, g.prototype.subset = function (e, t, r) {
						if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");switch (arguments.length) {case 1:
								return b(this, e);case 2:case 3:
								return N(this, e, t, r);default:
								throw new SyntaxError("Wrong number of arguments");}
					};var b = function b(e, t) {
						if (!t || t.isIndex !== !0) throw new TypeError("Invalid index");var r = t.isScalar();if (r) return e.get(t.min());var n = t.size();if (n.length != e._size.length) throw new a(n.length, e._size.length);var i,
						    o,
						    s,
						    u,
						    c = t.min(),
						    f = t.max();for (i = 0, o = e._size.length; i < o; i++) {
							m(c[i], e._size[i]), m(f[i], e._size[i]);
						}var l = e._values,
						    p = e._index,
						    h = e._ptr,
						    d = t.dimension(0),
						    v = t.dimension(1),
						    y = [],
						    x = [];d.forEach(function (e, t) {
							x[e] = t[0], y[e] = !0;
						});var w = l ? [] : void 0,
						    b = [],
						    N = [];return v.forEach(function (e) {
							for (N.push(b.length), s = h[e], u = h[e + 1]; s < u; s++) {
								i = p[s], y[i] === !0 && (b.push(x[i]), w && w.push(l[s]));
							}
						}), N.push(b.length), new g({ values: w, index: b, ptr: N, size: n, datatype: e._datatype });
					},
					    N = function N(e, t, r, n) {
						if (!t || t.isIndex !== !0) throw new TypeError("Invalid index");var i,
						    u = t.size(),
						    c = t.isScalar();if (r && r.isMatrix === !0 ? (i = r.size(), r = r.toArray()) : i = o.size(r), c) {
							if (0 !== i.length) throw new TypeError("Scalar expected");e.set(t.min(), r, n);
						} else {
							if (1 !== u.length && 2 !== u.length) throw new a(u.length, e._size.length, "<");if (i.length < u.length) {
								for (var f = 0, l = 0; 1 === u[f] && 1 === i[f];) {
									f++;
								}for (; 1 === u[f];) {
									l++, f++;
								}r = o.unsqueeze(r, u.length, l, i);
							}if (!s.deepEqual(u, i)) throw new a(u, i, ">");for (var p = t.min()[0], h = t.min()[1], m = i[0], d = i[1], g = 0; g < m; g++) {
								for (var v = 0; v < d; v++) {
									var y = r[g][v];e.set([g + p, v + h], y, n);
								}
							}
						}return e;
					};g.prototype.get = function (e) {
						if (!f(e)) throw new TypeError("Array expected");if (e.length != this._size.length) throw new a(e.length, this._size.length);if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");var t = e[0],
						    r = e[1];m(t, this._size[0]), m(r, this._size[1]);var n = E(t, this._ptr[r], this._ptr[r + 1], this._index);return n < this._ptr[r + 1] && this._index[n] === t ? this._values[n] : 0;
					}, g.prototype.set = function (e, t, r) {
						if (!f(e)) throw new TypeError("Array expected");if (e.length != this._size.length) throw new a(e.length, this._size.length);if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");var n = e[0],
						    i = e[1],
						    o = this._size[0],
						    s = this._size[1],
						    u = y,
						    c = 0;h(this._datatype) && (u = d.find(y, [this._datatype, this._datatype]) || y, c = d.convert(0, this._datatype)), (n > o - 1 || i > s - 1) && (O(this, Math.max(n + 1, o), Math.max(i + 1, s), r), o = this._size[0], s = this._size[1]), m(n, o), m(i, s);var l = E(n, this._ptr[i], this._ptr[i + 1], this._index);return l < this._ptr[i + 1] && this._index[l] === n ? u(t, c) ? M(l, i, this._values, this._index, this._ptr) : this._values[l] = t : A(l, n, i, t, this._values, this._index, this._ptr), this;
					};var E = function E(e, t, r, n) {
						if (r - t === 0) return r;for (var i = t; i < r; i++) {
							if (n[i] === e) return i;
						}return t;
					},
					    M = function M(e, t, r, n, i) {
						r.splice(e, 1), n.splice(e, 1);for (var a = t + 1; a < i.length; a++) {
							i[a]--;
						}
					},
					    A = function A(e, t, r, n, i, a, o) {
						i.splice(e, 0, n), a.splice(e, 0, t);for (var s = r + 1; s < o.length; s++) {
							o[s]++;
						}
					};g.prototype.resize = function (e, t, r) {
						if (!f(e)) throw new TypeError("Array expected");if (2 !== e.length) throw new Error("Only two dimensions matrix are supported");e.forEach(function (t) {
							if (!c.isNumber(t) || !c.isInteger(t) || t < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + u.format(e) + ")");
						});var n = r ? this.clone() : this;return O(n, e[0], e[1], t);
					};var O = function O(e, t, r, n) {
						var i = n || 0,
						    a = y,
						    o = 0;h(e._datatype) && (a = d.find(y, [e._datatype, e._datatype]) || y, o = d.convert(0, e._datatype), i = d.convert(i, e._datatype));var s,
						    u,
						    c,
						    f = !a(i, o),
						    l = e._size[0],
						    p = e._size[1];if (r > p) {
							for (u = p; u < r; u++) {
								if (e._ptr[u] = e._values.length, f) for (s = 0; s < l; s++) {
									e._values.push(i), e._index.push(s);
								}
							}e._ptr[r] = e._values.length;
						} else r < p && (e._ptr.splice(r + 1, p - r), e._values.splice(e._ptr[r], e._values.length), e._index.splice(e._ptr[r], e._index.length));if (p = r, t > l) {
							if (f) {
								var m = 0;for (u = 0; u < p; u++) {
									e._ptr[u] = e._ptr[u] + m, c = e._ptr[u + 1] + m;var g = 0;for (s = l; s < t; s++, g++) {
										e._values.splice(c + g, 0, i), e._index.splice(c + g, 0, s), m++;
									}
								}e._ptr[p] = e._values.length;
							}
						} else if (t < l) {
							var v = 0;for (u = 0; u < p; u++) {
								e._ptr[u] = e._ptr[u] - v;var x = e._ptr[u],
								    w = e._ptr[u + 1] - v;for (c = x; c < w; c++) {
									s = e._index[c], s > t - 1 && (e._values.splice(c, 1), e._index.splice(c, 1), v++);
								}
							}e._ptr[u] = e._values.length;
						}return e._size[0] = t, e._size[1] = r, e;
					};g.prototype.reshape = function (e, t) {
						if (!f(e)) throw new TypeError("Array expected");if (2 !== e.length) throw new Error("Sparse matrices can only be reshaped in two dimensions");if (e.forEach(function (t) {
							if (!c.isNumber(t) || !c.isInteger(t) || t < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + u.format(e) + ")");
						}), this._size[0] * this._size[1] !== e[0] * e[1]) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");var r = t ? this.clone() : this;if (this._size[0] === e[0] && this._size[1] === e[1]) return r;for (var n = [], i = 0; i < r._ptr.length; i++) {
							for (var a = 0; a < r._ptr[i + 1] - r._ptr[i]; a++) {
								n.push(i);
							}
						}for (var o = r._values.slice(), s = r._index.slice(), i = 0; i < r._index.length; i++) {
							var l = s[i],
							    p = n[i],
							    h = l * r._size[1] + p;n[i] = h % e[1], s[i] = Math.floor(h / e[1]);
						}r._values.length = 0, r._index.length = 0, r._ptr.length = e[1] + 1, r._size = e.slice();for (var i = 0; i < r._ptr.length; i++) {
							r._ptr[i] = 0;
						}for (var m = 0; m < o.length; m++) {
							var i = s[m],
							    a = n[m],
							    d = o[m],
							    g = E(i, r._ptr[a], r._ptr[a + 1], r._index);A(g, i, a, d, r._values, r._index, r._ptr);
						}return r;
					}, g.prototype.clone = function () {
						var e = new g({ values: this._values ? s.clone(this._values) : void 0, index: s.clone(this._index), ptr: s.clone(this._ptr), size: s.clone(this._size), datatype: this._datatype });return e;
					}, g.prototype.size = function () {
						return this._size.slice(0);
					}, g.prototype.map = function (e, t) {
						if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");var r = this,
						    n = this._size[0],
						    i = this._size[1],
						    a = function a(t, n, i) {
							return e(t, [n, i], r);
						};return T(this, 0, n - 1, 0, i - 1, a, t);
					};var T = function T(e, t, r, n, i, a, o) {
						var s = [],
						    u = [],
						    c = [],
						    f = y,
						    l = 0;h(e._datatype) && (f = d.find(y, [e._datatype, e._datatype]) || y, l = d.convert(0, e._datatype));for (var p = function p(e, t, r) {
							e = a(e, t, r), f(e, l) || (s.push(e), u.push(t));
						}, m = n; m <= i; m++) {
							c.push(s.length);for (var v = e._ptr[m], x = e._ptr[m + 1], w = t, b = v; b < x; b++) {
								var N = e._index[b];if (N >= t && N <= r) {
									if (!o) for (var E = w; E < N; E++) {
										p(0, E - t, m - n);
									}p(e._values[b], N - t, m - n);
								}w = N + 1;
							}if (!o) for (var M = w; M <= r; M++) {
								p(0, M - t, m - n);
							}
						}return c.push(s.length), new g({ values: s, index: u, ptr: c, size: [r - t + 1, i - n + 1] });
					};g.prototype.forEach = function (e, t) {
						if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");for (var r = this, n = this._size[0], i = this._size[1], a = 0; a < i; a++) {
							for (var o = this._ptr[a], s = this._ptr[a + 1], u = 0, c = o; c < s; c++) {
								var f = this._index[c];if (!t) for (var l = u; l < f; l++) {
									e(0, [l, a], r);
								}e(this._values[c], [f, a], r), u = f + 1;
							}if (!t) for (var p = u; p < n; p++) {
								e(0, [p, a], r);
							}
						}
					}, g.prototype.toArray = function () {
						return _(this._values, this._index, this._ptr, this._size, !0);
					}, g.prototype.valueOf = function () {
						return _(this._values, this._index, this._ptr, this._size, !1);
					};var _ = function _(e, t, r, n, i) {
						var a,
						    o,
						    u = n[0],
						    c = n[1],
						    f = [];for (a = 0; a < u; a++) {
							for (f[a] = [], o = 0; o < c; o++) {
								f[a][o] = 0;
							}
						}for (o = 0; o < c; o++) {
							for (var l = r[o], p = r[o + 1], h = l; h < p; h++) {
								a = t[h], f[a][o] = e ? i ? s.clone(e[h]) : e[h] : 1;
							}
						}return f;
					};return g.prototype.format = function (e) {
						for (var t = this._size[0], r = this._size[1], n = this.density(), i = "Sparse Matrix [" + u.format(t, e) + " x " + u.format(r, e) + "] density: " + u.format(n, e) + "\n", a = 0; a < r; a++) {
							for (var o = this._ptr[a], s = this._ptr[a + 1], c = o; c < s; c++) {
								var f = this._index[c];i += "\n    (" + u.format(f, e) + ", " + u.format(a, e) + ") ==> " + (this._values ? u.format(this._values[c], e) : "X");
							}
						}return i;
					}, g.prototype.toString = function () {
						return u.format(this.toArray());
					}, g.prototype.toJSON = function () {
						return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype };
					}, g.prototype.diagonal = function (e) {
						if (e) {
							if (e.isBigNumber === !0 && (e = e.toNumber()), !l(e) || !p(e)) throw new TypeError("The parameter k must be an integer number");
						} else e = 0;var t = e > 0 ? e : 0,
						    r = e < 0 ? -e : 0,
						    n = this._size[0],
						    i = this._size[1],
						    a = Math.min(n - r, i - t),
						    o = [],
						    s = [],
						    u = [];u[0] = 0;for (var c = t; c < i && o.length < a; c++) {
							for (var f = this._ptr[c], h = this._ptr[c + 1], m = f; m < h; m++) {
								var d = this._index[m];if (d === c - t + r) {
									o.push(this._values[m]), s[o.length - 1] = d - r;break;
								}
							}
						}return u.push(o.length), new g({ values: o, index: s, ptr: u, size: [a, 1] });
					}, g.fromJSON = function (e) {
						return new g(e);
					}, g.diagonal = function (e, t, r, n, i) {
						if (!f(e)) throw new TypeError("Array expected, size parameter");if (2 !== e.length) throw new Error("Only two dimensions matrix are supported");if (e = e.map(function (e) {
							if (e && e.isBigNumber === !0 && (e = e.toNumber()), !l(e) || !p(e) || e < 1) throw new Error("Size values must be positive integers");return e;
						}), r) {
							if (r.isBigNumber === !0 && (r = r.toNumber()), !l(r) || !p(r)) throw new TypeError("The parameter k must be an integer number");
						} else r = 0;var a = y,
						    o = 0;h(i) && (a = d.find(y, [i, i]) || y, o = d.convert(0, i));var s,
						    u = r > 0 ? r : 0,
						    c = r < 0 ? -r : 0,
						    m = e[0],
						    v = e[1],
						    x = Math.min(m - c, v - u);if (f(t)) {
							if (t.length !== x) throw new Error("Invalid value array length");s = function s(e) {
								return t[e];
							};
						} else if (t && t.isMatrix === !0) {
							var w = t.size();if (1 !== w.length || w[0] !== x) throw new Error("Invalid matrix length");s = function s(e) {
								return t.get([e]);
							};
						} else s = function s() {
							return t;
						};for (var b = [], N = [], E = [], M = 0; M < v; M++) {
							E.push(b.length);var A = M - u;if (A >= 0 && A < x) {
								var O = s(A);a(O, o) || (N.push(A + c), b.push(O));
							}
						}return E.push(b.length), new g({ values: b, index: N, ptr: E, size: [m, v] });
					}, g.prototype.swapRows = function (e, t) {
						if (!(l(e) && p(e) && l(t) && p(t))) throw new Error("Row index must be positive integers");if (2 !== this._size.length) throw new Error("Only two dimensional matrix is supported");return m(e, this._size[0]), m(t, this._size[0]), g._swapRows(e, t, this._size[1], this._values, this._index, this._ptr), this;
					}, g._forEachRow = function (e, t, r, n, i) {
						for (var a = n[e], o = n[e + 1], s = a; s < o; s++) {
							i(r[s], t[s]);
						}
					}, g._swapRows = function (e, t, r, n, i, a) {
						for (var o = 0; o < r; o++) {
							var s = a[o],
							    u = a[o + 1],
							    c = E(e, s, u, i),
							    f = E(t, s, u, i);if (c < u && f < u && i[c] === e && i[f] === t) {
								if (n) {
									var l = n[c];n[c] = n[f], n[f] = l;
								}
							} else if (c < u && i[c] === e && (f >= u || i[f] !== t)) {
								var p = n ? n[c] : void 0;i.splice(f, 0, t), n && n.splice(f, 0, p), i.splice(f <= c ? c + 1 : c, 1), n && n.splice(f <= c ? c + 1 : c, 1);
							} else if (f < u && i[f] === t && (c >= u || i[c] !== e)) {
								var h = n ? n[f] : void 0;i.splice(c, 0, e), n && n.splice(c, 0, h), i.splice(c <= f ? f + 1 : f, 1), n && n.splice(c <= f ? f + 1 : f, 1);
							}
						}
					}, e.Matrix._storage.sparse = g, g;
				}var i = r(25),
				    a = r(9),
				    o = i.array,
				    s = i.object,
				    u = i.string,
				    c = i.number,
				    f = Array.isArray,
				    l = c.isNumber,
				    p = c.isInteger,
				    h = u.isString,
				    m = o.validateIndex;t.name = "SparseMatrix", t.path = "type", t.factory = n, t.lazy = !1;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					return n("index", { "...number | string | BigNumber | Range | Array | Matrix": function numberStringBigNumberRangeArrayMatrix(t) {
							var r = t.map(function (e) {
								return e && e.isBigNumber === !0 ? e.toNumber() : e && (Array.isArray(e) || e.isMatrix === !0) ? e.map(function (e) {
									return e && e.isBigNumber === !0 ? e.toNumber() : e;
								}) : e;
							}),
							    n = new e.Index();return e.Index.apply(n, r), n;
						} });
				}t.name = "index", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var i = e.SparseMatrix,
					    a = n("sparse", { "": function _() {
							return new i([]);
						}, string: function string(e) {
							return new i([], e);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return new i(e);
						}, "Array | Matrix, string": function ArrayMatrixString(e, t) {
							return new i(e, t);
						} });return a.toTex = { 0: "\\begin{bsparse}\\end{bsparse}", 1: "\\left(${args[0]}\\right)" }, a;
				}t.name = "sparse", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(75), r(132), r(491), r(490), r(487), r(488), r(489), r(133), r(492), r(0), r(493)];
			}, function (e, t, r) {
				e.exports = [r(135)];
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var o = n("string", { "": function _() {
							return "";
						}, number: a.format, null: function _null(e) {
							return "null";
						}, boolean: function boolean(e) {
							return e + "";
						}, string: function string(e) {
							return e;
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, o);
						}, any: function any(e) {
							return String(e);
						} });return o.toTex = { 0: '\\mathtt{""}', 1: "\\mathrm{string}\\left(${args[0]}\\right)" }, o;
				}var i = r(1),
				    a = r(2);t.name = "string", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var i = n("createUnit", { "Object, Object": function ObjectObject(t, r) {
							return e.Unit.createUnit(t, r);
						}, Object: function Object(t) {
							return e.Unit.createUnit(t, {});
						}, "string, Unit | string | Object, Object": function stringUnitStringObjectObject(t, r, n) {
							var i = {};return i[t] = r, e.Unit.createUnit(i, n);
						}, "string, Unit | string | Object": function stringUnitStringObject(t, r) {
							var n = {};return n[t] = r, e.Unit.createUnit(n, {});
						}, string: function string(t) {
							var r = {};return r[t] = {}, e.Unit.createUnit(r, {});
						} });return i;
				}r(1);t.name = "createUnit", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var i = n("splitUnit", { "Unit, Array": function UnitArray(e, t) {
							return e.splitUnit(t);
						} });return i;
				}r(1);t.name = "splitUnit", t.factory = n;
			}, function (e, t, r) {
				"use strict";
				function n(e, t, r, n) {
					var a = n("unit", { Unit: function Unit(e) {
							return e.clone();
						}, string: function string(t) {
							return e.Unit.isValuelessUnit(t) ? new e.Unit(null, t) : e.Unit.parse(t);
						}, "number | BigNumber | Fraction | Complex, string": function numberBigNumberFractionComplexString(t, r) {
							return new e.Unit(t, r);
						}, "Array | Matrix": function ArrayMatrix(e) {
							return i(e, a);
						} });return a.toTex = { 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)" }, a;
				}var i = r(1);t.name = "unit", t.factory = n;
			}, function (e, t, r) {
				e.exports = [r(136), r(499), r(497), r(498), r(501)];
			}, function (e, t, r) {
				function n(e, t, r, n, a) {
					function o(t) {
						var r = e.Unit.parse(t);return r.fixPrefix = !0, r;
					}i(a, "speedOfLight", function () {
						return o("299792458 m s^-1");
					}), i(a, "gravitationConstant", function () {
						return o("6.6738480e-11 m^3 kg^-1 s^-2");
					}), i(a, "planckConstant", function () {
						return o("6.626069311e-34 J s");
					}), i(a, "reducedPlanckConstant", function () {
						return o("1.05457172647e-34 J s");
					}), i(a, "magneticConstant", function () {
						return o("1.2566370614e-6 N A^-2");
					}), i(a, "electricConstant", function () {
						return o("8.854187817e-12 F m^-1");
					}), i(a, "vacuumImpedance", function () {
						return o("376.730313461 ohm");
					}), i(a, "coulomb", function () {
						return o("8.9875517873681764e9 N m^2 C^-2");
					}), i(a, "elementaryCharge", function () {
						return o("1.60217656535e-19 C");
					}), i(a, "bohrMagneton", function () {
						return o("9.2740096820e-24 J T^-1");
					}), i(a, "conductanceQuantum", function () {
						return o("7.748091734625e-5 S");
					}), i(a, "inverseConductanceQuantum", function () {
						return o("12906.403721742 ohm");
					}), i(a, "magneticFluxQuantum", function () {
						return o("2.06783375846e-15 Wb");
					}), i(a, "nuclearMagneton", function () {
						return o("5.0507835311e-27 J T^-1");
					}), i(a, "klitzing", function () {
						return o("25812.807443484 ohm");
					}), i(a, "bohrRadius", function () {
						return o("5.291772109217e-11 m");
					}), i(a, "classicalElectronRadius", function () {
						return o("2.817940326727e-15 m");
					}), i(a, "electronMass", function () {
						return o("9.1093829140e-31 kg");
					}), i(a, "fermiCoupling", function () {
						return o("1.1663645e-5 GeV^-2");
					}), i(a, "fineStructure", function () {
						return .007297352569824;
					}), i(a, "hartreeEnergy", function () {
						return o("4.3597443419e-18 J");
					}), i(a, "protonMass", function () {
						return o("1.67262177774e-27 kg");
					}), i(a, "deuteronMass", function () {
						return o("3.3435830926e-27 kg");
					}), i(a, "neutronMass", function () {
						return o("1.6749271613e-27 kg");
					}), i(a, "quantumOfCirculation", function () {
						return o("3.636947552024e-4 m^2 s^-1");
					}), i(a, "rydberg", function () {
						return o("10973731.56853955 m^-1");
					}), i(a, "thomsonCrossSection", function () {
						return o("6.65245873413e-29 m^2");
					}), i(a, "weakMixingAngle", function () {
						return .222321;
					}), i(a, "efimovFactor", function () {
						return 22.7;
					}), i(a, "atomicMass", function () {
						return o("1.66053892173e-27 kg");
					}), i(a, "avogadro", function () {
						return o("6.0221412927e23 mol^-1");
					}), i(a, "boltzmann", function () {
						return o("1.380648813e-23 J K^-1");
					}), i(a, "faraday", function () {
						return o("96485.336521 C mol^-1");
					}), i(a, "firstRadiation", function () {
						return o("3.7417715317e-16 W m^2");
					}), i(a, "loschmidt", function () {
						return o("2.686780524e25 m^-3");
					}), i(a, "gasConstant", function () {
						return o("8.314462175 J K^-1 mol^-1");
					}), i(a, "molarPlanckConstant", function () {
						return o("3.990312717628e-10 J s mol^-1");
					}), i(a, "molarVolume", function () {
						return o("2.241396820e-10 m^3 mol^-1");
					}), i(a, "sackurTetrode", function () {
						return -1.164870823;
					}), i(a, "secondRadiation", function () {
						return o("1.438777013e-2 m K");
					}), i(a, "stefanBoltzmann", function () {
						return o("5.67037321e-8 W m^-2 K^-4");
					}), i(a, "wienDisplacement", function () {
						return o("2.897772126e-3 m K");
					}), i(a, "molarMass", function () {
						return o("1e-3 kg mol^-1");
					}), i(a, "molarMassC12", function () {
						return o("1.2e-2 kg mol^-1");
					}), i(a, "gravity", function () {
						return o("9.80665 m s^-2");
					}), i(a, "planckLength", function () {
						return o("1.61619997e-35 m");
					}), i(a, "planckMass", function () {
						return o("2.1765113e-8 kg");
					}), i(a, "planckTime", function () {
						return o("5.3910632e-44 s");
					}), i(a, "planckCharge", function () {
						return o("1.87554595641e-18 C");
					}), i(a, "planckTemperature", function () {
						return o("1.41683385e+32 K");
					});
				}var i = r(6).lazy;t.factory = n, t.lazy = !1, t.math = !0;
			}, function (e, t, r) {
				var n = r(80);e.exports = function (e, t) {
					if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitAnd");var r = e.constructor;if (e.isNaN() || t.isNaN()) return new r(NaN);if (e.isZero() || t.eq(-1) || e.eq(t)) return e;if (t.isZero() || e.eq(-1)) return t;if (!e.isFinite() || !t.isFinite()) {
						if (!e.isFinite() && !t.isFinite()) return e.isNegative() == t.isNegative() ? e : new r(0);if (!e.isFinite()) return t.isNegative() ? e : e.isNegative() ? new r(0) : t;if (!t.isFinite()) return e.isNegative() ? t : t.isNegative() ? new r(0) : e;
					}return n(e, t, function (e, t) {
						return e & t;
					});
				};
			}, function (e, t, r) {
				var n = r(80);e.exports = function (e, t) {
					if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitOr");var r = e.constructor;if (e.isNaN() || t.isNaN()) return new r(NaN);var i = new r(-1);return e.isZero() || t.eq(i) || e.eq(t) ? t : t.isZero() || e.eq(i) ? e : e.isFinite() && t.isFinite() ? n(e, t, function (e, t) {
						return e | t;
					}) : !e.isFinite() && !e.isNegative() && t.isNegative() || e.isNegative() && !t.isNegative() && !t.isFinite() ? i : e.isNegative() && t.isNegative() ? e.isFinite() ? e : t : e.isFinite() ? t : e;
				};
			}, function (e, t, r) {
				var n = r(80),
				    i = r(79);e.exports = function (e, t) {
					if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitXor");var r = e.constructor;if (e.isNaN() || t.isNaN()) return new r(NaN);if (e.isZero()) return t;if (t.isZero()) return e;if (e.eq(t)) return new r(0);var a = new r(-1);return e.eq(a) ? i(t) : t.eq(a) ? i(e) : e.isFinite() && t.isFinite() ? n(e, t, function (e, t) {
						return e ^ t;
					}) : e.isFinite() || t.isFinite() ? new r(e.isNegative() == t.isNegative() ? 1 / 0 : -(1 / 0)) : a;
				};
			}, function (e, t) {
				t.format = function (e, r) {
					if ("function" == typeof r) return r(e);if (!e.isFinite()) return e.isNaN() ? "NaN" : e.gt(0) ? "Infinity" : "-Infinity";var n = "auto",
					    i = void 0;switch (void 0 !== r && (r.notation && (n = r.notation), "number" == typeof r ? i = r : r.precision && (i = r.precision)), n) {case "fixed":
							return t.toFixed(e, i);case "exponential":
							return t.toExponential(e, i);case "auto":
							var a = .001,
							    o = 1e5;r && r.exponential && (void 0 !== r.exponential.lower && (a = r.exponential.lower), void 0 !== r.exponential.upper && (o = r.exponential.upper));({ toExpNeg: e.constructor.toExpNeg, toExpPos: e.constructor.toExpPos });if (e.constructor.config({ toExpNeg: Math.round(Math.log(a) / Math.LN10), toExpPos: Math.round(Math.log(o) / Math.LN10) }), e.isZero()) return "0";var s,
							    u = e.abs();return s = u.gte(a) && u.lt(o) ? e.toSignificantDigits(i).toFixed() : t.toExponential(e, i), s.replace(/((\.\d*?)(0+))($|e)/, function () {
								var e = arguments[2],
								    t = arguments[4];return "." !== e ? e + t : t;
							});default:
							throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", or "fixed".');}
				}, t.toExponential = function (e, t) {
					return void 0 !== t ? e.toExponential(t - 1) : e.toExponential();
				}, t.toFixed = function (e, t) {
					return e.toFixed(t || 0);
				};
			}, function (e, t) {
				e.exports = function (e, t) {
					if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function leftShift");var r = e.constructor;return e.isNaN() || t.isNaN() || t.isNegative() && !t.isZero() ? new r(NaN) : e.isZero() || t.isZero() ? e : e.isFinite() || t.isFinite() ? t.lt(55) ? e.times(Math.pow(2, t.toNumber()) + "") : e.times(new r(2).pow(t)) : new r(NaN);
				};
			}, function (e, t) {
				e.exports = function (e, t) {
					if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function rightArithShift");var r = e.constructor;return e.isNaN() || t.isNaN() || t.isNegative() && !t.isZero() ? new r(NaN) : e.isZero() || t.isZero() ? e : t.isFinite() ? t.lt(55) ? e.div(Math.pow(2, t.toNumber()) + "").floor() : e.div(new r(2).pow(t)).floor() : new r(e.isNegative() ? -1 : e.isFinite() ? 0 : NaN);
				};
			}, function (e, t, r) {
				"use strict";
				t.isBoolean = function (e) {
					return "boolean" == typeof e;
				};
			}, function (e, t, r) {
				"use strict";
				e.exports = function (e, t, r, n, i, a, o, s, u, c, f) {
					var l,
					    p,
					    h,
					    m,
					    d = e._values,
					    g = e._index,
					    v = e._ptr,
					    y = o._index;if (n) for (p = v[t], h = v[t + 1], l = p; l < h; l++) {
						m = g[l], r[m] !== a ? (r[m] = a, y.push(m), c ? (n[m] = u ? s(d[l], f) : s(f, d[l]), i[m] = a) : n[m] = d[l]) : (n[m] = u ? s(d[l], n[m]) : s(n[m], d[l]), i[m] = a);
					} else for (p = v[t], h = v[t + 1], l = p; l < h; l++) {
						m = g[l], r[m] !== a ? (r[m] = a, y.push(m)) : i[m] = a;
					}
				};
			}, function (e, t) {
				e.exports = "3.12.2";
			}, function (e, t, r) {
				var n, i; /**
              * @license Complex.js v2.0.1 11/02/2016
              *
              * Copyright (c) 2016, Robert Eisele (robert@xarg.org)
              * Dual licensed under the MIT or GPL Version 2 licenses.
              **/
				!function (r) {
					"use strict";
					function a(e, t) {
						var r = Math.abs(e),
						    n = Math.abs(t);return 0 === e ? Math.log(n) : 0 === t ? Math.log(r) : r < 3e3 && n < 3e3 ? .5 * Math.log(e * e + t * t) : Math.log(e / Math.cos(Math.atan2(t, e)));
					}function o(e, t) {
						return this instanceof o ? (c(e, t), this.re = s.re, void (this.im = s.im)) : new o(e, t);
					}var s = { re: 0, im: 0 };Math.cosh = Math.cosh || function (e) {
						return .5 * (Math.exp(e) + Math.exp(-e));
					}, Math.sinh = Math.sinh || function (e) {
						return .5 * (Math.exp(e) - Math.exp(-e));
					};var u = function u() {
						throw SyntaxError("Invalid Param");
					},
					    c = function c(e, t) {
						if (void 0 === e || null === e) s.re = s.im = 0;else if (void 0 !== t) s.re = e, s.im = t;else switch (typeof e === "undefined" ? "undefined" : _typeof(e)) {case "object":
								"im" in e && "re" in e ? (s.re = e.re, s.im = e.im) : "abs" in e && "arg" in e ? (s.re = e.abs * Math.cos(e.arg), s.im = e.abs * Math.sin(e.arg)) : "r" in e && "phi" in e ? (s.re = e.r * Math.cos(e.phi), s.im = e.r * Math.sin(e.phi)) : u();break;case "string":
								s.im = s.re = 0;var r = e.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),
								    n = 1,
								    i = 0;null === r && u();for (var a = 0; a < r.length; a++) {
									var o = r[a];" " === o || "\t" === o || "\n" === o || ("+" === o ? n++ : "-" === o ? i++ : "i" === o || "I" === o ? (n + i === 0 && u(), " " === r[a + 1] || isNaN(r[a + 1]) ? s.im += parseFloat((i % 2 ? "-" : "") + "1") : (s.im += parseFloat((i % 2 ? "-" : "") + r[a + 1]), a++), n = i = 0) : ((n + i === 0 || isNaN(o)) && u(), "i" === r[a + 1] || "I" === r[a + 1] ? (s.im += parseFloat((i % 2 ? "-" : "") + o), a++) : s.re += parseFloat((i % 2 ? "-" : "") + o), n = i = 0));
								}n + i > 0 && u();break;case "number":
								s.im = 0, s.re = e;break;default:
								u();}isNaN(s.re) || isNaN(s.im);
					};o.prototype = { re: 0, im: 0, sign: function sign() {
							var e = this.abs();return new o(this.re / e, this.im / e);
						}, add: function add(e, t) {
							return c(e, t), new o(this.re + s.re, this.im + s.im);
						}, sub: function sub(e, t) {
							return c(e, t), new o(this.re - s.re, this.im - s.im);
						}, mul: function mul(e, t) {
							return c(e, t), 0 === s.im && 0 === this.im ? new o(this.re * s.re, 0) : new o(this.re * s.re - this.im * s.im, this.re * s.im + this.im * s.re);
						}, div: function div(e, t) {
							c(e, t), e = this.re, t = this.im;var r,
							    n,
							    i = s.re,
							    a = s.im;return 0 === i && 0 === a ? new o(0 !== e ? e / 0 : 0, 0 !== t ? t / 0 : 0) : 0 === a ? new o(e / i, t / i) : Math.abs(i) < Math.abs(a) ? (n = i / a, r = i * n + a, new o((e * n + t) / r, (t * n - e) / r)) : (n = a / i, r = a * n + i, new o((e + t * n) / r, (t - e * n) / r));
						}, pow: function pow(e, t) {
							if (c(e, t), e = this.re, t = this.im, 0 === e && 0 === t) return new o(0, 0);var r = Math.atan2(t, e),
							    n = a(e, t);if (0 === s.im) {
								if (0 === t && e >= 0) return new o(Math.pow(e, s.re), 0);if (0 === e) switch (s.re % 4) {case 0:
										return new o(Math.pow(t, s.re), 0);case 1:
										return new o(0, Math.pow(t, s.re));case 2:
										return new o(-Math.pow(t, s.re), 0);case 3:
										return new o(0, -Math.pow(t, s.re));}
							}return e = Math.exp(s.re * n - s.im * r), t = s.im * n + s.re * r, new o(e * Math.cos(t), e * Math.sin(t));
						}, sqrt: function sqrt() {
							var e,
							    t,
							    r = this.re,
							    n = this.im,
							    i = this.abs();return r >= 0 && 0 === n ? new o(Math.sqrt(r), 0) : (e = r >= 0 ? .5 * Math.sqrt(2 * (i + r)) : Math.abs(n) / Math.sqrt(2 * (i - r)), t = r <= 0 ? .5 * Math.sqrt(2 * (i - r)) : Math.abs(n) / Math.sqrt(2 * (i + r)), new o(e, n >= 0 ? t : -t));
						}, exp: function exp() {
							var e = Math.exp(this.re);return 0 === this.im, new o(e * Math.cos(this.im), e * Math.sin(this.im));
						}, log: function log() {
							var e = this.re,
							    t = this.im;return new o(a(e, t), Math.atan2(t, e));
						}, abs: function abs() {
							var e = Math.abs(this.re),
							    t = Math.abs(this.im);return e < 3e3 && t < 3e3 ? Math.sqrt(e * e + t * t) : (e < t ? (e = t, t = this.re / this.im) : t = this.im / this.re, e * Math.sqrt(1 + t * t));
						}, arg: function arg() {
							return Math.atan2(this.im, this.re);
						}, sin: function sin() {
							var e = this.re,
							    t = this.im;return new o(Math.sin(e) * Math.cosh(t), Math.cos(e) * Math.sinh(t));
						}, cos: function cos() {
							var e = this.re,
							    t = this.im;return new o(Math.cos(e) * Math.cosh(t), -Math.sin(e) * Math.sinh(t));
						}, tan: function tan() {
							var e = 2 * this.re,
							    t = 2 * this.im,
							    r = Math.cos(e) + Math.cosh(t);return new o(Math.sin(e) / r, Math.sinh(t) / r);
						}, cot: function cot() {
							var e = 2 * this.re,
							    t = 2 * this.im,
							    r = Math.cos(e) - Math.cosh(t);return new o(-Math.sin(e) / r, Math.sinh(t) / r);
						}, sec: function sec() {
							var e = this.re,
							    t = this.im,
							    r = .5 * Math.cosh(2 * t) + .5 * Math.cos(2 * e);return new o(Math.cos(e) * Math.cosh(t) / r, Math.sin(e) * Math.sinh(t) / r);
						}, csc: function csc() {
							var e = this.re,
							    t = this.im,
							    r = .5 * Math.cosh(2 * t) - .5 * Math.cos(2 * e);return new o(Math.sin(e) * Math.cosh(t) / r, -Math.cos(e) * Math.sinh(t) / r);
						}, asin: function asin() {
							var e = this.re,
							    t = this.im,
							    r = new o(t * t - e * e + 1, -2 * e * t).sqrt(),
							    n = new o(r.re - t, r.im + e).log();return new o(n.im, -n.re);
						}, acos: function acos() {
							var e = this.re,
							    t = this.im,
							    r = new o(t * t - e * e + 1, -2 * e * t).sqrt(),
							    n = new o(r.re - t, r.im + e).log();return new o(Math.PI / 2 - n.im, n.re);
						}, atan: function atan() {
							var e = this.re,
							    t = this.im;if (0 === e) {
								if (1 === t) return new o(0, 1 / 0);if (t === -1) return new o(0, -(1 / 0));
							}var r = e * e + (1 - t) * (1 - t),
							    n = new o((1 - t * t - e * e) / r, -2 * e / r).log();return new o(-.5 * n.im, .5 * n.re);
						}, acot: function acot() {
							var e = this.re,
							    t = this.im;if (0 === t) return new o(Math.atan2(1, e), 0);var r = e * e + t * t;return 0 !== r ? new o(e / r, -t / r).atan() : new o(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).atan();
						}, asec: function asec() {
							var e = this.re,
							    t = this.im;if (0 === e && 0 === t) return new o(0, 1 / 0);var r = e * e + t * t;return 0 !== r ? new o(e / r, -t / r).acos() : new o(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).acos();
						}, acsc: function acsc() {
							var e = this.re,
							    t = this.im;if (0 === e && 0 === t) return new o(Math.PI / 2, 1 / 0);var r = e * e + t * t;return 0 !== r ? new o(e / r, -t / r).asin() : new o(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).asin();
						}, sinh: function sinh() {
							var e = this.re,
							    t = this.im;return new o(Math.sinh(e) * Math.cos(t), Math.cosh(e) * Math.sin(t));
						}, cosh: function cosh() {
							var e = this.re,
							    t = this.im;return new o(Math.cosh(e) * Math.cos(t), Math.sinh(e) * Math.sin(t));
						}, tanh: function tanh() {
							var e = 2 * this.re,
							    t = 2 * this.im,
							    r = Math.cosh(e) + Math.cos(t);return new o(Math.sinh(e) / r, Math.sin(t) / r);
						}, coth: function coth() {
							var e = 2 * this.re,
							    t = 2 * this.im,
							    r = Math.cosh(e) - Math.cos(t);return new o(Math.sinh(e) / r, -Math.sin(t) / r);
						}, csch: function csch() {
							var e = this.re,
							    t = this.im,
							    r = Math.cos(2 * t) - Math.cosh(2 * e);return new o(-2 * Math.sinh(e) * Math.cos(t) / r, 2 * Math.cosh(e) * Math.sin(t) / r);
						}, sech: function sech() {
							var e = this.re,
							    t = this.im,
							    r = Math.cos(2 * t) + Math.cosh(2 * e);return new o(2 * Math.cosh(e) * Math.cos(t) / r, -2 * Math.sinh(e) * Math.sin(t) / r);
						}, asinh: function asinh() {
							var e = this.im;this.im = -this.re, this.re = e;var t = this.asin();return this.re = -this.im, this.im = e, e = t.re, t.re = -t.im, t.im = e, t;
						}, acosh: function acosh() {
							var e,
							    t = this.acos();return t.im <= 0 ? (e = t.re, t.re = -t.im, t.im = e) : (e = t.im, t.im = -t.re, t.re = e), t;
						}, atanh: function atanh() {
							var e = this.re,
							    t = this.im,
							    r = e > 1 && 0 === t,
							    n = 1 - e,
							    i = 1 + e,
							    s = n * n + t * t,
							    u = 0 !== s ? new o((i * n - t * t) / s, (t * n + i * t) / s) : new o(e !== -1 ? e / 0 : 0, 0 !== t ? t / 0 : 0),
							    c = u.re;return u.re = a(u.re, u.im) / 2, u.im = Math.atan2(u.im, c) / 2, r && (u.im = -u.im), u;
						}, acoth: function acoth() {
							var e = this.re,
							    t = this.im;if (0 === e && 0 === t) return new o(0, Math.PI / 2);var r = e * e + t * t;return 0 !== r ? new o(e / r, -t / r).atanh() : new o(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).atanh();
						}, acsch: function acsch() {
							var e = this.re,
							    t = this.im;if (0 === t) return new o(0 !== e ? Math.log(e + Math.sqrt(e * e + 1)) : 1 / 0, 0);var r = e * e + t * t;return 0 !== r ? new o(e / r, -t / r).asinh() : new o(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).asinh();
						}, asech: function asech() {
							var e = this.re,
							    t = this.im;if (0 === e && 0 === t) return new o(1 / 0, 0);var r = e * e + t * t;return 0 !== r ? new o(e / r, -t / r).acosh() : new o(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).acosh();
						}, inverse: function inverse() {
							var e = this.re,
							    t = this.im,
							    r = e * e + t * t;return new o(0 !== e ? e / r : 0, 0 !== t ? -t / r : 0);
						}, conjugate: function conjugate() {
							return new o(this.re, -this.im);
						}, neg: function neg() {
							return new o(-this.re, -this.im);
						}, ceil: function ceil(e) {
							return e = Math.pow(10, e || 0), new o(Math.ceil(this.re * e) / e, Math.ceil(this.im * e) / e);
						}, floor: function floor(e) {
							return e = Math.pow(10, e || 0), new o(Math.floor(this.re * e) / e, Math.floor(this.im * e) / e);
						}, round: function round(e) {
							return e = Math.pow(10, e || 0), new o(Math.round(this.re * e) / e, Math.round(this.im * e) / e);
						}, equals: function equals(e, t) {
							return c(e, t), Math.abs(s.re - this.re) <= o.EPSILON && Math.abs(s.im - this.im) <= o.EPSILON;
						}, clone: function clone() {
							return new o(this.re, this.im);
						}, toString: function toString() {
							var e = this.re,
							    t = this.im,
							    r = "";return isNaN(e) || isNaN(t) ? "NaN" : (0 !== e && (r += e), 0 !== t && (0 !== e ? r += t < 0 ? " - " : " + " : t < 0 && (r += "-"), t = Math.abs(t), 1 !== t && (r += t), r += "i"), r ? r : "0");
						}, toVector: function toVector() {
							return [this.re, this.im];
						}, valueOf: function valueOf() {
							return 0 === this.im ? this.re : null;
						}, isNaN: function (_isNaN) {
							function isNaN() {
								return _isNaN.apply(this, arguments);
							}

							isNaN.toString = function () {
								return _isNaN.toString();
							};

							return isNaN;
						}(function () {
							return isNaN(this.re) || isNaN(this.im);
						}) }, o.ZERO = new o(0, 0), o.ONE = new o(1, 0), o.I = new o(0, 1), o.PI = new o(Math.PI, 0), o.E = new o(Math.E, 0), o.EPSILON = 1e-16, n = [], i = function () {
						return o;
					}.apply(t, n), !(void 0 !== i && (e.exports = i));
				}(this);
			}, function (e, t, r) {
				var n;!function (i) {
					"use strict";
					function a(e) {
						var t,
						    r,
						    n,
						    i = e.length - 1,
						    a = "",
						    o = e[0];if (i > 0) {
							for (a += o, t = 1; t < i; t++) {
								n = e[t] + "", r = Ie - n.length, r && (a += g(r)), a += n;
							}o = e[t], n = o + "", r = Ie - n.length, r && (a += g(r));
						} else if (0 === o) return "0";for (; o % 10 === 0;) {
							o /= 10;
						}return a + o;
					}function o(e, t, r) {
						if (e !== ~~e || e < t || e > r) throw Error(Me + e);
					}function s(e, t, r, n) {
						var i, a, o, s;for (a = e[0]; a >= 10; a /= 10) {
							--t;
						}return --t < 0 ? (t += Ie, i = 0) : (i = Math.ceil((t + 1) / Ie), t %= Ie), a = _e(10, Ie - t), s = e[i] % a | 0, null == n ? t < 3 ? (0 == t ? s = s / 100 | 0 : 1 == t && (s = s / 10 | 0), o = r < 4 && 99999 == s || r > 3 && 49999 == s || 5e4 == s || 0 == s) : o = (r < 4 && s + 1 == a || r > 3 && s + 1 == a / 2) && (e[i + 1] / a / 100 | 0) == _e(10, t - 2) - 1 || (s == a / 2 || 0 == s) && 0 == (e[i + 1] / a / 100 | 0) : t < 4 ? (0 == t ? s = s / 1e3 | 0 : 1 == t ? s = s / 100 | 0 : 2 == t && (s = s / 10 | 0), o = (n || r < 4) && 9999 == s || !n && r > 3 && 4999 == s) : o = ((n || r < 4) && s + 1 == a || !n && r > 3 && s + 1 == a / 2) && (e[i + 1] / a / 1e3 | 0) == _e(10, t - 3) - 1, o;
					}function u(e, t, r) {
						for (var n, i, a = [0], o = 0, s = e.length; o < s;) {
							for (i = a.length; i--;) {
								a[i] *= t;
							}for (a[0] += ye.indexOf(e.charAt(o++)), n = 0; n < a.length; n++) {
								a[n] > r - 1 && (void 0 === a[n + 1] && (a[n + 1] = 0), a[n + 1] += a[n] / r | 0, a[n] %= r);
							}
						}return a.reverse();
					}function c(e, t) {
						var r,
						    n,
						    i = t.d.length;i < 32 ? (r = Math.ceil(i / 3), n = Math.pow(4, -r).toString()) : (r = 16, n = "2.3283064365386962890625e-10"), e.precision += r, t = O(e, 1, t.times(n), new e(1));for (var a = r; a--;) {
							var o = t.times(t);t = o.times(o).minus(o).times(8).plus(1);
						}return e.precision -= r, t;
					}function f(e, t, r, n) {
						var i,
						    a,
						    o,
						    s,
						    u,
						    c,
						    f,
						    l,
						    p,
						    h = e.constructor;e: if (null != t) {
							if (l = e.d, !l) return e;for (i = 1, s = l[0]; s >= 10; s /= 10) {
								i++;
							}if (a = t - i, a < 0) a += Ie, o = t, f = l[p = 0], u = f / _e(10, i - o - 1) % 10 | 0;else if (p = Math.ceil((a + 1) / Ie), s = l.length, p >= s) {
								if (!n) break e;for (; s++ <= p;) {
									l.push(0);
								}f = u = 0, i = 1, a %= Ie, o = a - Ie + 1;
							} else {
								for (f = s = l[p], i = 1; s >= 10; s /= 10) {
									i++;
								}a %= Ie, o = a - Ie + i, u = o < 0 ? 0 : f / _e(10, i - o - 1) % 10 | 0;
							}if (n = n || t < 0 || void 0 !== l[p + 1] || (o < 0 ? f : f % _e(10, i - o - 1)), c = r < 4 ? (u || n) && (0 == r || r == (e.s < 0 ? 3 : 2)) : u > 5 || 5 == u && (4 == r || n || 6 == r && (a > 0 ? o > 0 ? f / _e(10, i - o) : 0 : l[p - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7)), t < 1 || !l[0]) return l.length = 0, c ? (t -= e.e + 1, l[0] = _e(10, (Ie - t % Ie) % Ie), e.e = -t || 0) : l[0] = e.e = 0, e;if (0 == a ? (l.length = p, s = 1, p--) : (l.length = p + 1, s = _e(10, Ie - a), l[p] = o > 0 ? (f / _e(10, i - o) % _e(10, o) | 0) * s : 0), c) for (;;) {
								if (0 == p) {
									for (a = 1, o = l[0]; o >= 10; o /= 10) {
										a++;
									}for (o = l[0] += s, s = 1; o >= 10; o /= 10) {
										s++;
									}a != s && (e.e++, l[0] == Be && (l[0] = 1));break;
								}if (l[p] += s, l[p] != Be) break;l[p--] = 0, s = 1;
							}for (a = l.length; 0 === l[--a];) {
								l.pop();
							}
						}return Ne && (e.e > h.maxE ? (e.d = null, e.e = NaN) : e.e < h.minE && (e.e = 0, e.d = [0])), e;
					}function l(e, t, r) {
						if (!e.isFinite()) return N(e);var n,
						    i = e.e,
						    o = a(e.d),
						    s = o.length;return t ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + g(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (e.e < 0 ? "e" : "e+") + e.e) : i < 0 ? (o = "0." + g(-i - 1) + o, r && (n = r - s) > 0 && (o += g(n))) : i >= s ? (o += g(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + g(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += g(n))), o;
					}function p(e, t) {
						var r = e[0];for (t *= Ie; r >= 10; r /= 10) {
							t++;
						}return t;
					}function h(e, t, r) {
						if (t > Re) throw Ne = !0, r && (e.precision = r), Error(Ae);return f(new e(xe), t, 1, !0);
					}function m(e, t, r) {
						if (t > Ue) throw Error(Ae);return f(new e(we), t, r, !0);
					}function d(e) {
						var t = e.length - 1,
						    r = t * Ie + 1;if (t = e[t]) {
							for (; t % 10 == 0; t /= 10) {
								r--;
							}for (t = e[0]; t >= 10; t /= 10) {
								r++;
							}
						}return r;
					}function g(e) {
						for (var t = ""; e--;) {
							t += "0";
						}return t;
					}function v(e, t, r, n) {
						var i,
						    a = new e(1),
						    o = Math.ceil(n / Ie + 4);for (Ne = !1;;) {
							if (r % 2 && (a = a.times(t), S(a.d, o) && (i = !0)), r = Te(r / 2), 0 === r) {
								r = a.d.length - 1, i && 0 === a.d[r] && ++a.d[r];break;
							}t = t.times(t), S(t.d, o);
						}return Ne = !0, a;
					}function y(e) {
						return 1 & e.d[e.d.length - 1];
					}function x(e, t, r) {
						for (var n, i = new e(t[0]), a = 0; ++a < t.length;) {
							if (n = new e(t[a]), !n.s) {
								i = n;break;
							}i[r](n) && (i = n);
						}return i;
					}function w(e, t) {
						var r,
						    n,
						    i,
						    o,
						    u,
						    c,
						    l,
						    p = 0,
						    h = 0,
						    m = 0,
						    d = e.constructor,
						    g = d.rounding,
						    v = d.precision;if (!e.d || !e.d[0] || e.e > 17) return new d(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);for (null == t ? (Ne = !1, l = v) : l = t, c = new d(.03125); e.e > -2;) {
							e = e.times(c), m += 5;
						}for (n = Math.log(_e(2, m)) / Math.LN10 * 2 + 5 | 0, l += n, r = o = u = new d(1), d.precision = l;;) {
							if (o = f(o.times(e), l, 1), r = r.times(++h), c = u.plus(je(o, r, l, 1)), a(c.d).slice(0, l) === a(u.d).slice(0, l)) {
								for (i = m; i--;) {
									u = f(u.times(u), l, 1);
								}if (null != t) return d.precision = v, u;if (!(p < 3 && s(u.d, l - n, g, p))) return f(u, d.precision = v, g, Ne = !0);d.precision = l += 10, r = o = c = new d(1), h = 0, p++;
							}u = c;
						}
					}function b(e, t) {
						var r,
						    n,
						    i,
						    o,
						    u,
						    c,
						    l,
						    p,
						    m,
						    d,
						    g,
						    v = 1,
						    y = 10,
						    x = e,
						    w = x.d,
						    N = x.constructor,
						    E = N.rounding,
						    M = N.precision;if (x.s < 0 || !w || !w[0] || !x.e && 1 == w[0] && 1 == w.length) return new N(w && !w[0] ? -1 / 0 : 1 != x.s ? NaN : w ? 0 : x);if (null == t ? (Ne = !1, m = M) : m = t, N.precision = m += y, r = a(w), n = r.charAt(0), !(Math.abs(o = x.e) < 15e14)) return p = h(N, m + 2, M).times(o + ""), x = b(new N(n + "." + r.slice(1)), m - y).plus(p), N.precision = M, null == t ? f(x, M, E, Ne = !0) : x;for (; n < 7 && 1 != n || 1 == n && r.charAt(1) > 3;) {
							x = x.times(e), r = a(x.d), n = r.charAt(0), v++;
						}for (o = x.e, n > 1 ? (x = new N("0." + r), o++) : x = new N(n + "." + r.slice(1)), d = x, l = u = x = je(x.minus(1), x.plus(1), m, 1), g = f(x.times(x), m, 1), i = 3;;) {
							if (u = f(u.times(g), m, 1), p = l.plus(je(u, new N(i), m, 1)), a(p.d).slice(0, m) === a(l.d).slice(0, m)) {
								if (l = l.times(2), 0 !== o && (l = l.plus(h(N, m + 2, M).times(o + ""))), l = je(l, new N(v), m, 1), null != t) return N.precision = M, l;if (!s(l.d, m - y, E, c)) return f(l, N.precision = M, E, Ne = !0);N.precision = m += y, p = u = x = je(d.minus(1), d.plus(1), m, 1), g = f(x.times(x), m, 1), i = c = 1;
							}l = p, i += 2;
						}
					}function N(e) {
						return String(e.s * e.s / 0);
					}function E(e, t) {
						var r, n, i;for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; 48 === t.charCodeAt(n); n++) {}for (i = t.length; 48 === t.charCodeAt(i - 1); --i) {}if (t = t.slice(n, i)) {
							if (i -= n, e.e = r = r - n - 1, e.d = [], n = (r + 1) % Ie, r < 0 && (n += Ie), n < i) {
								for (n && e.d.push(+t.slice(0, n)), i -= Ie; n < i;) {
									e.d.push(+t.slice(n, n += Ie));
								}t = t.slice(n), n = Ie - t.length;
							} else n -= i;for (; n--;) {
								t += "0";
							}e.d.push(+t), Ne && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
						} else e.e = 0, e.d = [0];return e;
					}function M(e, t) {
						var r, n, i, a, o, s, c, f, l;if ("Infinity" === t || "NaN" === t) return +t || (e.s = NaN), e.e = NaN, e.d = null, e;if (Ce.test(t)) r = 16, t = t.toLowerCase();else if (Se.test(t)) r = 2;else {
							if (!ze.test(t)) throw Error(Me + t);r = 8;
						}for (a = t.search(/p/i), a > 0 ? (c = +t.slice(a + 1), t = t.substring(2, a)) : t = t.slice(2), a = t.indexOf("."), o = a >= 0, n = e.constructor, o && (t = t.replace(".", ""), s = t.length, a = s - a, i = v(n, new n(r), a, 2 * a)), f = u(t, r, Be), l = f.length - 1, a = l; 0 === f[a]; --a) {
							f.pop();
						}return a < 0 ? new n(0 * e.s) : (e.e = p(f, l), e.d = f, Ne = !1, o && (e = je(e, i, 4 * s)), c && (e = e.times(Math.abs(c) < 54 ? Math.pow(2, c) : be.pow(2, c))), Ne = !0, e);
					}function A(e, t) {
						var r,
						    n = t.d.length;if (n < 3) return O(e, 2, t, t);r = 1.4 * Math.sqrt(n), r = r > 16 ? 16 : 0 | r, t = t.times(Math.pow(5, -r)), t = O(e, 2, t, t);for (var i, a = new e(5), o = new e(16), s = new e(20); r--;) {
							i = t.times(t), t = t.times(a.plus(i.times(o.times(i).minus(s))));
						}return t;
					}function O(e, t, r, n, i) {
						var a,
						    o,
						    s,
						    u,
						    c = 1,
						    f = e.precision,
						    l = Math.ceil(f / Ie);for (Ne = !1, u = r.times(r), s = new e(n);;) {
							if (o = je(s.times(u), new e(t++ * t++), f, 1), s = i ? n.plus(o) : n.minus(o), n = je(o.times(u), new e(t++ * t++), f, 1), o = s.plus(n), void 0 !== o.d[l]) {
								for (a = l; o.d[a] === s.d[a] && a--;) {}if (a == -1) break;
							}a = s, s = n, n = o, o = a, c++;
						}return Ne = !0, o.d.length = l + 1, o;
					}function T(e, t) {
						var r,
						    n = t.s < 0,
						    i = m(e, e.precision, 1),
						    a = i.times(.5);if (t = t.abs(), t.lte(a)) return de = n ? 4 : 1, t;if (r = t.divToInt(i), r.isZero()) de = n ? 3 : 2;else {
							if (t = t.minus(r.times(i)), t.lte(a)) return de = y(r) ? n ? 2 : 3 : n ? 4 : 1, t;de = y(r) ? n ? 1 : 4 : n ? 3 : 2;
						}return t.minus(i).abs();
					}function _(e, t, r, n) {
						var i,
						    a,
						    s,
						    c,
						    f,
						    p,
						    h,
						    m,
						    d,
						    g = e.constructor,
						    v = void 0 !== r;if (v ? (o(r, 1, ve), void 0 === n ? n = g.rounding : o(n, 0, 8)) : (r = g.precision, n = g.rounding), e.isFinite()) {
							for (h = l(e), s = h.indexOf("."), v ? (i = 2, 16 == t ? r = 4 * r - 3 : 8 == t && (r = 3 * r - 2)) : i = t, s >= 0 && (h = h.replace(".", ""), d = new g(1), d.e = h.length - s, d.d = u(l(d), 10, i), d.e = d.d.length), m = u(h, 10, i), a = f = m.length; 0 == m[--f];) {
								m.pop();
							}if (m[0]) {
								if (s < 0 ? a-- : (e = new g(e), e.d = m, e.e = a, e = je(e, d, r, n, 0, i), m = e.d, a = e.e, p = me), s = m[r], c = i / 2, p = p || void 0 !== m[r + 1], p = n < 4 ? (void 0 !== s || p) && (0 === n || n === (e.s < 0 ? 3 : 2)) : s > c || s === c && (4 === n || p || 6 === n && 1 & m[r - 1] || n === (e.s < 0 ? 8 : 7)), m.length = r, p) for (; ++m[--r] > i - 1;) {
									m[r] = 0, r || (++a, m.unshift(1));
								}for (f = m.length; !m[f - 1]; --f) {}for (s = 0, h = ""; s < f; s++) {
									h += ye.charAt(m[s]);
								}if (v) {
									if (f > 1) if (16 == t || 8 == t) {
										for (s = 16 == t ? 4 : 3, --f; f % s; f++) {
											h += "0";
										}for (m = u(h, i, t), f = m.length; !m[f - 1]; --f) {}for (s = 1, h = "1."; s < f; s++) {
											h += ye.charAt(m[s]);
										}
									} else h = h.charAt(0) + "." + h.slice(1);h = h + (a < 0 ? "p" : "p+") + a;
								} else if (a < 0) {
									for (; ++a;) {
										h = "0" + h;
									}h = "0." + h;
								} else if (++a > f) for (a -= f; a--;) {
									h += "0";
								} else a < f && (h = h.slice(0, a) + "." + h.slice(a));
							} else h = v ? "0p+0" : "0";h = (16 == t ? "0x" : 2 == t ? "0b" : 8 == t ? "0o" : "") + h;
						} else h = N(e);return e.s < 0 ? "-" + h : h;
					}function S(e, t) {
						if (e.length > t) return e.length = t, !0;
					}function C(e) {
						return new this(e).abs();
					}function z(e) {
						return new this(e).acos();
					}function k(e) {
						return new this(e).acosh();
					}function B(e, t) {
						return new this(e).plus(t);
					}function I(e) {
						return new this(e).asin();
					}function P(e) {
						return new this(e).asinh();
					}function R(e) {
						return new this(e).atan();
					}function U(e) {
						return new this(e).atanh();
					}function q(e, t) {
						e = new this(e), t = new this(t);var r,
						    n = this.precision,
						    i = this.rounding,
						    a = n + 4;return e.s && t.s ? e.d || t.d ? !t.d || e.isZero() ? (r = t.s < 0 ? m(this, n, i) : new this(0), r.s = e.s) : !e.d || t.isZero() ? (r = m(this, a, 1).times(.5), r.s = e.s) : t.s < 0 ? (this.precision = a, this.rounding = 1, r = this.atan(je(e, t, a, 1)), t = m(this, a, 1), this.precision = n, this.rounding = i, r = e.s < 0 ? r.minus(t) : r.plus(t)) : r = this.atan(je(e, t, a, 1)) : (r = m(this, a, 1).times(t.s > 0 ? .25 : .75), r.s = e.s) : r = new this(NaN), r;
					}function j(e) {
						return new this(e).cbrt();
					}function L(e) {
						return f(e = new this(e), e.e + 1, 2);
					}function F(e) {
						if (!e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e))) throw Error(Ee + "Object expected");var t,
						    r,
						    n,
						    i = ["precision", 1, ve, "rounding", 0, 8, "toExpNeg", -ge, 0, "toExpPos", 0, ge, "maxE", 0, ge, "minE", -ge, 0, "modulo", 0, 9];for (t = 0; t < i.length; t += 3) {
							if (void 0 !== (n = e[r = i[t]])) {
								if (!(Te(n) === n && n >= i[t + 1] && n <= i[t + 2])) throw Error(Me + r + ": " + n);this[r] = n;
							}
						}if (void 0 !== (n = e[r = "crypto"])) {
							if (n !== !0 && n !== !1 && 0 !== n && 1 !== n) throw Error(Me + r + ": " + n);if (n) {
								if ("undefined" == typeof crypto || !crypto || !crypto.getRandomValues && !crypto.randomBytes) throw Error(Oe);this[r] = !0;
							} else this[r] = !1;
						}return this;
					}function D(e) {
						return new this(e).cos();
					}function $(e) {
						return new this(e).cosh();
					}function G(e) {
						function t(e) {
							var r,
							    n,
							    i,
							    a = this;if (!(a instanceof t)) return new t(e);if (a.constructor = t, e instanceof t) return a.s = e.s, a.e = e.e, void (a.d = (e = e.d) ? e.slice() : e);if (i = typeof e === "undefined" ? "undefined" : _typeof(e), "number" === i) {
								if (0 === e) return a.s = 1 / e < 0 ? -1 : 1, a.e = 0, void (a.d = [0]);if (e < 0 ? (e = -e, a.s = -1) : a.s = 1, e === ~~e && e < 1e7) {
									for (r = 0, n = e; n >= 10; n /= 10) {
										r++;
									}return a.e = r, void (a.d = [e]);
								}return 0 * e !== 0 ? (e || (a.s = NaN), a.e = NaN, void (a.d = null)) : E(a, e.toString());
							}if ("string" !== i) throw Error(Me + e);return 45 === e.charCodeAt(0) ? (e = e.slice(1), a.s = -1) : a.s = 1, ke.test(e) ? E(a, e) : M(a, e);
						}var r, n, i;if (t.prototype = qe, t.ROUND_UP = 0, t.ROUND_DOWN = 1, t.ROUND_CEIL = 2, t.ROUND_FLOOR = 3, t.ROUND_HALF_UP = 4, t.ROUND_HALF_DOWN = 5, t.ROUND_HALF_EVEN = 6, t.ROUND_HALF_CEIL = 7, t.ROUND_HALF_FLOOR = 8, t.EUCLID = 9, t.config = t.set = F, t.clone = G, t.abs = C, t.acos = z, t.acosh = k, t.add = B, t.asin = I, t.asinh = P, t.atan = R, t.atanh = U, t.atan2 = q, t.cbrt = j, t.ceil = L, t.cos = D, t.cosh = $, t.div = H, t.exp = V, t.floor = Z, t.hypot = W, t.ln = Y, t.log = X, t.log10 = Q, t.log2 = J, t.max = K, t.min = ee, t.mod = te, t.mul = re, t.pow = ne, t.random = ie, t.round = ae, t.sign = oe, t.sin = se, t.sinh = ue, t.sqrt = ce, t.sub = fe, t.tan = le, t.tanh = pe, t.trunc = he, void 0 === e && (e = {}), e) for (i = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], r = 0; r < i.length;) {
							e.hasOwnProperty(n = i[r++]) || (e[n] = this[n]);
						}return t.config(e), t;
					}function H(e, t) {
						return new this(e).div(t);
					}function V(e) {
						return new this(e).exp();
					}function Z(e) {
						return f(e = new this(e), e.e + 1, 3);
					}function W() {
						var e,
						    t,
						    r = new this(0);for (Ne = !1, e = 0; e < arguments.length;) {
							if (t = new this(arguments[e++]), t.d) r.d && (r = r.plus(t.times(t)));else {
								if (t.s) return Ne = !0, new this(1 / 0);r = t;
							}
						}return Ne = !0, r.sqrt();
					}function Y(e) {
						return new this(e).ln();
					}function X(e, t) {
						return new this(e).log(t);
					}function J(e) {
						return new this(e).log(2);
					}function Q(e) {
						return new this(e).log(10);
					}function K() {
						return x(this, arguments, "lt");
					}function ee() {
						return x(this, arguments, "gt");
					}function te(e, t) {
						return new this(e).mod(t);
					}function re(e, t) {
						return new this(e).mul(t);
					}function ne(e, t) {
						return new this(e).pow(t);
					}function ie(e) {
						var t,
						    r,
						    n,
						    i,
						    a = 0,
						    s = new this(1),
						    u = [];if (void 0 === e ? e = this.precision : o(e, 1, ve), n = Math.ceil(e / Ie), this.crypto) {
							if (crypto.getRandomValues) for (t = crypto.getRandomValues(new Uint32Array(n)); a < n;) {
								i = t[a], i >= 429e7 ? t[a] = crypto.getRandomValues(new Uint32Array(1))[0] : u[a++] = i % 1e7;
							} else {
								if (!crypto.randomBytes) throw Error(Oe);for (t = crypto.randomBytes(n *= 4); a < n;) {
									i = t[a] + (t[a + 1] << 8) + (t[a + 2] << 16) + ((127 & t[a + 3]) << 24), i >= 214e7 ? crypto.randomBytes(4).copy(t, a) : (u.push(i % 1e7), a += 4);
								}a = n / 4;
							}
						} else for (; a < n;) {
							u[a++] = 1e7 * Math.random() | 0;
						}for (n = u[--a], e %= Ie, n && e && (i = _e(10, Ie - e), u[a] = (n / i | 0) * i); 0 === u[a]; a--) {
							u.pop();
						}if (a < 0) r = 0, u = [0];else {
							for (r = -1; 0 === u[0]; r -= Ie) {
								u.shift();
							}for (n = 1, i = u[0]; i >= 10; i /= 10) {
								n++;
							}n < Ie && (r -= Ie - n);
						}return s.e = r, s.d = u, s;
					}function ae(e) {
						return f(e = new this(e), e.e + 1, this.rounding);
					}function oe(e) {
						return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
					}function se(e) {
						return new this(e).sin();
					}function ue(e) {
						return new this(e).sinh();
					}function ce(e) {
						return new this(e).sqrt();
					}function fe(e, t) {
						return new this(e).sub(t);
					}function le(e) {
						return new this(e).tan();
					}function pe(e) {
						return new this(e).tanh();
					}function he(e) {
						return f(e = new this(e), e.e + 1, 1);
					}var me,
					    de,
					    ge = 9e15,
					    ve = 1e9,
					    ye = "0123456789abcdef",
					    xe = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",
					    we = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",
					    be = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -ge, maxE: ge, crypto: !1 },
					    Ne = !0,
					    Ee = "[DecimalError] ",
					    Me = Ee + "Invalid argument: ",
					    Ae = Ee + "Precision limit exceeded",
					    Oe = Ee + "crypto unavailable",
					    Te = Math.floor,
					    _e = Math.pow,
					    Se = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
					    Ce = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
					    ze = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
					    ke = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
					    Be = 1e7,
					    Ie = 7,
					    Pe = 9007199254740991,
					    Re = xe.length - 1,
					    Ue = we.length - 1,
					    qe = {};qe.absoluteValue = qe.abs = function () {
						var e = new this.constructor(this);return e.s < 0 && (e.s = 1), f(e);
					}, qe.ceil = function () {
						return f(new this.constructor(this), this.e + 1, 2);
					}, qe.comparedTo = qe.cmp = function (e) {
						var t,
						    r,
						    n,
						    i,
						    a = this,
						    o = a.d,
						    s = (e = new a.constructor(e)).d,
						    u = a.s,
						    c = e.s;if (!o || !s) return u && c ? u !== c ? u : o === s ? 0 : !o ^ u < 0 ? 1 : -1 : NaN;if (!o[0] || !s[0]) return o[0] ? u : s[0] ? -c : 0;if (u !== c) return u;if (a.e !== e.e) return a.e > e.e ^ u < 0 ? 1 : -1;for (n = o.length, i = s.length, t = 0, r = n < i ? n : i; t < r; ++t) {
							if (o[t] !== s[t]) return o[t] > s[t] ^ u < 0 ? 1 : -1;
						}return n === i ? 0 : n > i ^ u < 0 ? 1 : -1;
					}, qe.cosine = qe.cos = function () {
						var e,
						    t,
						    r = this,
						    n = r.constructor;return r.d ? r.d[0] ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + Ie, n.rounding = 1, r = c(n, T(n, r)), n.precision = e, n.rounding = t, f(2 == de || 3 == de ? r.neg() : r, e, t, !0)) : new n(1) : new n(NaN);
					}, qe.cubeRoot = qe.cbrt = function () {
						var e,
						    t,
						    r,
						    n,
						    i,
						    o,
						    s,
						    u,
						    c,
						    l,
						    p = this,
						    h = p.constructor;if (!p.isFinite() || p.isZero()) return new h(p);for (Ne = !1, o = p.s * Math.pow(p.s * p, 1 / 3), o && Math.abs(o) != 1 / 0 ? n = new h(o.toString()) : (r = a(p.d), e = p.e, (o = (e - r.length + 1) % 3) && (r += 1 == o || o == -2 ? "0" : "00"), o = Math.pow(r, 1 / 3), e = Te((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), o == 1 / 0 ? r = "5e" + e : (r = o.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + e), n = new h(r), n.s = p.s), s = (e = h.precision) + 3;;) {
							if (u = n, c = u.times(u).times(u), l = c.plus(p), n = je(l.plus(p).times(u), l.plus(c), s + 2, 1), a(u.d).slice(0, s) === (r = a(n.d)).slice(0, s)) {
								if (r = r.slice(s - 3, s + 1), "9999" != r && (i || "4999" != r)) {
									+r && (+r.slice(1) || "5" != r.charAt(0)) || (f(n, e + 1, 1), t = !n.times(n).times(n).eq(p));break;
								}if (!i && (f(u, e + 1, 0), u.times(u).times(u).eq(p))) {
									n = u;break;
								}s += 4, i = 1;
							}
						}return Ne = !0, f(n, e, h.rounding, t);
					}, qe.decimalPlaces = qe.dp = function () {
						var e,
						    t = this.d,
						    r = NaN;if (t) {
							if (e = t.length - 1, r = (e - Te(this.e / Ie)) * Ie, e = t[e]) for (; e % 10 == 0; e /= 10) {
								r--;
							}r < 0 && (r = 0);
						}return r;
					}, qe.dividedBy = qe.div = function (e) {
						return je(this, new this.constructor(e));
					}, qe.dividedToIntegerBy = qe.divToInt = function (e) {
						var t = this,
						    r = t.constructor;return f(je(t, new r(e), 0, 1, 1), r.precision, r.rounding);
					}, qe.equals = qe.eq = function (e) {
						return 0 === this.cmp(e);
					}, qe.floor = function () {
						return f(new this.constructor(this), this.e + 1, 3);
					}, qe.greaterThan = qe.gt = function (e) {
						return this.cmp(e) > 0;
					}, qe.greaterThanOrEqualTo = qe.gte = function (e) {
						var t = this.cmp(e);return 1 == t || 0 === t;
					}, qe.hyperbolicCosine = qe.cosh = function () {
						var e,
						    t,
						    r,
						    n,
						    i,
						    a = this,
						    o = a.constructor,
						    s = new o(1);if (!a.isFinite()) return new o(a.s ? 1 / 0 : NaN);if (a.isZero()) return s;r = o.precision, n = o.rounding, o.precision = r + Math.max(a.e, a.sd()) + 4, o.rounding = 1, i = a.d.length, i < 32 ? (e = Math.ceil(i / 3), t = Math.pow(4, -e).toString()) : (e = 16, t = "2.3283064365386962890625e-10"), a = O(o, 1, a.times(t), new o(1), !0);for (var u, c = e, l = new o(8); c--;) {
							u = a.times(a), a = s.minus(u.times(l.minus(u.times(l))));
						}return f(a, o.precision = r, o.rounding = n, !0);
					}, qe.hyperbolicSine = qe.sinh = function () {
						var e,
						    t,
						    r,
						    n,
						    i = this,
						    a = i.constructor;if (!i.isFinite() || i.isZero()) return new a(i);if (t = a.precision, r = a.rounding, a.precision = t + Math.max(i.e, i.sd()) + 4, a.rounding = 1, n = i.d.length, n < 3) i = O(a, 2, i, i, !0);else {
							e = 1.4 * Math.sqrt(n), e = e > 16 ? 16 : 0 | e, i = i.times(Math.pow(5, -e)), i = O(a, 2, i, i, !0);for (var o, s = new a(5), u = new a(16), c = new a(20); e--;) {
								o = i.times(i), i = i.times(s.plus(o.times(u.times(o).plus(c))));
							}
						}return a.precision = t, a.rounding = r, f(i, t, r, !0);
					}, qe.hyperbolicTangent = qe.tanh = function () {
						var e,
						    t,
						    r = this,
						    n = r.constructor;return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 7, n.rounding = 1, je(r.sinh(), r.cosh(), n.precision = e, n.rounding = t)) : new n(r.s);
					}, qe.inverseCosine = qe.acos = function () {
						var e,
						    t = this,
						    r = t.constructor,
						    n = t.abs().cmp(1),
						    i = r.precision,
						    a = r.rounding;return n !== -1 ? 0 === n ? t.isNeg() ? m(r, i, a) : new r(0) : new r(NaN) : t.isZero() ? m(r, i + 4, a).times(.5) : (r.precision = i + 6, r.rounding = 1, t = t.asin(), e = m(r, i + 4, a).times(.5), r.precision = i, r.rounding = a, e.minus(t));
					}, qe.inverseHyperbolicCosine = qe.acosh = function () {
						var e,
						    t,
						    r = this,
						    n = r.constructor;return r.lte(1) ? new n(r.eq(1) ? 0 : NaN) : r.isFinite() ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4, n.rounding = 1, Ne = !1, r = r.times(r).minus(1).sqrt().plus(r), Ne = !0, n.precision = e, n.rounding = t, r.ln()) : new n(r);
					}, qe.inverseHyperbolicSine = qe.asinh = function () {
						var e,
						    t,
						    r = this,
						    n = r.constructor;return !r.isFinite() || r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6, n.rounding = 1, Ne = !1, r = r.times(r).plus(1).sqrt().plus(r), Ne = !0, n.precision = e, n.rounding = t, r.ln());
					}, qe.inverseHyperbolicTangent = qe.atanh = function () {
						var e,
						    t,
						    r,
						    n,
						    i = this,
						    a = i.constructor;return i.isFinite() ? i.e >= 0 ? new a(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (e = a.precision, t = a.rounding, n = i.sd(), Math.max(n, e) < 2 * -i.e - 1 ? f(new a(i), e, t, !0) : (a.precision = r = n - i.e, i = je(i.plus(1), new a(1).minus(i), r + e, 1), a.precision = e + 4, a.rounding = 1, i = i.ln(), a.precision = e, a.rounding = t, i.times(.5))) : new a(NaN);
					}, qe.inverseSine = qe.asin = function () {
						var e,
						    t,
						    r,
						    n,
						    i = this,
						    a = i.constructor;return i.isZero() ? new a(i) : (t = i.abs().cmp(1), r = a.precision, n = a.rounding, t !== -1 ? 0 === t ? (e = m(a, r + 4, n).times(.5), e.s = i.s, e) : new a(NaN) : (a.precision = r + 6, a.rounding = 1, i = i.div(new a(1).minus(i.times(i)).sqrt().plus(1)).atan(), a.precision = r, a.rounding = n, i.times(2)));
					}, qe.inverseTangent = qe.atan = function () {
						var e,
						    t,
						    r,
						    n,
						    i,
						    a,
						    o,
						    s,
						    u,
						    c = this,
						    l = c.constructor,
						    p = l.precision,
						    h = l.rounding;if (c.isFinite()) {
							if (c.isZero()) return new l(c);if (c.abs().eq(1) && p + 4 <= Ue) return o = m(l, p + 4, h).times(.25), o.s = c.s, o;
						} else {
							if (!c.s) return new l(NaN);if (p + 4 <= Ue) return o = m(l, p + 4, h).times(.5), o.s = c.s, o;
						}for (l.precision = s = p + 10, l.rounding = 1, r = Math.min(28, s / Ie + 2 | 0), e = r; e; --e) {
							c = c.div(c.times(c).plus(1).sqrt().plus(1));
						}for (Ne = !1, t = Math.ceil(s / Ie), n = 1, u = c.times(c), o = new l(c), i = c; e !== -1;) {
							if (i = i.times(u), a = o.minus(i.div(n += 2)), i = i.times(u), o = a.plus(i.div(n += 2)), void 0 !== o.d[t]) for (e = t; o.d[e] === a.d[e] && e--;) {}
						}return r && (o = o.times(2 << r - 1)), Ne = !0, f(o, l.precision = p, l.rounding = h, !0);
					}, qe.isFinite = function () {
						return !!this.d;
					}, qe.isInteger = qe.isInt = function () {
						return !!this.d && Te(this.e / Ie) > this.d.length - 2;
					}, qe.isNaN = function () {
						return !this.s;
					}, qe.isNegative = qe.isNeg = function () {
						return this.s < 0;
					}, qe.isPositive = qe.isPos = function () {
						return this.s > 0;
					}, qe.isZero = function () {
						return !!this.d && 0 === this.d[0];
					}, qe.lessThan = qe.lt = function (e) {
						return this.cmp(e) < 0;
					}, qe.lessThanOrEqualTo = qe.lte = function (e) {
						return this.cmp(e) < 1;
					}, qe.logarithm = qe.log = function (e) {
						var t,
						    r,
						    n,
						    i,
						    o,
						    u,
						    c,
						    l,
						    p = this,
						    m = p.constructor,
						    d = m.precision,
						    g = m.rounding,
						    v = 5;if (null == e) e = new m(10), t = !0;else {
							if (e = new m(e), r = e.d, e.s < 0 || !r || !r[0] || e.eq(1)) return new m(NaN);t = e.eq(10);
						}if (r = p.d, p.s < 0 || !r || !r[0] || p.eq(1)) return new m(r && !r[0] ? -1 / 0 : 1 != p.s ? NaN : r ? 0 : 1 / 0);if (t) if (r.length > 1) o = !0;else {
							for (i = r[0]; i % 10 === 0;) {
								i /= 10;
							}o = 1 !== i;
						}if (Ne = !1, c = d + v, u = b(p, c), n = t ? h(m, c + 10) : b(e, c), l = je(u, n, c, 1), s(l.d, i = d, g)) do {
							if (c += 10, u = b(p, c), n = t ? h(m, c + 10) : b(e, c), l = je(u, n, c, 1), !o) {
								+a(l.d).slice(i + 1, i + 15) + 1 == 1e14 && (l = f(l, d + 1, 0));break;
							}
						} while (s(l.d, i += 10, g));return Ne = !0, f(l, d, g);
					}, qe.minus = qe.sub = function (e) {
						var t,
						    r,
						    n,
						    i,
						    a,
						    o,
						    s,
						    u,
						    c,
						    l,
						    h,
						    m,
						    d = this,
						    g = d.constructor;if (e = new g(e), !d.d || !e.d) return d.s && e.s ? d.d ? e.s = -e.s : e = new g(e.d || d.s !== e.s ? d : NaN) : e = new g(NaN), e;if (d.s != e.s) return e.s = -e.s, d.plus(e);if (c = d.d, m = e.d, s = g.precision, u = g.rounding, !c[0] || !m[0]) {
							if (m[0]) e.s = -e.s;else {
								if (!c[0]) return new g(3 === u ? -0 : 0);e = new g(d);
							}return Ne ? f(e, s, u) : e;
						}if (r = Te(e.e / Ie), l = Te(d.e / Ie), c = c.slice(), a = l - r) {
							for (h = a < 0, h ? (t = c, a = -a, o = m.length) : (t = m, r = l, o = c.length), n = Math.max(Math.ceil(s / Ie), o) + 2, a > n && (a = n, t.length = 1), t.reverse(), n = a; n--;) {
								t.push(0);
							}t.reverse();
						} else {
							for (n = c.length, o = m.length, h = n < o, h && (o = n), n = 0; n < o; n++) {
								if (c[n] != m[n]) {
									h = c[n] < m[n];break;
								}
							}a = 0;
						}for (h && (t = c, c = m, m = t, e.s = -e.s), o = c.length, n = m.length - o; n > 0; --n) {
							c[o++] = 0;
						}for (n = m.length; n > a;) {
							if (c[--n] < m[n]) {
								for (i = n; i && 0 === c[--i];) {
									c[i] = Be - 1;
								}--c[i], c[n] += Be;
							}c[n] -= m[n];
						}for (; 0 === c[--o];) {
							c.pop();
						}for (; 0 === c[0]; c.shift()) {
							--r;
						}return c[0] ? (e.d = c, e.e = p(c, r), Ne ? f(e, s, u) : e) : new g(3 === u ? -0 : 0);
					}, qe.modulo = qe.mod = function (e) {
						var t,
						    r = this,
						    n = r.constructor;return e = new n(e), !r.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || r.d && !r.d[0] ? f(new n(r), n.precision, n.rounding) : (Ne = !1, 9 == n.modulo ? (t = je(r, e.abs(), 0, 3, 1), t.s *= e.s) : t = je(r, e, 0, n.modulo, 1), t = t.times(e), Ne = !0, r.minus(t));
					}, qe.naturalExponential = qe.exp = function () {
						return w(this);
					}, qe.naturalLogarithm = qe.ln = function () {
						return b(this);
					}, qe.negated = qe.neg = function () {
						var e = new this.constructor(this);return e.s = -e.s, f(e);
					}, qe.plus = qe.add = function (e) {
						var t,
						    r,
						    n,
						    i,
						    a,
						    o,
						    s,
						    u,
						    c,
						    l,
						    h = this,
						    m = h.constructor;if (e = new m(e), !h.d || !e.d) return h.s && e.s ? h.d || (e = new m(e.d || h.s === e.s ? h : NaN)) : e = new m(NaN), e;if (h.s != e.s) return e.s = -e.s, h.minus(e);if (c = h.d, l = e.d, s = m.precision, u = m.rounding, !c[0] || !l[0]) return l[0] || (e = new m(h)), Ne ? f(e, s, u) : e;if (a = Te(h.e / Ie), n = Te(e.e / Ie), c = c.slice(), i = a - n) {
							for (i < 0 ? (r = c, i = -i, o = l.length) : (r = l, n = a, o = c.length), a = Math.ceil(s / Ie), o = a > o ? a + 1 : o + 1, i > o && (i = o, r.length = 1), r.reverse(); i--;) {
								r.push(0);
							}r.reverse();
						}for (o = c.length, i = l.length, o - i < 0 && (i = o, r = l, l = c, c = r), t = 0; i;) {
							t = (c[--i] = c[i] + l[i] + t) / Be | 0, c[i] %= Be;
						}for (t && (c.unshift(t), ++n), o = c.length; 0 == c[--o];) {
							c.pop();
						}return e.d = c, e.e = p(c, n), Ne ? f(e, s, u) : e;
					}, qe.precision = qe.sd = function (e) {
						var t,
						    r = this;if (void 0 !== e && e !== !!e && 1 !== e && 0 !== e) throw Error(Me + e);return r.d ? (t = d(r.d), e && r.e + 1 > t && (t = r.e + 1)) : t = NaN, t;
					}, qe.round = function () {
						var e = this,
						    t = e.constructor;return f(new t(e), e.e + 1, t.rounding);
					}, qe.sine = qe.sin = function () {
						var e,
						    t,
						    r = this,
						    n = r.constructor;return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + Ie, n.rounding = 1, r = A(n, T(n, r)), n.precision = e, n.rounding = t, f(de > 2 ? r.neg() : r, e, t, !0)) : new n(NaN);
					}, qe.squareRoot = qe.sqrt = function () {
						var e,
						    t,
						    r,
						    n,
						    i,
						    o,
						    s = this,
						    u = s.d,
						    c = s.e,
						    l = s.s,
						    p = s.constructor;if (1 !== l || !u || !u[0]) return new p(!l || l < 0 && (!u || u[0]) ? NaN : u ? s : 1 / 0);for (Ne = !1, l = Math.sqrt(+s), 0 == l || l == 1 / 0 ? (t = a(u), (t.length + c) % 2 == 0 && (t += "0"), l = Math.sqrt(t), c = Te((c + 1) / 2) - (c < 0 || c % 2), l == 1 / 0 ? t = "1e" + c : (t = l.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + c), n = new p(t)) : n = new p(l.toString()), r = (c = p.precision) + 3;;) {
							if (o = n, n = o.plus(je(s, o, r + 2, 1)).times(.5), a(o.d).slice(0, r) === (t = a(n.d)).slice(0, r)) {
								if (t = t.slice(r - 3, r + 1), "9999" != t && (i || "4999" != t)) {
									+t && (+t.slice(1) || "5" != t.charAt(0)) || (f(n, c + 1, 1), e = !n.times(n).eq(s));break;
								}if (!i && (f(o, c + 1, 0), o.times(o).eq(s))) {
									n = o;break;
								}r += 4, i = 1;
							}
						}return Ne = !0, f(n, c, p.rounding, e);
					}, qe.tangent = qe.tan = function () {
						var e,
						    t,
						    r = this,
						    n = r.constructor;return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 10, n.rounding = 1, r = r.sin(), r.s = 1, r = je(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0), n.precision = e, n.rounding = t, f(2 == de || 4 == de ? r.neg() : r, e, t, !0)) : new n(NaN);
					}, qe.times = qe.mul = function (e) {
						var t,
						    r,
						    n,
						    i,
						    a,
						    o,
						    s,
						    u,
						    c,
						    l = this,
						    h = l.constructor,
						    m = l.d,
						    d = (e = new h(e)).d;if (e.s *= l.s, !(m && m[0] && d && d[0])) return new h(!e.s || m && !m[0] && !d || d && !d[0] && !m ? NaN : m && d ? 0 * e.s : e.s / 0);for (r = Te(l.e / Ie) + Te(e.e / Ie), u = m.length, c = d.length, u < c && (a = m, m = d, d = a, o = u, u = c, c = o), a = [], o = u + c, n = o; n--;) {
							a.push(0);
						}for (n = c; --n >= 0;) {
							for (t = 0, i = u + n; i > n;) {
								s = a[i] + d[n] * m[i - n - 1] + t, a[i--] = s % Be | 0, t = s / Be | 0;
							}a[i] = (a[i] + t) % Be | 0;
						}for (; !a[--o];) {
							a.pop();
						}return t ? ++r : a.shift(), e.d = a, e.e = p(a, r), Ne ? f(e, h.precision, h.rounding) : e;
					}, qe.toBinary = function (e, t) {
						return _(this, 2, e, t);
					}, qe.toDecimalPlaces = qe.toDP = function (e, t) {
						var r = this,
						    n = r.constructor;return r = new n(r), void 0 === e ? r : (o(e, 0, ve), void 0 === t ? t = n.rounding : o(t, 0, 8), f(r, e + r.e + 1, t));
					}, qe.toExponential = function (e, t) {
						var r,
						    n = this,
						    i = n.constructor;return void 0 === e ? r = l(n, !0) : (o(e, 0, ve), void 0 === t ? t = i.rounding : o(t, 0, 8), n = f(new i(n), e + 1, t), r = l(n, !0, e + 1)), n.isNeg() && !n.isZero() ? "-" + r : r;
					}, qe.toFixed = function (e, t) {
						var r,
						    n,
						    i = this,
						    a = i.constructor;return void 0 === e ? r = l(i) : (o(e, 0, ve), void 0 === t ? t = a.rounding : o(t, 0, 8), n = f(new a(i), e + i.e + 1, t), r = l(n, !1, e + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + r : r;
					}, qe.toFraction = function (e) {
						var t,
						    r,
						    n,
						    i,
						    o,
						    s,
						    u,
						    c,
						    f,
						    l,
						    p,
						    h,
						    m = this,
						    g = m.d,
						    v = m.constructor;if (!g) return new v(m);if (f = r = new v(1), n = c = new v(0), t = new v(n), o = t.e = d(g) - m.e - 1, s = o % Ie, t.d[0] = _e(10, s < 0 ? Ie + s : s), null == e) e = o > 0 ? t : f;else {
							if (u = new v(e), !u.isInt() || u.lt(f)) throw Error(Me + u);e = u.gt(t) ? o > 0 ? t : f : u;
						}for (Ne = !1, u = new v(a(g)), l = v.precision, v.precision = o = g.length * Ie * 2; p = je(u, t, 0, 1, 1), i = r.plus(p.times(n)), 1 != i.cmp(e);) {
							r = n, n = i, i = f, f = c.plus(p.times(i)), c = i, i = t, t = u.minus(p.times(i)), u = i;
						}return i = je(e.minus(r), n, 0, 1, 1), c = c.plus(i.times(f)), r = r.plus(i.times(n)), c.s = f.s = m.s, h = je(f, n, o, 1).minus(m).abs().cmp(je(c, r, o, 1).minus(m).abs()) < 1 ? [f, n] : [c, r], v.precision = l, Ne = !0, h;
					}, qe.toHexadecimal = qe.toHex = function (e, t) {
						return _(this, 16, e, t);
					}, qe.toNearest = function (e, t) {
						var r = this,
						    n = r.constructor;if (r = new n(r), null == e) {
							if (!r.d) return r;e = new n(1), t = n.rounding;
						} else {
							if (e = new n(e), void 0 !== t && o(t, 0, 8), !r.d) return e.s ? r : e;if (!e.d) return e.s && (e.s = r.s), e;
						}return e.d[0] ? (Ne = !1, t < 4 && (t = [4, 5, 7, 8][t]), r = je(r, e, 0, t, 1).times(e), Ne = !0, f(r)) : (e.s = r.s, r = e), r;
					}, qe.toNumber = function () {
						return +this;
					}, qe.toOctal = function (e, t) {
						return _(this, 8, e, t);
					}, qe.toPower = qe.pow = function (e) {
						var t,
						    r,
						    n,
						    i,
						    o,
						    u,
						    c,
						    l = this,
						    p = l.constructor,
						    h = +(e = new p(e));if (!(l.d && e.d && l.d[0] && e.d[0])) return new p(_e(+l, h));if (l = new p(l), l.eq(1)) return l;if (n = p.precision, o = p.rounding, e.eq(1)) return f(l, n, o);if (t = Te(e.e / Ie), r = e.d.length - 1, c = t >= r, u = l.s, c) {
							if ((r = h < 0 ? -h : h) <= Pe) return i = v(p, l, r, n), e.s < 0 ? new p(1).div(i) : f(i, n, o);
						} else if (u < 0) return new p(NaN);return u = u < 0 && 1 & e.d[Math.max(t, r)] ? -1 : 1, r = _e(+l, h), t = 0 != r && isFinite(r) ? new p(r + "").e : Te(h * (Math.log("0." + a(l.d)) / Math.LN10 + l.e + 1)), t > p.maxE + 1 || t < p.minE - 1 ? new p(t > 0 ? u / 0 : 0) : (Ne = !1, p.rounding = l.s = 1, r = Math.min(12, (t + "").length), i = w(e.times(b(l, n + r)), n), i = f(i, n + 5, 1), s(i.d, n, o) && (t = n + 10, i = f(w(e.times(b(l, t + r)), t), t + 5, 1), +a(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = f(i, n + 1, 0))), i.s = u, Ne = !0, p.rounding = o, f(i, n, o));
					}, qe.toPrecision = function (e, t) {
						var r,
						    n = this,
						    i = n.constructor;return void 0 === e ? r = l(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (o(e, 1, ve), void 0 === t ? t = i.rounding : o(t, 0, 8), n = f(new i(n), e, t), r = l(n, e <= n.e || n.e <= i.toExpNeg, e)), n.isNeg() && !n.isZero() ? "-" + r : r;
					}, qe.toSignificantDigits = qe.toSD = function (e, t) {
						var r = this,
						    n = r.constructor;return void 0 === e ? (e = n.precision, t = n.rounding) : (o(e, 1, ve), void 0 === t ? t = n.rounding : o(t, 0, 8)), f(new n(r), e, t);
					}, qe.toString = function () {
						var e = this,
						    t = e.constructor,
						    r = l(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);return e.isNeg() && !e.isZero() ? "-" + r : r;
					}, qe.truncated = qe.trunc = function () {
						return f(new this.constructor(this), this.e + 1, 1);
					}, qe.valueOf = qe.toJSON = function () {
						var e = this,
						    t = e.constructor,
						    r = l(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);return e.isNeg() ? "-" + r : r;
					};var je = function () {
						function e(e, t, r) {
							var n,
							    i = 0,
							    a = e.length;for (e = e.slice(); a--;) {
								n = e[a] * t + i, e[a] = n % r | 0, i = n / r | 0;
							}return i && e.unshift(i), e;
						}function t(e, t, r, n) {
							var i, a;if (r != n) a = r > n ? 1 : -1;else for (i = a = 0; i < r; i++) {
								if (e[i] != t[i]) {
									a = e[i] > t[i] ? 1 : -1;break;
								}
							}return a;
						}function r(e, t, r, n) {
							for (var i = 0; r--;) {
								e[r] -= i, i = e[r] < t[r] ? 1 : 0, e[r] = i * n + e[r] - t[r];
							}for (; !e[0] && e.length > 1;) {
								e.shift();
							}
						}return function (n, i, a, o, s, u) {
							var c,
							    l,
							    p,
							    h,
							    m,
							    d,
							    g,
							    v,
							    y,
							    x,
							    w,
							    b,
							    N,
							    E,
							    M,
							    A,
							    O,
							    T,
							    _,
							    S,
							    C = n.constructor,
							    z = n.s == i.s ? 1 : -1,
							    k = n.d,
							    B = i.d;if (!(k && k[0] && B && B[0])) return new C(n.s && i.s && (k ? !B || k[0] != B[0] : B) ? k && 0 == k[0] || !B ? 0 * z : z / 0 : NaN);for (u ? (m = 1, l = n.e - i.e) : (u = Be, m = Ie, l = Te(n.e / m) - Te(i.e / m)), _ = B.length, O = k.length, y = new C(z), x = y.d = [], p = 0; B[p] == (k[p] || 0); p++) {}if (B[p] > (k[p] || 0) && l--, null == a ? (E = a = C.precision, o = C.rounding) : E = s ? a + (n.e - i.e) + 1 : a, E < 0) x.push(1), d = !0;else {
								if (E = E / m + 2 | 0, p = 0, 1 == _) {
									for (h = 0, B = B[0], E++; (p < O || h) && E--; p++) {
										M = h * u + (k[p] || 0), x[p] = M / B | 0, h = M % B | 0;
									}d = h || p < O;
								} else {
									for (h = u / (B[0] + 1) | 0, h > 1 && (B = e(B, h, u), k = e(k, h, u), _ = B.length, O = k.length), A = _, w = k.slice(0, _), b = w.length; b < _;) {
										w[b++] = 0;
									}S = B.slice(), S.unshift(0), T = B[0], B[1] >= u / 2 && ++T;do {
										h = 0, c = t(B, w, _, b), c < 0 ? (N = w[0], _ != b && (N = N * u + (w[1] || 0)), h = N / T | 0, h > 1 ? (h >= u && (h = u - 1), g = e(B, h, u), v = g.length, b = w.length, c = t(g, w, v, b), 1 == c && (h--, r(g, _ < v ? S : B, v, u))) : (0 == h && (c = h = 1), g = B.slice()), v = g.length, v < b && g.unshift(0), r(w, g, b, u), c == -1 && (b = w.length, c = t(B, w, _, b), c < 1 && (h++, r(w, _ < b ? S : B, b, u))), b = w.length) : 0 === c && (h++, w = [0]), x[p++] = h, c && w[0] ? w[b++] = k[A] || 0 : (w = [k[A]], b = 1);
									} while ((A++ < O || void 0 !== w[0]) && E--);d = void 0 !== w[0];
								}x[0] || x.shift();
							}if (1 == m) y.e = l, me = d;else {
								for (p = 1, h = x[0]; h >= 10; h /= 10) {
									p++;
								}y.e = p + l * m - 1, f(y, s ? a + y.e + 1 : a, o, d);
							}return y;
						};
					}();be = G(be), xe = new be(xe), we = new be(we), n = function () {
						return be;
					}.call(t, r, t, e), !(void 0 !== n && (e.exports = n));
				}(this);
			}, function (e, t, r) {
				var n, i; /**
              * @license Fraction.js v4.0.0 09/09/2015
              * http://www.xarg.org/2014/03/rational-numbers-in-javascript/
              *
              * Copyright (c) 2015, Robert Eisele (robert@xarg.org)
              * Dual licensed under the MIT or GPL Version 2 licenses.
              **/
				!function (r) {
					"use strict";
					function a(e) {
						var t = function t() {
							var t = Error.apply(this, arguments);t.name = this.name = e, this.stack = t.stack, this.message = t.message;
						},
						    r = function r() {};return r.prototype = Error.prototype, t.prototype = new r(), t;
					}function o(e, t) {
						return isNaN(e = parseInt(e, 10)) && s(), e * t;
					}function s() {
						throw new p();
					}function u(e, t) {
						return this instanceof u ? (h(e, t), e = u.REDUCE ? v(f.d, f.n) : 1, this.s = f.s, this.n = f.n / e, void (this.d = f.d / e)) : new u(e, t);
					}var c = 2e3,
					    f = { s: 1, n: 0, d: 1 },
					    l = u.DivisionByZero = a("DivisionByZero"),
					    p = u.InvalidParameter = a("InvalidParameter"),
					    h = function h(e, t) {
						var r,
						    n = 0,
						    i = 1,
						    a = 1,
						    u = 0,
						    c = 0,
						    p = 0,
						    h = 1,
						    m = 1,
						    d = 0,
						    g = 1,
						    v = 1,
						    y = 1,
						    x = 1e7;if (void 0 === e || null === e) ;else if (void 0 !== t) n = e, i = t, a = n * i;else switch (typeof e === "undefined" ? "undefined" : _typeof(e)) {case "object":
								"d" in e && "n" in e ? (n = e.n, i = e.d, "s" in e && (n *= e.s)) : 0 in e ? (n = e[0], 1 in e && (i = e[1])) : s(), a = n * i;break;case "number":
								if (e < 0 && (a = e, e = -e), e % 1 === 0) n = e;else if (e > 0) {
									for (e >= 1 && (m = Math.pow(10, Math.floor(1 + Math.log(e) / Math.LN10)), e /= m); g <= x && y <= x;) {
										if (r = (d + v) / (g + y), e === r) {
											g + y <= x ? (n = d + v, i = g + y) : y > g ? (n = v, i = y) : (n = d, i = g);break;
										}e > r ? (d += v, g += y) : (v += d, y += g), g > x ? (n = v, i = y) : (n = d, i = g);
									}n *= m;
								} else (isNaN(e) || isNaN(t)) && (i = n = NaN);break;case "string":
								if (g = e.match(/\d+|./g), "-" === g[d] ? (a = -1, d++) : "+" === g[d] && d++, g.length === d + 1 ? c = o(g[d++], a) : "." === g[d + 1] || "." === g[d] ? ("." !== g[d] && (u = o(g[d++], a)), d++, (d + 1 === g.length || "(" === g[d + 1] && ")" === g[d + 3] || "'" === g[d + 1] && "'" === g[d + 3]) && (c = o(g[d], a), h = Math.pow(10, g[d].length), d++), ("(" === g[d] && ")" === g[d + 2] || "'" === g[d] && "'" === g[d + 2]) && (p = o(g[d + 1], a), m = Math.pow(10, g[d + 1].length) - 1, d += 3)) : "/" === g[d + 1] || ":" === g[d + 1] ? (c = o(g[d], a), h = o(g[d + 2], 1), d += 3) : "/" === g[d + 3] && " " === g[d + 1] && (u = o(g[d], a), c = o(g[d + 2], a), h = o(g[d + 4], 1), d += 5), g.length <= d) {
									i = h * m, a = n = p + i * u + m * c;break;
								}default:
								s();}if (0 === i) throw new l();f.s = a < 0 ? -1 : 1, f.n = Math.abs(n), f.d = Math.abs(i);
					},
					    m = function m(e, t, r) {
						for (var n = 1; t > 0; e = e * e % r, t >>= 1) {
							1 & t && (n = n * e % r);
						}return n;
					},
					    d = function d(e, t) {
						for (; t % 2 === 0; t /= 2) {}for (; t % 5 === 0; t /= 5) {}if (1 === t) return 0;for (var r = 10 % t, n = 1; 1 !== r; n++) {
							if (r = 10 * r % t, n > c) return 0;
						}return n;
					},
					    g = function g(e, t, r) {
						for (var n = 1, i = m(10, r, t), a = 0; a < 300; a++) {
							if (n === i) return a;n = 10 * n % t, i = 10 * i % t;
						}return 0;
					},
					    v = function v(e, t) {
						if (!e) return t;if (!t) return e;for (;;) {
							if (e %= t, !e) return t;if (t %= e, !t) return e;
						}
					};u.REDUCE = 1, u.prototype = { s: 1, n: 0, d: 1, abs: function abs() {
							return new u(this.n, this.d);
						}, neg: function neg() {
							return new u(-this.s * this.n, this.d);
						}, add: function add(e, t) {
							return h(e, t), new u(this.s * this.n * f.d + f.s * this.d * f.n, this.d * f.d);
						}, sub: function sub(e, t) {
							return h(e, t), new u(this.s * this.n * f.d - f.s * this.d * f.n, this.d * f.d);
						}, mul: function mul(e, t) {
							return h(e, t), new u(this.s * f.s * this.n * f.n, this.d * f.d);
						}, div: function div(e, t) {
							return h(e, t), new u(this.s * f.s * this.n * f.d, this.d * f.n);
						}, clone: function clone() {
							return new u(this);
						}, mod: function mod(e, t) {
							return isNaN(this.n) || isNaN(this.d) ? new u(NaN) : void 0 === e ? new u(this.s * this.n % this.d, 1) : (h(e, t), 0 === f.n && 0 === this.d && u(0, 0), new u(this.s * f.d * this.n % (f.n * this.d), f.d * this.d));
						}, gcd: function gcd(e, t) {
							return h(e, t), new u(v(f.n, this.n), f.d * this.d / v(f.d, this.d));
						}, lcm: function lcm(e, t) {
							return h(e, t), 0 === f.n && 0 === this.n ? new u() : new u(f.n * this.n / v(f.n, this.n), v(f.d, this.d));
						}, ceil: function ceil(e) {
							return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new u(NaN) : new u(Math.ceil(e * this.s * this.n / this.d), e);
						}, floor: function floor(e) {
							return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new u(NaN) : new u(Math.floor(e * this.s * this.n / this.d), e);
						}, round: function round(e) {
							return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new u(NaN) : new u(Math.round(e * this.s * this.n / this.d), e);
						}, inverse: function inverse() {
							return new u(this.s * this.d, this.n);
						}, pow: function pow(e) {
							return e < 0 ? new u(Math.pow(this.s * this.d, -e), Math.pow(this.n, -e)) : new u(Math.pow(this.s * this.n, e), Math.pow(this.d, e));
						}, equals: function equals(e, t) {
							return h(e, t), this.s * this.n * f.d === f.s * f.n * this.d;
						}, compare: function compare(e, t) {
							h(e, t);var r = this.s * this.n * f.d - f.s * f.n * this.d;return (0 < r) - (r < 0);
						}, divisible: function divisible(e, t) {
							return h(e, t), !(!(f.n * this.d) || this.n * f.d % (f.n * this.d));
						}, valueOf: function valueOf() {
							return this.s * this.n / this.d;
						}, toFraction: function toFraction(e) {
							var t,
							    r = "",
							    n = this.n,
							    i = this.d;return this.s < 0 && (r += "-"), 1 === i ? r += n : (e && (t = Math.floor(n / i)) > 0 && (r += t, r += " ", n %= i), r += n, r += "/", r += i), r;
						}, toLatex: function toLatex(e) {
							var t,
							    r = "",
							    n = this.n,
							    i = this.d;return this.s < 0 && (r += "-"), 1 === i ? r += n : (e && (t = Math.floor(n / i)) > 0 && (r += t, n %= i), r += "\\frac{", r += n, r += "}{", r += i, r += "}"), r;
						}, toContinued: function toContinued() {
							var e,
							    t = this.n,
							    r = this.d,
							    n = [];do {
								n.push(Math.floor(t / r)), e = t % r, t = r, r = e;
							} while (1 !== t);return n;
						}, toString: function toString() {
							var e,
							    t = this.n,
							    r = this.d;if (isNaN(t) || isNaN(r)) return "NaN";u.REDUCE || (e = v(t, r), t /= e, r /= e);for (var n = String(t).split(""), i = 0, a = [~this.s ? "" : "-", "", ""], o = "", s = d(t, r), c = g(t, r, s), f = -1, l = 1, p = 15 + s + c + n.length, h = 0; h < p; h++, i *= 10) {
								if (h < n.length ? i += Number(n[h]) : (l = 2, f++), s > 0) if (f === c) a[l] += o + "(", o = "";else if (f === s + c) {
									a[l] += o + ")";break;
								}i >= r ? (a[l] += o + (i / r | 0), o = "", i %= r) : l > 1 ? o += "0" : a[l] && (a[l] += "0");
							}return a[0] += a[1] || "0", a[2] ? a[0] + "." + a[2] : a[0];
						} }, n = [], i = function () {
						return u;
					}.apply(t, n), !(void 0 !== i && (e.exports = i));
				}(this);
			}, function (e, t, r) {
				"use strict";
				(function (t) {
					function r(e) {
						var t,
						    r = e.length,
						    n = this,
						    i = 0,
						    a = n.i = n.j = 0,
						    o = n.S = [];for (r || (e = [r++]); i < s;) {
							o[i] = i++;
						}for (i = 0; i < s; i++) {
							o[i] = o[a = d & a + e[i % r] + (t = o[i])], o[a] = t;
						}(n.g = function (e) {
							for (var t, r = 0, i = n.i, a = n.j, o = n.S; e--;) {
								t = o[i = d & i + 1], r = r * s + o[d & (o[i] = o[a = d & a + t]) + (o[a] = t)];
							}return n.i = i, n.j = a, r;
						})(s);
					}function n(e, t) {
						var r,
						    i = [],
						    a = (typeof e === "undefined" ? "undefined" : _typeof(e))[0];if (t && "o" == a) for (r in e) {
							try {
								i.push(n(e[r], t - 1));
							} catch (e) {}
						}return i.length ? i : "s" == a ? e : e + "\0";
					}function i(e, t) {
						for (var r, n = e + "", i = 0; i < n.length;) {
							t[d & i] = d & (r ^= 19 * t[d & i]) + n.charCodeAt(i++);
						}return o(t);
					}function a(e) {
						try {
							return l.crypto.getRandomValues(e = new Uint8Array(s)), o(e);
						} catch (e) {
							return [+new Date(), l, l.navigator && l.navigator.plugins, l.screen, o(f)];
						}
					}function o(e) {
						return String.fromCharCode.apply(0, e);
					}var s = 256,
					    u = 6,
					    c = 52,
					    f = [],
					    l = "undefined" == typeof t ? window : t,
					    p = Math.pow(s, u),
					    h = Math.pow(2, c),
					    m = 2 * h,
					    d = s - 1,
					    g = Math.random;e.exports = function (t, c) {
						if (c && c.global === !0) return c.global = !1, Math.random = e.exports(t, c), c.global = !0, Math.random;var l = c && c.entropy || !1,
						    d = [],
						    g = (i(n(l ? [t, o(f)] : 0 in arguments ? t : a(), 3), d), new r(d));return i(o(g.S), f), function () {
							for (var e = g.g(u), t = p, r = 0; e < h;) {
								e = (e + r) * s, t *= s, r = g.g(1);
							}for (; e >= m;) {
								e /= 2, t /= 2, r >>>= 1;
							}return (e + r) / t;
						};
					}, e.exports.resetGlobal = function () {
						Math.random = g;
					}, i(Math.random(), f);
				}).call(t, r(517));
			}, function (e, t) {
				function r() {}r.prototype = { on: function on(e, t, r) {
						var n = this.e || (this.e = {});return (n[e] || (n[e] = [])).push({ fn: t, ctx: r }), this;
					}, once: function once(e, t, r) {
						function n() {
							i.off(e, n), t.apply(r, arguments);
						}var i = this;return n._ = t, this.on(e, n, r);
					}, emit: function emit(e) {
						var t = [].slice.call(arguments, 1),
						    r = ((this.e || (this.e = {}))[e] || []).slice(),
						    n = 0,
						    i = r.length;for (n; n < i; n++) {
							r[n].fn.apply(r[n].ctx, t);
						}return this;
					}, off: function off(e, t) {
						var r = this.e || (this.e = {}),
						    n = r[e],
						    i = [];if (n && t) for (var a = 0, o = n.length; a < o; a++) {
							n[a].fn !== t && n[a].fn._ !== t && i.push(n[a]);
						}return i.length ? r[e] = i : delete r[e], this;
					} }, e.exports = r;
			}, function (e, t, r) {
				"use strict";
				var n, i, a;!function (r, o) {
					i = [], n = o, a = "function" == typeof n ? n.apply(t, i) : n, !(void 0 !== a && (e.exports = a));
				}(this, function () {
					function e() {
						function t(e) {
							for (var t, r = 0; r < M.types.length; r++) {
								var n = M.types[r];if (n.name === e) {
									t = n.test;break;
								}
							}if (!t) {
								var i;for (r = 0; r < M.types.length; r++) {
									if (n = M.types[r], n.name.toLowerCase() == e.toLowerCase()) {
										i = n.name;break;
									}
								}throw new Error('Unknown type "' + e + '"' + (i ? '. Did you mean "' + i + '"?' : ""));
							}return t;
						}function r(e) {
							for (var t = "", r = 0; r < e.length; r++) {
								var n = e[r];if (n.signatures && "" != n.name) if ("" == t) t = n.name;else if (t != n.name) {
									var i = new Error("Function names do not match (expected: " + t + ", actual: " + n.name + ")");throw i.data = { actual: n.name, expected: t }, i;
								}
							}return t;
						}function n(e, t, r, n, i) {
							var a,
							    o = d(n),
							    s = i ? i.split(",") : null,
							    u = e || "unnamed",
							    c = s && g(s, "any"),
							    f = { fn: e, index: r, actual: n, expected: s };a = s ? t > r && !c ? "Unexpected type of argument in function " + u + " (expected: " + s.join(" or ") + ", actual: " + o + ", index: " + r + ")" : "Too few arguments in function " + u + " (expected: " + s.join(" or ") + ", index: " + r + ")" : "Too many arguments in function " + u + " (expected: " + r + ", actual: " + t + ")";var l = new TypeError(a);return l.data = f, l;
						}function i(e) {
							this.name = e || "refs", this.categories = {};
						}function a(e, t) {
							if ("string" == typeof e) {
								var r = e.trim(),
								    n = "..." === r.substr(0, 3);if (n && (r = r.substr(3)), "" === r) this.types = ["any"];else {
									this.types = r.split("|");for (var i = 0; i < this.types.length; i++) {
										this.types[i] = this.types[i].trim();
									}
								}
							} else {
								if (!Array.isArray(e)) {
									if (e instanceof a) return e.clone();throw new Error("String or Array expected");
								}this.types = e;
							}this.conversions = [], this.varArgs = n || t || !1, this.anyType = this.types.indexOf("any") !== -1;
						}function o(e, t) {
							var r;if ("string" == typeof e) r = "" !== e ? e.split(",") : [];else {
								if (!Array.isArray(e)) throw new Error("string or Array expected");r = e;
							}this.params = new Array(r.length), this.anyType = !1, this.varArgs = !1;for (var n = 0; n < r.length; n++) {
								var i = new a(r[n]);if (this.params[n] = i, i.anyType && (this.anyType = !0), n === r.length - 1) this.varArgs = i.varArgs;else if (i.varArgs) throw new SyntaxError('Unexpected variable arguments operator "..."');
							}this.fn = t;
						}function s(e, t, r, n) {
							this.path = e || [], this.param = e[e.length - 1] || null, this.signature = t || null, this.childs = r || [], this.fallThrough = n || !1;
						}function u(e) {
							var t,
							    r,
							    n = {},
							    i = [];for (var a in e) {
								if (e.hasOwnProperty(a)) {
									var s = e[a];if (t = new o(a, s), t.ignore()) continue;var u = t.expand();for (r = 0; r < u.length; r++) {
										var c = u[r],
										    f = c.toString(),
										    l = n[f];if (l) {
											var p = o.compare(c, l);if (p < 0) n[f] = c;else if (0 === p) throw new Error('Signature "' + f + '" is defined twice');
										} else n[f] = c;
									}
								}
							}for (f in n) {
								n.hasOwnProperty(f) && i.push(n[f]);
							}for (i.sort(function (e, t) {
								return o.compare(e, t);
							}), r = 0; r < i.length; r++) {
								if (t = i[r], t.varArgs) for (var h = t.params.length - 1, m = t.params[h], d = 0; d < m.types.length;) {
									if (m.conversions[d]) for (var v = m.types[d], y = 0; y < i.length; y++) {
										var x = i[y],
										    w = x.params[h];if (x !== t && w && g(w.types, v) && !w.conversions[h]) {
											m.types.splice(d, 1), m.conversions.splice(d, 1), d--;break;
										}
									}d++;
								}
							}return i;
						}function c(e) {
							for (var t = [], r = 0; r < e.length; r++) {
								e[r].anyType && t.push(e[r]);
							}return t;
						}function f(e) {
							for (var t = {}, r = 0; r < e.length; r++) {
								var n = e[r];if (n.fn && !n.hasConversions()) {
									var i = n.params.join(",");t[i] = n.fn;
								}
							}return t;
						}function l(e, t, r) {
							var n,
							    i,
							    o,
							    u = t.length,
							    c = [];for (n = 0; n < e.length; n++) {
								i = e[n], i.params.length !== u || o || (o = i), void 0 != i.params[u] && c.push(i);
							}c.sort(function (e, t) {
								return a.compare(e.params[u], t.params[u]);
							});var f = [];for (n = 0; n < c.length; n++) {
								i = c[n];var p = i.params[u],
								    h = f.filter(function (e) {
									return e.param.overlapping(p);
								})[0];if (h) {
									if (h.param.varArgs) throw new Error('Conflicting types "' + h.param + '" and "' + p + '"');h.signatures.push(i);
								} else f.push({ param: p, signatures: [i] });
							}var m = [];for (n = 0; n < r.length; n++) {
								r[n].paramsStartWith(t) && m.push(r[n]);
							}var d = !1;for (n = 0; n < m.length; n++) {
								if (!g(e, m[n])) {
									d = !0;break;
								}
							}var v = new Array(f.length);for (n = 0; n < f.length; n++) {
								var y = f[n];v[n] = l(y.signatures, t.concat(y.param), m);
							}return new s(t, o, v, d);
						}function p(e) {
							for (var t = [], r = 0; r < e; r++) {
								t[r] = "arg" + r;
							}return t;
						}function h(e, t) {
							var r = new i(),
							    a = u(t);if (0 == a.length) throw new Error("No signatures provided");var o = c(a),
							    s = l(a, [], o),
							    h = [],
							    d = e || "",
							    g = p(m(a));h.push("function " + d + "(" + g.join(", ") + ") {"), h.push('  "use strict";'), h.push("  var name = '" + d + "';"), h.push(s.toCode(r, "  ", !1)), h.push("}");var v = [r.toCode(), "return " + h.join("\n")].join("\n"),
							    y = new Function(r.name, "createError", v),
							    x = y(r, n);return x.signatures = f(a), x;
						}function m(e) {
							for (var t = 0, r = 0; r < e.length; r++) {
								var n = e[r].params.length;n > t && (t = n);
							}return t;
						}function d(e) {
							for (var t, r = 0; r < M.types.length; r++) {
								var n = M.types[r];if ("Object" === n.name) t = n;else if (n.test(e)) return n.name;
							}return t && t.test(e) ? t.name : "unknown";
						}function g(e, t) {
							return e.indexOf(t) !== -1;
						}function v(e) {
							return e[e.length - 1];
						}function y(e, t) {
							if (!e.signatures) throw new TypeError("Function is no typed-function");var r;if ("string" == typeof t) {
								r = t.split(",");for (var n = 0; n < r.length; n++) {
									r[n] = r[n].trim();
								}
							} else {
								if (!Array.isArray(t)) throw new TypeError("String array or a comma separated string expected");r = t;
							}var i = r.join(","),
							    a = e.signatures[i];if (a) return a;throw new TypeError("Signature not found (signature: " + (e.name || "unnamed") + "(" + r.join(", ") + "))");
						}function x(e, t) {
							var r = d(e);if (t === r) return e;for (var n = 0; n < M.conversions.length; n++) {
								var i = M.conversions[n];if (i.from === r && i.to === t) return i.convert(e);
							}throw new Error("Cannot convert from " + r + " to " + t);
						}i.prototype.add = function (e, t) {
							var r = t || "fn";this.categories[r] || (this.categories[r] = []);var n = this.categories[r].indexOf(e);return n == -1 && (n = this.categories[r].length, this.categories[r].push(e)), r + n;
						}, i.prototype.toCode = function () {
							var e = [],
							    t = this.name + ".categories",
							    r = this.categories;for (var n in r) {
								if (r.hasOwnProperty(n)) for (var i = r[n], a = 0; a < i.length; a++) {
									e.push("var " + n + a + " = " + t + "['" + n + "'][" + a + "];");
								}
							}return e.join("\n");
						}, a.compare = function (e, t) {
							if (e.anyType) return 1;if (t.anyType) return -1;if (g(e.types, "Object")) return 1;if (g(t.types, "Object")) return -1;if (e.hasConversions()) {
								if (t.hasConversions()) {
									var r, n, i;for (r = 0; r < e.conversions.length; r++) {
										if (void 0 !== e.conversions[r]) {
											n = e.conversions[r];break;
										}
									}for (r = 0; r < t.conversions.length; r++) {
										if (void 0 !== t.conversions[r]) {
											i = t.conversions[r];break;
										}
									}return M.conversions.indexOf(n) - M.conversions.indexOf(i);
								}return 1;
							}if (t.hasConversions()) return -1;var a, o;for (r = 0; r < M.types.length; r++) {
								if (M.types[r].name === e.types[0]) {
									a = r;break;
								}
							}for (r = 0; r < M.types.length; r++) {
								if (M.types[r].name === t.types[0]) {
									o = r;break;
								}
							}return a - o;
						}, a.prototype.overlapping = function (e) {
							for (var t = 0; t < this.types.length; t++) {
								if (g(e.types, this.types[t])) return !0;
							}return !1;
						}, a.prototype.matches = function (e) {
							return this.anyType || e.anyType || this.overlapping(e);
						}, a.prototype.clone = function () {
							var e = new a(this.types.slice(), this.varArgs);return e.conversions = this.conversions.slice(), e;
						}, a.prototype.hasConversions = function () {
							return this.conversions.length > 0;
						}, a.prototype.contains = function (e) {
							for (var t = 0; t < this.types.length; t++) {
								if (e[this.types[t]]) return !0;
							}return !1;
						}, a.prototype.toString = function (e) {
							for (var t = [], r = {}, n = 0; n < this.types.length; n++) {
								var i = this.conversions[n],
								    a = e && i ? i.to : this.types[n];a in r || (r[a] = !0, t.push(a));
							}return (this.varArgs ? "..." : "") + t.join("|");
						}, o.prototype.clone = function () {
							return new o(this.params.slice(), this.fn);
						}, o.prototype.expand = function () {
							function e(r, n) {
								if (n.length < r.params.length) {
									var i,
									    s,
									    u,
									    c = r.params[n.length];if (c.varArgs) {
										for (s = c.clone(), i = 0; i < M.conversions.length; i++) {
											if (u = M.conversions[i], !g(c.types, u.from) && g(c.types, u.to)) {
												var f = s.types.length;s.types[f] = u.from, s.conversions[f] = u;
											}
										}e(r, n.concat(s));
									} else {
										for (i = 0; i < c.types.length; i++) {
											e(r, n.concat(new a(c.types[i])));
										}for (i = 0; i < M.conversions.length; i++) {
											u = M.conversions[i], !g(c.types, u.from) && g(c.types, u.to) && (s = new a(u.from), s.conversions[0] = u, e(r, n.concat(s)));
										}
									}
								} else t.push(new o(n, r.fn));
							}var t = [];return e(this, []), t;
						}, o.compare = function (e, t) {
							if (e.params.length > t.params.length) return 1;if (e.params.length < t.params.length) return -1;var r,
							    n = e.params.length,
							    i = 0,
							    o = 0;for (r = 0; r < n; r++) {
								e.params[r].hasConversions() && i++, t.params[r].hasConversions() && o++;
							}if (i > o) return 1;if (i < o) return -1;for (r = 0; r < e.params.length; r++) {
								var s = a.compare(e.params[r], t.params[r]);if (0 !== s) return s;
							}return 0;
						}, o.prototype.hasConversions = function () {
							for (var e = 0; e < this.params.length; e++) {
								if (this.params[e].hasConversions()) return !0;
							}return !1;
						}, o.prototype.ignore = function () {
							for (var e = {}, t = 0; t < M.ignore.length; t++) {
								e[M.ignore[t]] = !0;
							}for (t = 0; t < this.params.length; t++) {
								if (this.params[t].contains(e)) return !0;
							}return !1;
						}, o.prototype.paramsStartWith = function (e) {
							if (0 === e.length) return !0;for (var t = v(this.params), r = v(e), n = 0; n < e.length; n++) {
								var i = this.params[n] || (t.varArgs ? t : null),
								    a = e[n] || (r.varArgs ? r : null);if (!i || !a || !i.matches(a)) return !1;
							}return !0;
						}, o.prototype.toCode = function (e, t) {
							for (var r = [], n = new Array(this.params.length), i = 0; i < this.params.length; i++) {
								var a = this.params[i],
								    o = a.conversions[0];a.varArgs ? n[i] = "varArgs" : o ? n[i] = e.add(o.convert, "convert") + "(arg" + i + ")" : n[i] = "arg" + i;
							}var s = this.fn ? e.add(this.fn, "signature") : void 0;return s ? t + "return " + s + "(" + n.join(", ") + "); // signature: " + this.params.join(", ") : r.join("\n");
						}, o.prototype.toString = function () {
							return this.params.join(", ");
						}, s.prototype.toCode = function (e, r) {
							var n = [];if (this.param) {
								var i = this.path.length - 1,
								    a = this.param.conversions[0],
								    o = "// type: " + (a ? a.from + " (convert to " + a.to + ")" : this.param);if (this.param.varArgs) {
									if (this.param.anyType) n.push(r + "if (arguments.length > " + i + ") {"), n.push(r + "  var varArgs = [];"), n.push(r + "  for (var i = " + i + "; i < arguments.length; i++) {"), n.push(r + "    varArgs.push(arguments[i]);"), n.push(r + "  }"), n.push(this.signature.toCode(e, r + "  ")), n.push(r + "}");else {
										for (var s = function (r, n) {
											for (var i = [], a = 0; a < r.length; a++) {
												i[a] = e.add(t(r[a]), "test") + "(" + n + ")";
											}return i.join(" || ");
										}.bind(this), u = this.param.types, c = [], f = 0; f < u.length; f++) {
											void 0 === this.param.conversions[f] && c.push(u[f]);
										}n.push(r + "if (" + s(u, "arg" + i) + ") { " + o), n.push(r + "  var varArgs = [arg" + i + "];"), n.push(r + "  for (var i = " + (i + 1) + "; i < arguments.length; i++) {"), n.push(r + "    if (" + s(c, "arguments[i]") + ") {"), n.push(r + "      varArgs.push(arguments[i]);");for (var f = 0; f < u.length; f++) {
											var l = this.param.conversions[f];if (l) {
												var p = e.add(t(u[f]), "test"),
												    h = e.add(l.convert, "convert");n.push(r + "    }"), n.push(r + "    else if (" + p + "(arguments[i])) {"), n.push(r + "      varArgs.push(" + h + "(arguments[i]));");
											}
										}n.push(r + "    } else {"), n.push(r + "      throw createError(name, arguments.length, i, arguments[i], '" + c.join(",") + "');"), n.push(r + "    }"), n.push(r + "  }"), n.push(this.signature.toCode(e, r + "  ")), n.push(r + "}");
									}
								} else if (this.param.anyType) n.push(r + "// type: any"), n.push(this._innerCode(e, r));else {
									var m = this.param.types[0],
									    p = "any" !== m ? e.add(t(m), "test") : null;n.push(r + "if (" + p + "(arg" + i + ")) { " + o), n.push(this._innerCode(e, r + "  ")), n.push(r + "}");
								}
							} else n.push(this._innerCode(e, r));return n.join("\n");
						}, s.prototype._innerCode = function (e, t) {
							var r,
							    n = [];for (this.signature && (n.push(t + "if (arguments.length === " + this.path.length + ") {"), n.push(this.signature.toCode(e, t + "  ")), n.push(t + "}")), r = 0; r < this.childs.length; r++) {
								n.push(this.childs[r].toCode(e, t));
							}if (!this.fallThrough || this.param && this.param.anyType) {
								var i = this._exceptions(e, t);i && n.push(i);
							}return n.join("\n");
						}, s.prototype._exceptions = function (e, t) {
							var r = this.path.length;if (0 === this.childs.length) return [t + "if (arguments.length > " + r + ") {", t + "  throw createError(name, arguments.length, " + r + ", arguments[" + r + "]);", t + "}"].join("\n");for (var n = {}, i = [], a = 0; a < this.childs.length; a++) {
								var o = this.childs[a];if (o.param) for (var s = 0; s < o.param.types.length; s++) {
									var u = o.param.types[s];u in n || o.param.conversions[s] || (n[u] = !0, i.push(u));
								}
							}return t + "throw createError(name, arguments.length, " + r + ", arguments[" + r + "], '" + i.join(",") + "');";
						};var w = [{ name: "number", test: function test(e) {
								return "number" == typeof e;
							} }, { name: "string", test: function test(e) {
								return "string" == typeof e;
							} }, { name: "boolean", test: function test(e) {
								return "boolean" == typeof e;
							} }, { name: "Function", test: function test(e) {
								return "function" == typeof e;
							} }, { name: "Array", test: Array.isArray }, { name: "Date", test: function test(e) {
								return e instanceof Date;
							} }, { name: "RegExp", test: function test(e) {
								return e instanceof RegExp;
							} }, { name: "Object", test: function test(e) {
								return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
							} }, { name: "null", test: function test(e) {
								return null === e;
							} }, { name: "undefined", test: function test(e) {
								return void 0 === e;
							} }],
						    b = {},
						    N = [],
						    E = [],
						    M = { config: b, types: w, conversions: N, ignore: E };return M = h("typed", { Object: function Object(e) {
								var t = [];for (var n in e) {
									e.hasOwnProperty(n) && t.push(e[n]);
								}var i = r(t);return h(i, e);
							}, "string, Object": h, "...Function": function Function(e) {
								for (var t, n = r(e), i = {}, a = 0; a < e.length; a++) {
									var o = e[a];if ("object" != _typeof(o.signatures)) throw t = new TypeError("Function is no typed-function (index: " + a + ")"), t.data = { index: a }, t;for (var s in o.signatures) {
										if (o.signatures.hasOwnProperty(s)) if (i.hasOwnProperty(s)) {
											if (o.signatures[s] !== i[s]) throw t = new Error('Signature "' + s + '" is defined twice'), t.data = { signature: s }, t;
										} else i[s] = o.signatures[s];
									}
								}return h(n, i);
							} }), M.config = b, M.types = w, M.conversions = N, M.ignore = E, M.create = e, M.find = y, M.convert = x, M.addType = function (e) {
							if (!e || "string" != typeof e.name || "function" != typeof e.test) throw new TypeError("Object with properties {name: string, test: function} expected");M.types.push(e);
						}, M.addConversion = function (e) {
							if (!e || "string" != typeof e.from || "string" != typeof e.to || "function" != typeof e.convert) throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");M.conversions.push(e);
						}, M;
					}return e();
				});
			}, function (e, t) {
				var r;r = function () {
					return this;
				}();try {
					r = r || Function("return this")() || (0, eval)("this");
				} catch (e) {
					"object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (r = window);
				}e.exports = r;
			}, function (e, t, r) {
				function n(e) {
					var t = i.create(e);return t.create = n, t.import(r(140)), t;
				}var i = r(139);e.exports = n();
			}]);
		});
	}, {}] }, {}, [1]);