import eventBusMixins from './eventBusMixins'
export default {
    mixins: [eventBusMixins],
    data() {
        return {
            loading: false,
            multipleSelection: [],
            pagination: {
                page: 1,
                size: 10,
                total: 100
            },
            tableData: [],
            api: {
                list: ()=>{},
            },
            layout: "total, sizes, prev, pager, next, jumper",
            background: true,
            pageSizes: [5, 10, 20, 30],
            pagerCount: 5,
            hasPage: true,
            params_query: {},
            buttons: [
                {
                    type: '',
                    onClick: this.handleEdit,
                    size: 'mini',
                    name: '编辑'
                },
                {
                    type: 'danger',
                    onClick: this.handleDelete,
                    size: 'mini',
                    name: '删除'
                }
            ],
            defaultFiledButton: [{
                label: '操作',
                disabled: true,
                render: (h, scope) => {
                    return (
                        <div>
                            <el-button
                                size="mini"
                                onClick={() => { this.handleEdit(scope.$index, scope.row) }}>编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                onClick={() => { this.handleDelete(scope.$index, scope.row) }}>删除</el-button>
                        </div>
                    )
                }
            }],

            visible: {
                show: false,
                title: '弹出框'
            }
        }
    },
    created() {
    },
    async mounted() {
        await this.init();
    },
    methods: {
        defaultFiledButtonMethods(button = [], options = {}) {
            button = [...this.buttons, ...button ];
            const defaultOptions = {
                label: '操作',
                fixed: '',
                minWidth: '',
                render: Function
            }
            
            defaultOptions.render = (h, scope)=> {
                return (
                    <div style="">
                        {
                            button.map(item => {
                                return (
                                    <el-button type={item.type} onClick={()=>item.onClick(scope.$index, scope.row)} size={item.size}>{item.name}</el-button>
                                )
                            })
                        }    
                    </div>
                )
            }
            const btn =  [Object.assign({}, defaultOptions, options)]
            console.log(btn)
            return btn                
        },
        async init() {
            const data = Object.assign({}, this.pagination, this.params_query)
            let res = await this.api.list(data);
            if (res) {
                const { list, pagination } = res;
                this.tableData = list;
                this.pagination = pagination;
            }
        },
        handleSelectionChange(value) {
            this.multipleSelection = value;
        },
        async handleSizeChange(value) {
            this.pagination.page = 1
            this.pagination.size = value;
            await this.init();
        },
        handleEdit(index, row) {
            this.visible.show = true;
            this.formValue = row
        },
        handleDelete(index, row) { },
        async handleCurrentChange(value) {
            this.pagination.page = value
            await this.init();
        },
        handleMethods(methods, index, row) { },
    },
}