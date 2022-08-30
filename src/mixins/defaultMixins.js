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
            defaultFiledButton: [{
                label: '操作',
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
        console.log(this.$options.name)
    },
    async mounted() {
        await this.init();
    },
    methods: {
        async init() {
            let res = await this.api.list(this.pagination);
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
    },
}