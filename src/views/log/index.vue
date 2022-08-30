<template>
  <div class="admin-log">
    <mimi-table
      :column="columns"
      :data="tableData"
      @selection-change="handleSelectionChange"
      :pagination="hasPage"
      :background="background"
      :merge="['openid', 'FromUserName']"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :current-page.sync="pagination.page"
      :total="pagination.total"
      :page-size="pagination.size"
      @size-change="handleSizeChange"
      @p-current-change="handleCurrentChange"
    ></mimi-table>

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
      api: {
        list: this.$api.getLog,
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
    submit() {},
  },
  components: {
    MimiTable: () => import("@/components/Table"),
    MimiDialog: () => import("@/components/Dialog"),
    MimiForm: () => import("@/components/Form"),
  },
};
</script>

<style scoped lang="scss">
.admin-log {
}
</style>
