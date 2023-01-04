<template>
  <div class="menu-perms">
    <el-cascader
      v-model="modelValue"
      separator=":"
      clearable
      filterable
      collapse-tags
      collapse-tags-tooltip
      :options="options"
      :props="{ multiple: true }"
      @change="onChange"
    />
  </div>
</template>

<script>
import { useService } from '@/service'

export default {
  name: "menu-perms",
//   model: {
//     event: 'change',
//     prop: 'modelValue'
//   },
  props: {
    value: {
      type: String,
      default: "",
    },
  },

  watch: {
    value: {
      handler(val) {
        this.modelValue = val ? val.split(",").map((e) => e.split(":")) : [];
      },
      immediate: true,
      deep: true,
    },
  },

  data() {
    return {
      modelValue: [],
      options: [],
    };
  },

  methods: {
    onChange(arr) {
      this.$emit("change", arr.map((e) => e.join(":")).join(","));
    },

    parsePerm() {
        const list = [];
		let perms = [];

			const flat = (obj) => {
				for (const i in obj) {
					const { permission } = obj[i];

					if (permission) {
						perms = [...perms, Object.values(permission)].flat();
					} else {
						flat(obj[i]);
					}
				}
			};
      const service = useService()

			flat(service);

			perms
				.filter(e => e.includes(":"))
				.map(e => e.split(":"))
				.forEach(arr => {
					const col = (i, d) => {
						const key = arr[i];

						const index = d.findIndex((e) => e.label == key);

						if (index >= 0) {
							col(i + 1, d[index].children);
						} else {
							const isLast = i == arr.length - 1;

							d.push({
								label: key,
								value: key,
								children: isLast ? null : []
							});

							if (!isLast) {
								col(i + 1, d[d.length - 1].children || []);
							}
						}
					};

					col(0, list);
				});

			this.options = list;
    },
  },

  mounted() {
    this.parsePerm();
  },
};
</script>

<style lang="scss" scoped>
.menu-perms {
  :deep(.el-cascader) {
    width: 100%;
  }
}
</style>
