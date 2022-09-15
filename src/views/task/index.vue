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
          <span class="num">(11)</span>
          <span class="flex1"></span>
          <!-- 操作按钮 -->
          <ul class="op-btn">
            <li class="refresh-btn">
              <i class="el-icon-refresh"></i>
              <span>刷新</span>
            </li>

            <li class="add-btn">
              <i class="el-icon-plus"></i>
              <span>添加</span>
            </li>
          </ul>
        </div>

        <div class="container scroller1"></div>

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
          <el-checkbox-group v-model="logs.status" class="status">
            <el-checkbox :label="0">异常</el-checkbox>
          </el-checkbox-group>

          <!-- 操作按钮 -->
          <ul class="op-btn">
            <li class="refresh-btn">
              <i class="el-icon-refresh"></i>
              <span>刷新</span>
            </li>
          </ul>
        </div>

        <div v-loading="logs.loading" class="container" element-loading-text="拼命加载中">
          <ul
            class="scroller1"
            :infinite-scroll-disabled="logs.list.length == logs.pagination.total"
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
  </div>
</template>

<script>
import MimiForm from "@/components/Form";

import { column } from "./filed.js";
import defaultMixins from "@/mixins/defaultMixins";
export default {
  mixins: [defaultMixins],

  data() {
    return {
      list: [
        { key: "sys", label: "系统任务", icon: "el-icon-s-tools" },
        { key: "user", label: "用户自定义任务", icon: "el-icon-user-solid" },
        { key: "stop", label: "已停止任务" },
      ],
      logs: {
        loading: false,
        list: [],
        status: 1,
        pagination: {
          size: 10,
          page: 1,
        },
      },
    };
  },
  mounted() {
    this.getTaskLog();
  },
  methods: {
    async getTaskLog() {
      this.logs.loading = true;
      const param = Object.assign({}, this.logs.pagination, { status: this.logs.status });
      const res = await this.$api.task.log(param);
      // this.logs.list = this.logs.list.concat(res.list);
      this.logs.list = res.list;
      this.logs.loading = false;
    },
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
      height: calc(100% - 50px);
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
