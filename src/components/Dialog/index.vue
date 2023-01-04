<template>
  <el-dialog
    class="dialog"
    v-bind="$attrs"
    :title="title"
    ref="dialog"
    :close-on-click-modal="closeOnClickModal"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    top="60px"
    @close="$emit('close')"
    @update:visible="handleUpdateVisible"
    :style="{ maxHeight: `${this.dialogHeight ? this.dialogHeight : this.maxHeight}px` }"
    :class="dialogHeight ? 'dialogFullBody' : ''"
  >
    <slot />
    <slot name="title" slot="title" />
    <slot name="footer" slot="footer" />
  </el-dialog>
</template>
<script>
export default {
  mixins: [],
  props: {
    appendToBody: mimi.vue.getPropBoolean(false),
    lockScroll: mimi.vue.getPropBoolean(true),
    dialogHeight: mimi.vue.getPropString(),
    title: mimi.vue.getPropString(),
    closeOnClickModal: mimi.vue.getPropBoolean(false),
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    maxHeight() {
      return document.documentElement.clientHeight * 0.9;
    },
  },
  methods: {
    handleUpdateVisible(...args) {
      this.$emit("update:visible", ...args);
    },
  },
  mounted() {
    // const { dialog } = this.$refs;
    // const el = dialog.$el;
    // console.log('xxx', el);
    //
    // const body = el.getElementsByClassName('el-dialog__body');
    // console.log('body', body);
  },
};
</script>
<style lang="scss" scoped>
.dialogFullBody {
  .el-dialog__body {
    max-height: 100%;
  }
}

.dialog {
  overflow: hidden;

  .dialog-footer {
  }

  ::v-deep .el-dialog {
    overflow: hidden;
    height: 85%;
    .el-dialog__header {
      background: #f0f0f0;
      border-color: #f0f0f0;
      color: #000;
    }
    .el-dialog__body {
      padding: 30px 20px 0 20px;
      height: 470px;
      overflow-y: scroll;
    }
    .el-dialog__footer {
      background: #f0f0f0;
      border-color: #f0f0f0;
      color: #000;
    }
  }
}
</style>
