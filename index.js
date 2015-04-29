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

// TODO: #u$& ???!!!
var soapListenerInterval = setInterval(function () {
    if (typeof soapListener !== "undefined") {
        soap.expressMiddleware = soapListener;
        clearInterval(soapListenerInterval);
    }
},150);
soap.expressListen = expressListen;

/**
 * @example
 * router.all("/soapService",soap.expressMiddleware);
 */
module.exports = soap;