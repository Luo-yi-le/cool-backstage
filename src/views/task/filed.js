export const column = (__this) => [{
        prop: 'name',
        label: '任务名称',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('name'),
        rules: {
            required: true,
            message: "任务名称不能为空"
        }
    },
    {
        prop: 'taskType',
        label: '执行类型',
        type: 'text',
        componentName: 'el-select',
        component: mimi.fileds('taskType', {
            options: [{
                label: "cron",
                value: 0
            }, {
                label: "时间间隔",
                value: 1
            }],
            listeners: {

                change: (v) => {
                    if (v == 0) {
                        __this.$set(__this.formValue, "repeatCount", undefined);
                        __this.$set(__this.formValue, "every", undefined);
                    } else {
                        __this.$set(__this.formValue, "cron", undefined);
                    }
                }
                // ($event,)=>console.log($event)
            }
        }),
    },
    {
        prop: 'cron',
        label: '执行时间表达式',
        type: 'text',
        disabled: __this.formValue.taskType == 1,
        slotName: 'slot-cron',
        component: mimi.fileds('cron', {
            name: 'slot-cron',
            listeners: {

            },


        }),
        rules: {
            required: true,
            message: "cron不能为空"
        }
    },


    {
        label: "次数",
        prop: "repeatCount",
        disabled: __this.formValue.taskType == 0,
        componentName: 'el-input-number',
        component: mimi.fileds('repeatCount', {
            props: {
                min: 1,
                max: 10000
            }
        })
    },
    {
        label: "间隔(秒)",
        prop: "every",

        disabled: __this.formValue.taskType == 0,
        componentName: 'el-input-number',
        component: mimi.fileds('every', {
            props: {
                min: 1,
                max: 100000000
            }
        }),
        rules: {
            required: true,
            message: "执行间隔不能为空"
        }
    },

    // {
    //     prop: 'nextRunTime',
    //     label: '下次执行时间',
    //     type: 'text',
    //     componentName: 'el-date-picker',
    //     component: mimi.fileds('nextRunTime', { type: 'datetime' }),
    // },

    // {
    //     prop: 'limit',
    //     label: '最大执行次数',
    //     type: 'text',
    //     componentName: 'el-input',
    //     component: mimi.fileds('limit'),
    // },
    {
        prop: 'type',
        label: '任务类型',
        type: 'text',
        componentName: 'el-select',
        component: mimi.fileds('type', {
            options: [{
                label: "系统",
                value: 0
            }, {
                label: "用户",
                value: 1
            }]
        }),
    },

    {
        prop: 'service',
        label: '执行的service实例ID',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('service'),
    },

    {
        label: "开始时间",
        prop: "startDate",
        type: 'text',
        disabled: __this.formValue.taskType == 1,
        componentName: 'el-date-picker',
        component: mimi.fileds('startDate', {
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss"
        }),
    },

    {
        label: "结束时间",
        prop: "endDate",
        type: 'text',
        componentName: 'el-date-picker',
        component: mimi.fileds('endDate', {
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss"
        }),
    },
    {
        label: "备注",
        prop: "remark",
        type: 'text',
        componentName: "el-input",
        component: {
            props: {
                type: "textarea"
            }
        }
    },

    {
        prop: 'status',
        label: '状态',
        type: 'text',
        componentName: 'el-select',
        component: mimi.fileds('status', {
            options: [{
                label: "停止",
                value: 0
            }, {
                label: "运行",
                value: 1
            }]
        }),
    },
]