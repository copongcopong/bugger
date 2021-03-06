// Generated by CoffeeScript 2.0.0-beta7
var assertObjectGroup, ErrorObjectFromMessage, extend, getObjectProperties, omit, RemoteObject, safeInObjectGroup;
cache$ = require('lodash');
omit = cache$.omit;
extend = cache$.extend;
cache$1 = require('../remote-object');
RemoteObject = cache$1.RemoteObject;
ErrorObjectFromMessage = cache$1.ErrorObjectFromMessage;
assertObjectGroup = function (objectGroup) {
  var cmd;
  cmd = 'root.__bugger__ || (root.__bugger__ = {});';
  cmd += 'root.__bugger__[' + JSON.stringify(objectGroup) + ']';
  return cmd += ' || (root.__bugger__[' + JSON.stringify(objectGroup) + '] = {});';
};
safeInObjectGroup = function (objectGroup, objectId, expr) {
  var cmd;
  cmd = assertObjectGroup(objectGroup);
  return cmd += 'root.__bugger__[' + JSON.stringify(objectGroup) + '][' + JSON.stringify(objectId) + '] = (' + expr + ');';
};
getObjectProperties = function (refMap) {
  return function (rawObj) {
    var seenProps;
    seenProps = {};
    return rawObj.properties.map(function (prop) {
      var value;
      value = RemoteObject({})(refMap)(null != prop.value ? prop.value : prop);
      return {
        name: null != prop.name ? prop.name.toString() : void 0,
        value: value
      };
    }).filter(function (prop) {
      if (!(null != prop.name))
        return false;
      if (seenProps[prop.name])
        return false;
      return seenProps[prop.name] = true;
    });
  };
};
module.exports = function (debugClient) {
  var lookup;
  lookup = function (options) {
    var fn, fromNativeId, fromScope;
    fromNativeId = function (objectId, cb) {
      var reqParams;
      reqParams = {
        handles: [parseInt(objectId, 10)],
        includeSource: false
      };
      return debugClient.sendRequest('lookup', reqParams, function (err, response) {
        var body, cache$2, message, objDescription, rawObj, refMap, success;
        cache$2 = response;
        refMap = cache$2.refMap;
        body = cache$2.body;
        success = cache$2.success;
        message = cache$2.message;
        if (success) {
          rawObj = body[objectId.toString()];
          objDescription = { properties: getObjectProperties(refMap)(rawObj) };
          return cb(null, objDescription);
        } else {
          return cb(ErrorObjectFromMessage(options)(refMap)(message));
        }
      });
    };
    fromScope = function (objectId, cb) {
      var _, cache$2, frameNumber, reqParams, scopeNumber;
      cache$2 = objectId.split(':');
      _ = cache$2[0];
      frameNumber = cache$2[1];
      scopeNumber = cache$2[2];
      reqParams = {
        number: parseInt(scopeNumber, 10),
        frameNumber: parseInt(frameNumber, 10),
        inlineRefs: true
      };
      return debugClient.sendRequest('scope', reqParams, function (err, response) {
        var body, cache$3, message, objDescription, refMap, success;
        cache$3 = response;
        refMap = cache$3.refMap;
        body = cache$3.body;
        success = cache$3.success;
        message = cache$3.message;
        if (success) {
          objDescription = { properties: getObjectProperties(refMap)(body.object) };
          return cb(null, objDescription);
        } else {
          return cb(ErrorObjectFromMessage(options)(refMap)(message));
        }
      });
    };
    fn = function (objectId, cb) {
      if ((null != objectId ? objectId.substr(0, 6) : void 0) === 'scope:') {
        return fromScope(objectId, cb);
      } else if (null != objectId) {
        return fromNativeId(objectId, cb);
      } else {
        return cb(null, []);
      }
    };
    return fn;
  };
  return lookup;
};
