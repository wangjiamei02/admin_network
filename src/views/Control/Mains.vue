<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage" />
      </BreadcrumbItem>
      <!-- <BreadcrumbItem>Components</BreadcrumbItem> -->
      <BreadcrumbItem>控制台信息</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
    >
      <div :class="{ center_box }">
        <Row :gutter="28">
          <Col span="12">
            <Card dis-hover>
              <p slot="title">待处理事项</p>
              <ul>
                <li>
                  <span>在线留言：</span>
                  <router-link :to="{ name: 'messages' }">{{this.datas.message}}</router-link>
                </li>
                <li>
                  <span>友情链接：</span>
                  <router-link :to="{ name: 'friendlylink' }">{{this.datas.friendlylink}}</router-link>
                </li>
                <li>
                  <span>用户注册：</span>
                  <router-link :to="{ name: 'user' }">{{this.datas.userlogon}}</router-link>                                  
                </li>
              </ul>
            </Card>
          </Col>
          <Col span="12">
            <Card dis-hover>
              <p slot="title">设计制作</p>
              <ul>
                <li>
                  <span>昵称：</span><span>{{this.datas.nickname}}</span>
                </li>
                <li>
                 <span>邮箱：</span><span>{{this.datas.mail}}</span> 
                </li>     
                <li>
                  <span>QQ号：</span><span>{{this.datas.qq}}</span>
                </li>
                <li>
                 <span>微信号：</span><span>{{this.datas.wechart}}</span>                                  
                </li>
              </ul>
            </Card>
          </Col>
        </Row>

        <Row :gutter="28">
          <Col span="12">
            <Card dis-hover>
              <p slot="title">账号信息</p>
              <ul>
                <li>
                  <span>用户名：</span><span>{{this.datas.user}}</span>
                </li>
                <li>
                  <span>姓名：</span><span>{{this.datas.name}}</span> 
                </li>
                <li>
                  <span>登录时间：</span><span>{{this.datas.logintime}}</span>                      
                </li>
              </ul>
            </Card>
          </Col>
          <Col span="12" :class="{ card_4 }">
            <Card dis-hover>
              <p slot="title">其他</p>
              <p :class="otherStyle">{{ other }}</p>
              <div>
                <Button type="success" @click="modal1 = true" :class="{ mail }"
                  >邮件反馈</Button
                >
                <Modal
                  v-model="modal1"
                  title="邮件反馈"
                  :styles="{ top: '0px', width: '700px' }"                 
                >
                  <div>
                    <p>邮件内容</p>
                    <Input
                      v-model="mailContent"
                      type="textarea"
                      :placeholder="value"
                      :rows="5"
                    />
                    <p>说明：给管理员写一封电子邮件，支持回车和换行</p>
                  </div>
                  <div slot="footer">
                    <Row type="flex" justify="center" :gutter="24">
                      <Col span="8">
                        <Button long @click="updatePage">刷新</Button>
                      </Col>
                      <Col span="8">
                        <Button type="primary" long @click="handleSubmit"
                          >提交</Button
                        >
                      </Col>
                      <Col span="8">
                        <Button long @click="modal1 = false">关闭</Button>
                      </Col>
                    </Row>
                  </div>               
                </Modal>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Content>
  </div>
</template>

<script>
import { getMains } from '../../axios/api'
export default {
  data() {
    return {
      datas:"",
      center_box: "center_box",
      update: "update",
      card_4: "card_4",
      other: "如果您对本管理系统，有什么想法或建议，欢迎与我联系",
      otherStyle:"otherStyle",
      mail: "mail",
      span_state: "span_state",
      modal1: false,
      mailContent: "",
      value: "本邮件将发送到站长邮箱，请放心填写",
    };
  },
  methods: {
    getMains(){
      getMains()
       .then((res) => {
         this.datas = res[0]
        console.log(res[0]);
      })
      .catch((err) => {
        console.log('出错啦~')
      })
    },
    handleSubmit() {
      if(this.mailContent == "") {
        this.$Message.warning("请输入邮件内容")
      }else{
      this.$Message.success("邮件发送成功，非常感谢您的反馈")
      this.modal1 = false
      }
    },
    updatePage() {
      this.$router.go(0);
    },
  },
  created() {
    this.getMains()
  }
};
</script>

<style lang="less" scoped>
.center_box ul {
  list-style-type: none;
}
.update {
  color: #337ab7;
  font-weight: bold;
  font-size: 22px;
  // padding-top: 18px;
  transform: rotate(-52deg);
  line-height: 12px;
}
.card_4 {
  margin-top: 11px;
}
.otherStyle {
  margin-bottom: 10px;
}
</style>