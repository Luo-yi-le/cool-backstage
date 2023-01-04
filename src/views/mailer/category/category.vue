<template>
  <section class="mailer-category">
    <el-button @click="handleAdd" type="" size="mini">添加</el-button>
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
        @size-change="handleSizeChange"
        @p-current-change="handleCurrentChange"
      ></mimi-table>
    </el-card>

    <mimi-dialog lock-scroll :visible.sync="visible.show">
      <template #title>
        <span>{{ visible.title }}</span>
      </template>
      <mimi-form
        ref="mimiForm"
        :rules="{}"
        v-model="formValue"
        column="2"
        :form-metas="columns"
      ></mimi-form>

      <template #footer>
        <el-button type="" @click="submit">提 交</el-button>
      </template>
    </mimi-dialog>
  </section>
</template>
<script>
import { column } from "./filed.js";
import defaultMixins from "@/mixins/defaultMixins";
export default {
  mixins: [defaultMixins],
  name: "MailerCategory",
  data() {
    return {
      formValue: {},
      data: [],
      api: {
        list: this.$api.mailerCategory.page,
      },
    };
  },

  computed: {
    columns() {
      return [...column, ...this.defaultFiledButton];
    },
  },

  methods: {
    handleAdd() {
      this.visible.show = !this.visible.show;
      this.formValue = {};
    },

    async submit() {
      let res;
      if (this.formValue.id) {
        res = await this.$api.mailerCategory.update(this.formValue);
        if (res) {
          this.$message.success("更新成功");
        }
      } else {
        res = await this.$api.mailerCategory.add(this.formValue);
        if (res) {
          this.$message.success("新增成功");
        }
      }
      this.formValue = {};
      this.visible.show = !this.visible.show;
      await this.init();
    },
  },
  components: {
    MimiTable: () => import("@/components/Table"),
    MimiDialog: () => import("@/components/Dialog"),
    MimiForm: () => import("@/components/Form"),
  },
};
</script>

<style lang="scss" scoped>
.mailer-category {
}
</style>
