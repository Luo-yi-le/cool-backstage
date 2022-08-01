
<script>
export default {
  name: 'MimiRender',
  functional: true,
  props: {
    scope: mimi.vue.getPropObject(),
    render: mimi.vue.getPropFunction(),
  },
  render: (h, ctx) => {
    return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : ''
  }
}
</script>