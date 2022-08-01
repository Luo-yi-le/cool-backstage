module.exports = {

    nodeIntegration: true,
    builderOptions: {
        productName: "MIMI 后台管理", //应用的名称
        appId: 'appId',
        asar: false,
        copyright: "2020-2030",
        allowToChangeInstallationDirectory: true,
        extraResources: [],
        publish: [
            {
                provider: 'generic',
                url: ''
            }
        ],
        directories: {
            output: "dist_electron/bundled/" // 输出文件夹
        },

        nsis: {
            allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
            perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
            allowToChangeInstallationDirectory: true, // 允许修改安装目录
            oneClick: false,
            installerIcon: "./public/logo.ico", //安装logo
            uninstallerIcon: "./public/logo.ico", //卸载图标
            installerHeaderIcon: "./public/logo.ico", //安装时头部图标

            createDesktopShortcut: true, // 创建桌面图标
            createStartMenuShortcut: true, // 创建开始菜单图标
        },
        electronDownload: {
            mirror: "https://npm.taobao.org/mirrors/electron/" //镜像设置
        },
        mac: {
            icon: "./public/logo.ico", //图标路径
        },
        win: {
            icon: './public/logo.ico', //打包windows版本的logo
            target: [{
                target: 'nsis', // 利用nsis制作安装程序
                'arch': [
                    'x64', // 64位
                    'ia32'
                ]
            }]
        },

    }

}