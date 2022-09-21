<template>
  <div
    :style="style"
    class="ContextMenu"
    v-if="show"
    @mousedown.stop
    @contextmenu.prevent
  >
    <div slot="hander"></div>
    <div class="context-menu__box">
      <div v-for="(menu, index) in list" :key="index" @click="rowClick($event, menu)">
        <span>{{ menu.name || menu.label }}</span>
        <i v-if="menu.icon" :class="menu.icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      triggerShowFn: () => {},
      triggerHideFn: () => {},
      x: null,
      y: null,
      style: {},
      binded: false,
    };
  },
  props: {
    list: mimi.vue.getPropArray(),
    target: null,
    show: mimi.vue.getPropBoolean(),
  },
  mounted() {
    this.bindEvents();
  },
  watch: {
    show(show) {
      if (show) {
        this.bindHideEvents();
      } else {
        this.unbindHideEvents();
      }
    },
    target(target) {
      this.bindEvents();
    },
  },
  methods: {
    rowClick(event, item) {
      if (item.disabled) {
        return false;
      }

      if (item.callback) {
        return item.callback(this.close);
      }
    },
    close() {
      this.$emit("update:show", false);
    },
    // 初始化事件
    bindEvents() {
      this.$nextTick(() => {
        if (!this.target || this.binded) return;
        this.triggerShowFn = this.contextMenuHandler.bind(this);
        this.target.addEventListener("contextmenu", this.triggerShowFn);
        this.binded = true;
      });
    },
    // 取消绑定事件
    unbindEvents() {
      if (!this.target) return;
      this.target.removeEventListener("contextmenu", this.triggerShowFn);
    },
    // 绑定隐藏菜单事件
    bindHideEvents() {
      this.triggerHideFn = this.clickDocumentHandler.bind(this);
      document.addEventListener("mousedown", this.triggerHideFn);
      document.addEventListener("mousewheel", this.triggerHideFn);
    },
    // 取消绑定隐藏菜单事件
    unbindHideEvents() {
      document.removeEventListener("mousedown", this.triggerHideFn);
      document.removeEventListener("mousewheel", this.triggerHideFn);
    },
    // 鼠标按压事件处理器
    clickDocumentHandler(e) {
      this.$emit("update:show", false);
    },
    // 右键事件事件处理
    contextMenuHandler(e) {
      this.x = e.clientX;
      this.y = e.clientY - 50;
      this.layout();
      this.$emit("update:show", true);
      e.preventDefault();
    },
    // 布局
    layout() {
      this.$set(this, "style", { left: this.x + "px", top: this.y + "px" });
    },
  },
};
</script>

<style lang="scss" scoped>
.ContextMenu {
  position: absolute;
  z-index: 9999;

  .context-menu__box {
    box-shadow: 0 2px 12px #0000001a;
    width: 160px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 0;
  }

  .context-menu__box > div {
    display: flex;
    align-items: center;
    height: 35px;
    font-size: 13px;
    cursor: pointer;
    padding: 0 15px;
    color: #666;
    position: relative;
  }

  .context-menu__box > div:first-child {
    margin-top: 5px;
  }

  .context-menu__box > div span {
    height: 35px;
    line-height: 35px;
    flex: 1;
  }

  .context-menu__box > div i:last-child {
    margin-left: 5px;
  }
}
</style>
