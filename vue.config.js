module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    performance: {
      hints: 'warning',
      //入口起点的最大体积（字节）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 （字节）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  }
}
