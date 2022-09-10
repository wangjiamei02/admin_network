<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-nav">
            <Row>
              <Col span="21">
                  <MenuItem name="1" :class="{ nav_text }" :to="{ name: 'control' }">
                    <Icon type="md-home"></Icon>
                    控制面板
                  </MenuItem>
                  <MenuItem name="2" :class="{ nav_text }" :to="{ name: 'module' }">
                    <Icon type="ios-keypad"></Icon>
                    功能模块
                  </MenuItem>
                  <MenuItem name="3" :class="{ nav_text }" :to="{ name: 'system' }">
                    <Icon type="md-settings"></Icon>
                    系统设置
                  </MenuItem>
                  <MenuItem name="4" :class="{ nav_text }"  :to="{ name: 'limit' }">
                    <Icon type="md-key"></Icon>
                    权限控制
                  </MenuItem>
                  <MenuItem name="5" :class="{ nav_text }" :to="{ name: 'chart' }">
                    <Icon type="md-stats"></Icon>
                    数据图表
                  </MenuItem>
                  <MenuItem name="6" :class="{ nav_text }" :to="{ name: 'demo' }">
                    <Icon type="ios-folder"></Icon>
                    演示
                  </MenuItem>
              </Col>
              <Col span="3" >
                <router-link :to="{ name: 'login' }">
                  <MenuItem name="6" :class="{ nav_text }">
                    <Icon type="md-exit"></Icon>
                    退出登录
                  </MenuItem>
                </router-link>
              </Col>
            </Row>
          </div>
        </Menu>
      </Header>
    </Layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav_text: "nav_text",
    };
  },
};
</script>

<style scoped>
.nav_text {
  font-size: 15px;
  font-weight: bold;
}

.layout-nav {
  width: 1500px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>