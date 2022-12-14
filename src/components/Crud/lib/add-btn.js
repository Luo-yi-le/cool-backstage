export default {
    name: 'add-btn',

    inject: ['crud'],

    render() {
        const { rowAdd, dict, permission } = this.crud;
        permission.add = true

        return (
            permission.add && (
                <el-button size="mini" type="primary" on-click={rowAdd}>
                    {dict.label.add}
                </el-button>
            )
        );
    }
};