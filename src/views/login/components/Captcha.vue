<template>
  <div class="Captcha" @click="refresh" v-loading="loading">
    <div v-if="svg" class="svg" v-html="svg" />
    <img v-else class="base64" :src="base64" alt="" />
  </div>
</template>

<script>
import { captcha } from "@api/user";
export default {
  name: "Captcha",
  data() {
    return {
      svg: null,
      base64: null,
      type: '',
      loading: false,
    };
  },
  created() {},
  mounted() {
    this.refresh();
  },
  methods: {
    setType() {
      const type = ['svg', 'base64'];
      return type[~~(Math.random()*type.length)]
    },
    async refresh() {
      this.svg = null;
      this.base64 = null;
      this.loading = true;
      const type = this.setType()
      const res = await captcha({ type, height: 40, width: 150, }); //ignoreChars: '' 
      if (res) {
        const { captchaId, data } = res;
        if (type == 'base64') {
          this.base64 = data;
        } else {
          this.svg = data;
        }
        this.$emit("captchaId", captchaId);
        this.$emit("change", {
          base64: this.base64,
          svg: this.svg,
          captchaId,
        });
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.Captcha {
  height: 40px;
  width: 150px;
  cursor: pointer;
  .svg {
    height: 100%;
    position: relative;
  }
  .base64 {
    height: 100%;
  }
}
</style>
