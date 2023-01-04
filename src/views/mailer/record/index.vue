<template>
  <section class="mailer-category">
    <el-button @click="handleAdd" type="" size="mini">添加</el-button>
    <el-button @click="init" type="" size="mini">刷新</el-button>
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
  name: "MailerRecord",
  data() {
    return {
      formValue: {},
      data: [],
      api: {
        list: this.$api.mailerRecord.page,
      },
      mailerCategory: [],
      mailerAdmin: [],
      mailerUser: [],
    };
  },

  computed: {
    columns() {
      return [...column(this), ...this.defaultFiledButton];
    },
  },
  mounted() {
    this.mailerAdminList();
    this.mailerCategoryList();
    this.mailerUserList();
  },
  methods: {
    handleAdd() {
      this.visible.show = !this.visible.show;
      this.formValue = {};
    },

    async submit() {
      const formValue = mimi._.clone(this.formValue);
      formValue.to = formValue.to && formValue.to.join();
      formValue.cc = formValue.cc && formValue.cc.join();
      formValue.bcc = formValue.bcc && formValue.bcc.join();
      const res = await this.$api.mailerRecord.send(formValue)
      if(res) {
        this.$message.success(res);
        await this.init()
      } else {
        this.$message.error(res);
      }
      this.handleAdd()
    },

    async mailerCategoryList() {
      const result= await this.$api.mailerCategory.list()
      result.forEach(item=> {
        this.mailerCategory.push({label: `${item.name}(${item.host}:${item.port})`, value: item })
      })
    },
    async mailerAdminList() {
      const result= await this.$api.mailerAdmin.list()
      result.forEach(item=> {
        this.mailerAdmin.push({label: `${item.name}(${item.toMail})`, value: `${item.toMail}` })
      })
    },
    async mailerUserList() {
      const result= await this.$api.mailerUser.list()
      result.forEach(item=> {
        this.mailerUser.push({label: `${item.name}(${item.toMail})`, value: `${item.toMail}` })
      })
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
