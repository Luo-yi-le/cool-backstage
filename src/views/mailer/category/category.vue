<template>
  <section class="mailer-category">
    <cl-crud @load="laod"></cl-crud>
  </section>
</template>
<script>
export default {
  name: "MailerCategory",
  data() {
    return {
      crud: null,
    };
  },

  methods: {

    laod({ ctx, app }) {
      this.crud = app
      ctx.set('layout', [
        ['add-btn',
          'multi-delete-btn',
          'query',
          'flex1',
          'search-key',
          'adv-btn',],
        ['data-table'],
        ['flex1', 'pagination']
      ])
        .service(this.$api.mailerCategory)
        .set('permission', {
          add: ['mailer:category:add'],
          delete: ['mailer:category:delete'],
          multiDelete: ['mailer:category:delete'],
          update: ['mailer:category:update'],
          list: ['mailer:category:list'],
          query: ['mailer:category:query'],
        })
        .set('table', {
          columns: [
            {
              label: '序号',
              type: 'selection',
            },

            {
              prop: "name",
              label: "名称",
              align: "center",
              "min-width": 150,
            },
            {
              prop: "host",
              label: "发信邮箱服务商",
              align: "center",
              "min-width": 150,
            },
            {
              prop: "secure",
              label: "使用 SSL",
              align: "center",
              "min-width": 150,
              dists: [{
                label: "是",
                value: true
              }, {
                label: "否",
                value: false
              }]
            },
            {
              prop: "port",
              label: "SMTP 端口",
              align: "center",
              "min-width": 150,
            },

            {
              prop: "status",
              label: "状态",
              align: "center",
              "min-width": 150,
              dist: [{
                label: "启用",
                value: 1
              }, {
                label: "不启用",
                value: 0
              }]
            },
            {
              prop: "remark",
              label: "备注",
              align: "center",
              "min-width": 150,
            },

          ],
          props: {
            size: 'mini',
            border: true,
            'max-height': '300px',
            layout: ['edit', 'delete'],
            hidden: false,
            //hidden: ({ row }, btn)=> {},
          },
          op: {
            props: { width: 250 },
            layout: ['edit', 'delete'],
            hidden: false,
          },
        })
        .set('upsert', {
          props: {
            width: '960px',
            renderTitle: '',
            labelWidth: '100px'
          },
          items: [
            {
              prop: "name",
              label: "名称",
              span: 8,
              component: {
                name: "el-input",
                attrs: {
                  placeholder: "请输入名称",
                },
              },
              rules: {
                required: true,
                message: "名称不能为空",
              },
            },

            {
              prop: "host",
              label: "邮箱服务商",
              span: 8,
              component: {
                name: "el-input",
                attrs: {

                  placeholder: "请输入邮箱服务商",
                },
              },
              rules: {
                required: true,
                message: "邮箱服务商不能为空",
              },
            },
            {
              prop: "secure",
              label: "使用 SSL",
              span: 8,
              value: false,
              component: {
                name: "el-radio-group",
                attrs: {
                  placeholder: "请选择使用 SSL",
                },

                options: [{
                  label: "是",
                  value: true
                }, {
                  label: "否",
                  value: false
                }]
              },
            },
            {
              prop: "port",
              label: "SMTP 端口",
              span: 8,
              component: {
                name: "el-input",
                attrs: {
                  type: 'number',
                  placeholder: "请输入SMTP 端口",
                },
              },
              rules: {
                required: true,
                message: "SMTP 端口不能为空",
              },
            },
            {
              prop: "status",
              label: "状态",
              span: 8,
              value: 1,
              component: {
                name: "el-radio-group",
                attrs: {
                  type: 'number',
                  placeholder: "请输入SMTP 端口",
                },
                options: [{
                  label: "启用",
                  value: 1
                }, {
                  label: "不启用",
                  value: 0
                }]
              },
            },

            {
              prop: "remark",
              label: "备注",
              span: 24,
              component: {
                name: "el-input",
                attrs: {
                  'label-width': '120px',
                  type: 'textarea',
                  rows: 2,
                  placeholder: "请选择备注",
                },
              },

            },
          ],
        })
        .on('close', () => {
        })
        .on('open', () => {
        })
        .on('refresh', async (params, { next, done, render }) => {
          const res = await this.$api.mailerCategory.page(params);
          render(res.list, res.pagination);
        })
        .done()

      app.refresh();
    },

  },
};
</script>

<style lang="scss" scoped>
.mailer-category {}
</style>
