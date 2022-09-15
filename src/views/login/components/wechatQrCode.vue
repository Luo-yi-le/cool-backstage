<template>
  <div class="wechatQrCode">
    <el-image style="width: 100%" :src="qrcode" fit="fill" lazy></el-image>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
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
    this.loadConfigData();
  },
  methods: {
    async getQrCode() {
      const res = await this.$api.qrcode();
      this.qrcode = res;
    },

    async loadConfigData() {
      const resData = await this.$api.loadConfigData({
        url: "https://wulingshan.loca.lt",
      });
      console.log(resData);
      wx.config({
        debug: true,
        appId: resData.appId, // 必填，公众号的唯一标识
        timestamp: resData.timestamp, // 必填，生成签名的时间戳
        nonceStr: resData.noncestr, // 必填，生成签名的随机串
        signature: resData.signature, // 必填，签名，见附录1
        jsApiList: [
          "scanQRCode",
          "chooseImage",
          "previewImage",
          "getLocalImgData",
          "closeWindow",
          "getLocation",
        ],
      });

      wx.ready(() => {
        wx.getLocation({
          altitude: true,
          type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            console.log("成功获取到经纬度", res);
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            // console.log(_this.getDistance(22.14589,113.3642, latitude, longitude));
            _this.longitude = longitude;
            _this.latitude = latitude;
            _this.myDistance = _this.getDistance(
              22.041262,
              113.32364,
              latitude,
              longitude
            );
            _this.ifRedirect =
              _this.getDistance(22.041262, 113.32364, latitude, longitude) < 5
                ? true
                : false;
            // console.log('33333333333333',_this.ifRedirect )
            if (_this.ifRedirect) {
              // location.replace('https://hdyx.by-health.com/hdcj/doublefestival/entrance/jump?actId=6568&flag=yyjwx');
            }
          },
        });
      });
      wx.error((res) => {
        console.log(res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    },
  },
};
</script>

<style scoped lang="scss">
.wechatQrCode {
}
</style>
