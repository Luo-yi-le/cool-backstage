<template>
  <div class="Card">
    <el-card class="box-card">
      <div v-if="header" slot="header" class="clearfix">
        <span>
          <svg-icon v-if="icon" :icon-class="icon" class-name="card-panel-icon" />
          {{ name }}
        </span>
        <slot name="btn"></slot>
      </div>
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
.Card {
}
</style>
