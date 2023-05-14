<template>
  <div>
    <cl-crud ref="crud" @load="handlerLoad" :on-refresh="refresh" class="sys-role">
      <template #table-column-name="{ scope }">
        <span>{{ scope.row.name }}</span>
        <el-tag
          v-if="!scope.row.isShow"
          effect="dark"
          type="danger"
          size="small"
          disable-transitions
          style="margin-left: 10px"
          >隐藏</el-tag
        >
      </template>

      <!-- 图标 -->
      <template #table-column-icon="{ scope }">
        <svg-icon :icon-class="scope.row.icon" size="16px" v-if="scope.row.icon" />
      </template>

      <!-- 权限 -->
      <template #table-column-perms="{ scope }">
        <el-tag
          v-for="(item, index) in scope.row.permList"
          :key="index"
          effect="plain"
          size="small"
          style="margin: 2px; letter-spacing: 0.5px"
          >{{ item }}</el-tag
        >
      </template>

      <!-- 路由 -->
      <template #table-column-router="{ scope }">
        <router-link class="el-link el-link--success is-underline" v-if="scope.row.type == 1" type="success" :to="scope.row.router">{{
          scope.row.router
        }}</router-link>
        <span v-else>{{ scope.row.router }}</span>
      </template>

      <!-- 路由缓存 -->
      <template #table-column-keepAlive="{ scope }">
        <template v-if="scope.row.type == 1">
          <i class="el-icon-check" v-if="scope.row.keepAlive"></i>
          <i class="el-icon-close" v-else></i>
        </template>
        <span v-else></span>
      </template>

        <template #slot-move="{ scope }">
					<el-button
            v-if="scope.row.type !=2"
            size="mini"
						type="success"
						@click="append(scope.row)"
						>新增</el-button
					>
				</template>
    </cl-crud>
  </div>
</template>

<script>
import { deepTree } from "@/utils";
import Tree from "./../components/menu/tree";
import IconSelect from "./../components/menu/icon";
import MenuPerms from "./../components/menu/perms";
export default {
  name: "sysRole",
  props: ["ttt"],
  data() {
    return {
      crud: null,
      formValue: {},
      data: [],
      selects: {
        dept: {},
        ids: [],
      },
    };
  },
  created() {},
  mounted() {
    
  },
  methods: {
    append({id, type}) {
      this.crud.append({
				parentId: id,
				type: type + 1
			})
    },
    refresh(params) {
      this.crud.refresh(params);
    },
    handlerLoad({ ctx, app }) {
      this.crud = app;
      ctx
        .service(this.$api.menu)
        .set("table", {
          columns: [
       
            {
              prop: "name",
              label: "名称",
              align: "left",
              "min-width": 150,
            },
            {
              prop: "icon",
              label: "图标",
              align: "center",
              "min-width": 150,
            },
            {
              prop: "type",
              label: "类型",
              align: "center",
              "min-width": 150,
              dict: [
                {
                  label: "目录",
                  value: 0,
                },
                {
                  label: "菜单",
                  value: 1,
                  type: "success",
                },
                {
                  label: "权限",
                  value: 2,
                  type: "danger",
                },
              ],
            },
            {
              prop: "router",
              label: "节点路由",
              align: "center",
              "min-width": 150,
            },
            {
              prop: "keepAlive",
              label: "路由缓存",
              width: 100,
              align: "center",
            },
            {
              prop: "viewPath",
              label: "文件路径",
              minWidth: 200,
              showOverflowTooltip: true,
            },
            {
              prop: "perms",
              label: "权限",
              align: "center",
              "min-width": 200,
            },
            {
              prop: "orderNum",
              label: "排序号",
              width: 90,
              align: "center",
            },
            {
              prop: "updateTime",
              label: "更新时间",
              sortable: "custom",
              width: 160,
            },
          ],
          props: {
            "max-height": "500px",
            "row-key": "id",
            "tree-props": { children: "children", hasChildren: "hasChildren" },
            "default-sort": {
              // prop: 'createTime',
              // order: 'descending'，
            },
          },
          on: {
            "selection-change": (selection) => {
              this.selects.ids = selection.map((e) => e.id);
            },
            "row-click": (row, column) => {
              if (column.property && row.children) {
                this.crud.refs("table").toggleRowExpansion(row);
              }
            },
          },
          op: {
            props: {
              width: 220
            },
            layout: ["slot-move", "edit", "delete"],
          },
        })
        .set("upsert", {
          props: {
            width: "800px",
          },
          items: [
            {
              prop: "type",
              value: 0,
              label: "节点类型",
              required: true,
              component: {
                name: "el-radio-group",
                options: [
                  {
                    label: "目录",
                    value: 0,
                  },
                  {
                    label: "菜单",
                    value: 1,
                  },
                  {
                    label: "权限",
                    value: 2,
                  },
                ],
              },
            },
            {
              prop: "name",
              label: "节点名称",
              span: 24,
              component: {
                name: "el-input",
                props: {
                  placeholder: "请输入节点名称",
                },
              },
              rules: {
                required: true,
                message: "名称不能为空",
              },
            },
            {
              prop: "parentId",
              label: "上级节点",
              hook: "empty",
              component: {
                forceUpdate: true,
                name: "cl-menu-tree",
              },
            },
            {
              prop: "router",
              label: "节点路由",
              hidden: ({ scope }) => scope.type == 1,
              component: {
                name: "el-input",
                props: {
                  placeholder: "请输入节点路由，如：/test",
                },
              },
            },
            {
              prop: "keepAlive",
              value: true,
              label: "路由缓存",
              hidden: ({ scope }) => scope.type == 1,
              component: {
                name: "el-radio-group",
                options: [
                  {
                    label: "开启",
                    value: true,
                  },
                  {
                    label: "关闭",
                    value: false,
                  },
                ],
              },
            },
            {
              prop: "isShow",
              label: "是否显示",
              value: true,
              hidden: ({ scope }) => scope.type != 2,
              flex: false,
              component: {
                name: "el-switch",
              },
            },

            {
              prop: "viewPath",
              label: "文件路径",
              hidden: ({ scope }) => scope.type == 1,
              component: {
                // vm: MenuFile,
              },
            },
            {
              prop: "icon",
              label: "节点图标",
              hidden: ({ scope }) => scope.type != 2,
              component: IconSelect,
            },
            {
              prop: "orderNum",
              label: "排序号",
              component: {
                name: "el-input-number",
                props: {
                  placeholder: "请填写排序号",
                  min: 0,
                  max: 99,
                  "controls-position": "right",
                },
              },
            },
            {
              prop: "perms",
              label: "权限",
              hidden: ({ scope }) => scope.type == 2,
              component: MenuPerms,
            },
          ],
        })
        .on("refresh", (params, { render }) => {
          this.$api.menu.list().then((list) => {
            list.map((e) => {
              e.permList = e.perms ? e.perms.split(",") : [];
            });
            render(deepTree(list));
            // this.$store.dispatch('permMenu');
          });
        })
        .done();
      app.refresh();
    },
  },
};
</script>

<style scoped lang="scss">
.sys-role {
}
</style>
