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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var path_1 = require("path");
var index_1 = require("../lib/braille/index");
ava_1.default("Valid Braille code", function (t) {
    var matches = [
        [
            [
                [1, 0],
                [1, 1],
                [0, 0],
                [0, 0]
            ],
            "⠓"
        ],
        [
            [
                [1, 0],
                [1, 1],
                [1, 1],
                [1, 0]
            ],
            "⡷"
        ],
        [
            [
                [0, 1],
                [0, 1],
                [0, 1],
                [0, 1]
            ],
            "⢸"
        ],
        [
            [
                [1, 0],
                [1, 0],
                [1, 0],
                [1, 1]
            ],
            "⣇"
        ]
    ];
    for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
        var _a = matches_1[_i], b = _a[0], s = _a[1];
        t.is(index_1.braille2string(b), s);
    }
});
ava_1.default("Generate a Braille string from an image", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var matches, settings, _i, matches_2, _a, path, expected_lines, generated_lines, i;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                matches = [
                    [
                        path_1.join(__dirname, 'shapes.png'),
                        [
                            '⢀⢀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⢀⢀',
                            '⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣶⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⢿⣿⣷⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⣀⣤⣤⣤⣤⣄⣀⢀⢀⢀⠙⢿⣿⣧⡀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⣤⣾⣿⣿⡿⠿⠿⠿⣿⣿⣿⣶⣄⢀⠈⠻⣿⣿⣦⡀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⣰⣿⣿⠟⠉⢀⢀⢀⢀⢀⢀⠈⠙⢿⣿⣷⡄⢀⠈⠻⣿⣿⣦⡀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⣼⣿⡿⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠹⣿⣿⡄⢀⢀⠈⠻⣿⣿⣦⡀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢰⣿⣿⠃⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢻⣿⣷⢀⢀⢀⢀⠈⠻⣿⣿⣦⡀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢿⣿⣿⣅⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀⢀⢀⢀⢀⣨⣿⣿⡿⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⠘⣿⣿⡆⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣾⣿⡟⢀⢀⢀⢀⣠⣾⣿⡿⠋⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⠹⣿⣿⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣼⣿⡿⠁⢀⢀⣠⣾⣿⡿⠋⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⠙⢿⣿⣷⣤⣀⡀⢀⢀⢀⣀⣠⣴⣿⣿⠟⠁⢀⣠⣾⣿⡿⠋⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠁⢀⢀⣴⣿⡿⠋⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⠉⠉⠉⠉⠁⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⣇⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣙⣛⣁⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣸⣿⣿⢀⢀',
                            '⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⢀',
                            '⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀'
                        ]
                    ]
                ];
                settings = {
                    white_cutoff: 0.5,
                    whitespace: [[0, 0], [0, 0], [0, 0], [0, 1]]
                };
                _i = 0, matches_2 = matches;
                _b.label = 1;
            case 1:
                if (!(_i < matches_2.length)) return [3 /*break*/, 4];
                _a = matches_2[_i], path = _a[0], expected_lines = _a[1];
                return [4 /*yield*/, index_1.image2braille(path, settings)];
            case 2:
                generated_lines = _b.sent();
                t.is(expected_lines.length, generated_lines.length);
                for (i = 0; i < generated_lines.length; i++) {
                    t.is(expected_lines[i], generated_lines[i].join(''));
                }
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); });
