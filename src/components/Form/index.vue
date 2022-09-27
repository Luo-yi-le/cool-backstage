<template>
  <el-form
    ref="MiMiForm"
    :model="formValue"
    label-position="top"
    v-bind="$attrs"
    :rules="rules"
  >
    <el-row style="height: 100%" :gutter="10">
      <template v-for="(item, index) in formMetas">
        <el-col
          class="form-col"
          :span="24 / Number(column)"
          :key="index"
          v-if="!item.disabled"
        >
          <el-form-item v-bind="item" v-if="item.componentName && !item.slotName">
            <!-- 内容 -->
            <component
              style="width: 100%"
              :componentName="item.componentName"
              :is="item.componentName"
              v-model="formValue[item.prop]"
              v-bind="item.component"
              v-on="item.component && item.component.listeners"
              :placeholder="getPlaceholder(item)"
              clearable
              :class="setClass"
            >
              <template v-if="item.componentName === 'el-checkbox-group'">
                <el-checkbox
                  v-for="(option, optionIndex) in item.component.options"
                  :key="optionIndex"
                  :label="option[item.component.optionsValueKey]"
                  v-bind="option"
                >
                  {{ option[item.component.optionsLabelKey] }}
                </el-checkbox>
              </template>
              <template v-else-if="item.componentName === 'el-select'">
                <el-option
                  v-for="(option, optionIndex) in item.component.options"
                  :key="optionIndex"
                  :label="option[item.component.optionsLabelKey]"
                  :value="option[item.component.optionsValueKey]"
                  v-bind="option"
                />
              </template>
              <template v-else-if="item.componentName === 'el-radio-group'">
                <el-radio
                  v-for="(option, optionIndex) in item.component.options"
                  :key="optionIndex"
                  :label="option[item.component.optionsValueKey]"
                  v-bind="option"
                />
              </template>
            </component>
          </el-form-item>

          <el-form-item v-else v-bind="item" :name="'slot-' + item.slotName">
            <slot
              v-bind="item"
              :name="item.slotName"
              :scope="formValue"
              :props="item.prop"
              :component="item"
            ></slot>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: "MiMiForm",
  props: {
    // 需要写的表单内容
    formMetas: mimi.vue.getPropArray(),
    // 需要绑定的数据
    formValue: mimi.vue.getPropObject(),
    //校验
    rules: mimi.vue.getPropObject({}),
    // 一行几个
    column: [String, Number],
  },
  data() {
    return {};
  },

  methods: {
    submit() {
      return new Promise((resolve, reject) => {
        this.$refs["MiMiForm"].validate((valid) => {
          if (valid) {
            let data = mimi._.clone(this.formValue);
            resolve(data);
          } else {
            reject(false);
          }
        });
      });
    },
    validate(callback) {
      this.$refs["MiMiForm"].validate(callback);
    },
    validateField(props, callback = (errorMessage = "") => {}) {
      this.$refs.MiMiForm.validateField(callback);
    },
    resetFields() {
      this.$refs.MiMiForm.resetFields();
    },
    clearValidate(props) {
      this.$refs.MiMiForm.clearValidate(props);
    },

    /**
     * @method 判断placeholder显示内容
     * @param {Object} row
     * @returns {String} placeholder
     * @desc 📝默认显示内容提示
     */
    getPlaceholder(row) {
      let placeholder;
      if (["el-input"].includes(row.componentName)) {
        placeholder = "请输入" + row.label;
      } else if (
        ["el-select", "el-radio-group", "password"].includes(row.componentName)
      ) {
        placeholder = "请选择" + row.label;
      } else {
        placeholder = row.label;
      }
      return placeholder;
    },
    setClass(item) {
      let style =
        item.componentName.indexOf("radio") === -1 &&
        item.componentName.indexOf("checkbox") === -1
          ? "mimi-form-width100"
          : "";
      let arr = item.component.class ? [...item.component.class] : [];

      return [style, ...arr];
    },
  },
  components: {},
  model: {
    prop: "formValue",
    event: "change",
  },
};
</script>

<style>
/* 这个前缀理论上不会重名了 */
.mimi-form-width100 {
  width: 100%;
}

.form-col {
  padding: 10px;
}
</style>
