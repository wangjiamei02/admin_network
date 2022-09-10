<template>
  <div>
    <Layout>
      <Sider hide-trigger :style="{ background: '#fff' }">
        <Menu active-name="1-1" ref="side_menu" theme="light" width="auto" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">控制台</template>
              <MenuItem name="1-1" :to="{ name: 'mains' }">控制台信息</MenuItem>
              <MenuItem name="1-2" :to="{ name: 'self' }">修改个人信息</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{ padding: '0 24px 24px' }">
        <router-view></router-view>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>