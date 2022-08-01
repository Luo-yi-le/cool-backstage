<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜素与添加区域 -->

      <mimi-table
        :column="columns"
        :data="data"
        @selection-change="handleSelectionChange"
        :pagination="hasPage"
        :background="background"
        :layout="layout"
        :page-sizes="pageSizes"
        :pager-count="pagerCount"
        :current-page.sync="pagination.currentPage"
        :total="total"
        :page-size="pagination.pageSize"
        @size-change="handleSizeChange"
        @p-current-change="handleCurrentChange"
      ></mimi-table>

      <mimi-dialog lock-scroll :visible.sync="visible.show">
        <template #title>
          <span>{{ visible.title }}</span>
        </template>
        <mimi-form
          ref="mimiForm"
          :rules="rules"
          v-model="formValue"
          column="2"
          :form-metas="columns"
        ></mimi-form>

        <template #footer>
          <el-button type="" @click="submit">提 交</el-button>
        </template>
      </mimi-dialog>
    </el-card>
  </div>
</template>

<script>
import MimiForm from "@/components/Form";

import { getUserList } from "@/api/user";
import { column, data, rules } from "./filed.js";
import defaultMixins from "@/mixins/defaultMixins";
export default {
  mixins: [defaultMixins],

  name: "Users",
  data() {
    return {
      formValue: {},
      filedColumn: column,
      data,
      rules,
    };
  },
  computed: {
    columns() {
      return [...column, ...this.defaultFiledButton];
    },
  },
  created() {},
  mounted() {},
  methods: {
    async submit() {
      let data = await this.$refs["mimiForm"].submit();
      console.log(data);
    },
  },
  components: {
    MimiForm,
    MimiTable: () => import("@/components/Table/table"),
    // MimiForm: () => import("@/components/Form"),
    MimiDialog: () => import("@/components/Dialog"),
  },
};
</script>

<style lang="less" scoped></style>
