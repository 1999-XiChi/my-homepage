const path = require("path")

exports.resolve = function resolve(dir){
  return path.join(__dirname, "..", dir)
}

exports.SERVICE_PATH = exports.resolve("")
exports.DIST_PATH = exports.resolve("dist")