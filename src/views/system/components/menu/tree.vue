<template>
	<div class="cl-menu-tree">
		<el-popover
			placement="bottom-start"
			trigger="click"
			width="500px"
			popper-class="popper-menu-tree"
		>
			<el-input size="small" v-model="keyword">
				<template #prefix>
					<i class="el-input__icon el-icon-search"></i>
				</template>
			</el-input>

			<el-tree
				ref="treeRef"
				node-key="menuId"
				:data="treeList"
				:props="{
					label: 'name',
					children: 'children'
				}"
				:highlight-current="true"
				:expand-on-click-node="false"
				:default-expanded-keys="expandedKeys"
				:filter-node-method="filterNode"
				@current-change="onCurrentChange"
			>
			</el-tree>

			<template #reference>
				<el-input v-model="name" readonly placeholder="请选择"></el-input>
			</template>
		</el-popover>
	</div>
</template>

<script>
import { deepTree } from "@/utils";
export default {
	name: "menu-tree",
    model: {
        event: 'change',
        porp: 'update:modelValue'
    },
	props: {
		modelValue: [Number, String]
	},

	emits: ["update:modelValue"],

    data() {
        return {
          keyword: '',
          list: [],
          expandedKeys: [],
          treeRef: {},
        }
    },

    methods: {
        onCurrentChange({ id }) {
			this.$crud.emit("update:modelValue", id);
		},
        refresh() {
			this.$api.menu.list().then((res) => {
				const _list = res.filter((e) => e.type != 2);

				_list.unshift({
					name: "一级菜单",
					id: null
				});

				this.list = _list;
			});
		},
        filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		}

    },
    computed: {
        name() {
           const item = this.list.find(e => e.id == this.modelValue);
			return item ? item.name : "一级菜单"; 
        },
        treeList() {
            return deepTree(this.list)
        },
    },

    watch: {
        keyword(val) {
            this.treeRef.filter(val);
        }
    },

    mounted() {
        this.refresh()
    },
};
</script>

<style lang="scss" scoped>
.popper-menu-tree {
	box-sizing: border-box;

	.el-input {
		margin-bottom: 10px;
	}
}
</style>
