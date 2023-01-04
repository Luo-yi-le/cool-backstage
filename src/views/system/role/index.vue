<template>
  <div>
    <cl-crud @load="handlerLoad" ref="Crud" class="sys-role">
      <el-row>
        <cl-refresh-btn />
        <cl-add-btn />
        <cl-multi-delete-btn />
      </el-row>
    </cl-crud>
  </div>
</template>

<script>
export default {
  name: "sysRole",
  data() {
    return {
      crud: null,
      formValue: {},
      data: [],
      api: {
        list: this.$api.role.page,
      },
      selects: {
        dept: {},
        ids: [],
      },
    };
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
        .service(this.$api.role)
        .set("table", {
          columns: [
            {
              type: "selection",
              align: "center",
              width: "60",
            },
            {
              prop: "name",
              label: "姓名",
              align: "center",
              "min-width": 150,
            },
            {
              prop: "label",
              label: "标识",
              align: "center",
              "min-width": 150,
            },
            {
              prop: "remark",
              label: "备注",
              align: "center",
              "min-width": 150,
              emptyText: "无",
            },
            {
              prop: "createTime",
              label: "创建时间",
              align: "center",
              emptyText: "无",
              sortable: true,
              "min-width": 150,
            },
            {
              prop: "updateTime",
              label: "修改时间",
              align: "center",
              emptyText: "无",
              sortable: true,
              "min-width": 200,
            }
          
          ],
          props: {
            "max-height": "500px",
            "default-sort": {
              // prop: 'createTime',
              // order: 'descending'，
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
            width: "800px",
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
  },
};
</script>

<style scoped lang="less">
.sys-role {
}
</style>
