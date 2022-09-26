
export const column = (__this) => [{
        label: '序号',
        type: 'selection',
        disabled: true
    },
    {
        prop: 'name',
        label: '任务名称',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('name'),
    },
    {
        prop: 'createTime',
        label: '创建任务时间',
        type: 'text',
        componentName: 'el-date-picker',
        component: mimi.fileds('createTime', { type: 'datetime', disabled: true }),
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
            hidden: ({ scope }) => {
                console.log(scope)
            },
            listeners: {
                
                change: __this.handlerBusChange
                // ($event,)=>console.log($event)
            }
        }),
    },
    
    {
        prop: 'nextRunTime',
        label: '下次执行时间',
        type: 'text',
        componentName: 'el-date-picker',
        component: mimi.fileds('nextRunTime', { type: 'datetime' }),
    },

    {
        prop: 'limit',
        label: '最大执行次数',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('limit'),
    },
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
        prop: 'cron',
        label: '执行时间表达式',
        type: 'text',
        slotName: 'slot-cron',
        component: mimi.fileds('cron', {
            name: 'slot-cron',
            listeners:{}
        }),
    },
    {
        prop: 'repeatConf',
        label: '任务配置',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('repeatConf', {
            disabled: true
        }),
    },
    {
        prop: 'data',
        label: '数据',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('data', {
            disabled: true
        }),
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