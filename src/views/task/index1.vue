<template>
  <div class="task">
    <el-row :gutter="20" class="task-row">
      <el-col :span="6" class="container">
        <card name="系统任务">
          <template #btn>
            <div style="float: right; padding: 3px 0">
              <el-button type="text" @click="createTask"> 新建任务 </el-button>
              <el-button type="text" @click="createTask"> 新建任务 </el-button>
            </div>
          </template>
        </card>
      </el-col>
      <el-col :span="6" class="container">
        <card name="用户自定义任务">
          <template #btn>
            <div style="float: right; padding: 3px 0">
              <el-button type="text" @click="createTask"> 新建任务 </el-button>
              <el-button type="text" @click="createTask"> 新建任务 </el-button>
            </div>
          </template>
        </card>
      </el-col>
      <el-col :span="6" class="container">
        <card
          :name="'已停止任务(' + logs.total + ')'"
          :body-style="{
            padding: '6px',
            height: 'calc(100vh - 160px)',
          }"
        >
          <template #btn>
            <div style="float: right; padding: 3px 0">
              <el-button size="mini" icon="el-icon-refresh"> 刷新 </el-button>
            </div>
          </template>
          <section
            class="scroller1"
            v-loading="logs.loading"
            element-loading-text="拼命加载中"
          ></section>
        </card>
      </el-col>

      <el-col :span="6" class="container">
        <card
          :name="'日志(' + logs.total + ')'"
          :body-style="{
            padding: '6px',
            height: 'calc(100vh - 160px)',
          }"
        >
          <template #btn>
            <div style="float: right; padding: 3px 0">
              <el-checkbox
                @change="getTaskLog(true)"
                :true-label="0"
                :false-label="1"
                v-model="logs.status"
                size="mini"
                >异常</el-checkbox
              >
              <el-button size="mini" icon="el-icon-refresh" @click="createTask">
                刷新
              </el-button>
            </div>
          </template>

          <section
            v-loadMoreData:50="lazyLoadLog"
            ref="scrollerLog"
            class="scroller1"
            v-loading="logs.loading"
            element-loading-text="拼命加载中"
          >
            <div class="content" v-for="(log, index) in logs.list" :key="index">
              <div class="h">{{ log.taskName }}</div>
              <div class="remark _ellipsis">...</div>
              <div class="f">
                <span>执行时间：{{ log.createTime }}</span>
              </div>
            </div>
          </section>
        </card>
      </el-col>
    </el-row>

    <!-- <mimi-table
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
    ></mimi-table> -->

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
import MimiForm from "@/components/Form";

import { column } from "./filed.js";
import defaultMixins from "@/mixins/defaultMixins";
export default {
  mixins: [defaultMixins],

  name: "Task",
  data() {
    return {
      formValue: {},
      data: [],
      rules: {},
      api: {
        list: this.$api.task.page,
      },
      logs: {
        list: [],
        loading: false,
        page: 1,
        size: 15,
        total: 1,
        status: 1,
        loadSign: true, // 加载更多的标识
      },
    };
  },
  computed: {
    button() {
      return [
        {
          type: "",
          onClick: this.handleStop,
          size: "mini",
          name: "暂停任务",
        },
      ];
    },
    columns() {
      return [
        ...column,
        ...this.defaultFiledButtonMethods(this.button, {
          fixed: "right",
          minWidth: "200px",
        }),
      ];
    },
  },
  created() {},
  mounted() {
    this.getTaskLog();
  },
  methods: {
    async submit() {
      let res;
      let data = await this.$refs["mimiForm"].submit();
      if (data && data.id) {
        res = await this.$api.task.update(data);
      } else {
        res = await this.$api.task.add(data);
      }

      console.log(res);
    },
    createTask() {
      this.visible.show = true;
    },
    async handleStop(index, row) {
      const res = await this.$api.task.stop({ id: Number(row.id) });
    },

    async getTaskLog(flag = false) {
      if (flag) {
        this.logs.list = [];
      }

      this.logs.loading = true;
      const param = {
        size: this.logs.size,
        page: this.logs.page,
        status: this.logs.status,
      };
      const res = await this.$api.task.log(param);
      this.logs = Object.assign({}, this.logs, res.pagination);
      this.logs.list = this.logs.list.concat(res.list);
      this.logs.loading = false;
      this.logs.loadSign = true;
    },

    async lazyLoadLog() {
      if (
        this.logs.loadSign &&
        this.logs.page < Math.ceil(this.logs.total / this.logs.size)
      ) {
        this.logs.loadSign = false;
        this.logs.page++;
        await this.getTaskLog();
      }
    },
  },
  components: {
    MimiForm,
    MimiTable: () => import("@/components/Table"),
    // MimiForm: () => import("@/components/Form"),
    MimiDialog: () => import("@/components/Dialog"),
    card: () => import("@/components/Card"),
    scrollPane: () => import("@/components/ScrollPane"),
  },
};
</script>

<style lang="scss" scoped>
.task {
  height: 100%;
  max-height: 100%;
  .task-row {
    height: 90%;
  }

  .container {
    overflow-y: auto;
    margin-bottom: 5px;
    z-index: 2;
    position: relative;
    height: calc(100% - 100px) !important;
    min-height: calc(100% - 100px) !important;

    .scroller1 {
      overflow: hidden auto;
      position: relative;
      z-index: 9;
      height: 100%;
      // height: calc(100% - 450px);

      ::v-deep {
        .el-card {
          .el-card__body {
            height: calc(100% - 90px);
            padding: 20px;
            padding: 0;
          }
        }
      }

      .content {
        list-style: none;
        background-color: #fff;
        border-radius: 5px;
        margin-bottom: 5px;
        padding: 10px 15px;
        font-size: 14px;
        letter-spacing: 0.5px;
        border: 1px solid #f7f7f7;
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

        .h {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .f {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          font-size: 12px;
        }
        &:hover {
          .remark {
            color: var(--color-primary);
          }
        }
      }
    }
  }
}
</style>
