<template>
  <div class="system-task">
    <div class="box scroller1">
      <!-- 系统，用户自定义，已停止 -->
      <div
        class="block"
        v-for="(item, index) in list"
        :key="index"
        :class="[`_${item.key}`]"
      >
        <div class="header">
          <!-- 图标 -->
          <i class="icon" :class="item.icon"></i>
          <!-- 标题 -->
          <span class="label">{{ item.label }}</span>
          <!-- 数量 -->
          <span class="num">({{ item.pagination.total }})</span>
          <span class="flex1"></span>
          <!-- 操作按钮 -->
          <ul class="op-btn">
            <li class="refresh-btn" @click="refreshTask({ page: 1 })">
              <i class="el-icon-refresh"></i>
              <span>刷新</span>
            </li>

            <li class="add-btn">
              <i class="el-icon-plus"></i>
              <span>添加</span>
            </li>
          </ul>
        </div>

        <div
          class="container scroller1"
          :ref="`${item.key}-scroller`"
          :key="Math.random() + index"
        >
          <draggable
            v-model="list[index].list"
            v-bind="drag"
            item-key="id"
            draggabl=".item"
            tag="ul"
            :data-type="item.params.type"
            :data-status="item.params.status"
            :move="changeMove"
          >
            <!-- :data-status="item.params.status"
            :data-type="item.params.type" -->

            <li
              v-for="element in list[index].list"
              :key="element.id"
              :data-id="element.id"
              class="_drag"
              @contextmenu.stop.prevent="openCM($event, element)"
            >
              <div class="h">
                <span v-show="element.status === 0" class="type _warning">
                  {{ element.type === 0 ? "系统" : "用户" }}
                </span>
                <span class="name">{{ element.name }}</span>
              </div>

              <div class="remark">{{ element.remark }}</div>

              <div class="f">
                <template v-if="element.status">
                  <span class="date"> {{ element.nextRunTime || "..." }}</span>
                  <span class="start">进行中</span>
                </template>

                <template v-else>
                  <span>...</span>
                  <span class="stop">已停止</span>
                </template>
              </div>

              <div class="op">
                <div v-if="element.status === 0" class="op-item" @click="start(element)">
                  <i class="el-icon-plus-video-play"></i>
                  <span>开始</span>
                </div>

                <div v-else class="op-item" @click="stop(element)">
                  <i class="el-icon-plus-video-pause"></i>
                  <span>暂停</span>
                </div>

                <div class="op-item" @click="edit(element)">
                  <i class="el-icon-edit-pen"></i>
                  <span>编辑</span>
                </div>

                <div class="op-item" @click="findLog(element)">
                  <i class="el-icon-tickets"></i>
                  <span>查看日志</span>
                </div>
              </div>
            </li>
            <template #header>
              <div slot="header" v-if="list[index].list.length == 0" class="empty">
                暂无数据
              </div>
            </template>
          </draggable>
        </div>
        <div class="footer">
          <button class="btn-add">
            <i class="el-icon-plus"></i>
          </button>
        </div>
      </div>

      <!-- 日志 -->
      <div class="block _log">
        <div class="header">
          <!-- 标题 -->
          <span class="label">日志</span>
          <!-- 数量 -->
          <span class="num">({{ logs.pagination.total }})</span>
          <span class="flex1"></span>
          <!-- 是否异常 -->
          <el-checkbox-group
            v-model="logs.filters.status"
            class="status"
            @change="filterLog"
          >
            <el-checkbox :label="0">异常</el-checkbox>
          </el-checkbox-group>

          <!-- 操作按钮 -->
          <ul class="op-btn">
            <li class="refresh-btn">
              <i class="el-icon-refresh"></i>
              <span>刷新</span>
            </li>

            <li v-if="logs.current" class="_current-log" @click="allLog">
              <span>{{ logs.current.name }}</span>
              <i class="el-icon-close"></i>
            </li>
          </ul>
        </div>

        <div v-loading="logs.loading" class="container" element-loading-text="拼命加载中">
          <ul
            ref="log-scroller"
            class="scroller1"
            :infinite-scroll-disabled="logs.list.length == logs.pagination.total"
            v-infinite-scroll="moreLog"
          >
            <li
              v-for="(item, index) in logs.list"
              :key="index"
              :class="{ _error: item.status == 0 }"
            >
              <div class="h">
                <span class="name">{{ Number(index) + 1 }} · {{ item.taskName }}</span>
              </div>

              <div class="remark" :class="{ _ellipsis: !item._expand }">
                {{ item.detail || "..." }}
              </div>

              <div class="f">
                <span>执行时间：{{ item.createTime }}</span>
              </div>
            </li>
            <div class="empty" v-if="logs.list.length == 0">暂无数据</div>
          </ul>
        </div>
      </div>
    </div>

    <context-menu
      ref="menu"
      :target="contextMenuTarget"
      :list="contextMenuList"
      :show="contextMenuVisible"
      @update:show="contextMenuVisible = $event"
    >
    </context-menu>
  </div>
