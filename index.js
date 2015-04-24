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
    var options = {},
        path = pathOrOptions;

    if (typeof pathOrOptions === 'object') {
        options = pathOrOptions;
        path = options.path;
        services = options.services;
        xml = options.xml;
    }

    var wsdl = new soap.WSDL(xml || services, null, options);
    return new Server(FakeServer, path, services, wsdl);
}
soap.expressMiddleware = soapListener;
soap.expressListen = expressListen;

/**
 * @example
 * router.all("/soapService",soap.expressMiddleware);
 */
module.exports = soap;