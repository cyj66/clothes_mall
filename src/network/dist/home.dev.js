"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHomeMultidata = getHomeMultidata;
exports.getHomeGoods = getHomeGoods;

var _request = require("./request");

function getHomeMultidata() {
  return (0, _request.request)({
    url: '/home/multidata'
  });
}

function getHomeGoods(type, page) {
  return (0, _request.request)({
    url: '/home/data',
    params: {
      type: type,
      page: page
    }
  });
}