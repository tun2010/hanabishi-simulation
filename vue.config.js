const { defineConfig } = require('@vue/cli-service')

const ASSET_PATH = '/html/user_data/assets/'

let chunk = {}

module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,
  productionSourceMap: false,
  // publicPath: ASSET_PATH,
  configureWebpack: {
    output: {
      filename: "./js/[name].js",
      assetModuleFilename: './js/[name].asset.[ext]',
      chunkFilename: (pathData) => {
        if (!pathData.chunk.name) {
          if (Object.keys(chunk).length == 0) {
            chunk[pathData.chunk.id] = 'data'
          } 
          if (Object.keys(chunk).length == 1 && !chunk[pathData.chunk.id]) {
            chunk[pathData.chunk.id] = 'app'
          }
          return `./js/${chunk[pathData.chunk.id]}.bundle.js`
        }
        return './js/[name].js'
      },
    }
  }
})
