const path = require("path")
function resolve(dir) {
  return path.join(__dirname, "./", dir)
}

//Analyzer
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
//去掉注释
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
  publicPath: "./", // 默认'/'，部署应用包时的基本 URL
  outputDir: "dist",
  assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === "production"){
      myConfig.plugins = []
      //analyzer
      myConfig.plugins.push(
        new BundleAnalyzerPlugin()
      )
      // 去掉注释
      myConfig.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // 去掉注释
            },
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"]//移除console
            }
          }
        })
      )
    }
    return myConfig
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_c", resolve("src/components/"))
      .set("_p", resolve("src/assets/pic/"))
  }    
}


