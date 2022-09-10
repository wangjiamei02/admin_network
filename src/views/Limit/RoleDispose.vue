<template>
    <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>权限配置</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'role' }">返回列表</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :class="{ content }"
    >
      <div :class="{ center_box }">
        <Form :model="formTop" label-position="top">
          <Row>
            <Col span="24">
              <FormItem>
                <p>所属角色</p>
                <Input :value="this.disposelist.rolename + `/` + this.disposelist.rolenum" disabled></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </Content>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                update: "update",
                content:"content",
                center_box: "center_box",
                disposelist:"",
                formTop:{

                }
            }
        },
        methods:{
            updatePage() {
            this.$router.go(0);
            },
        },
        mounted() {
            this.disposelist = JSON.parse(this.$route.query.disposelist);
        },
    }
</script>

<style lang="less" scoped>
.content{
  padding: 24px;
  min-height: 280px;
  background-color: #fff;
}
.center_box {
  border-radius: 4px;
  padding: 18px 14px 10px 14px;
    p {
    font-size: 14px;
    color: #17233d;
    font-weight: 700;
  }
}
.update {
  color: #337ab7;
  font-weight: bold;
  font-size: 22px;
  transform: rotate(-52deg);
  line-height: 12px;
}
</style>