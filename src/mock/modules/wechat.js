module.exports = [{
    url: '/wechat/menu',
    type: 'post',
    response: config => {
        return {
            status: 200,
            data: {
                // 一级菜单
                button: [{
                    //type: "click",
                    name: "菜单1",
                    // key: "menu1",关键词
                    //url: "",//跳转链接
                    //media_id:"",//素材名称--图文消息
                    sub_button: [{
                        //type: "",//media_id:素材内容; view:跳转链接
                        name: "子菜单1",
                        // url: "",//跳转链接
                        // media_id:"",//素材名称--图文消息
                    }, ]
                }]
            }
        }
    }
}]