export default {
    data() {
        return {
            BUS_DATA: {},
        }
    },
    mounted() { 
        this._eventBusMixinsInit()
    },
    beforeDestroy(){
        mimi.bus.$off('_handlerBusInput');
        mimi.bus.$off('_handlerBusChange')
        mimi.bus.$off('_handlerBusClear')
    },
    methods: {
        GET_BUS_DATA(){
            return this.BUS_DATA
        },
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