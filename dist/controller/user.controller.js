"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const hello = (req, res) => {
    res.json({
        message: "Hello From Controller"
    });
};
exports.hello = hello;
