<template>
  <div class="wechat-funs">
    <el-row>
      <el-col :span="5">
        <el-card>
          <div slot="header" class="clearfix">
            <span>粉丝标签</span>
            <!-- <el-button style="float: right; padding: 3px 0" @click="tags.show = !tags.show" size="" type="text"
              >添加</el-button
            > -->
          </div>
          <el-tree :indent="18" ref="funsTree" :data="funsTree" :props="defaultProps"></el-tree>
        </el-card>
      </el-col>
      <el-col :span="19">
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
      </el-col>
    </el-row>
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

    <mimi-dialog dialogHeight="350" lock-scroll :visible.sync="tags.show">
      <template #title>
        <span>新建标签</span>
      </template>
      <mimi-form
        ref="tagsMimiForm"
        :rules="{}"
        v-model="tags.formValue"
        column="1"
        :form-metas="tags.columns"
      ></mimi-form>
      <template #footer>
        <el-button type="" @click="submitTags">提 交</el-button>
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
        list: this.$api.funs.page,
      },
      funsTree: [],
      defaultProps: {
        children: "id",
        label: "name",
      },
      tags: {
        show: false,
        formValue: {},
        columns: [
          {
            prop: "name",
            label: "标签名",
            type: "text",
            componentName: "el-input",
            component: mimi.fileds("name"),
          },
        ],
      },
      defaultFiledButton: [{
        label: '操作',
        width: '300px',
        disabled: true,
        render: (h, {$index, row}) => {
          const __this = this;
          return __this.$createElement('div', {
            style: { display: "flex", 'justify-content': 'center'}
          }, [
            __this.$createElement('el-popover', {
              key: row.id,
              attrs: { placement: 'left', trigger:"click"},
              ref: 'popover' + $index,
            },[
              __this.$createElement('el-button', {
                slot: 'reference',
                attrs: {
                   size: "mini"
                },
                on: {
                  click: ()=> this.reference
                }
              }, '设置标签'),
              __this.$createElement('el-tree', {
                ref: 'tree' + $index,
                attrs: {
                  props: __this.defaultProps,
                  data: __this.funsTree,
                  'node-key': 'id',
                  'check-on-click-node': true,
                  'show-checkbox': true,
                  'highlight-current': true,
                  'default-checked-keys': Array.isArray(row. tagid_list)? row.tagid_list: row.tagid_list.split(','),
                  indent: 18,
                },
                on: {
                  'check-change': (...argument)=>__this.handleClickTree(...argument, 'tree' + $index),
                },
              }),
              __this.$createElement('el-button', {
                attrs: {
                   size: "mini"
                },
                on: {
                  click: ()=> __this.clickSubmit(row, 'tree' + $index)
                }
              }, '设置标签'),
            ]),
            __this.$createElement('span', {
              style: {'margin-left': '10px'}
            }, [
              <section>
                <el-button size="mini" onClick={() => { __this.handleEdit($index, row) }}>编辑</el-button>
                <el-button size="mini" type="danger" onClick={() => { __this.handleDelete($index, row) }}>删除</el-button>
              </section>
            ]),
          ])
        }
      }],
      isCheckedId: '',
    };
  },
  mixins: [defaultMixins],
  computed: {
    columns() {
      return [...column, ...this.defaultFiledButton];
    },
  },
  created() {},
  mounted() {
    this.getFuns();
  },
  methods: {
    async getFuns() {
      const res = await this.$api.tags.get();
      this.funsTree = res;
      
    },
    reference() {
    },
    async clickSubmit(scope, Component) {
      this.$nextTick(async ()=>{
        const data = {
          openid_list: [scope.openid],
          tagid: this.$refs[Component].getCurrentKey(),
        };
        data.tagid = this.$refs[Component].getCheckedKeys();
        await this.$api.tags.batchtag(data)
        // await this.$api.funs.get();
        await this.init()
      });
    },
    handleClickTree(data, isChecked, check, Component) {
      // this.$nextTick(()=>{
      //   if(isChecked) {
      //     this.isCheckedId = data.id
      //     this.$refs[Component].setCheckedKeys([data.id])
      //   } else {
      //     if(this.isCheckedId == data.id) {
      //       this.$refs[Component].setCheckedKeys([data.id])
      //     }
      //   }
      // })
    },
    async submitTags() {
      const res = await this.$api.tags.create(this.tags.formValue)
      console.log(res)
    },
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
.wechat-message {
}
</style>
