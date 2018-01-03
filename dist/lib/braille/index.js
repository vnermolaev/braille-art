"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jimp = require("jimp");
var resolve_1 = require("../resolve");
function braille2string(b) {
    var lowEndian = [b[0][0], b[1][0], b[2][0], b[0][1], b[1][1], b[2][1], b[3][0], b[3][1]];
    var value = 0;
    for (var i = 0; i < lowEndian.length; i++) {
        value += (lowEndian[i] << i);
    }
    return String.fromCharCode(0x2800 + value);
}
exports.braille2string = braille2string;
function image2braille(path, settings) {
    return __awaiter(this, void 0, void 0, function () {
        var _settings, raised, non_empty, _a, img, err, strimage, y, line, x, b, s;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _settings = Object.assign({}, settings);
                    raised = function (value) {
                        // 0xFFFFFF = (4294967295)_10
                        return value / 4294967295 > _settings.white_cutoff ? 0 : 1;
                    };
                    non_empty = function (b) {
                        return (b[0][0] !== 0 || b[0][1] !== 0 ||
                            b[1][0] !== 0 || b[1][1] !== 0 ||
                            b[2][0] !== 0 || b[2][1] !== 0 ||
                            b[3][0] !== 0 || b[3][1] !== 0);
                    };
                    if (!_settings.whitespace) {
                        // Define dafault space symbol
                        _settings.whitespace = braille2string([[0, 0], [0, 0], [0, 0], [0, 0]]);
                    }
                    else if (typeof _settings.whitespace !== "string") {
                        _settings.whitespace = braille2string(_settings.whitespace);
                    }
                    return [4 /*yield*/, resolve_1.default(jimp.read(path))];
                case 1:
                    _a = _b.sent(), img = _a[0], err = _a[1];
                    if (err !== null) {
                        return [2 /*return*/, Promise.reject(err)];
                    }
                    // img !== null, we have handled this case
                    img = img.grayscale();
                    if (_settings.scale && _settings.scale !== 1 && _settings.scale !== 1.0) {
                        img = img.scale(_settings.scale);
                    }
                    else if (_settings.width && _settings.height) {
                        img = img.resize(_settings.width, _settings.height);
                    }
                    else if (_settings.width) {
                        img = img.resize(_settings.width, jimp.AUTO);
                    }
                    else if (_settings.height) {
                        img = img.resize(jimp.AUTO, _settings.height);
                    }
                    strimage = [];
                    for (y = 0; y < img.bitmap.height; y += 4) {
                        line = [];
                        for (x = 0; x < img.bitmap.width; x += 2) {
                            b = [
                                [raised(img.getPixelColor(x, y /**/)), raised(img.getPixelColor(x + 1, y /**/))],
                                [raised(img.getPixelColor(x, y + 1)), raised(img.getPixelColor(x + 1, y + 1))],
                                [raised(img.getPixelColor(x, y + 2)), raised(img.getPixelColor(x + 1, y + 2))],
                                [raised(img.getPixelColor(x, y + 3)), raised(img.getPixelColor(x + 1, y + 3))]
                            ];
                            s = non_empty(b) ? braille2string(b) : _settings.whitespace;
                            line.push(s);
                        }
                        strimage.push(line);
                    }
                    return [2 /*return*/, strimage];
            }
        });
    });
}
exports.image2braille = image2braille;
