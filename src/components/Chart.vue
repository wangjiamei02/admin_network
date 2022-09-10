<template>
  <div>
    <Layout>
      <Sider hide-trigger :style="{ background: '#fff' }">
        <Menu active-name="5-1" theme="light" width="auto" :open-names="['1']">
          <Submenu name="5-1">
            <template slot="title">数据报表统计</template>
            <MenuItem name="5-1" :to="{ name: 'weeklist' }">周访问统计</MenuItem>
            <MenuItem name="5-2" :to="{ name: 'daylist' }">日访问统计</MenuItem>
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

<style lang="less" scoped>
</style>