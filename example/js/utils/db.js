var db = require('mysql');
var config = require('../utils/config');
var pool = db.createPool(config);

/**
 * 执行单行SQL
 * @param sql
 * @param values
 * @param callback
 */
function q(sql, values, callback) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, values, function (err, results, fields) {
      callback(err, results, fields);
      connection.release();
    });
  });
}

/**
 * 在不开启{multipleStatements: true}，支持多行SQL，支持事务，支持Pool。
 * @param sql
 * @param values
 * @param callback
 */
function tq(sql, values, callback) {
  pool.getConnection(function (err, connection) {
    connection.beginTransaction(function (err) {
      if (err) {
        connection.release();
        callback(err);
        return;
      }
      var sqlf = db.format(sql, values);
      sqlf = sqlf.replace(/;\s*$/, '');
      var sqls = sqlf.split(';');
      var queryTimes = 0;
      var errorTimes = 0;
      var firstErr = null;
      for (var i = 0; i < sqls.length; i++) {
        connection.query(sqls[i], function (err, results, fields) {
          queryTimes++;
          if (err) {
            errorTimes++;
            if (firstErr == null)
              firstErr = err;
          }
          if (queryTimes == sqls.length) {
            if (errorTimes == 0) {
              connection.commit(function (err) {
                if (err) {
                  connection.rollback(function () {
                    callback(err);
                  });
                }
                else {
                  callback(err, results, fields);
                }
              });
            }
            else {
              connection.rollback(function () {
                callback(firstErr);
              });
            }
            connection.release();
          }

        });
      }
    });
  });
}

/**
 * 需要开启{multipleStatements: true}，支持多行SQL，支持事务，需要新建connection不支持pool。
 * @param sql
 * @param values
 * @param callback
 */
function tqm(sql, values, callback) {
  var connection = db.createConnection(config());
  connection.connect();
  connection.beginTransaction(function (err) {
    if (err) {
      connection.end();
      callback(err);
      return;
    }
    connection.query(sql, values, function (err, results, fields) {
      if (err) {
        connection.rollback(function () {
          callback(err);
        });
      }
      else {
        connection.commit(function (err) {
          if (err) {
            connection.rollback(function () {
              callback(err);
            });
          }
          else {
            callback(err, results, fields);
          }

        });
      }
      connection.end();
    });
  });
}

module.exports = {
  q: q,
  tq: tq,
  tqm: tqm,
  version: '1.0.0'
};
