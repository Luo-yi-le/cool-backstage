import defaultSettings from '@/utils/settings'

const title = defaultSettings.title || 'MiMi 后台管理系统'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}