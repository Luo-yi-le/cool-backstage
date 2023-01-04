export default {
    name: "error-message",
    props: {
		title: String
	},
    render() {
        return (
            <el-alert title={this.title} type="error"></el-alert>
        );
    }
};