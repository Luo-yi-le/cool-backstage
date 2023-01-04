<template>
  <div class="dept-tree">
    <div class="dept-tree__header">
      <div>组织架构</div>

      <ul class="dept-tree__op">
        <li @click="refresh()">
          <el-tooltip content="刷新">
            <i class="el-icon-refresh"></i>
          </el-tooltip>
        </li>

        <li v-if="drag && browser.isMini" @click="isDrag = true">
          <el-tooltip content="拖动排序">
            <i class="el-icon-s-operation"></i>
          </el-tooltip>
        </li>

        <li v-show="isDrag" class="no">
          <el-button @click="treeOrder(true)" size="small">保存</el-button>
          <el-button @click="treeOrder(false)" size="small">取消</el-button>
        </li>
      </ul>
    </div>
    <!-- @contextmenu.stop.prevent="onContextMenu" -->
    <div class="dept-tree__container">
      <el-scrollbar>
        <el-tree
          v-loading="loading"
          node-key="id"
          default-expand-all
          :data="list"
          :props="{
            label: 'name',
          }"
          :draggable="isDrag"
          :allow-drag="allowDrag"
          :allow-drop="allowDrop"
          :expand-on-click-node="false"
        >
          <!-- @node-contextmenu="onContextMenu" -->
          <template #default="{ node, data }">
            <div class="dept-tree__node">
              <span
                class="dept-tree__node-label"
                v-bind:class="{ 'is-active': data.id == info?.id }"
                @click="rowClick(data)"
                >{{ node.label }}</span
              >
              <span v-if="browser.isMini" class="dept-tree__node-icon">
                <!-- @click="onContextMenu($event, data, node)" -->
                <i class="el-icon-more-outline"></i>
              </span>
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>

    <!-- <cl-form ref="Form" /> -->
  </div>
</template>

<script>
import { deepTree, revDeepTree, getBrowser } from "@/utils";
export default {
  name: "dept-tree",
//   inject: [ 'viewGroup' ],
  props: {
    drag: {
      type: Boolean,
      default: true,
    },
    level: {
      type: Number,
      default: 99,
    },
  },
  components: {},
  data() {
    return {
      loading: false,
      list: [],
      info: null,
      isDrag: false,
    };
  },
  computed: {
    browser() {
        return getBrowser();
    }
  },

  mounted() {
    this.refresh()
  },
  methods: {
    allowDrag(data) {
      return data.parentId;
    },
    allowDrop(dropNode) {
      return dropNode.data.parentId;
    },
    async refresh() {
      this.loading = true;
      this.isDrag = false;
      await this.$api.department.list().then((res) => {
        this.list = deepTree(res);

        if (this.info) {
          this.info = this.list[0];
        }
        // 模拟点击
        this.rowClick(this.info);
      });

      this.loading = false;
    },
    rowClick(e) {
      if (e) {
        const ids = e.children ? revDeepTree(e.children).map((e) => e.id) : [];
        ids.unshift(e.id);
        this.info = e;
        // viewGroup.checkExpand(false);
        this.$emit("row-click", { item: e, ids });
      }
    },
    treeOrder(f) {
      if (f) {
        this.$confirm("部门架构已发生改变，是否保存？", "提示", {
          type: "warning",
        })
          .then(async () => {
            const ids = [];

            function deep(list, pid) {
              list.forEach((e) => {
                e.parentId = pid;
                ids.push(e);
                if (e.children && isArray(e.children)) {
                  deep(e.children, e.id);
                }
              });
            }

            deep(this.list, null);

            await this.$api.department
              .order(
                ids.map((e, i) => {
                  return {
                    id: e.id,
                    parentId: e.parentId,
                    orderNum: i,
                  };
                })
              )
              .then((res) => {
                this.$Message.success("更新排序成功");
              })
              .catch((err) => {
                this.$Message.error(err.message);
              });
            await this.refresh();
            this.isDrag = false;
          })
          .catch((err) => {});
        // this.$message.
      } else {
        this.refresh();
      }
    },

    rowDel(e) {
      const __this = this;
      async function del(f) {
        const res = await __this.$api.department.delete({ ids: [e.id], deleteUser: f });
        if (res) {
          if (e.id == __this.info.id) {
            __this.info = null;
          }

          if (f) {
            __this.$message.success("删除成功");
          } else {
            __this.$confirm(
              `“${e.name}” 部门的用户已成功转移到 “${e.parentName}” 部门。`,
              "删除成功"
            );
          }
        }

        await __this.refresh();
      }

      this.$confirm(`该操作会删除 “${e.name}” 部门的所有用户，是否确认？`, "提示", {
        type: "warning",
        confirmButtonText: "直接删除",
        cancelButtonText: "保留用户",
        distinguishCancelAndClose: true,
      })
        .then(async () => {
          await del(true);
        })
        .catch(async (action) => {
          if (action == "cancel") {
            await del(false);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dept-tree {
  height: 100%;
  width: 100%;

  :deep(.el-tree-node__label) {
    display: block;
    height: 100%;
    width: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    letter-spacing: 1px;
    position: relative;

    div {
      font-size: 14px;
      flex: 1;
      white-space: nowrap;
    }

    i {
      font-size: 18px;
      cursor: pointer;
    }
  }

  &__op {
    display: flex;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      margin-left: 5px;
      padding: 5px;
      cursor: pointer;

      &:not(.no):hover {
        background-color: #eee;
      }
    }
  }

  &__container {
    height: calc(100% - 40px);

    :deep(.el-tree-node__content) {
      height: 36px;
      margin: 0 5px;
    }
  }

  &__node {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;

    &-label {
      display: flex;
      align-items: center;
      flex: 1;
      height: 100%;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.is-active {
        color: var(--color-primary);
        font-weight: bold;
      }
    }

    &-icon {
      height: 28px;
      width: 28px;
      line-height: 28px;
      text-align: center;
      margin-right: 5px;
    }
  }
}
</style>
