import eventBusMixins from './eventBusMixins'
export default {
    mixins: [eventBusMixins],
    data() {
        return {
            loading: false,
            multipleSelection: [],
            pagination: {
                currentPage: 1,
                pageSize: 5,
            },
            layout: "total, sizes, prev, pager, next, jumper",
            background: true,
            pageSizes: [5, 10, 20, 30],
            pagerCount: 5,
            hasPage: true,
            total: 100,
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
    methods: {
        async init() { },
        handleSelectionChange(value) {
            this.multipleSelection = value;
        },
        async handleSizeChange(value) {
            this.pagination.currentPage = 1
            this.pagination.pageSize = value
        },
        handleEdit(index, row) {
            this.visible.show = true;
            this.formValue = row
        },
        handleDelete(index, row) { },
        async handleCurrentChange() { },
    },
}