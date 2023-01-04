<template>
  <div class="menu-check">
    <el-input v-model="keyword" placeholder="输入关键字进行过滤" />

    <div class="menu-check__scroller">
      <el-scrollbar max-height="200px">
        <el-tree
          ref="Tree"
          node-key="id"
          show-checkbox
          :data="list"
          :props="{
            label: 'name',
            children: 'children',
          }"
          :filter-node-method="filterNode"
          @check="onCheckChange"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { deepTree, revDeepTree, getBrowser } from "@/utils";
export default {
  name: "menu-check",
  emit: ["update:modelValue"],
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      Tree: null,
      list: null,
      keyword: "",
    };
  },

  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
		const res = await this.$api.menu.list();
		if(res) {
			this.list = deepTree(res);
		}
	},
    filterNode(val, data) {
      if (!val) return true;
      return data.includes(val);
    },

    onCheckChange(_, { checkedKeys, halfCheckedKeys }) {
      this.$emit("update:modelValue", [...checkedKeys, ...halfCheckedKeys]);
    },
  },

  watch: {
	keyword(val) {
		this.Tree.filter(val);
	}
  }
};


// useUpsert({
//   async onOpened() {
//     await refresh();
//     Tree.value.setCheckedKeys(
//       (props.modelValue || []).filter((e) => Tree.value.getNode(e)?.isLeaf)
//     );
//   },
// });
</script>

<style lang="scss" scoped>
.menu-check {
  &__scroller {
    border: 1px solid var(--el-border-color);
    border-radius: 3px;
    margin-top: 10px;
    padding: 5px 0;
  }
}
</style>
