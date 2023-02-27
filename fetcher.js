"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONFetcherFactory = exports.JSONFetcher = void 0;
class JSONFetcher {
    fetchJSON() {
        return '{"ac": "ab", "urmom": "fat"}';
    }
}
exports.JSONFetcher = JSONFetcher;
class JSONFetcherFactory {
    getJSONFetcher() {
        return new JSONFetcher();
    }
}
exports.JSONFetcherFactory = JSONFetcherFactory;
