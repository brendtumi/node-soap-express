"use strict";
var soap = require('soap');
var router = require('express').Router();
var soapListener = undefined;
var FakeServer = {
    listeners: function () {
        return [];
    },
    removeAllListeners: function () {
        return;
    },
    addListener: function (name, listener) {
        soapListener = listener;
    }
};
function expressListen(pathOrOptions, services, xml) {
    return soap.listen(FakeServer, pathOrOptions, services, xml);
}
soap.expressMiddleware = soapListener;
soap.expressListen = expressListen;

/**
 * @example
 * router.all("/soapService",soap.expressMiddleware);
 */
module.exports = soap;