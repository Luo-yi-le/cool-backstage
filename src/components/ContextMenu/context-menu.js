const ContextMenu = require('./index.vue')
const ContextMenu = {}

/**
 * Plugin API
 */
ContextMenu.install = function (Vue, options) {
  Vue.component(ContextMenu.name, ContextMenu)
}

ContextMenu.component = ContextMenu

/**
 * Auto install
 */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ContextMenu)
}

module.exports = ContextMenu