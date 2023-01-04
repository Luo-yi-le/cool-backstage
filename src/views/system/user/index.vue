<template>
  <view-group class="system-power" :title="title">
    <template #left>
      <dept-tree @row-click="onDeptRowClick" @user-add="onDeptUserAdd" />
    </template>

    <template #right>
      <cl-crud @load="handlerLoad" ref="Crud">
        <el-row>
          <cl-refresh-btn />
          <cl-add-btn />
          <cl-multi-delete-btn />
        </el-row>
      </cl-crud>
      <!-- <el-row>
        <el-button type="" @click="init">刷 新</el-button>
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
      </el-row> -->
    </template>
  </view-group>
</template>

<script>
import { column } from "./filed.js";
import defaultMixins from "@/mixins/defaultMixins";
import crud from "@/components/Crud/crud";
export default {
  name: "index",
  data() {
    return {
      crud: null,
      formValue: {},
      data: [],
      api: {
        list: this.$api.user.page,
      },
      selects: {
        dept: {},
        ids: [],
      },
    };
  },
  mixins: [defaultMixins],
  computed: {
    title() {
      return `成员列表（${(this.selects.dept && this.selects.dept.name) || ""}）`;
    },
    columns() {
      return [...column, ...this.defaultFiledButton];
    },
  },
  created() {},
  mounted() {},
  methods: {
    refresh(params) {
      this.crud.refresh(params);
    },
    handlerLoad({ ctx, app }) {
      this.crud = app;
      const a = ctx
        .service(this.$api.user)
        .set("table", {
          columns: [
            {
              type: "selection",
              align: "center",
              width: "60",
            },
            {
              prop: "headImg",
              label: "头像",
              align: "center",
              slot: true,
              component: {
                name: "el-image",
                props: {
                  fit: "fill",
                },
              },
            },
            {
              prop: "name",
              label: "姓名",
              align: "center",
              "min-width": 150,
            },
            {
              prop: "username",
              label: "用户名",
              align: "center",
              "min-width": 150,
            },
            {
              prop: "nickName",
              label: "昵称",
              align: "center",
              "min-width": 150,
            },
            {
              prop: "departmentName",
              label: "部门名称",
              align: "center",
              emptyText: "无",
              "min-width": 150,
            },
            {
              prop: "roleName",
              label: "角色",
              "header-align": "center",
              emptyText: "无",
              "min-width": 200,
            },
            {
              prop: "phone",
              label: "手机号码",
              align: "center",
              "min-width": 150,
              emptyText: "无",
            },
            {
              prop: "remark",
              label: "备注",
              align: "center",
              "min-width": 150,
              emptyText: "无",
            },
            {
              prop: "status",
              label: "状态",
              align: "center",
              "min-width": 150,
            },
            {
              prop: "createTime",
              label: "创建时间",
              align: "center",
              sortable: true,
              width: 150,
            },
          ],
          props: {
            "max-height": "500px",
            "default-sort": {
              // prop: 'createTime',
              // order: 'descending'
            },
          },
          on: {
            "selection-change": (selection) => {
              this.selects.ids = selection.map((e) => e.id);
            },
          },
          op: {
            layout: ["slot-move", "edit", "delete"],
          },
        })
        .set("upsert", {
          props: {
            with: "800px",
          },
          items: [
            {
              prop: "headImg",
              label: "头像",
              span: 24,
              component: {
                name: "cl-upload",
              },
            },
            {
              prop: "name",
              label: "姓名",
              span: 24,
              component: {
                name: "el-input",
                props: {
                  placeholder: "请填写姓名",
                },
              },
              rules: {
                required: true,
                message: "姓名不能为空",
              },
            },
            {
              prop: "nickName",
              label: "昵称",
              span: 12,
              component: {
                name: "el-input",
                props: {
                  placeholder: "请填写昵称",
                },
              },
              rules: {
                required: true,
                message: "昵称不能为空",
              },
            },
            {
              prop: "username",
              label: "用户名",
              span: 12,
              component: {
                name: "el-input",
                props: {
                  placeholder: "请填写用户名",
                },
              },
              rules: [
                {
                  required: true,
                  message: "用户名不能为空",
                },
              ],
            },
            {
              prop: "password",
              label: "密码",
              span: 12,
              hidden: true,
              component: {
                name: "el-input",
                props: {
                  placeholder: "请填写密码",
                  type: "password",
                },
              },
              rules: [
                {
                  min: 6,
                  max: 16,
                  message: "密码长度在 6 到 16 个字符",
                },
              ],
            },
            {
              prop: "roleIdList",
              label: "角色",
              span: 24,
              value: [],
              component: {
                props: {
                  props: {
                    "multiple-limit": 3,
                  },
                },
              },
              rules: {
                required: true,
                message: "角色不能为空",
              },
            },
            {
              prop: "phone",
              label: "手机号码",
              span: 12,
              component: {
                name: "el-input",
                props: {
                  placeholder: "请填写手机号码",
                },
              },
            },
            {
              prop: "email",
              label: "邮箱",
              span: 12,
              component: {
                name: "el-input",
                props: {
                  placeholder: "请填写邮箱",
                },
              },
            },
            {
              prop: "remark",
              label: "备注",
              span: 24,
              component: {
                name: "el-input",
                props: {
                  type: "textarea",
                  rows: 4,
                },
              },
            },
            {
              prop: "status",
              label: "状态",
              value: 1,
              component: {
                name: "el-radio-group",
                options: [
                  {
                    label: "开启",
                    value: 1,
                  },
                  {
                    label: "关闭",
                    value: 0,
                  },
                ],
              },
            },
            {
              prop: "tips",
              hidden: true,
              component: (
                <div>
                  <i class="el-icon-warning"></i>
                  <span style="margin-left: 6px">新增用户默认密码为：123456</span>
                </div>
              ),
            },
          ],
        })
        .done();
      app.refresh();
    },
    async onDeptRowClick({ item, ids }) {
      this.selects.dept = item;
      this.params_query = {
        page: 1,
        departmentIds: ids,
      };
      await this.init();
    },
    onSelectionChange(selection) {
      this.selects.ids = selection.map((e) => e.id);
    },

    toMove(e) {
      let ids = [];

      if (!e) {
        ids = this.selects.ids;
      } else {
        ids = [e.id];
      }
    },

    onDeptUserAdd(item) {},
  },
  components: {
    DeptTree: () => import("../components/dept/tree.vue"),
    ViewGroup: () => import("@/components/ViewGroup"),
    MimiTable: () => import("@/components/Table"),
    MimiDialog: () => import("@/components/Dialog"),
    MimiForm: () => import("@/components/Form"),
  },
};
</script>

<style scoped lang="scss">
.system-power {
}
</style>
