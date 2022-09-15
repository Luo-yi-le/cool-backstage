<template>
  <div class="Card">
    <el-card class="box-card" :body-style="bodyStyle">
      <span v-if="header" slot="header" class="clearfix">
        <span class="name">
          <svg-icon v-if="icon" :icon-class="icon" class-name="card-panel-icon" />
          {{ name }}
        </span>
        <slot name="btn"></slot>
      </span>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    name: mimi.vue.getPropString(),
    icon: mimi.vue.getPropString(),
    header: mimi.vue.getPropBoolean(true),
    bodyStyle: mimi.vue.getPropObject(),
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
:deep.Card {
  height: 100%;

  .name {
    line-height: 40px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .el-card__header {
    padding: 6px 20px;
  }
}
</style>
