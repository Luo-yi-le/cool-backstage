<template>
  <div class="wechatQrCode">
    <el-image style="width: 100%" :src="qrcode" fit="fill" lazy></el-image>
  </div>
</template>

<script>
export default {
  name: "wechatQrCode",
  data() {
    return {
      qrcode: "",
    };
  },
  created() {},
  mounted() {
    this.getQrCode();
  },
  methods: {
    async getQrCode() {
      const res = await this.$api.qrcode();
      this.qrcode = res;
    },
  },
};
</script>

<style scoped lang="scss">
.wechatQrCode {
}
</style>
