<template>
  <div class="Captcha" @click="refresh">
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
    };
  },
  created() {},
  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      const res = await captcha({ height: 40, width: 150 });
      if (res) {
        const { captchaId, data } = res;
        if (data.includes(";base64,")) {
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
