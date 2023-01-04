<template>
	<el-popover
		placement="bottom-start"
		width="100%"
		:teleported="false"
		popper-class="menu-icon"
		trigger="click"
	>
		<el-row :gutter="10" class="list">
			<el-col v-for="(item, index) in list" :key="index" :span="2" :xs="4">
				<el-button :class="{ 'is-active': item === name }" @click="onChange(item)">
					<svg-icon :icon-class="item" size="16px" v-if="item" />
				</el-button>
			</el-col>
		</el-row>

		<template #reference>
			<el-input v-model="name" placeholder="请选择" clearable @input="onChange" />
		</template>
	</el-popover>
</template>

<script>
// svg 图标加载
const svgFiles = require.context('/src/components/icons/svg', true, /\.svg$/);
const modules = svgFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = svgFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {});
export default {
	name: 'menu-icon',

	emits: ["update:value"],

	props: {
		value: {
			type: String,
			default: ""
		}
	},

	data() {
		return{
			list: this.iconList(),
			name: this.value
		}
	},

	methods: {
		iconList() {
			const list = [];

			for (const i in modules) {
				list.push(mimi.script.basename(i).replace(".svg", ""));
			}

			return list;
		},

		onChange(val) {
			this.name =val
			this.$emit("change", val);
		}
	},

	watch: {
		value(val) {
			this.name = val;
		}
	}
}


</script>

<style lang="scss" scoped>
.menu-icon {
	box-sizing: border-box;

	.el-button {
		margin-bottom: 10px;
		height: 40px;
		width: 100%;
		padding: 0;

		.cl-svg {
			font-size: 18px;
		}
	}
}
</style>
