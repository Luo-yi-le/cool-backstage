<template>
  <div class="task">
    <div>
      <el-button type="" @click="createTask">新建任务</el-button>
    </div>
    <el-row :gutter="20">
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
        <card name="已停止任务">
          <template #btn>
            <div style="float: right; padding: 3px 0">
              <el-button type="text" @click="createTask"> 新建任务 </el-button>
              <el-button type="text" @click="createTask"> 新建任务 </el-button>
            </div>
          </template>
        </card>
      </el-col>

      <el-col :span="6" class="container">
        <card name="日志">
          <template #btn>
            <div style="float: right; padding: 3px 0">
              <el-button type="text" @click="createTask"> 新建任务 </el-button>
              <el-button type="text" @click="createTask"> 新建任务 </el-button>
            </div>
          </template>

          <card
            class="scroller1"
            :header="false"
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
          </card>
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

    async getTaskLog() {
      this.logs.loading = true;
      const param = {
        size: 10,
        page: 1,
      };
      const res = await this.$api.task.log(param);
      this.logs.list = res.list;
      this.logs.loading = false;
    },
  },
  components: {
    MimiForm,
    MimiTable: () => import("@/components/Table"),
    // MimiForm: () => import("@/components/Form"),
    MimiDialog: () => import("@/components/Dialog"),
    card: () => import("@/components/Card"),
  },
};
</script>

<style lang="scss" scoped>
:deep.container {
  overflow-y: auto;
  margin-bottom: 5px;
  z-index: 2;
  position: relative;
  height: calc(100% - 50px);
  max-height: calc(100% - 50px);

  .scroller1 {
    overflow: hidden auto;
    position: relative;
    z-index: 9;
    height: 100%;

    .el-card {
      .el-card__body {
        padding: 20px;
        padding: 0;
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
</style>
