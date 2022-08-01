module.exports = {
    title: 'MIMI 管理后台',

    /**
     * @type {boolean} true | false
     * @description 是否显示设置右侧面板
     */
    showSettings: true,

    /**
     * @type {boolean} true | false
     * @description 是否需要tagsView
     */
    tagsView: true,

    /**
     * @type {boolean} true | false
     * @description 是否固定头部
     */
    fixedHeader: false,

    /**
     * @type {boolean} true | false
     * @description 是否在侧边栏中显示logo
     */
    sidebarLogo: false,

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description 是否显示错误日志组件.
     * 默认仅在生产环境中使用
     * 如果你也想在测试中使用它，你可以通过 ['production', 'development']
     */
    // errorLog: 'production'
    errorLog: ['production', 'development']
}