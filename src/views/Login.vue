<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar">
        <img src="~/assets/images/logo.svg" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        label-width="0px"
        :model="loginForm"
        :rules="loginRules"
        class="login_form"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <!-- 字体文件在入口文件引入后，可以在 prefix-icon 写class名 -->
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            show-password
          ></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button
            type="info"
            @click="resetLoginForm"
            title="重置表单数据、清除验证规则"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 验证规则
      loginRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      // 消息框
      notify: null,
    };
  },
  created() {
    this.notify = this.$notify({
      title: "欢迎您",
      message: "初始用户名：admin </br> 初始密码：123456",
      type: "success",
      dangerouslyUseHTMLString: true,
      offset: 100,
      duration: 5000,
    });
  },
  destroyed() {
    // 组件销毁时关闭提示框
    this.notify.close()
  },
  methods: {
    // 点击重置按钮，重置表单数据和验证规则
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 判断是否校验通过 => valid是否通过，field未通过的字段
      this.$refs.loginFormRef.validate(async (valid, field) => {
        // console.log(valid, field);

        // 未通过验证
        if (!valid) {
          let arr = Object.keys(field);
          // 拿到未通过验证的验证规则提示
          return this.$message.error({
            message: field[arr[0]][0].message,
            duration: 1000,
          });
        }

        let { data: result } = await this.$http.post("login", this.loginForm);
        // 登录失败
        if (result.meta.status !== 200) {
          return this.$message.error({
            message: result.meta.msg,
            duration: 1000,
          });
        }

        // 登录成功
        this.$message.success({
          message: "登录成功！",
          duration: 1000,
        });
        // 保存token
        window.sessionStorage.setItem("token", result.data.token);
        // 跳转到首页
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;

  .avatar {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 5px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 130px;
      height: 130px;
      border-radius: 50%;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>