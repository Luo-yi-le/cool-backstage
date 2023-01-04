<template>
  <div class="wechat-funs">
    <el-row>
      <el-button type="" @click="handleAdd">新建标签</el-button>
      <el-card>
        <mimi-table
          :column="columns"
          :data="tableData"
          @selection-change="handleSelectionChange"
          :pagination="hasPage"
          :background="background"
          :layout="layout"
          :page-sizes="pageSizes"
          :pager-count="pagerCount"
          :current-page.sync="pagination.page"
          :total="pagination.total"
          :page-size="pagination.size"
          @handle-delete="handleDelete"
          @size-change="handleSizeChange"
          @p-current-change="handleCurrentChange"
        ></mimi-table>
      </el-card>
    </el-row>
    <mimi-dialog dialogHeight="380" lock-scroll :visible.sync="visible.show" max-height="max-content">
      <template #title>
        <span>{{ visible.title }}</span>
      </template>
      <mimi-form
        ref="mimiForm"
        :rules="{}"
        v-model="formValue"
        :form-metas="columns"
      ></mimi-form>

      <template #footer>
        <el-button type="" @click="submit">提 交</el-button>
      </template>
    </mimi-dialog>
  </div>
</template>

<script>
import { column } from "./filed.js";
import defaultMixins from "@/mixins/defaultMixins";
export default {
  name: "Message",
  data() {
    return {
      formValue: {},
      data: [],
      aapi: this.$api,
      api: {
        list: this.$api.tags.page,
      },
      funsTree: [],
      defaultProps: {
        children: "id",
        label: "name",
      },
    };
  },
  mixins: [defaultMixins],
  computed: {
    columns() {
      return [...column, ...this.defaultFiledButton];
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleAdd() {
      this.visible.show = !this.visible.show;
      this.formValue = {};
    },
    async submit() {
      let res;
      if (this.formValue.id) {
        res = await this.$api.tags.update(this.formValue);
        if (res) {
          this.$message.success("更新成功");
        }
      } else {
        res = await this.$api.tags.create(this.formValue);
        if (res) {
          this.$message.success("新增成功");
        }
      }
      this.formValue = {};
      this.visible.show = !this.visible.show;
      await this.init();
    },
    async handleDelete(index, row) {
      if(row.id) {
        const res = await this.$api.tags.delete(row);
        await this.init();
      }
    }
  },
  components: {
    MimiTable: () => import("@/components/Table"),
    MimiDialog: () => import("@/components/Dialog"),
    MimiForm: () => import("@/components/Form"),
  },
};
</script>

<style scoped lang="scss">
.wechat-message {
}
</style>
