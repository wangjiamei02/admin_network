<template>
  <div>
    <Layout>
      <Sider hide-trigger :style="{ background: '#fff' }">
        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
        <Submenu name="6-1">
          <template slot="title">演示模块</template>
          <MenuItem name="6-1">功能实例</MenuItem>
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