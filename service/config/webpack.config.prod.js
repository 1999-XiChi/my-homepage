const webpackMerge = require("webpack-merge")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const baseWebpackConfig = require("./webpack.config.base")

const webpackConfig = webpackMerge(baseWebpackConfig,{
  mode: "production",
  stats: { children: false, warnings: false},
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            drop_console: false,
            dead_code: true,
            drop_debugger: true
          },
          output: {
            comments: false,
            beautify: false
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
        },
        parallel: true,
        sourceMap: false
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
          enforce: true
        }
      }
    }
  },
})

module.exports = webpackConfig