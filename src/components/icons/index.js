import Vue from 'vue'
import SvgIcon from './../SvgIcon'
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

//https://www.iconfont.cn/collections/index?type=1
//去该网站下载svg图表