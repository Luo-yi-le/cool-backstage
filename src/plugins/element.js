import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Main,
    Aside,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Tag,
    Tree,
    Select,
    Option,
    Cascader,
    Alert,
    Tabs,
    TabPane,
    Steps,
    Step,
    Checkbox,
    CheckboxGroup,
    Upload,
    Timeline,
    TimelineItem,
    Notification,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    ColorPicker,
    Scrollbar,
    Progress,
    Badge,
    InfiniteScroll,
    Loading,
    Radio,
    RadioButton,
    RadioGroup,
    Image,
    DatePicker,
    TimePicker,
    Popover,
    InputNumber,
    Drawer,
    Link,
} from 'element-ui';
const components = [
    Link,
    InputNumber,
    Popover,
    Image,
    RadioButton,
    RadioGroup,
    Radio,
    Button,
    Form,
    FormItem,
    Input,
    Container,
    Header,
    Main,
    Aside,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    Tag,
    Tree,
    Select,
    Option,
    Cascader,
    Alert,
    Tabs,
    TabPane,
    Steps,
    Step,
    Checkbox,
    CheckboxGroup,
    Upload,
    Timeline,
    TimelineItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    ColorPicker,
    Scrollbar,
    Progress,
    Badge,
    DatePicker,
    TimePicker,
    Drawer,
]

function RepairProps(cmp) {
    (cmp || []).forEach(mixin => {
        if (mixin.props && mixin.props.placement) {
            const defaultValue = mixin.props.placement.default
            mixin.data = new Proxy(mixin.data, {
                apply(target, thisArg, argArray) {
                    const res = Reflect.apply(target, thisArg, argArray)
                    return {
                        ...(res || {}),
                        placement: defaultValue
                    }
                }
            })
            delete mixin.props.placement
        }
        if (mixin.mixins && mixin.mixins.length > 0) {
            RepairProps(mixin)
        }
    })
}

RepairProps(DatePicker.mixins[0].mixins)

const install = function(Vue, opts = {}) {
    Vue.prototype.$ELEMENT = {
        size: opts.size || '',
        zIndex: opts.zIndex || 2000
    };
    Vue.use(InfiniteScroll);
    
    Vue.use(Loading.directive);
    components.forEach(component => {
        Vue.component(component.name, component)
            // Vue.use(component, { size: Cookies.get('size') || 'medium', })
    });

    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$message = Message;
    Vue.prototype.$notify = Notification;

    /* istanbul ignore if */
    if (typeof window !== 'undefined' && window.Vue) {
        install(window.Vue)
    }
}


// RepairProps(TimePicker)
// console.log(DatePicker.mixins)


export default install