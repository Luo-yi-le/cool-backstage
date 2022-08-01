<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  name: "SidebarLink",
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      let path = mimi.script.clone(to);
      let route;
      let reg = new RegExp(/^(#\/)[a-zA-Z]:((\\)[\S].+\s?)*\\/ig);
      if(process.env.IS_ELECTRON || reg.test(path)) {
        route = path.split('\\');
        route[0] = "";
        
        route = route.join("/");
      } else {
        route = path;
      }
      if (this.isExternal) {
        return {
          href: route,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: route
      }
    }
  }
}
</script>
