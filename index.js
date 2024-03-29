// Generated by CoffeeScript 1.7.1
var Promise, command, exec, promiseMap;

Promise = require('es6-promise').Promise;

exec = require('child_process').exec;

promiseMap = function(promises) {
  var key, promise, promiseArray, promiseKeys;
  promiseArray = [];
  promiseKeys = [];
  for (key in promises) {
    promise = promises[key];
    promiseArray.push(promise);
    promiseKeys.push(key);
  }
  return Promise.all(promiseArray).then(function(results) {
    var resultMap;
    resultMap = {};
    results.forEach(function(result, index) {
      return resultMap[promiseKeys[index]] = result;
    });
    return resultMap;
  });
};

command = function(cmd) {
  return new Promise(function(resolve, reject) {
    return exec(cmd, {
      cwd: __dirname
    }, function(err, stdout, stderr) {
      if (err) {
        return reject(err);
      }
      return resolve(stdout.split('\n').join(''));
    });
  });
};

module.exports = function() {
  return promiseMap({
    commitId: command('git rev-parse HEAD'),
    shortCommitId: command('git rev-parse --short HEAD'),
    branch: command('git rev-parse --abbrev-ref HEAD'),
    tag: command('git describe --always --tag --abbrev=0')
  });
};
