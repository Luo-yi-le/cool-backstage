export default {
    bind: function (el, { arg = 10, value }, vnode) {
        console.log(arg);
        el.addEventListener("scroll", () => {
          const scrollTop = el.scrollTop; // 滚动条滚动时，距离顶部的距离
          const windowHeight = el.clientHeight; // 可视区的高度
          const scrollHeight = el.scrollHeight; // 滚动条的总高
          if (scrollHeight - (scrollTop + windowHeight) < Number(arg)) {
            value();
          }
        });
      },
      unbind: function (el, { arg, value }, vnode) {
        window.removeEventListener("scroll", value());
      },
}