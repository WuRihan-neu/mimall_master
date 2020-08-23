module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    // lintOnSave:false  //会关闭eslint校验
    // publicPath:'/app' // 部署应用包时的基本 URL
    // outputDir:'dest'  // 默认为dist =》生产环境构建文件的目录
    // indexPath:'index2.html' // 默认为index.html 入口文件
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.plugins.delete('prefetch')
    }
}