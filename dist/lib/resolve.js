"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resolve(promise) {
    return promise
        .then(function (value) { return [value, null]; })
        .catch(function (err) { return [null, err]; });
}
exports.default = resolve;
