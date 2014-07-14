{ Promise } = require 'es6-promise'
{ exec } = require 'child_process'

promiseMap = (promises) ->
	promiseArray = []
	promiseKeys = []
	for key, promise of promises
		promiseArray.push promise
		promiseKeys.push key

	Promise.all promiseArray
	.then (results) ->
		resultMap = {}
		results.forEach (result, index) -> resultMap[promiseKeys[index]] = result
		resultMap

command = (cmd) ->
	new Promise (resolve, reject) ->
		exec cmd, cwd: __dirname, (err, stdout, stderr) ->
			return reject err if err
			resolve stdout.split('\n').join ''

module.exports.gitInfo = ->
	promiseMap
		commitId: command 'git rev-parse HEAD'
		shortCommitId: command 'git rev-parse --short HEAD'
		branch: command 'git rev-parse --abbrev-ref HEAD'
		tag: command 'git describe --always --tag --abbrev=0'