</template>

<script>
import MimiForm from "@/components/Form";

import { column } from "./filed.js";
import defaultMixins from "@/mixins/defaultMixins";
// import { ContextMenu } from '@cool-vue/crud'
export default {
  mixins: [defaultMixins],
  name: "Task",
  data() {
    return {
      contextMenuList: [],
      contextMenuTarget: null,
      contextMenuVisible: false,
      drag: {
        options: {
          handle: "._drag",
          animation: 150,
          group: "Task",
          ghostClass: "ghost",
          sort: false,
        },
      },
      list: [
        {
          key: "sys",
          label: "系统任务",
          icon: "el-icon-s-tools",
          list: [],
          loading: false,
          params: {
            type: 0,
            status: 1,
          },
          pagination: {
            size: 10,
            page: 1,
            total: 0,
          },
        },
        {
          key: "user",
          label: "用户自定义任务",
          icon: "el-icon-user-solid",
          list: [],
          loading: false,
          params: {
            type: 1,
            status: 1,
          },
          pagination: {
            size: 10,
            page: 1,
            total: 0,
          },
        },
        {
          key: "stop",
          label: "已停止任务",
          list: [],
          loading: false,
          params: {
            type: null,
            status: 0,
          },
          pagination: {
            size: 10,
            page: 1,
            total: 0,
          },
        },
      ],
      logs: {
        loading: false,
        list: [],
        pagination: {
          size: 10,
          page: 1,
        },
        params: {},
        filters: {
          status: [],
        },
        current: null,
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.refreshTask({ page: 1 });
  },
  methods: {
    async refreshTask(params, options) {
      const { index, more } = options || {};
      const arr =
        index === undefined || index === null ? this.list.map((e, i) => i) : [index];
      arr.forEach(async (k) => {
        const item = this.list[k];
        Object.assign(item.params, {
          ...item.pagination,
          ...params,
        });
        item.loading = true;
        const res = await this.$api.task.page(item.params);
        item.loading = false;
        this.moreList(res, item);
        // console.log(this.$refs[`${item.key}-scroller`])
        // if (!more) {
        //   this.$refs[`${item.key}-scroller`].scroll({
        //     top: 0,
        //     behavior: "smooth"
        //   });
        // }
      });
    },
    async getTaskLog() {
      this.logs.loading = true;
      const param = Object.assign({}, this.logs.pagination, { status: this.logs.status });
      const res = await this.$api.task.log(param);
      this.logs.pagination = Object.assign({}, this.logs.pagination, res.pagination);
      // this.logs.list = this.logs.list.concat(res.list);
      this.logs.list = res.list;
      this.logs.loading = false;
    },

    moreList(res, { list, pagination }) {
      if (!res) {
        return;
      }
      const { page, size } = res.pagination;
      const len = res.list.length;
      const max = list.length;
      if (page == 1) {
        list.splice(0, max, ...res.list);
      } else {
        const start = max - (max % size);
        const end = start + len;
        list.splice(start, end, ...res.list);
      }
      if (len == size) {
        res.pagination.page += 1;
      }
      Object.assign(pagination, res.pagination);
      return page != 1;
    },

    // 刷新日志
    async refreshLog(newParams, options) {
      if (this.logs.loading) {
        return false;
      }
      const { params, pagination } = this.logs;
      const { more } = options || {};
      Object.assign(params, {
        ...pagination,
        ...newParams,
      });
      this.logs.loading = true;
      const res = await this.$api.task.log(params);
      this.moreList(res, this.logs);
      // if (!more) {
      //   this.$refs["log-scroller"].scroll({
      //     top: 0,
      //     behavior: "smooth"
      //   });
      // }
      this.logs.loading = false;
    },

    // 更多日志
    async moreLog() {
      await this.refreshLog(null, { more: true });
    },
    // 查看任务对应的日志
    async findLog(e) {
      this.logs.current = e;
      await this.refreshLog({ page: 1, id: e.id });
    },
    // 所有日志
    async allLog() {
      this.logs.current = null;
      await this.refreshLog({ page: 1, id: null });
    },
    // 过滤日志
    async filterLog([v]) {
      await this.refreshLog({ page: 1, status: v === undefined ? 1 : 0 });
    },

    // 右键菜单
    openCM(e, { id, status, type, name }) {
      const __this = this;
      e.preventDefault();
      __this.$refs.menu.contextMenuHandler(e);
      const menus = [
        {
          label: "立即执行",
          icon: "el-icon-video-play",
          callback(done) {
            __this.once({ id });
            done();
          },
        },
        {
          label: "编辑",
          icon: "el-icon-edit",
          callback(done) {
            __this.edit({ id, type });
            done();
          },
        },
        {
          label: "删除",
          icon: "el-icon-delete",
          callback(done) {
            __this.remove({ id });
            done();
          },
        },
        {
          label: "查看日志",
          icon: "el-icon-tickets",
          callback(done) {
            __this.findLog({ id, name });
            done();
          },
        },
      ];

      if (status == 1) {
        menus.splice(1, 0, {
          label: "暂停",
          icon: "el-icon-video-pause",
          callback(done) {
            __this.stop({ id, type });
            done();
          },
        });
      } else {
        menus.splice(1, 0, {
          label: "开始",
          icon: "el-icon-video-play",
          callback(done) {
            __this.start({ id, type });
            done();
          },
        });
      }
      __this.contextMenuList = menus;
      return false;
    },
    async edit(params) {
      const { id, type } = params || {};
      let info = {
        type,
        service: "",
        name: "",
        cron: "",
      };
      if (id) {
        info = await his.$api.task.info({ id });
      }
      if (info.every) {
        info.every /= 1000;
      }
      if (!info.limit) {
        info.limit = undefined;
      }
    },
    // 删除任务
    remove({ id }) {
      this.$confirm("此操作将永久删除该任务，是否继续？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$api.task.delete({ ids: [id] }).then(() => {
            this.refreshTask();
          });
        })
        .catch(() => null);
    },
    // 开始任务
    start({ id, type }) {
      this.$api.task
        .start({ id, type })
        .then(() => {
          this.refreshTask();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 停止任务
    stop({ id }) {
      this.$api.task
        .stop({ id })
        .then(() => {
          this.refreshTask();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 任务执行一次
    once({ id }) {
      this.$api.task
        .once({ id })
        .then(() => {
          this.refreshTask();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    changeMove(event, originalEvent) {
      const { draggedContext, dragged, to, from } = event;
      this.onDragEnd({ to: to, item: dragged });
      return true;
    },
    // 任务拖动
    onDragEnd({ to, item }, data) {
      const status = to.getAttribute("data-status");
      const type = to.getAttribute("data-type");
      const id = item.getAttribute("data-id");
      if (status == 0) {
        this.stop({ id });
      }
      if (status == 1) {
        this.start({ id, type });
      }
      return false;
    },
    // 更多任务
    moreTask(index) {
      this.refreshTask(null, { index, more: true });
    },
  },
  components: {
    draggable: () => import("vuedraggable"),
    ContextMenu: () => import("@/components/ContextMenu"),
  },
};
</script>

<style lang="scss" scoped>
.Ghost {
  opacity: 0.7;
}

.Drag {
  border: 1px dashed #000 !important;
  background: #fff !important;
}

.scroller1 {
  overflow: hidden auto;
  position: relative;
  z-index: 9;
}

.system-task {
  .box {
    display: flex;
    height: 100%;
    overflow-x: auto;
  }

  .block {
    height: 100%;
    width: 400px;
    margin-right: 10px;
    flex-shrink: 0;

    &:last-child {
      margin-right: 0;
    }

    .header {
      display: flex;
      align-items: center;
      height: 40px;
      background-color: #f0f0f0;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      position: relative;
      top: 5px;
      z-index: 1;
      padding: 0 10px 5px 10px;

      i {
        font-size: 18px;
      }

      .label {
        font-size: 12px;
        margin: 0 5px;
        letter-spacing: 0.5px;
      }

      .num {
        font-size: 12px;
      }

      .flex1 {
        flex: 1;
      }

      .op-btn {
        display: flex;

        li {
          display: flex;
          align-items: center;
          list-style: none;
          cursor: pointer;
          padding: 2px 10px;
          background-color: #fff;
          border-radius: 3px;
          margin-left: 5px;

          &:hover {
            background-color: #dedede;
            color: #444;
          }

          i {
            font-size: 13px;
            margin-right: 2px;
          }

          span {
            font-size: 12px;
          }
        }
      }
    }

    .container {
      max-height: calc(100% - 90px);
      overflow-y: auto;
      margin-bottom: 5px;
      z-index: 2;
      position: relative;

      ul {
        li {
          list-style: none;
          background-color: #fff;
          border-radius: 5px;
          margin-bottom: 5px;
          padding: 10px 15px;
          font-size: 14px;
          letter-spacing: 0.5px;
          border: 1px solid #f7f7f7;

          &:last-child {
            margin-bottom: 0;
          }

          &._drag {
            cursor: pointer;
          }

          &:hover {
            .op {
              height: 30px;
            }
          }

          .h {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-bottom: 10px;

            .type {
              font-size: 12px;
              border-radius: 3px;
              padding: 1px 2px;
              margin-right: 5px;

              &._warning {
                background-color: #e6a23c;
                color: #fff;
              }
            }
          }

          .remark {
            font-size: 12px;
            color: #666;
            margin-bottom: 20px;
          }

          .f {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;

            .date {
              font-size: 12px;
              color: #fff;
              background-color: #2f3447;
              border-radius: 2px;
              margin-left: 40px;
              padding: 1px 3px;

              &::before {
                content: "NEXT";
                position: absolute;
                left: 0;
                top: 1px;
                color: #222;
              }
            }

            .start,
            .stop {
              display: flex;
              align-items: center;
              font-size: 12px;
              margin-left: 30px;
              position: relative;

              &::before {
                content: "";
                display: block;
                height: 6px;
                width: 6px;
                border-radius: 6px;
                position: absolute;
                left: -15px;
              }
            }

            .start {
              color: #67c23a;

              &::before {
                background-color: #67c23a;
              }
            }

            .stop {
              color: #f56c6c;

              &::before {
                background-color: #f56c6c;
              }
            }
          }

          .op {
            display: flex;
            height: 0;
            margin-top: 15px;
            transition: height 0.3s;
            overflow: hidden;

            &-item {
              flex: 1;
              height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;

              &:hover {
                background-color: #f7f7f7;
              }

              span {
                font-size: 12px;
                color: #666;
              }

              i {
                font-size: 16px;
                margin-right: 5px;
              }
            }
          }

          &._error {
            background-color: #f56c6c;
            color: #fff;

            .remark {
              color: #fff !important;
            }
          }
        }
      }

      .empty {
        text-align: center;
        font-size: 13px;
        color: #666;
        background-color: #fff;
        padding: 20px;
      }

      .more {
        display: block;
        margin: 10px auto;
      }
    }

    .footer {
      height: 36px;

      .btn-add {
        height: 34px;
        width: 100%;
        border-radius: 3px;
        border: 0;
        background-color: #fff;
        cursor: pointer;

        i {
          font-size: 16px;
          color: #999;
        }

        &:hover {
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  .block._stop {
    .header {
      .add-btn {
        display: none;
      }
    }

    .container {
      max-height: calc(100% - 50px);
    }

    .footer {
      display: none;
    }
  }

  .block._log {
    .header {
      .status {
        .el-checkbox {
          margin-right: 10px;
        }
      }

      .op-btn {
        li {
          display: flex;
          align-items: center;
          height: 20px;

          &._current-log {
            span {
              display: block;
              max-width: 100px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            i {
              margin-left: 2px;
            }

            &:hover {
              background-color: #f56c6c;
              color: #fff;
            }
          }
        }
      }
    }

    .container {
      height: calc(100vh - 140px);
      max-height: calc(100% - 50px);

      ul {
        height: 100%;

        li {
          .remark {
            color: #999;

            &._ellipsis {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }

          .f {
            font-size: 12px;
          }

          &:hover {
            .remark {
              color: #444;
            }
          }
        }
      }
    }
  }
}
</style>
