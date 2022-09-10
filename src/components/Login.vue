<template>
  <div :class="{ box }">
    <div :class="{ login_box }">
      <div :class="{ login_title }">网站管理系统</div>
      <div :class="{ form_box }">
        <form>
          <div>
            <p>用户名</p>
            <Input
              v-model.trim="username"
              placeholder="用户名或邮箱(初始用户名为：wjm)"
              style="width: 348px"
            />
          </div>
          <div>
            <p>密码</p>
            <Input
              v-model.trim="password"
              placeholder="密码(初始密码为：2002)"
              style="width: 348px"
              type="password"
            />
          </div>
          <div>
            <p>验证码<span :class="{ change }">换一张?</span></p>
            <Row>
              <Col span="19">
                <Input
                  v-model.trim="check"
                  placeholder="验证码(初始验证码为：1234)"
                  style="width: 180px"
                />
              </Col>
              <Col span="5"><span>验证码图片</span></Col>
            </Row>
          </div>
          <Button
            type="primary"
            @click.prevent="login()"
            :class="{ submitButton }"
            >登录</Button
          >
          <Row>
            <Col span="20" :class="{ text }"> 忘记密码？ </Col>
            <Col span="4" :class="{ text }"> 退出登录 </Col>
          </Row>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginTime } from '../axios/api'
export default {
  data() {
    return {
      username: "",
      password: "",
      check: "",
      info: "", // 用于保存登录失败后的提示信息
      box: "box",
      login_box: "login_box",
      login_title: "login_title",
      form_box: "form_box",
      change: "change",
      submitButton: "submitButton",
      text: "text",
    };
  },
  methods: {
    login() {
      //实际应用中，这里应该通过AJAX请求 上服务端去验证
      if (
        "wjm" === this.username &&
        "2002" === this.password &&
        "1234" === this.check
      ) {
        //sessionStorage中存储的都是字符串
        //因此这里实际存储的将是字符串"true"
        sessionStorage.setItem("isAuth", true);
        this.info = "";
          loginTime() //获取登录时间
          .then((res) => {
            console.log('成功啦~');
          })
          .catch((err) => {
            console.log('出错啦~')
          })
        //如果存在查询参数
        console.log(this.$route.query);
        if (this.$route.query.redirect) {
          //如果在this.$route.query里面有redirect
          let redirect = this.$route.query.redirect; //就把redirect的值也就是当前点击的页面  赋值给redirect
          //跳转至登录页前的路由
          this.$router.replace(redirect); //然后跳转到当前点击的页面(/videos)
        } else {
          //否则跳转至首页
          this.$router.replace("/");
        }
      } else {
        //登陆失败的标志 false失败  true成功
        sessionStorage.setItem("isAuth", false);
        (this.username = ""),
          (this.password = ""),
          this.$Message.error((this.info = "用户名或密码错误~"));
      }
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  background: #515a6e;
  position: fixed; //固定定位(必须填！！！不然背景颜色不显示)
}
.login_box {
  background-color: white;
  border-radius: 6px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -185px;
  margin-left: -190px;
  width: 380px;
  height: 370px;
  color: #515a6e;
  font-family: "Microsoft Yahei";
}
.login_title {
  padding-top: 10px;
  padding-bottom: 15px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  border-bottom: 1px solid #ddd;
  width: 350px;
  margin: 0 auto;
}
.form_box {
  padding: 0px 16px;
  p {
    font-size: 14px;
    font-weight: bold;
    padding: 12px 0px 4px 0px;
  }
}
.change {
  color: #515a6e;
  font-weight: normal;
  padding-left: 14px;
}
.submitButton {
  color: #ffffff;
  border-color: #515a6e;
  background-color: #337ab7;
  width: 350px;
  margin-top: 16px;
  font-size: 14px;
  margin-bottom: 14px;
}
.text {
  color: #515a6e;
  font-size: 14px;
}
</style>