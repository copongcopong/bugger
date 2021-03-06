// Generated by CoffeeScript 2.0.0-beta7
var ErrorObjectFromMessage, RemoteScript, series;
series = require('async').series;
RemoteScript = require('../remote-script');
ErrorObjectFromMessage = require('../remote-object').ErrorObjectFromMessage;
module.exports = function (debugClient) {
  var setexceptionbreak;
  setexceptionbreak = function (options, cb) {
    return debugClient.sendRequest('setexceptionbreak', options, function (err, response) {
      var body, cache$, message, refs, success;
      cache$ = response;
      refs = cache$.refs;
      body = cache$.body;
      success = cache$.success;
      message = cache$.message;
      if (success) {
        return cb;
      } else {
        return cb(ErrorObjectFromMessage(options)(refs)(message));
      }
    });
  };
  return setexceptionbreak;
};
