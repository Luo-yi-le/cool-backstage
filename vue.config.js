'use strict'
const path = require('path');
const electron = require('./build_electron/electron.dev')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: true,
    devServer: {
        open: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8001',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': ''
                }
            },
        },
    },
    pluginOptions: {
        electronBuilder: electron
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                '@comp': resolve('src/components'),
                '@util': resolve('src/utils'),
                '@mixin': resolve('src/mixins'),
                '@api': resolve('src/api'),
                '@filter': resolve('src/filters'),
                // components: "@/components",
                // content: "@/components/content",
                // common: "@/components/common",
                // assets: "@/assets",
                // network: "@/network",
                // views: "@/views",
            }
        },

        module: {
            rules: [{
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            }, ]
        }
    },
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    outputStyle: "expanded"
                }
            }
        }
    },
    chainWebpack: config => {

        config.plugin('preload').tap(() => [{
            rel: 'preload',
            fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
            include: 'initial'
        }])
        config.plugins.delete('prefetch')

        config.module
            .rule('svg')
            .exclude.add(resolve('src/components/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/components/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // ????????????
        config.when(process.env.NODE_ENV === 'production',
            config => {
                // ??????????????????????????? ????????????????????? ????????????
                config.entry('app').clear().add('./src/main-prod.js')

                //  ???????????????????????? ???????????? CDN
                config.set('externals', {
                    vue: 'Vue',
                    'vue-router': 'VueRouter',
                    axios: 'axios',
                    lodash: '_',
                    echarts: 'echarts',
                    nprogress: 'NProgress',
                    'vue-quill-editor': 'VueQuillEditor'
                })
                // ??? public?????? index.html ??????????????? ????????????????????????????????????
                // <%= htmlWebpackPlugin.options.isProd ? '' : 'dev-'%>
                config.plugin('html').tap(args => {
                    args[0].isProd = true
                    return args
                })

                config.optimization.runtimeChunk('single'), {
                    from: path.resolve(__dirname, './public/robots.txt'), //???????????????
                    to: './', //???????????????
                }
            })

        // ????????????
        config.when(process.env.NODE_ENV === 'development', cofnig => {
            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
            config.entry('app').clear().add('./src/main-dev.js')
        })

    }
}