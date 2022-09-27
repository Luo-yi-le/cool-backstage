<template>
  <div class="cron">
    <el-popover v-model="visible" :disabled="disabled || readonly" width="600px">
      <vue-cron
        :data="cron"
        :resolveExpression="cron"
        @change="changeCron"
        @close="visible = false"
        i18n="cn"
      ></vue-cron>
      <el-input
        clearable
        slot="reference"
        :disabled="disabled"
        :readonly="readonly"
        @click="visible = true"
        v-model="cron"
        :placeholder="placeholder"
      ></el-input>
    </el-popover>
  </div>
</template>

<script>
import VueCron from "./Cron";
export default {
  emits: ["update:modelvalue", "change"],
  name: "cron",
  model: {
    event: "change",
    prop: "modelvalue",
  },

  props: {
    disabled: Boolean,
    readonly: Boolean,
    modelvalue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入定时策略",
    },
  },
  data() {
    return {
      visible: false,

      cron: "",
    };
  },
  components: {
    VueCron,
  },

  watch: {
    modelvalue: {
      handler(val) {
        this.cron = val;
      },
      immediate: true,
      deep: true,
    },
    cron: {
      handler(val) {
        this.$emit("update:modelvalue", val);
        this.$emit("change", val);
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {},
  methods: {
    changeCron(val) {
      this.cron = val;
    },
  },
  mounted() {},
};
</script>
