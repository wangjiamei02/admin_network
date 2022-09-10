<template>
    <div>
    <Breadcrumb :class="{ breadcrumb }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'dictionaryarticle' }">文章</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'dictionaryadvert' }">广告</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'dictionaryphoto' }">相册</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'dictionaryuse' }">应用分类</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'dictionaryblacklist' }">黑名单封杀时长</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'dictionaryvideo' }">视频</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'dictionarynote' }">短信来源</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'dictionaryother' }">其他</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'dictionarymysql' }">MySQL列类型</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ Content }">
      <div :class="{ center_box }">
        <div :class="{ form_box }">
          <Form :model="formItem" :label-width="80">
            <div :class="{ header_box }">
              <Row type="flex" justify="space-around" class="code-row-bg">
                <Col span="5">
                  <FormItem label="编号">
                    <Input v-model="formItem.id" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="名称">
                    <Input v-model="formItem.name" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="显示隐藏">
                    <Select v-model="formItem.showhide">
                      <Option v-for="showhide in showhides" :value="showhide" :key="showhide"
                        >{{ showhide }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div :class="{ icon_box }">
              <div :class="{ button_box }">
                <Icon
                  type="md-sync"
                  :class="{ update }"
                  @click="updatePage()"
                />
                <Button type="primary">搜索</Button>
                <Button>全部</Button>
              </div>
            </div>
          </Form>
        </div>
        <router-view></router-view>
      </div>
    </Content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Content: "Content",
      center_box: "center_box",
      update: "update",
      form_box: "form_box",
      header_box: "header_box",
      icon_box: "icon_box",
      button_box: "button_box",
      breadcrumb:"breadcrumb",
      formItem:{
          id:"",
          name:"",
          showhide:""
      },
      showhides:["显示（1）","隐藏（0）"],
    };
  },
  methods: {
    // 蓝色图标的刷新
    updatePage() {
      this.$router.go(0);
    },
  }
};
</script>

<style lang="less" scoped>
.breadcrumb {
    margin: 24px 0;
    font-weight: 700;
}
//Content组件的样式
.Content {
  padding: 24px;
  min-height: 280px;
  background: #fff;
}
.update {
  color: #337ab7;
  font-weight: bold;
  font-size: 22px;
  transform: rotate(-52deg);
  line-height: 12px;
}
.form_box {
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
}
.header_box {
  display: flow-root;
  padding-top: 7px;
  padding-right: 44px;
  border-bottom: 1px solid #dddddd;
  height: 50px;
}
.icon_box {
  background-color: #f5f5f5;
  height: 50px;
  border-radius: 0px 0px 3px 3px;
  padding: 9px;
}
.button_box {
  float: right;
  button {
    margin-left: 10px;
  }
}
</style>