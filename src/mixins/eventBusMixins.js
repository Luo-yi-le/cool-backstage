export default {
    data() {
        return {
            BUS_DATA: {},
        }
    },
    mounted() { 
        this._eventBusMixinsInit()
    },
    methods: {
        _eventBusMixinsInit() {
            this._handlerBusInput();
            this._handlerBusChange();
            this._handlerBusClear();
        },

        _handlerBusInput() {
            mimi.bus.$on('_handlerBusInput', ({ event, key }) => {
                this.BUS_DATA = { event, key }
            })
        },

        _handlerBusChange(){
            mimi.bus.$on('_handlerBusChange', ({ event, key }) => {
                this.BUS_DATA = { event, key }
            })
        },
        _handlerBusClear(){
            mimi.bus.$on('_handlerBusClear', ({ event, key }) => {
                this.BUS_DATA = { event, key }
            })
        },
    },
}