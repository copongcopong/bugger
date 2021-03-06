// Generated by CoffeeScript 2.0.0-beta7
var EventEmitter;
EventEmitter = require('events').EventEmitter;
module.exports = function (agentContext) {
  var Database;
  Database = new EventEmitter;
  Database.enable = function (param$, cb) {
    void 0;
  };
  Database.disable = function (param$, cb) {
    void 0;
  };
  Database.getDatabaseTableNames = function (param$, cb) {
    var databaseId;
    databaseId = param$.databaseId;
  };
  Database.executeSQL = function (param$, cb) {
    var cache$, databaseId, query;
    {
      cache$ = param$;
      databaseId = cache$.databaseId;
      query = cache$.query;
    }
  };
  Database.emit_addDatabase = function (params) {
    var notification;
    notification = {
      params: params,
      method: 'Database.addDatabase'
    };
    return this.emit('notification', notification);
  };
  Database.DatabaseId = {
    id: 'DatabaseId',
    type: 'string',
    description: 'Unique identifier of Database object.',
    hidden: true
  };
  Database.Database = {
    id: 'Database',
    type: 'object',
    description: 'Database object.',
    hidden: true,
    properties: [
      {
        name: 'id',
        $ref: 'DatabaseId',
        description: 'Database ID.'
      },
      {
        name: 'domain',
        type: 'string',
        description: 'Database domain.'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Database name.'
      },
      {
        name: 'version',
        type: 'string',
        description: 'Database version.'
      }
    ]
  };
  Database.Error = {
    id: 'Error',
    type: 'object',
    description: 'Database error.',
    properties: [
      {
        name: 'message',
        type: 'string',
        description: 'Error message.'
      },
      {
        name: 'code',
        type: 'integer',
        description: 'Error code.'
      }
    ]
  };
  return Database;
};
