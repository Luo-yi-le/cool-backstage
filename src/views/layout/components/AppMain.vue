<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  max-height: calc(100vh - 50px) !important;
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    max-height: calc(100vh - 84px) !important;
    height: 100%;
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// 修复打开 el-dialog 中的 css 样式错误
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
