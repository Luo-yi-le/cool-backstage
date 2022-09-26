<template>
  <el-popover :visible="visible" :disabled="disabled || readonly" width="600px">
  </el-popover>
</template>

<script>
import Cron from "./cron";

export default {
  name: "Cron",

  components: {
    Cron,
  },

  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入定时策略",
    },
    disabled: Boolean,
    readonly: Boolean,
  },

  emits: ["update:value", "change"],

  data() {
    return {
      cron: "",
      visible: false,
    };
  },

  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
  },

  watch: {
    value: {
      handler(val) {
        this.cron = val;
      },
      immediate: true,
      deep: true,
    },
    cron: {
      handler(val) {
        this.$emit("update:value", val);
        this.$emit("change", val);
      },
      immediate: true,
      deep: true,
    },
  },

  render(ctx) {
    const ElPopover = (
      <el-popover
        visible={ctx.visible}
        disabled={ctx.disabled || ctx.readonly}
        width="600px"
      ></el-popover>
    );

    return (
      <div class="cl-cron">
        {h(
          ElPopover,
          {
            "onUpdate:visible"(v) {
              if (!v) {
                ctx.close();
              }
            },
          },
          {
            default() {
              return <cron v-model={ctx.cron} onClose={ctx.close}></cron>;
            },
            reference() {
              return (
                <el-input
                  clearable
                  disabled={ctx.disabled}
                  readonly={ctx.readonly}
                  v-model={ctx.cron}
                  placeholder={ctx.placeholder}
                  onClick={ctx.open}
                ></el-input>
              );
            },
          }
        )}
      </div>
    );
  },
};
</script>
